// Um detector que não falha em defeito conhecido não vale nada. Este roteiro abre páginas com defeitos de propósito
// e confere se olhar.mjs acusa cada um, e se uma página limpa passa sem acusação.
// Rodar depois de mexer em olhar.mjs. Não precisa do site no ar.
import { abre } from "./olhar.mjs";

const pagina = (corpo) => `data:text/html;charset=utf-8,${encodeURIComponent(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;font:16px/1.4 sans-serif}.bt{display:inline-block;padding:12px 20px;background:#111;color:#fff}.flutuantes{position:fixed;right:10px;bottom:10px}.flutuantes a{display:block;width:44px;height:44px;background:#ccc}</style></head><body><main>${corpo}</main></body></html>`)}`;

const CASOS = [
  { nome: "estouro de largura no celular", corpo: `<div style="width:520px;height:40px;background:#eee">largo demais</div>`, mede: (j) => j.estouro(), espera: (v) => v > 0 },
  { nome: "elemento fora da tela", corpo: `<div style="position:relative;left:300px;width:200px">fora</div>`, mede: (j) => j.fora(), espera: (v) => !!v },
  { nome: "texto sobre texto", corpo: `<div style="position:relative;height:60px"><span style="position:absolute;left:10px;top:10px">Sessenta e um itens</span><span style="position:absolute;left:30px;top:12px">Mais recentes</span></div>`, mede: (j) => j.encavalados(), espera: (v) => !!v },
  { nome: "botão fixo sobre ação", corpo: `<div class="flutuantes"><a href="#"></a></div><div style="position:fixed;right:0;bottom:0"><a class="bt" href="#" style="position:fixed;right:0;bottom:0;width:200px;height:60px">Pedir</a></div>`, mede: (j) => j.ev(`(() => { const b = document.querySelector('.bt'); document.querySelector('main').appendChild(b); return true; })()`).then(() => j.cobertos()), espera: (v) => !!v },
  { nome: "ação abaixo da dobra", corpo: `<div style="height:1400px"></div><a class="bt" data-acao href="#">Continuar</a>`, mede: (j) => j.abaixoDaDobra("[data-acao]"), espera: (v) => v > 0 },
  { nome: "bloco que o JS enche chega vazio", corpo: `<h1>Peças</h1><div class="grade" data-grade></div>`, mede: (j) => j.vazios(pagina(`<h1>Peças</h1><div class="grade" data-grade></div>`)), espera: (v) => v.includes("grade") },
  { nome: "o mesmo bloco com o esqueleto passa", corpo: "", mede: (j) => j.vazios(pagina(`<h1>Peças</h1><div class="grade" data-grade><div class="espera" aria-hidden="true" style="height:200px"></div></div>`)), espera: (v) => v.length === 0 },
  { nome: "página limpa não acusa nada", corpo: `<h1>Título</h1><p>Texto corrido sem defeito nenhum, com duas frases curtas.</p><a class="bt" data-acao href="#">Continuar</a>`, mede: async (j) => [await j.estouro(), await j.fora(), await j.encavalados(), await j.cobertos(), await j.abaixoDaDobra("[data-acao]")], espera: (v) => v[0] <= 0 && !v[1] && !v[2] && !v[3] && v[4] === 0 },
];

const j = await abre({ w: 360, h: 740, celular: true, saida: ".capturas/detectores" });
let falhas = 0;
for (const c of CASOS) {
  await j.ir(pagina(c.corpo), { espera: 300 });
  const v = await c.mede(j);
  const ok = c.espera(v);
  if (!ok) falhas += 1;
  console.log(`${ok ? "ok    " : "FALHOU"}  ${c.nome}  (${JSON.stringify(v)})`);
}
await j.fecha();

// O pulo só se mede no computador: na emulação de celular, o Chrome não anota layout-shift nenhum.
{
  const pc = await abre({ w: 1280, h: 720, saida: ".capturas/detectores" });
  const casos = [
    { nome: "página que pula ao carregar", corpo: `<h1>Peças</h1><div style="height:180px;background:#ccc">bloco</div><footer style="height:300px;background:#222;color:#fff">rodapé</footer><script>setTimeout(() => document.querySelector("main").insertAdjacentHTML("afterbegin", '<div style="height:400px;background:#ddd">chegou do nada</div>'), 500)</script>`, espera: (v) => v > 0.05 },
    { nome: "página parada não pula", corpo: `<h1>Peças</h1><div style="height:180px;background:#ccc">bloco</div><footer style="height:300px;background:#222;color:#fff">rodapé</footer>`, espera: (v) => v <= 0.05 },
  ];
  for (const c of casos) {
    await pc.ir(pagina(c.corpo), { espera: 300 });
    // força alguns quadros: sem quadro pintado antes e depois, não existe pulo para medir
    for (let i = 0; i < 6; i++) {
      await pc.cmd("Page.captureScreenshot", { format: "jpeg", quality: 10, clip: { x: 0, y: 0, width: 4, height: 4, scale: 1 } });
      await new Promise((r) => setTimeout(r, 150));
    }
    const v = (await pc.pulos()).total;
    const ok = c.espera(v);
    if (!ok) falhas += 1;
    console.log(`${ok ? "ok    " : "FALHOU"}  ${c.nome}  (${v})`);
  }
  await pc.fecha();
}
console.log(falhas ? `${falhas} detectores não pegaram o defeito` : "Todos os detectores pegam o defeito de propósito.");
process.exitCode = falhas ? 1 : 0;
