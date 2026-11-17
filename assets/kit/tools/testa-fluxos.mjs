// Fluxos de ponta a ponta, fazendo o que a pessoa faria: clicar, tocar, digitar, voltar. Roda depois de testa-tudo e testa-estados.
//   node tools/testa-fluxos.mjs        SITE_BASE muda o endereço.
// O que está aqui confere a casca que veio do kit. Cada projeto soma os fluxos dele: comprar, enviar formulário, buscar, entrar.
// Projeto sem a casca do kit (--so-ferramentas): apagar estas verificações e escrever as dele, com a mesma função ok().
import { abre, BASE, dorme, siteNoAr } from "./olhar.mjs";

await siteNoAr();

const saida = ".capturas/fluxos";
let falhas = 0;
const ok = (nome, valor, extra = "") => {
  console.log(`${valor ? "ok    " : "FALHOU"}  ${nome}${extra !== "" ? `  (${extra})` : ""}`);
  if (!valor) falhas += 1;
};
const centro = (sel) => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`;
console.log("Base:", BASE);

// ---------- Computador ----------
let j = await abre({ w: 1366, h: 700, saida });
await j.ir("/");
ok("ação principal à vista em 1366x700", (await j.abaixoDaDobra("[data-acao-principal]")) === 0);
ok("rolagem suave ligada com mouse", await j.ev("!!window.LENIS"));
ok("barra de rolagem escondida", (await j.ev("innerWidth - document.documentElement.clientWidth")) === 0);
ok("header invisível no alto, sobre a abertura", await j.ev(`document.querySelector("[data-header]").hasAttribute("data-sobre-heroi")`));

await j.rola(500);
ok("header sólido depois de rolar", await j.ev(`!document.querySelector("[data-header]").hasAttribute("data-sobre-heroi")`));
ok("header some ao descer", await j.ev(`document.querySelector("[data-header]").hasAttribute("data-escondido")`));
await j.rola(450);
ok("header volta ao subir", await j.ev(`!document.querySelector("[data-header]").hasAttribute("data-escondido")`));
ok("voltar ao topo aparece depois da primeira tela", await j.ev(`document.querySelector("[data-flutuantes]").hasAttribute("data-topo-visivel")`));

// Painel do menu, com mouse e Esc
await j.rola(0);
const grupo = await j.ev(centro("[data-painel-abre]"));
await j.mouse(grupo.x, grupo.y);
await dorme(500);
ok("painel abre ao passar o mouse", await j.ev(`document.querySelector("[data-painel-abre]").getAttribute("aria-expanded") === "true"`));
await j.foto("painel");
await j.tecla("Escape");
await dorme(300);
ok("painel fecha no Esc", await j.ev(`document.querySelector("[data-painel-abre]").getAttribute("aria-expanded") === "false"`));
await j.mouse(10, 650);

// Abas pelo teclado
await j.ate("[role=tablist]", { folga: -200 });
await j.ev(`document.querySelector("[role=tab]").focus()`);
await j.tecla("ArrowRight");
await dorme(200);
ok("abas trocam pelas setas do teclado", await j.ev(`document.activeElement.getAttribute("role") === "tab" && document.activeElement.getAttribute("aria-selected") === "true" && document.activeElement !== document.querySelector("[role=tab]")`));
ok("só o painel da aba escolhida aparece", (await j.ev(`[...document.querySelectorAll("[role=tabpanel]")].filter((p) => !p.hidden).length`)) === 1);

// Lista de lado com mouse: em janela estreita, sem barra, as setas são o único caminho
await j.fecha();
j = await abre({ w: 900, h: 800, saida });
await j.ir("/");
await j.ate("[data-lista-lado]", { folga: -200 });
ok("setas aparecem com mouse, quando a lista rola", await j.ev(`document.querySelector("[data-setas]").hasAttribute("data-ligadas")`));
ok("seta de voltar apagada no começo", await j.ev(`document.querySelector("[data-setas] button").getAttribute("aria-disabled") === "true"`));
const vai = await j.ev(centro("[data-setas] button:last-child"));
await j.clique(vai.x, vai.y);
await dorme(900);
ok("a seta anda a lista", (await j.ev(`document.querySelector("[data-lista-lado]").scrollLeft`)) > 0);
await j.fecha();

// Rodapé que sobe e pausa, em várias alturas: o que liga por medida muda de lado sem aviso
for (const h of [600, 700, 900, 1080]) {
  j = await abre({ w: 1366, h, saida });
  await j.ir("/");
  await j.rola(await j.ev("document.documentElement.scrollHeight"));
  await dorme(1000);
  ok(`rodapé cobre a tela no fim, em ${h} de altura`, (await j.ev(`Math.abs(document.querySelector("[data-rodape]").getBoundingClientRect().bottom - innerHeight)`)) <= 2);
  if (h === 700) {
    await j.foto("rodape");
    await j.ev(`document.querySelector("[data-pausa]").click()`);
    ok("pausa muda o rótulo e fica guardada", (await j.ev(`document.querySelector("[data-pausa]").textContent === "Retomar animações" && localStorage.getItem("site:parado") === "1"`)));
    await j.ev(`document.querySelector("[data-pausa]").click()`);
  }
  await j.fecha();
}

// ---------- Celular emulado ----------
j = await abre({ w: 390, h: 844, celular: true, saida });
await j.ir("/");
ok("sem rolagem suave no toque", await j.ev("!window.LENIS"));
ok("sem estouro em 390", (await j.estouro()) <= 0);
const burger = await j.ev(centro("[data-gaveta-abre]"));
await j.toque(burger.x, burger.y);
await dorme(900);
ok("menu abre pelo toque", await j.ev(`document.querySelector("[data-gaveta]").open`));
ok("foco no painel, nunca no X", await j.ev(`document.activeElement === document.querySelector("[data-gaveta]")`));
await j.foto("menu-celular");
const fechar = await j.ev(centro("[data-gaveta-fecha]"));
await j.toque(fechar.x, fechar.y);
await dorme(700);
ok("menu fecha pelo X", await j.ev(`!document.querySelector("[data-gaveta]").open`));
await j.fecha();

// ---------- Movimento reduzido ----------
j = await abre({ w: 1366, h: 700, reduz: true, saida });
await j.ir("/");
ok("sem rolagem suave com movimento reduzido", await j.ev("!window.LENIS"));
ok("nada fica escondido à espera de animação", await j.ev(`!document.querySelector("[data-revela]")`));
await j.fecha();

console.log(falhas ? `\n${falhas} falhas` : "\nTodos os fluxos passaram.");
process.exitCode = falhas ? 1 : 0;
