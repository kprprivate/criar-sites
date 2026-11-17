# O que a marca já tem e o padrão visual

Etapas 3 e 4 do caminho. O ponto de partida é a prancha de identidade do dossiê (etapa 2), já vista pelo usuário: aqui ela vira regra, código e guia. Saem daqui as decisões que todo o resto vai repetir: um guia vivo aprovado e os arquivos `marca.css` e `marca.js`. **Nada de seção antes disso;** com pressa, basta o padrão mínimo, e o guia completo vem depois (`SKILL.md`).

Serve para qualquer tipo de site. Em sistema ou painel, o padrão é mais contido: identidade na tipografia, nos detalhes e na resposta dos controles, sem efeito que atrapalhe a tarefa.

## Sumário

- [1. Ver o que a marca já tem](#1-ver-o-que-a-marca-já-tem)
- [2. Logo em vetor](#2-logo-em-vetor)
- [3. Fotos](#3-fotos)
- [4. A ideia geradora](#4-a-ideia-geradora)
- [5. Regras conferíveis](#5-regras-conferíveis)
- [6. Cor, letra e forma](#6-cor-letra-e-forma)
- [7. Os gestos](#7-os-gestos)
- [8. O que cada componente faz](#8-o-que-cada-componente-faz)
- [9. O guia vivo](#9-o-guia-vivo)
- [10. Receitas de técnica](#10-receitas-de-técnica)

## 1. Ver o que a marca já tem

Para cada item (manual, logo, cores, fontes, fotos, tom), decidir e registrar: **seguir, melhorar ou editar**, com o motivo. Identidade consolidada se preserva. O que o usuário já rejeitou fica escrito, para não voltar.

Referência indicada pelo cliente: estudar e traduzir o que ele quis dizer. Às vezes o pedido é só "cara de bonito", e a referência mostra o que isso significa para ele (fundo, espaço, tipo). A resposta vai no guia, como decisão.

## 2. Logo em vetor

Logo só em PNG fica ruim em hover, em tamanho grande e em animação. Dá para refazer sem contratar ninguém, quando o PNG é bom:

1. **Achar o maior arquivo:** site, CDN da loja, redes. Olhar os candidatos antes de escolher.
2. **Traçar com poucos nós:** `python -I <pasta-da-skill>/assets/logo/vetoriza.py logo.png logo.svg 3.2`. Contorno de subpixel, cantos por ângulo, retas onde é reto e Bézier no resto. Traçado automático comum deixa ondas e nós demais. Olhar `logo.svg.confere.png`: o desenho novo em vermelho sobre o original.
3. **Decidir o desenho, à mão, sobre os nós:** o que era quase reto fica reto, o que era quase paralelo fica paralelo, canto vira o encontro exato de duas tangentes, cortes ficam com folga constante. O PNG arredonda cantos; o vetor não pode herdar isso.
4. **Conferir sobreposto** e em tamanho grande. Pôr o desenho em `public/img/favicon.svg` e gerar os PNG com `node tools/favicon.mjs`.

Para o site, isso resolve. Para impressão ou gravação grande, vale pedir o original: dizer isso ao usuário.

## 3. Fotos

Reaproveitar o que existe: trocar fotos é caro. Antes de falar sobre elas, abrir e olhar várias.

- **Comparação para quem decide:** quando valer mudar o padrão (o fundo, por exemplo), testar em poucas, de quatro a seis, na grade real do site, e publicar as versões lado a lado. Não refazer o catálogo sem decisão. A escolha não trava o resto: o site segue com as fotos de hoje.
- **Sem tocar no arquivo:** muita coisa se resolve no CSS do cartão, como vinheta, recorte fixo ou posição por tipo de produto. A foto inteira fica para onde ela é prova, como a página do produto.
- **Recorte fiel com IA:** o gerador sozinho redesenha o produto (tecido, rótulo, textura), o que é inaceitável quando a foto é prova. Usar só como **molde**: pedir o produto sobre verde chapado (`assets/fotos/STYLE.exemplo.md`) e compor os pixels reais da foto com `assets/fotos/composicao.py`.
- Geração de cenas e séries: [direcao-criativa.md](direcao-criativa.md#gerar-imagens-com-o-codex-cli).

## 4. A ideia geradora

Uma ideia só, que explica muita coisa ao mesmo tempo. Ela sai de algo que só esta marca tem: produto, material, gesto de uso, forma do logo, frase, história, imaginário. Precisa aparecer em peças reais, do logo ao botão, ao link e à seção-assinatura.

Casos, para entender o tamanho da ideia, não para repetir: na Rucá, o bloco com corte que se fecha; na Joy Rush, o botão de dois elementos que troca de lado; na GSL, uma linha só que desenha o logo, contorna botões e vira a arara.

Testes:

- **Origem:** dá para dizer em uma frase de onde ela vem, com coisas que já são da marca?
- **Alcance:** ela gera botão, link e uma seção, sem esforço?
- **Troca de logo:** com outro nome, serviria para qualquer empresa? Então não é a ideia.
- **Exemplo do usuário:** forma ou efeito citado como exemplo é só exemplo. Medir nas referências se faz sentido antes de adotar.

## 5. Regras conferíveis

Adjetivo vira regra que se confere olhando a tela. "Premium", "acolhedor", "ousado" não orientam nada; "entre uma seção e outra, de 84 a 176 px" orienta. De quatro a seis regras, tiradas do que se repetiu nas melhores do estudo: espaço, regra de foto, contraste de tamanho, paleta, ritmo do movimento, tom de voz. Se uma tela quebra uma delas, sai do padrão.

## 6. Cor, letra e forma

Decidir e escrever em `src/css/marca.css`, que é a fonte única: tokens no `:root`, classes de tipo e componentes.

- **Cor:** quais, onde cada uma entra e o contraste medido. Quanta cor usar vem da marca: uma escola infantil pede muita, uma marca sóbria pode pedir uma só.
- **Letra:** papéis (mostra, título, subtítulo, corpo, rótulo, número). Ver a fonte em tamanho real: fontes com eixo óptico podem borrar no máximo. A escolha sai de um estudo ([abaixo](#estudo-de-letra)).
- **Header:** a forma vem da marca, como uma placa, um selo ou um recorte. A barra de ponta a ponta é o padrão do kit, não uma decisão.
- **Forma:** botão, cartão, raio, linha. A forma precisa de um motivo vindo da marca.

### Estudo de letra

A letra é a decisão que mais aparece e a que mais cai no genérico. Antes de fixar:

1. **Direções:** de três a quatro, cada uma saída da marca (a época, o ofício, a sinalização, a mão de um letrista) e não do gosto do momento.
2. **Candidatas:** de oito a doze, gratuitas (Google Fonts, Fontshare, Velvetyne, Collletttivo e fundições abertas) e pagas (fundições independentes e catálogos). Paga não é proibida: o usuário decide a licença.
3. **No contexto:** cada candidata renderizada com o título real, um rótulo em caixa alta, um botão, um número (preço, ano) e acentos do idioma. Paga entra pelo testador do site da fundição (captura) ou por arquivo de teste, que exige o aceite do usuário aos termos.
4. **Folha comparativa** publicada, com a recomendação, a licença e onde comprar. Enquanto a licença não sai, o protótipo usa a gratuita mais próxima e diz isso.

O que já pareceu genérico ao usuário: a primeira serifa gratuita "clássica" e a mesma família em todo projeto.

## 7. Os gestos

De três a seis movimentos com nome, mais nada. Antes de criar um efeito novo, a pergunta é: isso já não é um destes?

| Campo | O que dizer |
|---|---|
| Nome | Para a equipe falar dele |
| De onde vem | O ativo da marca |
| Como é | O que acontece, em frase |
| Onde entra | Quais componentes |
| Limite | Duração, quantidade, onde nunca entra |
| No celular | A resposta ao toque |

Em site de marca, precisam existir (em painel ou ferramenta, só os dois primeiros, discretos):

- **O gesto dos botões e ícones:** o mesmo em todos, com a mesma curva e o mesmo tempo. Os premiados medidos repetem pouca coisa, sempre igual: é a repetição que dá a sensação de marca.
- **O gesto das peças pequenas:** links, menu, abas, campos.
- **A animação de texto de abertura:** no máximo uma por página, com o texto completo disponível para leitor de tela.
- **A seção-assinatura:** uma animação diferenciada, ligada a um ativo exclusivo. Uma no site.

Todo gesto responde a mouse, foco de teclado e toque; com movimento reduzido, vira troca direta. Mouse só com `pointerType === "mouse"`. Nada fica preso depois do toque. Um preenchimento termina no estado completo. Tudo funciona parado se o JS falhar.

## 8. O que cada componente faz

A especificação dos próximos blocos: uma tabela com repouso, mouse ou foco, toque e tempo, para navegação (header, menu, busca, troca de página, voltar ao topo, rodapé) e para a ação principal do site (cartão, preço, formulário, contador, o que couber). Outra tabela com os estados: carregando, esperando resposta, erro de campo, sucesso, lista vazia, foco de teclado, movimento reduzido, toque, seleção de texto.

## 9. O guia vivo

Uma página publicada em que dá para passar o mouse, usar o Tab e tocar. O modelo já vem no projeto: `docs/guia/index.html`. Seções:

1. **Abertura:** a ideia em duas frases.
2. **Suas perguntas:** o que decidi e por quê, respondendo ao que o usuário e o cliente perguntaram, com o que foi medido.
3. **Regras conferíveis.**
4. **A ideia:** de onde vem e onde aparece, ao vivo.
5. **Logo**, em vetor, sobre cada fundo.
6. **Cor. 7. Letra.**
8. **Botões:** todos, sobre cada superfície. **Peças pequenas:** links, abas, campos.
9. **O cartão ou a unidade principal do site**, se houver. **Fotos**, com a comparação, se houver.
   **Formas e padrões, ícones, aplicações e voz**, vindos da prancha do dossiê, agora como regra.
10. **A seção-assinatura e a animação de texto**, funcionando.
11. **Gestos** (seção 7) e **Cada detalhe** (seção 8).
12. **Referências escolhidas,** cada uma com um papel.
13. **Para decidir:** poucas perguntas, como "esta ideia é a identidade da marca?".

Uma fonte só: o guia usa os mesmos `marca.css` e `marca.js` do site. `npm run guia` copia os dois para `docs/guia/` antes de publicar. Publicar como no dossiê e guardar o link em `CLAUDE.md` e `docs/ESTADO.md`. Se o guia tiver de ir para quem não abre o link, exportar imagens para enviar.

Decisão aprovada vira regra no `CLAUDE.md` do projeto, na seção Identidade. A partir daí, o guia manda: propor mudança com o impacto dela.

## 10. Receitas de técnica

São técnicas testadas em produção. Servem à ideia da marca da vez; o desenho, o tempo e a forma mudam.

**Contorno que corre pela borda.** SVG absoluto dentro do botão, com `<rect>` de `pathLength="1"`, `stroke-dasharray: 1 1.01` e `stroke-dashoffset` animado de 1 a 0 pela Web Animations API, com a duração proporcional ao que falta. Na saída, a linha segue até `-1` em vez de voltar: `-1` e `1` desenham a mesma coisa. Medir com `ResizeObserver`. Um segundo `rect` com `stroke-dasharray: .0001 2` e ponta redonda vira um ponto correndo na frente. No toque, corre ao apertar, em menos tempo. No foco, fica completo e parado.

**Logo que se escreve.** Uma linha central por letra, na ordem da escrita, desenhada à mão como pontos e suavizada (Catmull-Rom para Bézier). Cada letra ganha uma `<mask>` com essa linha, em traço largo o bastante para cobrir a letra (conferir o que sobra para fora), e o traço anima por `pathLength="1"`. Um fantasma do desenho em opacidade baixa fica por baixo. **Em repouso, nada de máscara:** ao terminar, remover a camada e mostrar o vetor limpo, porque máscara deixa filete em alguns tamanhos. Foi o que resolveu as "linhas de baixa qualidade" no hover do logo.

**Título que chega borrado.** Filtro SVG `feGaussianBlur` com `stdDeviation="X 0"` só na horizontal, um por linha, animado por `requestAnimationFrame`, com opacidade e `translateX` juntos. Antes do JS, o título fica escondido por CSS com uma `animation` de segurança que o mostra depois de uns 2,6 s, para nunca sumir se o JS falhar. Remover o filtro ao terminar. Vale para todo título que surge: marcar como pronto (o atributo que desliga a segurança) só depois de esconder as linhas e começar a animação; e, se a segurança já mostrou o título (fonte lenta), não animar de novo. Senão ele aparece e some, e o usuário vê "às vezes aparece, às vezes não".

**Seção conduzida pela rolagem.** Seção alta com miolo em `position: sticky`; o progresso (0 a 1) sai de `getBoundingClientRect`. Trilho em `translate3d`, traçado com `getPointAtLength` e `strokeDashoffset`. Física leve (mola com amortecimento) para o que balança na inércia. Pausar fora da tela com `IntersectionObserver`. Em tela em pé, marcos em posições próprias (`data-marco-pe`), porque o traçado muda de proporção. Sem hover que mude o estado, e versão parada com movimento reduzido. Mais em [padroes-de-marca.md](padroes-de-marca.md#seção-conduzida-pela-rolagem).

**Abertura de primeira visita.** Um script curto no `<head>` decide antes de pintar, só na home, sem `sessionStorage` marcado e sem movimento reduzido, e põe uma classe no `<html>`. A abertura some sozinha em pouco mais de um segundo e **ao primeiro toque, tecla ou rolagem**. O CSS tem uma saída de segurança por `animation` (uns 4,5 s), para o JS falhar sem deixar a tela presa. Nos testes, marcar o `sessionStorage` em `ANTES`, em `tools/testes.config.mjs`.
