// O que é só da home. Modelo para o módulo de cada página.
import { ligaAbas } from "./abas.js";

export function inicia() {
  document.querySelectorAll("[role=tablist]").forEach((lista) => ligaAbas(lista));
}
