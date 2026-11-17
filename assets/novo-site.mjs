#!/usr/bin/env node
// Cria um site novo a partir do kit: projeto que já abre, com link local, testes, casca e publicação prontos.
//   node <skill>/assets/novo-site.mjs <pasta> --nome "Casa Aurora" [--dominio previa.exemplo.com] [--porta 5590] [--loja] [--sem-instalar]
//   node <skill>/assets/novo-site.mjs <pasta> --so-ferramentas     só os testes e a publicação, num projeto que já existe (React, por exemplo)
// Nunca sobrescreve arquivo que já existe.
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KIT = join(dirname(fileURLToPath(import.meta.url)), "kit");
const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const valor = (n) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : undefined);
const pasta = args[0] && !args[0].startsWith("--") ? resolve(args[0]) : null;
const soFerramentas = flag("so-ferramentas");
const nome = valor("nome");

if (!pasta || (!nome && !soFerramentas)) {
  console.error('Uso: node novo-site.mjs <pasta> --nome "Nome da marca" [--dominio previa.exemplo.com] [--porta 5590] [--loja] [--sem-instalar]\n     node novo-site.mjs <pasta> --so-ferramentas');
  process.exit(1);
}

const livre = (porta) =>
  new Promise((ok) => {
    const s = createServer();
    s.once("error", () => ok(false));
    s.once("listening", () => s.close(() => ok(true)));
    s.listen(porta, "127.0.0.1");
  });

async function portaLivre() {
  for (let p = 5590; p < 5690; p += 2) if ((await livre(p)) && (await livre(p + 1))) return p;
  throw new Error("Nenhuma porta livre entre 5590 e 5690. Use --porta.");
}

const porta = Number(valor("porta")) || (await portaLivre());
const slug = (nome || "site").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hoje = new Date().toLocaleDateString("pt-BR");
const TROCAS = {
  "{{NOME}}": nome || "Site",
  "{{SLUG}}": slug,
  "{{PORTA}}": String(porta),
  "{{PORTA_PREVIEW}}": String(porta + 1),
  "{{DATA}}": hoje,
};
const dominio = valor("dominio") || "previa.exemplo.com";

const REGRAS_LOJA = `  // Os endereços da loja Shopify, para o tema herdar tudo sem redirecionamento.
  // [/^\\/products\\/[^/]+$/, "/produto.html"],
  // [/^\\/collections(\\/[^/]+)?$/, "/colecao.html"],
  // [/^\\/search$/, "/busca.html"],
  // [/^\\/cart$/, "/sacola.html"],
  // [/^\\/account(\\/login|\\/register)?$/, "/conta.html"],
  // [/^\\/blogs\\/[^/]+(\\/[^/]+)?$/, "/journal.html"],`;
const PAGINAS_LOJA = `  // sobre: "sobre",
  // "sobre-nos": "sobre",`;

const TEXTO = new Set([".html", ".js", ".mjs", ".json", ".md", ".css", ".conf", ".py", ".svg", ""]);
function preenche(texto, caminho) {
  for (const [de, para] of Object.entries(TROCAS)) texto = texto.replaceAll(de, para);
  // O modelo do vhost guarda o marcador: tools/gera-vhost.mjs preenche com o domínio de cada publicação.
  if (!caminho.endsWith("previa.modelo.conf")) texto = texto.replaceAll("{{DOMINIO}}", dominio);
  if (caminho.endsWith("rotas.js")) {
    texto = texto.replace("/*LOJA*/", flag("loja") ? REGRAS_LOJA : "").replace("/*LOJA-PAGINAS*/", flag("loja") ? PAGINAS_LOJA : "");
  }
  return texto;
}

const arquivos = (p) => readdirSync(p).flatMap((n) => { const c = join(p, n); return statSync(c).isDirectory() ? arquivos(c) : [c]; });
// --so-ferramentas: os testes, a publicação e os documentos, sem a casca nem o visual do kit.
const FERRAMENTAS = /^(tools[\\/](?!partes-da-casca|copia-guia)|deploy[\\/]|docs[\\/](ESTADO|INVENTARIO)\.md$)/;
const lista = arquivos(KIT).filter((c) => !soFerramentas || FERRAMENTAS.test(relative(KIT, c)));

if (!soFerramentas && existsSync(pasta) && readdirSync(pasta).some((n) => !["docs", ".git", ".gitignore", "README.md", ".claude"].includes(n))) {
  console.error(`A pasta ${pasta} já tem arquivos. Para só somar os testes num projeto existente, use --so-ferramentas.`);
  process.exit(1);
}

let criados = 0;
const pulados = [];
for (const origem of lista) {
  const rel = relative(KIT, origem);
  const destino = join(pasta, rel);
  if (existsSync(destino)) {
    pulados.push(rel);
    continue;
  }
  mkdirSync(dirname(destino), { recursive: true });
  if (TEXTO.has(extname(origem))) writeFileSync(destino, preenche(readFileSync(origem, "utf8"), rel));
  else copyFileSync(origem, destino);
  criados += 1;
}
console.log(`${criados} arquivos em ${pasta}${pulados.length ? `\nJá existiam, mantidos: ${pulados.join(", ")}` : ""}`);

if (soFerramentas) {
  // Soma os comandos no package.json do projeto, sem trocar nenhum que já exista.
  const pacote = join(pasta, "package.json");
  if (existsSync(pacote)) {
    const pj = JSON.parse(readFileSync(pacote, "utf8"));
    const kit = JSON.parse(readFileSync(join(KIT, "package.json"), "utf8")).scripts;
    const novos = ["testa", "testa:estados", "testa:fluxos", "testa:detectores", "pendencias"].filter((n) => !pj.scripts?.[n]);
    pj.scripts = { ...pj.scripts, ...Object.fromEntries(novos.map((n) => [n, kit[n]])) };
    writeFileSync(pacote, JSON.stringify(pj, null, 2) + "\n");
    console.log(`Comandos somados ao package.json: ${novos.join(", ") || "nenhum"}`);
  }
  console.log(`\nFalta: editar tools/testes.config.mjs com as páginas e os estados do projeto (login em ANTES), adaptar tools/testa-fluxos.mjs aos seletores dele e rodar com SITE_BASE=<endereço do servidor local>.`);
  process.exit(0);
}

if (!flag("sem-instalar")) {
  const r = spawnSync("npm install --no-audit --no-fund", { cwd: pasta, stdio: "inherit", shell: true });
  if (r.status !== 0) console.error("O npm install falhou: rode de novo na pasta do projeto.");
}

console.log(`
Pronto. Próximos passos:
  cd "${pasta}"
  npm run dev                      deixar no ar: http://127.0.0.1:${porta}/ é o link que o usuário acompanha
  docs/ESTADO.md                   blocos, decisões e pendências
  docs/guia/index.html             o padrão visual, antes da primeira seção
  src/css/marca.css                tokens e componentes: vem em cinza até a marca entrar
  tools/testes.config.mjs          páginas e estados que os testes abrem
  npm run pendencias               o que ainda está [[provisório]]`);
