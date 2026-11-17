// Header: invisível sobre a abertura, sólido fora dela. Some ao descer e volta ao subir. Painéis do menu com mouse, clique e teclado.
export function iniciaHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const heroi = document.querySelector("[data-heroi]");
  const cor = document.querySelector('meta[name="theme-color"]');
  const estilo = getComputedStyle(document.documentElement);

  // Só fica invisível no alto da página: mais abaixo, a foto clareia e o menu deixaria de ser lido.
  const noTopo = () => {
    const alto = window.scrollY < 24;
    header.toggleAttribute("data-sobre-heroi", alto && !!heroi);
    if (cor) cor.content = estilo.getPropertyValue(alto && heroi ? "--fundo-heroi" : "--fundo").trim();
  };
  noTopo();

  let ultimo = window.scrollY;
  let agendado = false;
  const confere = () => {
    agendado = false;
    noTopo();
    const y = window.scrollY;
    const delta = y - ultimo;
    if (Math.abs(delta) < 5) return;
    const longe = y > header.offsetHeight + 40;
    header.toggleAttribute("data-escondido", delta > 0 && longe);
    ultimo = y;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(confere);
    },
    { passive: true },
  );

  iniciaPaineis(header);
}

// Painéis do menu: abrem com o mouse depois de um instante, por clique e pelo teclado; Esc fecha.
function iniciaPaineis(header) {
  const botoes = [...header.querySelectorAll("[data-painel-abre]")];
  if (!botoes.length) return;
  const ATRASO_ABRE = 130;
  const ATRASO_FECHA = 220;
  const comMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
  let aberto = null;
  let tAbre;
  let tFecha;

  const painelDe = (b) => document.getElementById(b.getAttribute("aria-controls"));
  const fecha = () => {
    if (!aberto) return;
    aberto.setAttribute("aria-expanded", "false");
    painelDe(aberto).removeAttribute("data-aberto");
    aberto = null;
    header.removeAttribute("data-aberto");
  };
  const abre = (b) => {
    if (aberto === b) return;
    if (aberto) {
      aberto.setAttribute("aria-expanded", "false");
      painelDe(aberto).removeAttribute("data-aberto");
    }
    aberto = b;
    b.setAttribute("aria-expanded", "true");
    painelDe(b).setAttribute("data-aberto", "");
    header.setAttribute("data-aberto", "");
  };

  botoes.forEach((b) => {
    b.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || !comMouse.matches) return;
      clearTimeout(tFecha);
      clearTimeout(tAbre);
      tAbre = setTimeout(() => abre(b), aberto ? 40 : ATRASO_ABRE);
    });
    b.addEventListener("pointerleave", () => clearTimeout(tAbre));
    b.addEventListener("click", () => {
      clearTimeout(tAbre);
      if (aberto === b) fecha();
      else abre(b);
    });
  });

  // Sair do header fecha; voltar antes do tempo mantém aberto. Passar por um link sem painel também fecha.
  header.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(tAbre);
    tFecha = setTimeout(fecha, ATRASO_FECHA);
  });
  header.addEventListener("pointerenter", () => clearTimeout(tFecha));
  header.querySelectorAll(".header__nav a, .header__logo, .header__dir a, .header__dir button").forEach((el) => {
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse") return;
      clearTimeout(tAbre);
      tFecha = setTimeout(fecha, 120);
    });
  });
  header.querySelectorAll(".painel").forEach((p) => {
    p.addEventListener("pointerenter", () => clearTimeout(tFecha));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !aberto) return;
    const volta = aberto;
    fecha();
    volta.focus({ preventScroll: true });
  });
  // O foco saiu do header: fecha, para o painel não ficar aberto atrás de outra coisa.
  header.addEventListener("focusout", (e) => {
    if (e.relatedTarget && !header.contains(e.relatedTarget)) fecha();
  });
  document.addEventListener("pointerdown", (e) => {
    if (aberto && !header.contains(e.target)) fecha();
  });
}
