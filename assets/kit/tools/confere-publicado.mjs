// Confere o site no ar contra o dist/ local, sem navegador:
//   node tools/confere-publicado.mjs [https://previa.exemplo.com]
// Cada arquivo chega igual, byte a byte, e com o tipo certo (é aqui que aparece um proxy mexendo no HTML);
// cada endereço cai na página certa, com e sem barra no fim; endereço inexistente devolve 404 com a página do site;
// quem chega em http vai para https; todo link interno leva a algum lugar.
// Rode depois de `npm run build` da versão publicada. Em endereço local, confere só bytes, rotas e links.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { destino } from "./rotas.js";
import { ENDERECOS } from "./testes.config.mjs";

const BASE = (process.argv[2] || process.env.SITE_BASE || "https://{{DOMINIO}}").replace(/\/$/, "");
const publico = process.env.CONFERE_PUBLICO === "1" || !/127\.0\.0\.1|localhost/.test(BASE);
const DIST = join(process.cwd(), "dist");
const TIPOS = { html: "text/html", js: "javascript", css: "text/css", json: "application/json", svg: "image/svg+xml", png: "image/png", jpg: "image/jpeg", webp: "image/webp", avif: "image/avif", woff2: "font/woff2" };

const arquivos = (pasta) => readdirSync(pasta).flatMap((n) => { const c = join(pasta, n); return statSync(c).isDirectory() ? arquivos(c) : [c]; });
const hash = (b) => createHash("sha256").update(b).digest("hex");
const problemas = [];
const erro = (m) => { problemas.push(m); console.log("  ERRO " + m); };

async function pega(caminho, opcoes = {}) {
  const r = await fetch(BASE + caminho, { redirect: "manual", headers: { accept: "text/html,*/*" }, ...opcoes });
  return { status: r.status, h: r.headers, corpo: Buffer.from(await r.arrayBuffer()) };
}

async function emLotes(lista, fazer, n = 6) {
  for (let i = 0; i < lista.length; i += n) await Promise.all(lista.slice(i, i + n).map(fazer));
}

// 1. Cada arquivo do build, byte a byte.
const todos = arquivos(DIST);
console.log(`Base: ${BASE}\nArquivos: ${todos.length}`);
await emLotes(todos, async (c) => {
  const url = "/" + relative(DIST, c).replaceAll("\\", "/");
  const r = await pega(url);
  const ext = url.split(".").pop();
  if (r.status !== 200) return erro(`${url}: status ${r.status}`);
  if (hash(r.corpo) !== hash(readFileSync(c))) erro(`${url}: conteúdo diferente do build`);
  if (TIPOS[ext] && !(r.h.get("content-type") || "").includes(TIPOS[ext])) erro(`${url}: tipo ${r.h.get("content-type")}`);
  if (!publico) return;
  if (r.h.get("x-robots-tag") !== "noindex, nofollow") erro(`${url}: sem noindex`);
  const cache = r.h.get("cache-control") || "";
  // Nome com hash em /assets: para sempre. Nome fixo: pouco tempo (o proxy pode subir, como a regra de Browser Cache TTL da zona).
  const querCache = url.startsWith("/assets/") ? /immutable/ : /\.html$/.test(url) ? /no-cache/ : /max-age=\d+|no-cache/;
  if (!querCache.test(cache)) erro(`${url}: cache "${cache}", esperava ${querCache}`);
});

// 2. Os endereços: cada um devolve exatamente a página certa.
const comBarra = [...ENDERECOS, ...ENDERECOS.filter((u) => u !== "/").map((u) => u + "/")];
console.log(`Endereços: ${comBarra.length}`);
await emLotes(comBarra, async (url) => {
  const limpo = url.split("?")[0].replace(/\/+$/, "") || "/";
  const alvo = destino(limpo) || (limpo === "/" ? "/index.html" : `${limpo}.html`);
  const r = await pega(url);
  if (r.status !== 200) return erro(`${url}: status ${r.status}`);
  if (hash(r.corpo) !== hash(readFileSync(join(DIST, alvo)))) erro(`${url}: não é ${alvo}`);
});

if (publico) {
  // 3. O que não existe: 404 de verdade, com a página do site.
  const pagina404 = hash(readFileSync(join(DIST, "404.html")));
  for (const url of ["/nada-aqui", "/pasta/nada/aqui", "/assets/nada.js", "/img/nada.webp", "/img/", "/dist/index.html"]) {
    const r = await pega(url);
    if (r.status !== 404) erro(`${url}: esperava 404, veio ${r.status}`);
    else if (hash(r.corpo) !== pagina404) erro(`${url}: 404 sem a página do site`);
  }

  // 4. Quem chega em http vai para https, sem ficar guardado.
  if (BASE.startsWith("https://")) {
    const r = await fetch(BASE.replace("https://", "http://") + "/?x=1", { redirect: "manual" });
    if (r.status !== 301 || r.headers.get("location") !== `${BASE}/?x=1`) erro(`http: ${r.status} -> ${r.headers.get("location")}`);
    if (!(r.headers.get("cache-control") || "").includes("no-store")) erro(`http: cache "${r.headers.get("cache-control")}"`);
  }
}

// 5. Todo link interno do HTML e do JS leva a algum lugar.
const internos = new Set();
for (const c of todos.filter((f) => /\.(html|js)$/.test(f))) {
  const t = readFileSync(c, "utf8");
  for (const m of t.matchAll(/(?:href|src)=["'`](\/[^"'`$<>\s#]*)/g)) internos.add(m[1]);
}
const lista = [...internos].filter((u) => u !== "/" && !u.endsWith("/"));
console.log(`Links internos: ${lista.length}`);
await emLotes(lista, async (url) => {
  const r = await pega(url);
  if (r.status !== 200) erro(`link interno ${url}: ${r.status}`);
});

console.log(problemas.length ? `\n${problemas.length} problemas` : "\nTudo igual ao build, nos endereços certos e sem link quebrado.");
process.exitCode = problemas.length ? 1 : 0;
