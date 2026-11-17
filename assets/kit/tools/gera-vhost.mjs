// Escreve o vhost da prévia a partir de deploy/previa.modelo.conf e das regras de tools/rotas.js, para os dois nunca divergirem.
//   node tools/gera-vhost.mjs [previa.exemplo.com]
// Sai em deploy/<domínio>.conf. Explica cada regra no próprio arquivo. Antes de instalar: references/publicar-previa.md.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PAGINAS, REGRAS } from "./rotas.js";

const dominio = process.argv[2] || "{{DOMINIO}}";
if (dominio === "previa.exemplo.com") {
  console.error("Diga o domínio: node tools/gera-vhost.mjs previa.exemplo.com");
  process.exit(1);
}
const raiz = process.cwd();
const rotulo = dominio.replace(/[^a-z0-9]+/gi, "_").toLowerCase();

const linhas = [];
const fonte = (re) => re.source.replaceAll("\\/", "/").replace(/\$$/, "");
for (const [re, pagina] of REGRAS) linhas.push([`${fonte(re)}/?$`, pagina]);

// /pages/x: os endereços de cada página juntos numa regra só.
const porPagina = new Map();
for (const [endereco, pagina] of Object.entries(PAGINAS)) porPagina.set(pagina, [...(porPagina.get(pagina) || []), endereco]);
for (const [pagina, enderecos] of porPagina) linhas.push([`^/pages/${enderecos.length > 1 ? `(${enderecos.join("|")})` : enderecos[0]}/?$`, `/${pagina}.html`]);

// As páginas da raiz, para /sobre/ funcionar como /sobre.
const usadas = new Set(linhas.map(([, p]) => p));
for (const n of readdirSync(raiz).filter((f) => f.endsWith(".html") && !["index.html", "404.html"].includes(f))) {
  if (!usadas.has(`/${n}`)) linhas.push([`^/${n.replace(".html", "")}/?$`, `/${n}`]);
}

const largura = Math.max(...linhas.map(([re]) => re.length), 20) + 2;
const rewrites = linhas.map(([re, p]) => `    rewrite ${re.padEnd(largura)} ${p} last;`).join("\n");
const modelo = readFileSync(join(raiz, "deploy", "previa.modelo.conf"), "utf8");
const marcador = (n) => `{{${n}}}`;
const saida = modelo.replaceAll(marcador("DOMINIO"), dominio).replaceAll(marcador("ROTULO"), rotulo).replace(`    # ${marcador("REWRITES")}`, rewrites);
const destino = join(raiz, "deploy", `${dominio}.conf`);
writeFileSync(destino, saida);
console.log(`${destino}\n${linhas.length} regras de endereço.`);
