// A casca (cabeça, topo e fim da página) mora em src/casca e entra em todas as páginas no lugar dos comentários:
// <!--cabeca-->, <!--topo--> e <!--fim-->. Sem gerador nem cópias: mudar um arquivo muda o site inteiro.
// <!--sobre-heroi--> vira data-sobre-heroi quando a página tem abertura (data-heroi), para o header não piscar.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pasta = resolve(process.cwd(), "src/casca");

// O esqueleto de espera: nada carrega do nada. Tudo que o JS monta depois (cartões, a ficha de um produto, uma lista)
// já chega no HTML com a forma do que vem: <!--espera:cartao:8--> vira oito vezes src/casca/espera-cartao.html. O JS,
// ao montar, troca o conteúdo do mesmo container, e o esqueleto sai sozinho. Uma espera pode conter outra.
// Um gerador de tema (Shopify) precisa fazer a mesma troca nas páginas que copia.
const ESPERA = /<!--espera:([a-z-]+)(?::(\d+))?-->/g;
export function esperas(html) {
  for (let volta = 0; volta < 4 && html.includes("<!--espera:"); volta++) {
    html = html.replace(ESPERA, (_, nome, n) => readFileSync(resolve(pasta, `espera-${nome}.html`), "utf8").trim().repeat(Number(n || 1)));
  }
  return html;
}

export function partesDaCasca() {
  return {
    name: "partes-da-casca",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const temAbertura = html.includes("data-heroi");
        return esperas(html)
          .replace(/<!--(cabeca|topo|fim)-->/g, (_, nome) => readFileSync(resolve(pasta, `${nome}.html`), "utf8"))
          .replace("<!--sobre-heroi-->", temAbertura ? " data-sobre-heroi" : "");
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.replace(/\\/g, "/").includes("/src/casca/")) server.ws.send({ type: "full-reload" });
    },
  };
}
