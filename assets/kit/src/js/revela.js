// Títulos e listas entram com calma quando chegam na tela. Só o que está abaixo da dobra: nada pisca ao carregar.
// Marque no HTML com data-entra, ou acrescente seletores aqui.
const ALVOS = "main section > h2, main .secao__cab > *, main [data-entra]";

export function iniciaRevela() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.setAttribute("data-visto", "");
        io.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -7% 0px" },
  );
  const dobra = window.innerHeight * 0.92;
  const vistos = new WeakMap();
  document.querySelectorAll(ALVOS).forEach((el) => {
    if (el.closest("dialog")) return;
    if (el.getBoundingClientRect().top < dobra) return;
    const pai = el.parentElement;
    const n = vistos.get(pai) || 0;
    vistos.set(pai, n + 1);
    el.style.setProperty("--r", String(Math.min(n, 6)));
    el.setAttribute("data-revela", "");
    io.observe(el);
  });
}
