// Faixas que aceleram com a rolagem: a velocidade muda no playbackRate, sem reiniciar a posição.
// Sem pausa no hover e sem botão próprio: a pausa é uma só, no rodapé. O trilho (data-faixa) repete o conteúdo duas vezes, para emendar em -50%.
const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

export function ligaFaixa(trilho, { segundos = 70 } = {}) {
  if (!trilho || reduzido.matches) return;
  const animacao = trilho.animate([{ transform: "translate3d(0,0,0)" }, { transform: "translate3d(-50%,0,0)" }], { duration: segundos * 1000, iterations: Infinity, easing: "linear" });
  const raiz = document.documentElement;
  const confere = () => {
    if (raiz.classList.contains("parado")) animacao.pause();
    else animacao.play();
  };
  confere();
  document.addEventListener("site:pausa", confere);

  let ultimoY = window.scrollY;
  let velocidade = 1;
  let visivel = false;
  new IntersectionObserver((es) => {
    visivel = es[0].isIntersecting;
    if (visivel) requestAnimationFrame(quadro);
  }).observe(trilho);
  function quadro() {
    if (!visivel) return;
    const y = window.scrollY;
    const delta = Math.abs(y - ultimoY);
    ultimoY = y;
    const alvo = 1 + Math.min(delta * 0.35, 9);
    velocidade += (alvo - velocidade) * 0.08;
    animacao.playbackRate = velocidade;
    requestAnimationFrame(quadro);
  }
}

export function iniciaFaixas() {
  document.querySelectorAll("[data-faixa]").forEach((t) => ligaFaixa(t, { segundos: Number(t.dataset.faixa) || 70 }));
}
