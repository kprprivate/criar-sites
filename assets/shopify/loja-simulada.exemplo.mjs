// EXEMPLO (site da Bevi, out/2026; ver references/shopify-por-script.md). Adaptar: a leitura do catálogo do site
// (aqui, src/js/catalogo.js, com SABORES e KIT), os nomes dos produtos e as rotas de páginas. Precisa do liquidjs.
// LOJA SIMULADA: o tema gerado (theme/, npm run tema) rodando no computador, sem a loja. Renderiza os templates
// .liquid com o liquidjs e objetos de mentira da Shopify (os seis produtos com o retrato do catalogo.js, carrinho na
// memória, rotas, configurações) e imita a API de carrinho (/cart.js, /cart/add.js, /cart/change.js), o formulário de
// cliente e de contato (/contact) e o checkout (uma página que lista o carrinho).
// Serve para testar o modo loja do JS (sacola, preço, estoque, avise-me, kit) antes do acesso à loja. Não é a Shopify:
// o Liquid e a API de verdade só se confirmam no tema não publicado.
//   npm run loja                      porta 5180; Mate com 20 de estoque, Hibisco e Verde esgotados, sem o kit
//   npm run loja -- --com-kit         com o produto kit-experimenta
//   npm run loja -- --estoque mate=3  outro estoque (para ver o aviso de estoque da loja)
import { createServer } from "node:http";
import { statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { Liquid, Tag, Hash, evalToken } from "liquidjs";

const RAIZ = resolve(import.meta.dirname, "..");
const TEMA = join(RAIZ, "theme");
const args = process.argv.slice(2);
const opcao = (nome) => {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : null;
};
const PORTA = Number(opcao("--porta") || 5180);
const COM_KIT = args.includes("--com-kit");
const ESTOQUE = Object.fromEntries((opcao("--estoque") || "mate=20").split(",").map((par) => par.split("=")).map(([k, v]) => [k, Number(v)]));

// o catálogo do site (retrato da loja em 24/10/2026) faz o papel do admin
globalThis.window = {};
const { SABORES, KIT } = await import("../src/js/catalogo.js");

// ── produtos: cada sabor é dois produtos, como na loja (lata avulsa e pack com 6), com uma variante cada ──
const produtos = {};
const variantes = new Map();
function produto(handle, titulo, variante, centavos, chave, disponivel) {
  const estoque = disponivel ? (ESTOQUE[chave] ?? 20) : 0;
  const v = { id: Number(variante), price: centavos, available: estoque > 0, sku: handle.toUpperCase(), estoque };
  const p = {
    id: Number(variante) + 1,
    chave,
    handle,
    title: titulo,
    url: `/products/${handle}`,
    description: `<p>${titulo}: 25 g de proteína, zero açúcar, 355 ml.</p>`,
    price: centavos,
    available: v.available,
    featured_image: null,
    selected_or_first_available_variant: v,
  };
  produtos[handle] = p;
  variantes.set(v.id, { produto: p, variante: v });
}
for (const s of SABORES) {
  produto(s.handle, `Protein Tea 25g ${s.nome} e ${s.par}`, s.avulsa.variante, s.avulsa.centavos, s.chave, s.avulsa.disponivel);
  produto(s.handlePack, `Pack 6 Chá ${s.nome} ${s.par}`, s.variante, s.centavos, s.chave, s.disponivel);
}
if (COM_KIT) produto(KIT.handle, "Kit Experimenta", "99000000000001", KIT.centavos, "kit", true);

// ── carrinho na memória (uma visita só: é um teste) ──
let itens = [];
const cadastros = [];
function carrinhoJson() {
  const total = itens.reduce((soma, item) => soma + item.final_line_price, 0);
  return {
    token: "simulado",
    note: null,
    attributes: {},
    items: itens,
    item_count: itens.reduce((soma, item) => soma + item.quantity, 0),
    total_price: total,
    items_subtotal_price: total,
    original_total_price: total,
    total_discount: 0,
    currency: "BRL",
    requires_shipping: itens.length > 0,
  };
}
function linha(id, quantidade) {
  const { produto: p, variante: v } = variantes.get(id);
  return {
    key: `${id}:simulado`,
    id,
    variant_id: id,
    product_id: p.id,
    handle: p.handle,
    url: `${p.url}?variant=${id}`,
    product_title: p.title,
    variant_title: null,
    title: p.title,
    quantity: quantidade,
    price: v.price,
    original_price: v.price,
    line_price: v.price * quantidade,
    original_line_price: v.price * quantidade,
    final_price: v.price,
    final_line_price: v.price * quantidade,
    properties: {},
  };
}
const erroDeCarrinho = (status, description) => ({ status, corpo: { status, message: "Cart Error", description } });
function mudarQuantidade(id, quantidade, somar) {
  const achado = variantes.get(Number(id));
  if (!achado) return erroDeCarrinho(404, "Produto não encontrado.");
  const atual = itens.find((item) => item.variant_id === Number(id));
  const nova = somar ? (atual?.quantity || 0) + quantidade : quantidade;
  if (!achado.variante.available && nova > 0) return erroDeCarrinho(422, `${achado.produto.title} está esgotado.`);
  if (nova > achado.variante.estoque) return erroDeCarrinho(422, `Você não pode adicionar mais ${achado.produto.title} ao carrinho: só temos ${achado.variante.estoque}.`);
  if (nova <= 0) itens = itens.filter((item) => item !== atual);
  else if (atual) Object.assign(atual, linha(Number(id), nova));
  else itens.push(linha(Number(id), nova));
  return null;
}

// ── Liquid: filtros e a tag form da Shopify ──
const motor = new Liquid({ root: [join(TEMA, "templates"), join(TEMA, "layout")], extname: ".liquid", cache: false });
// a versão muda quando o arquivo muda (como na Shopify): depois de `npm run tema`, o navegador não usa o antigo
motor.registerFilter("asset_url", (nome) => `/assets/${nome}?v=${Math.round(statSync(join(TEMA, "assets", nome)).mtimeMs)}`);
motor.registerFilter("stylesheet_tag", (url) => `<link href="${url}" rel="stylesheet" type="text/css" media="all" />`);
motor.registerFilter("image_url", (imagem) => imagem?.src || "");
motor.registerFilter("default_errors", (erros) => `<div class="errors"><ul>${[].concat(erros?.messages || erros || []).map((m) => `<li>${m}</li>`).join("")}</ul></div>`);

class TagForm extends Tag {
  constructor(token, restantes, liquid, parser) {
    super(token, restantes, liquid);
    this.tipo = this.tokenizer.readValue();
    this.atributos = new Hash(this.tokenizer);
    this.miolo = [];
    while (restantes.length) {
      const proximo = restantes.shift();
      if (proximo.name === "endform") return;
      this.miolo.push(parser.parseToken(proximo, restantes));
    }
    throw new Error(`tag ${token.getText()} sem endform`);
  }
  *render(ctx, emissor) {
    const tipo = yield evalToken(this.tipo, ctx);
    const atributos = yield this.atributos.render(ctx);
    const postou = ctx.getSync(["request_query"])?.[`${tipo}_posted`] === "true";
    ctx.push({ form: { "posted_successfully?": postou, errors: null, email: "", name: "", phone: "", body: "" } });
    const html = yield this.liquid.renderer.renderTemplates(this.miolo, ctx);
    ctx.pop();
    const attrs = Object.entries(atributos)
      .map(([k, v]) => (v === "" ? ` ${k}` : ` ${k}="${v}"`))
      .join("");
    emissor.write(
      `<form method="post" action="/contact${atributos.id ? `#${atributos.id}` : ""}" accept-charset="UTF-8"${attrs}><input type="hidden" name="form_type" value="${tipo}" /><input type="hidden" name="utf8" value="✓" />${html}</form>`,
    );
  }
}
motor.registerTag("form", TagForm);

// ── páginas ──
function rota(url) {
  const caminho = url.pathname.replace(/\/$/, "") || "/";
  const pagina = caminho.match(/^\/pages\/([\w-]+)$/);
  const handle = caminho.match(/\/products\/([\w-]+)$/)?.[1];
  if (caminho === "/") return { modelo: "index", nome: "index", titulo: "Bevi Pro" };
  // política: a Shopify desenha o miolo sem template (aqui, um texto de exemplo)
  if (caminho.startsWith("/policies/"))
    return { politica: true, nome: null, titulo: "Política de privacidade", miolo: '<div class="shopify-policy__container"><div class="shopify-policy__title"><h1>Política de privacidade</h1></div><div class="shopify-policy__body"><div class="rte"><p>Texto da política escrito na loja.</p><h2>Dados</h2><ul><li>um item</li><li>outro item</li></ul></div></div></div>' };
  if (handle && produtos[handle]) return { modelo: "product", nome: "product", titulo: produtos[handle].title, product: produtos[handle] };
  if (caminho === "/collections" ) return { modelo: "list-collections", nome: "list-collections", titulo: "Coleções" };
  if (/^\/collections\/[\w-]+$/.test(caminho)) return { modelo: "collection", nome: "collection", titulo: "Todos os produtos" };
  if (caminho === "/cart") return { modelo: "cart", nome: "cart", titulo: "Sua sacola" };
  if (caminho === "/search") return { modelo: "search", nome: "search", titulo: "Busca" };
  if (pagina?.[1] === "contact" || pagina?.[1] === "fale-com-a-bevi")
    return { modelo: "page.contact", nome: "page", sufixo: "contact", titulo: "Fale com a Bevi", page: { title: "Fale com a Bevi", handle: pagina[1], content: "<p>Dúvida, pedido ou parceria: escreva para a gente. Respondemos em até um dia útil.</p>" } };
  if (pagina) return { modelo: "page", nome: "page", titulo: pagina[1], page: { title: "Perguntas frequentes", handle: pagina[1], content: "<p>Texto da página escrito na loja.</p><h2>Um subtítulo</h2><p>Com <a href='/'>um link</a> e uma lista:</p><ul><li>um item</li><li>outro item</li></ul>" } };
  return { modelo: "404", nome: "404", titulo: "Página não encontrada", status: 404 };
}

async function renderizar(url) {
  const r = rota(url);
  const termos = url.searchParams.get("q") || "";
  const resultados = termos ? Object.values(produtos).filter((p) => p.title.toLowerCase().includes(termos.toLowerCase())).map((p) => ({ title: p.title, url: p.url, content: p.description })) : [];
  const ctx = {
    template: { name: r.nome, suffix: r.sufixo || null },
    request: { page_type: r.politica ? "policy" : r.nome },
    request_query: Object.fromEntries(url.searchParams),
    all_products: produtos,
    product: r.product,
    page: r.page,
    cart: { ...carrinhoJson(), currency: { iso_code: "BRL" }, toJSON: carrinhoJson },
    settings: { frete_gratis_ativo: true, frete_gratis_valor: 149.9 },
    routes: { root_url: "/", cart_url: "/cart", account_url: "/account", search_url: "/search" },
    shop: { name: "Bevi Pro" },
    page_title: r.titulo,
    page_description: "",
    page_image: null,
    canonical_url: `http://localhost:${PORTA}${url.pathname}`,
    search: { performed: Boolean(termos), terms: termos, results: resultados, results_count: resultados.length },
    blog: { title: "Blog", articles: [] },
    content_for_header: '<script>window.Shopify = { routes: { root: "/" }, designMode: false };</script>',
  };
  // o nome completo: "page.contact" sem a extensão seria lido como um arquivo .contact
  const miolo = r.politica ? r.miolo : await motor.renderFile(`${r.modelo}.liquid`, ctx);
  const html = await motor.renderFile("theme.liquid", { ...ctx, content_for_layout: miolo });
  return { status: r.status || 200, html };
}

// ── servidor ──
const TIPOS = { ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".mp4": "video/mp4", ".json": "application/json" };
const corpo = (req) => new Promise((ok) => {
  let dados = "";
  req.on("data", (pedaco) => (dados += pedaco));
  req.on("end", () => ok(dados));
});
const json = (res, status, dados) => {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(dados));
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORTA}`);
  try {
    if (url.pathname.startsWith("/assets/")) {
      const arquivo = join(TEMA, "assets", decodeURIComponent(url.pathname.slice(8)));
      const dados = await readFile(arquivo);
      res.writeHead(200, { "Content-Type": TIPOS[extname(arquivo)] || "application/octet-stream", "Content-Length": dados.length, "Cache-Control": "no-cache" });
      res.end(dados);
      return;
    }
    if (url.pathname === "/cart.js") return json(res, 200, carrinhoJson());
    if (req.method === "POST" && (url.pathname === "/cart/add.js" || url.pathname === "/cart/change.js")) {
      const pedido = JSON.parse((await corpo(req)) || "{}");
      if (url.pathname === "/cart/add.js") {
        for (const item of pedido.items || [pedido]) {
          const erro = mudarQuantidade(item.id, Number(item.quantity || 1), true);
          if (erro) return json(res, erro.status, erro.corpo);
        }
        return json(res, 200, { items: itens });
      }
      const id = String(pedido.id).split(":")[0];
      const erro = mudarQuantidade(id, Number(pedido.quantity), false);
      if (erro) return json(res, erro.status, erro.corpo);
      return json(res, 200, carrinhoJson());
    }
    if (req.method === "POST" && url.pathname === "/contact") {
      const dados = new URLSearchParams(await corpo(req));
      cadastros.push(Object.fromEntries(dados));
      console.log("cadastro:", Object.fromEntries(dados));
      const volta = new URL(req.headers.referer || `http://localhost:${PORTA}/`);
      volta.searchParams.set(`${dados.get("form_type")}_posted`, "true");
      res.writeHead(302, { Location: volta.pathname + volta.search });
      res.end();
      return;
    }
    // atalhos dos testes: o estado (carrinho e cadastros), esvaziar o carrinho e mudar o estoque (/__loja/estoque?mate=2)
    if (url.pathname === "/__loja") return json(res, 200, { carrinho: carrinhoJson(), cadastros });
    if (url.pathname === "/__loja/limpar") {
      itens = [];
      cadastros.length = 0;
      return json(res, 200, { ok: true });
    }
    if (url.pathname === "/__loja/estoque") {
      for (const [chave, valor] of url.searchParams) {
        ESTOQUE[chave] = Number(valor);
        for (const { produto: p, variante: v } of variantes.values())
          if (p.chave === chave) {
            v.estoque = Number(valor);
            v.available = v.estoque > 0;
            p.available = v.available;
          }
      }
      return json(res, 200, { estoque: ESTOQUE });
    }
    if (url.pathname === "/checkout") {
      const c = carrinhoJson();
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<!doctype html><meta charset="utf-8"><title>Checkout simulado</title><h1>Checkout simulado</h1><ul data-checkout>${c.items.map((i) => `<li data-variante="${i.variant_id}">${i.quantity} × ${i.product_title}: R$ ${(i.final_line_price / 100).toFixed(2)}</li>`).join("")}</ul><p data-total>Total: R$ ${(c.total_price / 100).toFixed(2)}</p>`);
      return;
    }
    const { status, html } = await renderizar(url);
    // a página sempre nova: o tema muda a cada `npm run tema`
    res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(html);
  } catch (erro) {
    console.error(erro);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(String(erro.stack || erro));
  }
}).listen(PORTA, () => console.log(`loja simulada em http://localhost:${PORTA}${COM_KIT ? " (com o kit)" : ""}; estoque: ${JSON.stringify(ESTOQUE)}`));
