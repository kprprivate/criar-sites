// Menu do celular: tela inteira em <dialog>. As palavras caem em cascata; o X nasce das duas linhas do botão.
import { ligaDialogo } from "./dialogo.js";

export function iniciaMenu() {
  const gaveta = document.querySelector("[data-gaveta]");
  const abre = document.querySelector("[data-gaveta-abre]");
  if (!gaveta || !abre) return;
  const fechaBt = gaveta.querySelector("[data-gaveta-fecha]");
  const menu = ligaDialogo(gaveta, {
    gatilhos: [abre],
    fechadores: [fechaBt],
    aoAbrir: () => requestAnimationFrame(() => fechaBt.classList.add("burger--x")),
    aoFechar: () => fechaBt.classList.remove("burger--x"),
  });
  // Se a janela crescer até o tamanho do computador, o menu do celular não fica aberto por trás. 1240 px: o mesmo número de casca.css.
  window.matchMedia("(min-width: 1241px)").addEventListener("change", (e) => {
    if (e.matches) menu?.fechar(false);
  });
}
