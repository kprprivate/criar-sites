// Os gestos da marca e a rolagem. Sem módulos, para o guia (docs/guia) poder carregar o mesmo arquivo.
// Tudo funciona parado se o JS falhar. Com movimento reduzido, o estado muda direto.
(function () {
  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Os gestos: entram aqui na etapa do padrão visual ----------
     [[De três a cinco gestos nomeados. Cada um: de onde vem, como é, onde entra, limite, no toque.]]
     Regras de todos: respondem a mouse, foco de teclado e toque; o mouse só ativa com pointerType "mouse";
     nada fica preso depois do toque; um preenchimento termina completo. Receitas: references/padrao-visual.md. */
  function ligaGestos(raiz) {
    (raiz || document).querySelectorAll(".bt:not([disabled])").forEach(function (b) {
      if (b._gestoLigado) return;
      b._gestoLigado = true;
    });
  }

  /* ---------- Rolagem suave: Lenis, só com ponteiro fino. Configuração lida de um site de referência; não trocar sem pedido ---------- */
  function ligaLenis() {
    if (!window.Lenis || reduzido.matches) return null;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return null;
    var lenis = new window.Lenis({
      duration: 1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      wheelMultiplier: 1,
      autoRaf: true
    });
    // Um clique grande da roda é limitado a 100, senão vira salto.
    window.addEventListener("wheel", function (e) {
      if (e.target.closest && e.target.closest("dialog, [data-lenis-prevent]")) return;
      if (Math.abs(e.deltaY) > 100) {
        e.stopImmediatePropagation();
        e.preventDefault();
        lenis.scrollTo(lenis.targetScroll + Math.sign(e.deltaY) * 100, { duration: 1 });
      }
    }, { capture: true, passive: false });
    return lenis;
  }

  function inicia() {
    ligaGestos();
    window.LENIS = ligaLenis();
  }
  window.GESTOS = { ligaGestos: ligaGestos };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inicia);
  else inicia();
})();
