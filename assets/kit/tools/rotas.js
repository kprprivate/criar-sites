// Os mesmos endereços do destino, no servidor local e na prévia: tools/gera-vhost.mjs escreve estas regras no nginx.
// Sem regra nenhuma, /sobre e /sobre/ já caem em sobre.html. Só listar aqui o que foge disso.
import { existsSync } from "node:fs";
import { join } from "node:path";

// [expressão do caminho, sem barra no fim; página]. A primeira que casar vale.
export const REGRAS = [
/*LOJA*/
];

// /pages/<endereço> → <página>.html. Vários endereços podem levar à mesma página.
export const PAGINAS = {
/*LOJA-PAGINAS*/
};

// Devolve o .html de um endereço, ou null se nenhuma regra fala dele.
export function destino(caminho) {
  const limpo = caminho.replace(/\/+$/, "") || "/";
  for (const [re, pagina] of REGRAS) if (re.test(limpo)) return pagina;
  const pagina = limpo.match(/^\/pages\/([^/]+)$/);
  if (pagina && Object.keys(PAGINAS).length) return PAGINAS[pagina[1]] ? `/${PAGINAS[pagina[1]]}.html` : "/404.html";
  return null;
}

const INTERNO = /^\/(@|src\/|node_modules\/)/;

// No servidor local, o guia (docs/guia/) lê o marca.css e o marca.js direto de src/: abre em /docs/guia/ e muda junto com o
// site, sem `npm run guia`. A cópia só é precisa para levar o guia para fora desta máquina.
const GUIA_VIVO = { "/docs/guia/marca.css": "/src/css/marca.css", "/docs/guia/marca.js": "/src/js/marca.js" };

function reescreve(raiz, vivo = false) {
  return (req, res, next) => {
    const [caminho, resto] = (req.url || "").split("?");
    const q = resto ? `?${resto}` : "";
    if (vivo && GUIA_VIVO[caminho]) {
      req.url = GUIA_VIVO[caminho] + q;
      return next();
    }
    const alvo = destino(caminho);
    if (alvo) {
      req.url = alvo + q;
      return next();
    }
    const pedePagina = req.headers.accept?.includes("text/html");
    if (pedePagina && caminho !== "/" && !INTERNO.test(caminho) && !/\.[a-z0-9]+$/i.test(caminho)) {
      const limpo = caminho.replace(/\/+$/, "");
      if (existsSync(join(raiz, `${limpo}.html`))) req.url = `${limpo}.html${q}`;
      else if (existsSync(join(raiz, limpo, "index.html"))) req.url = `${limpo}/index.html${q}`;
      else req.url = "/404.html";
    }
    next();
  };
}

export function rotas() {
  return {
    name: "rotas",
    configureServer(server) {
      server.middlewares.use(reescreve(process.cwd(), true));
    },
    configurePreviewServer(server) {
      server.middlewares.use(reescreve(join(process.cwd(), "dist")));
    },
  };
}
