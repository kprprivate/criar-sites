// O que só aparece depois de interagir: etapas, gavetas, filtros, zoom, erros, listas vazias. A lista está em testes.config.mjs.
// testa-tudo.mjs mede cada página como ela abre; este aqui mede o resto. Foi aqui que apareceram os defeitos que a matriz não via.
//   node tools/testa-estados.mjs [pasta-das-capturas] [janelas: 360x740,1366x700 ou *] [estados separados por vírgula]
// Roda contra o servidor de desenvolvimento. SITE_BASE muda o endereço. Em muitas janelas demora: rodar em segundo plano.
import { abre, dorme, siteNoAr } from "./olhar.mjs";
import { ANTES, ESTADOS, JANELAS_ESTADOS, LIMPA_ARMAZENAMENTO, SANGRIA } from "./testes.config.mjs";

await siteNoAr();

const saida = process.argv[2] || ".capturas/estados";
const janelas = process.argv[3] && process.argv[3] !== "*" ? process.argv[3].split(",") : JANELAS_ESTADOS;
const quais = process.argv[4] ? ESTADOS.filter(([n]) => process.argv[4].split(",").includes(n)) : ESTADOS;
let problemas = 0;

for (const janela of janelas) {
  const [w, h] = janela.split("x").map(Number);
  const j = await abre({ w, h, celular: w < 700, saida });
  await ANTES(j);
  for (const [nome, url, faz] of quais) {
    if (LIMPA_ARMAZENAMENTO) await j.ev(`try { localStorage.clear(); } catch {}`);
    j.erros.length = 0;
    try {
      if (url) await j.ir(url, { espera: 1100 });
      await faz(j);
      await dorme(250);
    } catch (e) {
      problemas += 1;
      console.log(`${janela} ${nome}: o roteiro falhou: ${e.message}`);
    }
    const estouro = await j.estouro();
    const fora = await j.fora(SANGRIA);
    const encavalados = await j.encavalados();
    const cobertos = await j.cobertos();
    const erros = j.erros.filter((e) => !/favicon/.test(e));
    await j.foto(`${nome}-${w}`);
    const achado = [
      estouro > 0 && `estouro ${estouro}`,
      fora && `fora: ${fora}`,
      encavalados && `encavalado: ${encavalados}`,
      cobertos && `coberto pelo botão fixo: ${cobertos}`,
      erros.length && `erros: ${erros.join(" | ").slice(0, 200)}`,
    ].filter(Boolean);
    if (achado.length) {
      problemas += 1;
      console.log(`${janela} ${nome}: ${achado.join(" | ")}`);
    }
  }
  await j.fecha();
  console.log(`${janela} conferida`);
}
console.log(problemas ? `${problemas} problemas` : "Nenhum problema nos estados interativos.");
process.exitCode = problemas ? 1 : 0;
