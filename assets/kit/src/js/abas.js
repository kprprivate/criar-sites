// Abas no padrão acessível: setas, Home e End trocam de aba; tabindex móvel. onTroca recebe o índice escolhido.
export function ligaAbas(lista, { onTroca, ativar = 0 } = {}) {
  const abas = [...lista.querySelectorAll('[role="tab"]')];
  if (!abas.length) return null;
  const escolhe = (i, foco = false) => {
    abas.forEach((a, k) => {
      const sim = k === i;
      a.setAttribute("aria-selected", sim ? "true" : "false");
      a.tabIndex = sim ? 0 : -1;
      const painel = a.getAttribute("aria-controls") && document.getElementById(a.getAttribute("aria-controls"));
      if (painel) painel.hidden = !sim;
    });
    if (foco) abas[i].focus();
    onTroca?.(i, abas[i]);
  };
  abas.forEach((a, i) => {
    a.addEventListener("click", () => escolhe(i));
    a.addEventListener("keydown", (e) => {
      const n = abas.length;
      const mapa = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 };
      if (e.key in mapa) {
        e.preventDefault();
        escolhe(mapa[e.key], true);
      }
    });
  });
  escolhe(ativar);
  return { escolhe };
}

// Sanfona simples: abre com a altura medida. Só uma aberta por grupo, se pedir.
export function ligaSanfonas(raiz = document) {
  raiz.querySelectorAll("details[data-sanfona]").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      const grupo = d.closest("[data-sanfonas]");
      if (!grupo) return;
      grupo.querySelectorAll("details[data-sanfona][open]").forEach((o) => {
        if (o !== d) o.open = false;
      });
    });
  });
}
