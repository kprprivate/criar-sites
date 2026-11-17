// Lista de lado sem barra: no toque, desliza; com mouse, setas. Sem elas, em janela estreita com mouse não haveria como rolar.
// HTML: <div data-lista-lado>...</div> seguido de <div class="lista-lado__setas" data-setas>, com os dois botões.
// Cada clique anda um cartão; o encaixe acerta a parada. Nos extremos, a seta apaga, mas fica no Tab e o foco não se perde.
export function iniciaListasDeLado() {
  const comMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
  document.querySelectorAll("[data-lista-lado]").forEach((lista) => {
    const setas = lista.nextElementSibling?.matches("[data-setas]") ? lista.nextElementSibling : null;
    if (!setas) return;
    const [volta, vai] = setas.querySelectorAll("button");
    const passo = () => {
      const a = lista.children[0]?.getBoundingClientRect();
      const b = lista.children[1]?.getBoundingClientRect();
      return a && b ? b.left - a.left : lista.clientWidth * 0.8;
    };
    const confere = () => {
      const rola = lista.scrollWidth > lista.clientWidth + 1;
      setas.toggleAttribute("data-ligadas", comMouse.matches && rola);
      volta.setAttribute("aria-disabled", lista.scrollLeft <= 1 ? "true" : "false");
      vai.setAttribute("aria-disabled", lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 1 ? "true" : "false");
    };
    volta.addEventListener("click", () => lista.scrollBy({ left: -passo(), behavior: "smooth" }));
    vai.addEventListener("click", () => lista.scrollBy({ left: passo(), behavior: "smooth" }));
    lista.addEventListener("scroll", confere, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(confere).observe(lista);
    confere();
  });
}
