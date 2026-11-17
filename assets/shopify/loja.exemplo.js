// EXEMPLO (site da Bevi, out/2026; ver references/shopify-por-script.md): a ponte do JS do site com a loja.
// O mesmo código roda no site local (sem window.BEVI) e no tema (com window.BEVI posto pelo layout).
// A LOJA: no tema Shopify, o layout (tools/gen-tema.py) põe em window.BEVI o endereço dos arquivos no CDN, o catálogo
// real (variante, preço e estoque de cada produto, pelo handle), o carrinho da visita e as configurações da loja. No
// site local, window.BEVI não existe e tudo segue com o retrato do catálogo (catalogo.js) e a sacola simulada.

const BEVI = window.BEVI || null;

export const naLoja = Boolean(BEVI?.shopify);
export const dadosDaLoja = BEVI;

// caminho de arquivo estático. No Vite, o próprio caminho (/img/cans/x.webp, servido de public/). No tema, os arquivos
// ficam achatados em assets/ (img-cans-x.webp), no CDN da loja.
export const asset = (caminho) => (BEVI?.assets ? BEVI.assets + caminho.replace(/^\//, "").replaceAll("/", "-") : caminho);

// a raiz das rotas da loja (/, ou /en/ em outro idioma); a API de carrinho mora nela
export const rotaDaLoja = (caminho) => (window.Shopify?.routes?.root || "/") + caminho.replace(/^\//, "");
