// Retrato de uma loja Shopify em JSON, pelos endereços públicos, devagar para respeitar o limite dela. Só para projeto de loja.
//   node tools/loja-retrato.mjs https://loja.com.br [pasta: docs/loja] [--colecoes] [--paginas N]
// Sai produtos.json e colecoes.json; com --colecoes, também quem está em cada coleção (uma chamada por página de coleção).
// Dados reais desde o primeiro bloco: o catálogo do site nasce daqui, com a data do retrato anotada no estado do projeto.
// Usa curl, com nome de cliente próprio: já vimos loja responder 429 ao fetch do Node e 200 ao curl. Se a loja insistir em 429, é limite: esperar e voltar mais tarde.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const valor = (n, d) => (args.includes(`--${n}`) ? Number(args[args.indexOf(`--${n}`) + 1]) : d);
const loja = args[0]?.replace(/\/$/, "");
const posicionais = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--paginas");
const pasta = posicionais[1] || "docs/loja";
const maxPaginas = valor("paginas", 200);
const ESPERA = 7000;
if (!loja) {
  console.error("Uso: node tools/loja-retrato.mjs https://loja.com.br [pasta] [--colecoes] [--paginas N]");
  process.exit(1);
}
const dorme = (ms) => new Promise((r) => setTimeout(r, ms));
let primeira = true;

async function json(url) {
  if (!primeira) await dorme(ESPERA);
  primeira = false;
  for (let tentativa = 0; tentativa < 3; tentativa += 1) {
    const r = spawnSync("curl", ["-s", "-A", "site-build", "-H", "accept: application/json", "-w", "\n%{http_code}", url], { encoding: "utf8", maxBuffer: 1 << 29 });
    if (r.error) throw new Error(`Não consegui rodar o curl: ${r.error.message}`);
    const fim = r.stdout.lastIndexOf("\n");
    const status = Number(r.stdout.slice(fim + 1));
    if (status === 200) return JSON.parse(r.stdout.slice(0, fim));
    if (status !== 429) throw new Error(`${url}: status ${status}`);
    console.log("A loja pediu calma (429). Esperando um minuto e meio.");
    await dorme(90000);
  }
  throw new Error(`${url}: a loja continua limitando. Tente mais tarde.`);
}

async function todas(caminho, chave) {
  const lista = [];
  for (let p = 1; p <= maxPaginas; p += 1) {
    const d = await json(`${loja}${caminho}${caminho.includes("?") ? "&" : "?"}limit=250&page=${p}`);
    lista.push(...d[chave]);
    console.log(`${caminho} página ${p}: ${d[chave].length}`);
    if (d[chave].length < 250) break;
  }
  return lista;
}

mkdirSync(pasta, { recursive: true });
const produtos = await todas("/products.json", "products");
writeFileSync(join(pasta, "produtos.json"), JSON.stringify(produtos));
const colecoes = await todas("/collections.json", "collections");
writeFileSync(join(pasta, "colecoes.json"), JSON.stringify(colecoes));
if (flag("colecoes")) {
  const membros = {};
  for (const c of colecoes) {
    membros[c.handle] = (await todas(`/collections/${c.handle}/products.json`, "products")).map((p) => p.handle);
  }
  writeFileSync(join(pasta, "membros.json"), JSON.stringify(membros));
}
console.log(`${produtos.length} produtos e ${colecoes.length} coleções em ${pasta}, em ${new Date().toLocaleDateString("pt-BR")}.`);
