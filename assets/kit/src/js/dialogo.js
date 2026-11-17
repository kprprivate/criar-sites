// Abre e fecha um <dialog> (menu, gaveta, busca, zoom) do jeito certo, num lugar só:
// - foco no próprio painel, nunca no X: no iPhone, o X ganharia contorno ao abrir pelo toque;
// - rolagem parada enquanto está aberto (só overflow não segura o Lenis);
// - saída animada com data-saindo (no CSS: .x[data-saindo] { ... }), direta com movimento reduzido;
// - Esc faz a mesma saída; fechado por um link interno, o foco não volta, para não desfazer o pulo para a seção.
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

export function ligaDialogo(dialogo, { gatilhos = [], fechadores = [], saida = 380, aoAbrir, aoFechar } = {}) {
  if (!dialogo?.showModal) return null;
  let quemAbriu = null;

  const abrir = (origem) => {
    if (dialogo.open) return;
    quemAbriu = origem || null;
    dialogo.removeAttribute("data-saindo");
    dialogo.showModal();
    gatilhos.forEach((g) => g.setAttribute("aria-expanded", "true"));
    window.LENIS?.stop();
    dialogo.focus({ preventScroll: true });
    aoAbrir?.();
  };

  const fechar = (devolveFoco = true) => {
    if (!dialogo.open || dialogo.hasAttribute("data-saindo")) return;
    gatilhos.forEach((g) => g.setAttribute("aria-expanded", "false"));
    window.LENIS?.start();
    aoFechar?.();
    const termina = () => {
      dialogo.removeAttribute("data-saindo");
      dialogo.close();
      if (devolveFoco) quemAbriu?.focus({ preventScroll: true });
    };
    if (reduzido.matches || !saida) return termina();
    dialogo.setAttribute("data-saindo", "");
    setTimeout(termina, saida);
  };

  gatilhos.forEach((g) => g.addEventListener("click", () => abrir(g)));
  fechadores.forEach((f) => f.addEventListener("click", () => fechar()));
  dialogo.addEventListener("cancel", (e) => {
    e.preventDefault();
    fechar();
  });
  dialogo.addEventListener("close", () => {
    gatilhos.forEach((g) => g.setAttribute("aria-expanded", "false"));
    aoFechar?.();
  });
  dialogo.addEventListener("click", (e) => {
    if (e.target.closest?.("a")) fechar(false);
  });
  return { abrir, fechar };
}
