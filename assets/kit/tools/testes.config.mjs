// O que os testes abrem. Página ou estado novo entra aqui, no mesmo bloco em que for construído.
import { dorme } from "./olhar.mjs";

// [nome: endereço]. Todas as páginas, como abrem.
export const PAGINAS = {
  home: "/",
  sobre: "/sobre",
  erro404: "/nada-aqui",
};

// Endereços que o site publicado precisa responder com 200 (confere-publicado.mjs testa com e sem barra no fim).
export const ENDERECOS = ["/", "/sobre"];

// [nome da página: seletor da ação principal]. Precisa estar à vista sem rolar em todas as janelas.
export const ACOES = {
  home: "[data-acao-principal]",
};

export const JANELAS = ["360x740", "390x844", "600x900", "1100x800", "1280x720", "1366x700", "1440x900", "1920x1080"];
export const JANELAS_ESTADOS = ["360x740", "390x844", "600x900", "1100x800", "1366x700", "1920x1080"];

// O que pode passar da largura de propósito: fotos que sangram, trilhos (seletor CSS).
export const SANGRIA = "";

// A barra de rolagem nunca aparece em site de marca. Em painel ou ferramenta, pode ser false.
export const BARRA_ESCONDIDA = true;

// Limpa o localStorage antes de cada estado. Com login guardado lá, false, e cada estado limpa só o que precisar.
export const LIMPA_ARMAZENAMENTO = true;

// Roda uma vez por janela, antes de tudo. Bom para pular uma abertura de primeira visita:
//   await j.ir("/sobre", { espera: 100 }); await j.ev(`sessionStorage.setItem("site:abertura", "1")`);
// Sistema com login: entrar aqui com um usuário de teste, nunca com dados reais.
export const ANTES = async () => {};

const clica = (j, sel) => j.ev(`document.querySelector(${JSON.stringify(sel)})?.click()`);

// O que só aparece depois de interagir: etapas de formulário, erros, gavetas, filtros, listas vazias, zoom.
// [nome, endereço (null = o roteiro navega), o que fazer lá]. Antes de cada um, o localStorage é limpo.
export const ESTADOS = [
  ["menu", "/", async (j) => { if (j.w <= 1240) { await clica(j, "[data-gaveta-abre]"); await dorme(800); } }],
  ["painel", "/", async (j) => { if (j.w > 1240) { await clica(j, "[data-painel-abre]"); await dorme(800); } }],
  ["aba-2", "/", async (j) => { await j.ate("[role=tablist]"); await clica(j, '[role=tab]:nth-child(2)'); await dorme(400); }],
  ["fim-da-pagina", "/", async (j) => { await j.rola(await j.ev("document.documentElement.scrollHeight")); await dorme(900); }],
];
