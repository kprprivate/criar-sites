// HOVER SÓ COM MOUSE: plugin de PostCSS, já testado em produção.
// No toque, o :hover gruda no último elemento tocado: o botão fica "em hover" até tocar em outro lugar, o que parece
// uma borda ou um estado preso. Este plugin põe todo seletor com :hover dentro de @media (hover: hover) e mantém as
// alternativas de :focus-visible e :active (dentro de :is() e :where()) valendo em toda tela.
// Uso no vite.config.js:
//   import { hoverSoComMouse } from "./hover-so-com-mouse.js";
//   export default defineConfig({ css: { postcss: { plugins: [hoverSoComMouse()] } } });
// Junto: -webkit-tap-highlight-color: transparent no html, e :has(:focus-visible) no lugar de :focus-within.

// separa por vírgulas de primeiro nível (fora de parênteses e colchetes)
const partes = (texto) => {
  const lista = [];
  let nivel = 0;
  let atual = "";
  for (const letra of texto) {
    if (letra === "(" || letra === "[") nivel++;
    if (letra === ")" || letra === "]") nivel--;
    if (letra === "," && nivel === 0) {
      lista.push(atual.trim());
      atual = "";
    } else atual += letra;
  }
  if (atual.trim()) lista.push(atual.trim());
  return lista;
};

// o seletor sem os caminhos que dependem de hover, ou null quando ele só faz sentido com hover
const semHover = (seletor) => {
  let saida = "";
  let i = 0;
  while (i < seletor.length) {
    const grupo = seletor.slice(i).match(/^:(is|where|not|has)\(/);
    if (grupo) {
      let nivel = 1;
      let fim = i + grupo[0].length;
      for (; fim < seletor.length && nivel; fim++) {
        if (seletor[fim] === "(") nivel++;
        else if (seletor[fim] === ")") nivel--;
      }
      const dentro = seletor.slice(i + grupo[0].length, fim - 1);
      if (grupo[1] === "is" || grupo[1] === "where") {
        const itens = partes(dentro).map(semHover).filter((item) => item !== null);
        if (!itens.length) return null;
        saida += `:${grupo[1]}(${itens.join(", ")})`;
      } else saida += seletor.slice(i, fim);
      i = fim;
    } else if (seletor.startsWith(":hover", i)) return null;
    else saida += seletor[i++];
  }
  return saida;
};

export const hoverSoComMouse = () => ({
  postcssPlugin: "hover-so-com-mouse",
  Rule(regra, { AtRule }) {
    if (!regra.selector.includes(":hover")) return;
    if (regra.parent?.type === "atrule" && /hover:\s*hover/.test(regra.parent.params)) return;
    const seletores = partes(regra.selector);
    const comHover = seletores.filter((s) => s.includes(":hover"));
    const sempre = seletores.filter((s) => !s.includes(":hover"));
    for (const s of comHover) {
      const alternativa = semHover(s);
      if (alternativa && !sempre.includes(alternativa)) sempre.push(alternativa);
    }
    const soComMouse = new AtRule({ name: "media", params: "(hover: hover)" });
    soComMouse.append(regra.clone({ selector: comHover.join(",\n") }));
    regra.after(soComMouse);
    if (sempre.length) regra.selector = sempre.join(",\n");
    else regra.remove();
  },
});
hoverSoComMouse.postcss = true;
