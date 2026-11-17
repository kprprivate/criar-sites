// Cada módulo começa isolado: um erro em um não derruba os outros.
import "./lenis-global.js";
import "./marca.js";
import { ligaSanfonas } from "./abas.js";
import { iniciaHeader } from "./header.js";
import { iniciaListasDeLado } from "./lista-lado.js";
import { iniciaMenu } from "./menu.js";
import { iniciaFaixas } from "./faixa.js";
import { iniciaRevela } from "./revela.js";
import { iniciaRodape } from "./rodape.js";

for (const inicia of [iniciaRevela, iniciaHeader, iniciaMenu, iniciaRodape, iniciaFaixas, iniciaListasDeLado, ligaSanfonas]) {
  try {
    inicia();
  } catch (erro) {
    console.error(erro);
  }
}

// O navegador pode fechar um <dialog> no Esc sem avisar antes (sem o evento cancel). Qualquer que seja o caminho,
// quando não sobra nenhum aberto, a rolagem volta.
document.addEventListener(
  "close",
  (e) => {
    if (e.target instanceof HTMLDialogElement) {
      e.target.removeAttribute("data-saindo");
      if (!document.querySelector("dialog[open]")) window.LENIS?.start();
    }
  },
  true,
);

// O código de cada página só vem quando ela precisa: <body data-pagina="home"> carrega home.js.
const CARREGA = {
  home: () => import("./home.js"),
};
const pagina = document.body.dataset.pagina;
if (CARREGA[pagina]) {
  CARREGA[pagina]()
    .then((m) => m.inicia?.())
    .catch((erro) => console.error(erro));
}
