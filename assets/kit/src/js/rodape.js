// O rodapé que sobe por cima da última seção, o botão de voltar ao topo e a pausa de todas as animações automáticas.
export function iniciaRodape() {
  const rodape = document.querySelector("[data-rodape]");
  const main = document.querySelector("main");
  if (rodape && main) {
    const ultima = main.querySelector(":scope > :last-child");
    if (ultima) ultima.classList.add("ultima-secao");
    const raiz = document.documentElement;
    const mede = () => {
      if (ultima) raiz.style.setProperty("--ultima-h", `${ultima.offsetHeight}px`);
      raiz.style.setProperty("--rodape-h", `${rodape.offsetHeight}px`);
    };
    mede();
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(mede);
      ro.observe(rodape);
      if (ultima) ro.observe(ultima);
    }
    window.addEventListener("resize", mede);
    raiz.classList.add("rodape-sobe");
  }
  iniciaTopo();
  iniciaPausa();
}

function iniciaTopo() {
  const topo = document.querySelector("[data-topo]");
  const caixa = document.querySelector("[data-flutuantes]");
  if (!topo || !caixa) return;
  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
  const confere = () => {
    caixa.toggleAttribute("data-topo-visivel", window.scrollY > window.innerHeight * 0.6);
  };
  confere();
  window.addEventListener("scroll", confere, { passive: true });
  topo.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.LENIS) window.LENIS.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduzido.matches ? "auto" : "smooth" });
    // Pelo teclado, o foco vai para o começo da página. No clique do mouse, não mostra foco.
    if (e.detail === 0) document.querySelector(".pular")?.focus({ preventScroll: true });
  });
}

// As faixas e o que muda sozinho param aqui. Vale para o site todo e fica guardado.
function iniciaPausa() {
  const bt = document.querySelector("[data-pausa]");
  if (!bt) return;
  const raiz = document.documentElement;
  const desenha = () => {
    const parado = raiz.classList.contains("parado");
    bt.textContent = parado ? "Retomar animações" : "Pausar animações";
    bt.setAttribute("aria-pressed", parado ? "true" : "false");
  };
  desenha();
  bt.addEventListener("click", () => {
    const parado = raiz.classList.toggle("parado");
    try {
      localStorage.setItem("site:parado", parado ? "1" : "0");
    } catch {
      /* vale só nesta visita */
    }
    desenha();
    document.dispatchEvent(new CustomEvent("site:pausa", { detail: { parado } }));
  });
}
