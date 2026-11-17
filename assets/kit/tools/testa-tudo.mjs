// Todas as páginas, como abrem, em todas as janelas: estouro de largura, quem sai da tela, texto sobre texto,
// botão fixo por cima, ação principal abaixo da dobra, barra de rolagem, erro de console, página que pula ao carregar
// e bloco que chega vazio antes do JS (sem o esqueleto de espera). Deixa as capturas.
//   node tools/testa-tudo.mjs [pasta-das-capturas] [páginas: home,sobre ou *] [janelas: 360x740,1366x700]
// Roda contra o servidor de desenvolvimento (npm run dev). SITE_BASE muda o endereço.
// Passar aqui não dispensa olhar as capturas: tools/folha.py junta muitas numa folha só.
import { abre, siteNoAr } from "./olhar.mjs";
import { ACOES, ANTES, BARRA_ESCONDIDA, JANELAS, PAGINAS, SANGRIA } from "./testes.config.mjs";

await siteNoAr();

const saida = process.argv[2] || ".capturas/paginas";
const quais = process.argv[3] && process.argv[3] !== "*" ? process.argv[3].split(",") : Object.keys(PAGINAS);
const janelas = process.argv[4] ? process.argv[4].split(",") : JANELAS;
let problemas = 0;

for (const janela of janelas) {
  const [w, h] = janela.split("x").map(Number);
  const celular = w < 700;
  const j = await abre({ w, h, celular, saida });
  await ANTES(j);
  for (const nome of quais) {
    j.erros.length = 0;
    await j.ir(PAGINAS[nome], { espera: 1300 });
    const estouro = await j.estouro();
    const fora = await j.fora(SANGRIA);
    const encavalados = await j.encavalados();
    const cobertos = await j.cobertos();
    const abaixo = ACOES[nome] ? await j.abaixoDaDobra(ACOES[nome]) : 0;
    const barra = celular || !BARRA_ESCONDIDA ? 0 : await j.ev("innerWidth - document.documentElement.clientWidth");
    const pulos = await j.pulos();
    const erros = j.erros.filter((e) => !/favicon/.test(e) && !(nome === "erro404" && /status of 404/.test(e)));
    await j.foto(`${nome}-${w}`);
    // Sem o JS, nenhum bloco que o JS enche chega vazio. Uma janela basta.
    const vazios = janela === janelas[0] ? await j.vazios(PAGINAS[nome]) : [];
    const achado = [
      estouro > 0 && `estouro ${estouro}`,
      fora && `fora da tela: ${fora}`,
      encavalados && `encavalado: ${encavalados}`,
      cobertos && `coberto pelo botão fixo: ${cobertos}`,
      abaixo === null && `ação principal não existe: ${ACOES[nome]}`,
      abaixo > 0 && `ação principal ${abaixo} px abaixo da dobra`,
      barra > 0 && `barra de rolagem visível (${barra} px)`,
      pulos.total > 0.05 && `pula ao carregar: ${pulos.total} (${pulos.maiores.join(", ")})`,
      vazios.length && `chega vazio, sem esqueleto: ${vazios.join(", ")}`,
      erros.length && `erros: ${erros.join(" | ")}`,
    ].filter(Boolean);
    if (achado.length) {
      problemas += 1;
      console.log(`${janela} ${nome}: ${achado.join(" | ")}`);
    }
  }
  await j.fecha();
  console.log(`${janela} conferida`);
}
console.log(problemas ? `${problemas} problemas` : "Nenhum problema nas páginas.");
process.exitCode = problemas ? 1 : 0;
