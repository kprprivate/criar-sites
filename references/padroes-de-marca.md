# Padrões testados em sites de marca

Usar em todo site de marca e loja, junto da [direção criativa](direcao-criativa.md). Reúne o que o usuário pede em todo projeto e as técnicas que já passaram por verificação real (celular, computador e janela estreita com mouse). Adaptar à marca; não copiar a aparência de um projeto para outro.

Cada item entra na rodada do bloco a que pertence. Não antecipar blocos para cumprir a lista.

**Elevar, não despejar** (regra do usuário): todo conteúdo recebe o mesmo cuidado de design do resto do site, inclusive painéis, modais, tabelas e listas de apoio. Jogar o conteúdo cru num bloco (um parágrafo longo, uma tabela solta) é o mínimo e dá o resultado "a menos". O resultado "a mais" vem de elevar até o nível da referência:

- estrutura que ajuda a ler, como abas quando há duas visões e grupos com contagem;
- ícones próprios em SVG por item, no traço da marca;
- rótulos de função;
- hierarquia clara.

Caso: o painel de ingredientes da Rucá, com abas, grupos e um ícone por item. Antes de entregar qualquer bloco, perguntar: isto está no nível da referência ou só "colocado lá"?

## Sumário

- [O que o usuário pede em todo site](#o-que-o-usuário-pede-em-todo-site)
- [Como fazer sem quebrar](#como-fazer-sem-quebrar)
- [Página de produto](#página-de-produto)
- [Imagens de produto](#imagens-de-produto)
- [Verificação que pega esses defeitos](#verificação-que-pega-esses-defeitos)
- [Prévia publicada](#prévia-publicada)

## O que o usuário pede em todo site

- **Linguagem de interação própria:** gestos nomeados (origem, como é, onde, limite, no toque), demonstrados num guia vivo ([padrao-visual.md](padrao-visual.md)), antes da primeira seção.
- **Link em tempo real:** servidor local no ar desde o início da construção, com o link passado ao usuário.
- **Texto que surge:** uma animação de entrada de texto da própria marca.
- **Seção-assinatura:** uma animação diferenciada, ligada a um ativo exclusivo da marca.
- **Faixas que aceleram com o scroll, só quando fizerem sentido para a marca** (nunca por padrão depois da abertura; o usuário notou que todo site vinha com ela):
  - sem pausa no hover e sem botão próprio;
  - a pausa de todas as animações automáticas fica num botão de texto no rodapé, em todas as páginas.
- **Rolagem suave (Lenis), a mesma da Joy Rush:** configuração e salvaguardas em [direcao-criativa.md](direcao-criativa.md#padrões-de-movimento-para-sites-de-marca). Só com ponteiro fino. **Regra do usuário, não opcional.**
- **A barra de rolagem nunca aparece**, em nenhuma área (página, lista, modal, menu): por isso toda lista de lado precisa de outro meio de navegação com mouse (abaixo). **Regra do usuário, não opcional.**
- **O espaço é do conteúdo:** o topo da tela não pode comer a janela. Teto medido de **20% da altura no computador e 25% no celular** para tudo o que vem antes do primeiro conteúdo ([como](#o-espaço-é-do-conteúdo)). **Regra do usuário, não opcional.**
- **Nada essencial escondido:** a ação principal de qualquer passo (continuar, reservar, pagar, entrar, criar conta, publicar) fica **à vista sem rolar**, também em janela de notebook (1366×700). **Formulário em etapas: cada etapa aparece inteira na tela, sem rolar e sem rolagem por dentro do painel**; se não cabe em 1366×700 e em 360×740, quebrar em mais uma etapa (o usuário chamou o formulário que rola de "regra burra"). A barra fixa no pé fica para lista longa que não dá para dividir ([técnica](#ação-principal-sempre-à-vista)). **Regra do usuário, não opcional.**
- **Cada página com a sua forma:** os elementos da marca são o vocabulário, não o molde. Nenhum esqueleto de topo se repete entre páginas internas ([como](#cada-página-com-a-sua-forma)). **Regra do usuário, não opcional.**
- **Conteúdo demais vira abas, não parede:** mais de uns seis itens paralelos entram em abas ou filtros, um grupo por vez ([como](#conteúdo-demais-vira-abas-não-parede)). **Regra do usuário, não opcional.**
- **Nunca carregar do nada** (regra do usuário, 12/11/2026: "vamos sempre colocar aquele ghost loading [...] não parece que quebrou"): tudo que o JS monta depois (cartões, a ficha do produto, listas, logos, horários) chega no HTML com o esqueleto da forma final, e a página nunca abre vazia com o rodapé em cima ([como](#esqueleto-de-espera)).
- **Footer que sobe:** por cima da última seção, em todas as telas, enchendo a tela inteira no fim da página.
- **Voltar ao topo:** um botão no canto de baixo à direita, no celular e no computador, em todas as páginas.
- **Seleção de texto nas cores da marca:** nunca o azul do navegador.
- **Favicon com o logo de verdade:** nunca uma letra provisória. Usar o SVG do logo oficial num quadrado da marca, mais o PNG de 32 px e o `apple-touch-icon` de 180 px, gerados do mesmo SVG.
- **Ícone de app e favicon: abrir a arte antes de usar e conferir renderizado em 60, 40 e 29 px.** Arquivos de logo/mascote "cream" e "green" costumam ser silhuetas de uma cor só: perdem detalhes (a SambaPass perdeu os óculos do mascote e o usuário notou). Usar a versão colorida, com fundo que dê contraste (um círculo claro atrás se o fundo for da cor do bicho), e mostrar 3 a 5 opções para o usuário escolher. Arte menor que o tamanho final (ex.: 512 px para um ícone de 1024) vira pendência: pedir o original.
- **Letra de aplicativo e painel: família única, limpa e moderna, como Apple, OpenAI e Anthropic** (regra do usuário, em 12/11/2026, depois de achar o Anton "horrível"). Uma grotesca ou neo-grotesca para título, texto, botão e número; título em peso médio (600 a 650), frase normal, espaçamento fechado (-3%), nunca fonte condensada em caixa alta como padrão de produto (Anton, Bebas e parentes só em cartaz). Números sempre com `tabular-nums`; testar se a fonte tem algarismos tabulares. Serifa só como acento editorial (título do site e da abertura). A personalidade vem da cor, do logotipo e do mascote, não da letra. O estudo entra no guia com **troca ao vivo** (uma aba "Letra" em que o manual inteiro muda de fonte), 6 a 8 direções e uma recomendação; as letras pagas de referência (Söhne, Styrene, SF Pro, Aeonik) entram numa tabela com licença, e só se mostram com arquivo de teste aprovado pelo usuário. Fonte paga só se a diferença for visível ao usuário final.
- **Mascote e personagens animados:** quando a marca tem um mascote, separar o desenho oficial em camadas (cabeça, boné, lentes) e animar sem redesenhar: reação ao passar o mouse, ao foco e ao toque, cabeça que segue o ponteiro, lente que brilha, e quatro reações com função (oi, pula, não, pensa). Parado por padrão e sem animar com movimento reduzido.
- **Campos de formulário: kit próprio, nunca o do navegador** (regra do usuário, 12/11/2026: "aquele default do Windows fica horrível"). Texto, número, escolha (select) e escolha com busca desenhados na marca, com os mesmos estados em todos: normal, foco, preenchido, desabilitado, somente leitura, erro, confirmado. Escolha: painel flutuante no computador, gaveta de baixo no celular, busca automática com 8 ou mais opções (sem acento), múltipla com chips, criar e busca no servidor, teclado e ARIA de combobox; ligada a um `<select>` real. App nativo usa o seletor do sistema. Referência pronta: `brand/marca.css` e `marca.js` da SambaPass, aba "Campos" do manual.
- **Todo campo de dado se formata sozinho** (regra do usuário, 12/11/2026): telefone, CPF, CNPJ, CEP, data, valor, e-mail e qualquer dado parecido. Formata ao digitar, ao colar e ao sair; aceita colar de qualquer jeito (com +55, pontos, espaços, texto em volta) e acha o dado dentro do texto; avisa o que ajustou numa linha verde de 4 s ("Tirei o +55."); guarda só o dado canônico (`+5511912345678`, 11 dígitos, `2026-11-12`, `"1234.50"`) e a máscara é só apresentação; valida ao sair, nunca no meio da digitação; teclado certo no celular. Construir como **registro de tipos** (`extrai` + `processa`), para tipo novo ser uma entrada. Cuidados: DDD 55 não é código do país (só tirar o 55 com 12 ou mais dígitos ou `+`); CNPJ alfanumérico existe desde julho de 2026; decidir milhar e decimal de "1.500" pelo contexto (BR). Testar a lógica em lote com casos reais colados.
- **Mensagens de aviso e erro têm sistema próprio** (o usuário pediu "melhorar muito"): seis canais, cada um com um trabalho (toast que some, aviso na tela, faixa de conexão, erro no campo, janela de decisão, página de erro), quatro tons (sucesso, informação, atenção, erro) sempre com ícone e palavra, texto em três frases (o que houve, o que o sistema já fez, o que fazer), toast com ação "desfazer" no lugar de confirmação, botão que carrega e confirma com ✓, protocolo copiável no erro do servidor. Nunca "erro inesperado", "ops" ou código técnico no texto. Referência pronta: o manual da SambaPass (aba Mensagens, `brand/marca.css` e `marca.js`).
- **Em loja:** sacola em gaveta, com o gesto da marca; [página de produto](#página-de-produto) e [imagens de produto](#imagens-de-produto) relevantes e variadas.

## Como fazer sem quebrar

### Footer que sobe

- **Colar a última seção:** `position: sticky; top: calc(82svh - var(--ultima-h))`. A altura vem de um `ResizeObserver` numa variável CSS.
- **Trecho da subida:** um espaço do tamanho do footer no fim do `main` (`main::after`). O footer devolve esse espaço com margem negativa, então a altura da página não muda.
- **Não segurar a seção com `translate` em JS:** treme na rolagem nativa do toque. Escurecer a seção coberta pode ficar em JS, porque só muda a cor.
- **Footer de tela cheia:**
  - `min-height: 100svh` no miolo;
  - a sobra fica em volta da assinatura, como um cartaz, e o mapa e a base descem para o pé;
  - reservar espaço embaixo para o botão de voltar ao topo.
- **Nenhum ancestral com `overflow: hidden`:** prende o sticky.
- **Âncora para algo dentro da seção presa** (como "O que tem na lata" dentro da última seção): chega cortada, porque a posição muda com o sticky. Pôr `scroll-margin-top` no alvo.
- **Com movimento reduzido ou sem JS:** tudo rola normal.
- **A cortina (rodapé fixo atrás da página) decide pela altura NATURAL do rodapé.** Se o CSS dá ao rodapé uma `min-height` enquanto a cortina está desligada, medir o rodapé com ela inflava o número, e a cortina nunca ligava em janela de notebook (o rodapé virava rolagem comum sem ninguém perceber). Medir sem a mínima (tirar, medir e devolver no mesmo quadro: nada é pintado no meio) e **testar o ligar/desligar em várias alturas de janela** (600, 650, 700, 800, 900, 1080 px), conferindo se a borda de baixo da página encosta no topo do rodapé. Compactar a frase gigante do rodapé também pela altura (`min(vw, vh)`), para ele caber em janela baixa.

### Seção conduzida pela rolagem

Cards de lado, um sol que anda, etapas que acendem.

- **Estrutura:** seção alta (cerca de 250svh) com o miolo em `position: sticky; top: 0`. O progresso (0 a 1) sai da posição da seção.
- **Ritmo:** cada card para no meio por um trecho e desliza até o próximo no trecho seguinte, com o deslocamento em `translate`.
- **Centro:**
  - o meio é o da seção, não o da lista;
  - medir os cards a partir do começo da lista, descontando o deslocamento atual.
- **`min-width: 0` na lista sem rolagem própria:** item de grid ou flex cresce até caber todos os cards e arrasta a coluna inteira (e o que estiver nela) para fora da tela.
- **A seção usa `overflow: clip`, não `hidden`:** o `hidden` prende o sticky dentro dela.
- **Hover:** o modo vale para toda tela estreita, inclusive janela de computador com mouse. Ali, desligar qualquer hover que mude o estado, senão o mouse parado em cima trava a rolagem conduzida.
- **Com movimento reduzido ou sem JS:** volta o carrossel de deslizar.
- **Altura pelo conteúdo:** de 70 a 100% da altura da tela por estado que se lê, e cada estado fica parado em parte do trecho (a troca acontece no miolo). O primeiro quadro nunca é vazio: cena que começa com tudo a zero vira uma tela inteira em branco, e no celular isso já apareceu como tela preta. Um indicador mostra que há fim ([medidas](react-bits-templates.md#rolagem)).
- **Lista empilhada primeiro:** a versão sem prender se escreve antes e vale no celular baixo, sem JS e com movimento reduzido; a cena entra por cima, numa condição de largura e altura.

### Listas de lado (carrossel) sem barra

- **No toque:** deslizar, com `scroll-snap`.
- **Com mouse e janela estreita:** sem barra, não há como rolar. Pôr setas (o botão redondo da marca) embaixo, à direita:
  - só com `(hover: hover) and (pointer: fine)`;
  - só quando a lista rola de verdade (`overflow-x` diferente de `visible` e `scrollWidth > clientWidth`).
- **Clique:** cada clique anda um card (`scrollBy` com a largura do card mais o espaço) e o encaixe acerta a parada.
- **Começo e fim:** `aria-disabled`; a seta apaga, mas fica no Tab, e o foco não se perde.
- **Lista que transborda começa no começo:** nunca `justify-content: center` herdado da grade do computador. O primeiro item sai pela esquerda, onde a rolagem não alcança, no toque também.

### Botão de voltar ao topo

- **Link para `#topo`** (o `<body>`): sem JS, funciona do mesmo jeito.
- **Com JS:**
  - aparece depois de cerca de 60% da primeira tela (no topo não tem função);
  - sobe com o Lenis no computador e com a rolagem suave nativa no toque; com movimento reduzido, pula.
- **Foco:**
  - pelo teclado (clique com `event.detail === 0`), o foco vai para o primeiro item da página (o "pular para o conteúdo");
  - no clique do mouse, não mostrar foco.
- **Outras peças fixas:**
  - em tela estreita, sobe por cima da barra de compra;
  - o footer reserva espaço embaixo para nada da base ficar atrás dele.
- **Gerador de páginas internas que reescreve links `#` para a home:** manter `#topo` local.

### Arte de fundo em máscara

Pattern, textura ou arte que não emenda.

- **Uso:** uma vez só, em área grande, nunca repetida.
- **Cobrir a altura:**
  - em caixa que pode ficar mais alta que a arte (fundo de seção, celular, tela alta), a camada tem a largura da escala desejada, posicionada no mesmo ponto, e a máscara é `cover`;
  - a arte cresce até a altura toda; onde já cobria, nada muda;
  - a seção corta o que sobra dos lados (`overflow: hidden`).
- **`X% auto` sozinho:** só em caixa quase quadrada. Conferir a conta: a altura da arte é a largura da máscara dividida pela proporção da arte.

### Seleção de texto

- **Cor:** `::selection` na cor de destaque da marca, com texto em contraste de 4,5:1 ou mais.
- **Títulos:** `text-shadow: none`.
- **Onde o fundo já é a cor da seleção:** trocar para o par alternativo da marca.

### Hover no toque (o "contorno que fica" depois de tocar)

- **Problema:** no celular, o `:hover` gruda no último elemento tocado, e o botão fica com a forma ou a borda do hover até tocar em outro lugar.
- **Solução no build:** pôr todo seletor com `:hover` dentro de `@media (hover: hover)`, mantendo as alternativas de `:focus-visible` e `:active` em toda tela. O plugin pronto já vem no kit, em `tools/hover-so-com-mouse.js` ([assets/kit/tools/hover-so-com-mouse.js](../assets/kit/tools/hover-so-com-mouse.js)); não escrever o `@media` à mão regra por regra.
- **Estado visual de card por foco:** `:has(:focus-visible)`, nunca `:focus-within`. No Android, o toque foca o botão e o card fica aceso.
- **Retângulo de toque:** `-webkit-tap-highlight-color: transparent` no `html`; a resposta ao toque é o `:active`.
- **Modal aberto pelo toque:**
  - abrir com o foco no título (`tabindex="-1"`) ou no próprio modal, por uma função compartilhada;
  - nunca no primeiro botão nem com `autofocus` no X: no iPhone, o foco que o navegador põe no X ao abrir pelo toque conta como de teclado (`:focus-visible`), e o X ganha o contorno;
  - pelo teclado, o Tab seguinte leva ao X;
  - o Chrome não reproduz o problema: conferir pelo elemento focado, não pela captura.
- **Fechar um modal por um link interno** (menu do celular com "Dúvidas", "Comprar"): não devolver o foco ao gatilho. Se o gatilho estiver fora da tela, como num header que não acompanha a rolagem, o foco rola a página e desfaz o pulo para a seção.
  - Fechado pelo X ou pelo Esc, devolver o foco com `preventScroll`.
  - Para conferir: abrir o menu no meio da página e tocar em cada link; a tela tem de parar na seção.
- **Como verificar:** tocar com emulação de toque e comparar o estilo calculado (forma, borda, sombra, cor) antes e depois do toque.

### Abas com a bolha que corre

- **Estrutura:** um trilho que ocupa a largura toda do bloco (nunca ao lado do X) e um pseudo-elemento atrás, a "bolha".
- **Tamanho das abas:** cada aba tem a largura do texto e uma parte igual da sobra (`flex: 1 1 auto`). A bolha mede a aba escolhida (variáveis de `left` e `right`, postas pelo JS); um `ResizeObserver` mede de novo, sem transição, quando a fonte carrega, a tela muda ou o painel abre.
  - Bolha em metade e metade (`:has()`, só CSS) quebra com um rótulo longo ("Tabela nutricional"): no celular, o texto passa para baixo da bolha da outra aba.
  - Conferir com o rótulo mais longo em 360 px. Abaixo disso, o texto quebra dentro da própria aba, nunca para fora dela.
- **Movimento líquido:** animar `left` e `right` com uns 90 ms de diferença, a borda da frente primeiro. A bolha estica entre as abas e assenta; o texto da escolhida troca de cor junto.
- **Comportamento:** abas no padrão acessível (setas, Home e End, tabindex móvel) num módulo compartilhado.
- **Movimento reduzido:** a bolha só troca de lugar, com `transition: none`. Um reset global que só zera a duração mantém os atrasos, e durante eles a bolha cobre as duas abas.
- **Troca que muda a altura:** a troca precisa segurar as abas no mesmo lugar da tela. Numa seção colada pelo pé (a que fica sob o footer que sobe), a nova altura empurra as abas para fora e o clique seguinte cai no vazio.
  - Como resolver: quem mede a seção mede de novo na hora, por um evento (o `ResizeObserver` só avisa no quadro seguinte). Depois, a rolagem compensa a diferença, pelo Lenis quando ele estiver ligado.
  - O header que some ao rolar trata essa rolagem como se não tivesse havido.
  - Para conferir: várias trocas seguidas com o mouse no computador, medindo a posição das abas e contando as trocas do header.

### Campos de formulário

- **Tamanho do texto:** 16px ou mais. Abaixo disso, o iOS dá zoom ao focar.
- **Foco sem mudar de tamanho:** sombra inset e fundo mais claro, em vez de outline afastado, que parece aumentar o campo.
- **Alto contraste:** manter um `outline` transparente, que esse modo mostra.

### Ação principal sempre à vista

Caso que gerou a regra: um assistente de venda com lista de 8 eventos tinha o botão "Continuar" no pé do painel, a ~1480 px do topo. Quem não rolava até o fim não sabia que havia como seguir. O mesmo valia para "Reservar e pagar", "Entrar" e "Criar conta" numa janela de 700 px de altura.

- **Barra de ação fixa** (`position: sticky; bottom: 0`) no pé do painel do passo: de ponta a ponta do painel (margem lateral negativa igual ao padding), fundo igual ao do painel, borda tracejada em cima e sombra leve. No fim do painel ela assenta no lugar e acompanha o canto arredondado.
- **O painel precisa ser coluna (`display: flex; flex-direction: column`), não grade:** o `sticky` não anda dentro de uma grade, porque o item fica preso na própria linha. É a causa mais comum de "a barra não gruda".
- **Erro e escolha moram na barra**, junto do botão. A mensagem "escolha o evento" aparecendo no meio da lista, fora da tela, é erro escondido. A barra diz o que foi escolhido ("Escolhido: ...") ou o que falta.
- **Texto informativo sai da barra:** ela é de uma linha só (cobre o conteúdo); o texto vai no fluxo, logo acima.
- **Peças fixas vizinhas:** o "voltar ao topo" sobe acima da barra (`body:has([data-sticky-bar])`) e `scroll-padding-bottom` impede que o foco do teclado pare atrás dela.
- **Passo curto** (tudo cabe na janela) não precisa de barra. A regra é o botão estar à vista, não a barra existir.
- **Formulário não usa esta saída:** painel de altura fixa com rolagem por dentro e barra no pé foi recusado. Medir cada etapa (a altura do formulário com só ela à vista) contra a janela em 1366×700, 1280×720, 390×844 e 360×740; a que passar vira duas. O título repetido de cada etapa pode ficar só para o leitor de tela, quando a barra de etapas já diz o nome.
- **Um componente só** (`ActionBar`) para todos os fluxos, para o comportamento não divergir entre entrar, cadastrar, comprar e vender.

### Abertura que cabe numa tela

O usuário pede seção que cabe numa tela no computador, abertura inclusive. Abertura centrada (rótulo, título, texto, ações) com fotos embaixo passa: medida num caso real, 1194 px de altura em 1366×700 e 1253 px em 1440×900, com as fotos no meio do caminho. Encolher as fotos até caber deixa tudo miúdo.

- **Saída que segue clássica: o tríptico.** No computador (a partir de uns 1000 px), três colunas: uma foto de cada lado, o texto no meio. A terceira foto pode virar um medalhão pequeno no lugar do ornamento, acima do título. No celular, volta a empilhar.
- **Sem mudar o HTML:** o invólucro das fotos ganha `display: contents` e cada foto recebe a sua `grid-area` na grade da abertura (`"esq rotulo dir" "esq titulo dir" ...`). A ordem de leitura continua a do texto.
- **Tamanho que segue a altura:** título em `min(5.4vw, 9.6svh, …)`, medalhão em `clamp(…, 14svh, …)` e fotos com `max-height` em `svh`. A seção com `min-height` de uma tela menos o header e o conteúdo centrado.
- **Conferir** a altura da seção e o `bottom` da ação principal em 1366×700, 1440×900 e 1920×1080.

### Fonte variável com eixo próprio

Eixos além do peso (`opsz`, `SOFT`, `WONK`, `GRAD`) vão em `font-variation-settings`, e o atalho `font:` zera essa propriedade em todo elemento onde aparece. O sintoma é a letra "normal" onde se escolheu a variação (caso: a forma macia de uma fonte sumia nos títulos e o usuário notou). Com a variação escolhida para o site inteiro, aplicar em todos os elementos, `*, *::before, *::after`, com `!important`. Fixar o eixo óptico (`opsz`) quando a variação escolhida só existe no tamanho grande. Conferir com `getComputedStyle(el).fontVariationSettings` num título, num botão e num rótulo.

### Fonte carregada que não aparece

Sintoma: o site sai na fonte do sistema (Segoe UI no Windows, San Francisco no Mac) com a fonte da marca baixada e pré-carregada; o contraste entre duas famílias some e ninguém nota no código. Medido em 11 de 18 templates profissionais ([caso](react-bits-templates.md#defeitos-que-os-próprios-templates-têm)).

- **Causa:** a variável CSS da fonte é criada num elemento (o `<body>`) e o token que a usa é resolvido acima dele (o `:root`), onde ela ainda não existe. O `var()` fica inválido e cai na pilha padrão. Acontece com qualquer token que referencia variável definida mais abaixo.
- **Como fazer:** variável e token no mesmo elemento, ou a variável no `<html>`. Com `next/font` e Tailwind v4, a classe da variável vai no `<html>`. Serifa "do sistema" (`ui-serif`) não é escolha de letra: vira Georgia numa máquina e outra coisa na vizinha.
- **Conferir:** a família calculada (`getComputedStyle(el).fontFamily`) de um título, um parágrafo e um botão começa pela fonte da marca, e ela está entre as carregadas (`document.fonts`). Lista vazia com fonte declarada é o defeito ([comando](qualidade.md#conferir-à-mão-ainda-sem-detector)).

### Conteúdo que nasce invisível

Sintoma: com o JS lento ou quebrado, título e seções não aparecem; rolando rápido, telas inteiras vazias; captura e robô de busca veem a página pela metade. Medido: de 22 a 92 elementos com `opacity: 0` no HTML de nove templates (em dois, o h1), e 4 de 13 quadros totalmente pretos numa rolagem.

- **Causa:** o estado inicial da animação de entrada está no HTML ou no CSS que vale antes do JS.
- **Como fazer:** o conteúdo existe visível; quem esconde é o JS, na hora em que vai animar. O kit já faz assim (`src/js/revela.js` põe o atributo que esconde). Esconder por CSS antes do JS só com a `animation` de segurança que mostra sozinha ([título que chega borrado](padrao-visual.md#11-receitas-de-técnica)). O título principal se lê no primeiro quadro. Bloco alto entra por deslocamento ou a partir de opacidade parcial, com margem de disparo folgada.
- **Contador:** o valor final vai no HTML e a contagem anima só a camada visual, escondida do leitor de tela. Contador que nasce em zero é zero para quem não roda JS, e captura no meio da contagem mostra número errado.
- **Conferir:** com o JS desligado, nenhum texto de `main` tem opacidade zero ou `visibility: hidden`; e uma rolagem rápida capturada não tem quadro vazio.

### Texto animado por letra ou palavra

Sintoma: a linha quebra no meio da palavra (termina em "drea", recomeça em "m"), no computador e pior no celular. Medido em dois templates, num título e num manifesto.

- **Causa:** cada letra é um bloco em linha independente, e o navegador pode quebrar entre quaisquer duas.
- **Como fazer:** um invólucro por palavra (`display: inline-block; white-space: nowrap`) com as letras dentro. A frase inteira fica num texto só para leitor de tela, e os pedaços animados levam `aria-hidden`. Preferir revelar por palavra ou por linha mascarada.
- **Título nunca corta nem cola:** nada de `nowrap` com reticências em título, e nada de quebra de linha escondida no celular sem um espaço antes (as palavras grudam). `text-wrap: balance` e tamanho em `clamp()`.
- **Conferir:** ler cada título e cada texto animado em 360 e 390 px, depois da animação.

### Canvas e WebGL

Fundo animado, shader, cena 3D, campo de partículas. Três defeitos medidos em templates profissionais: o site inteiro cai sem WebGL, o efeito segue rodando com movimento reduzido, e o título fica ilegível sobre o efeito (contraste estimado de 1,5 a 2,2:1).

- **Reserva antes do canvas:** o contêiner já tem a cor ou um gradiente CSS parecido com o efeito parado. O canvas só é anexado depois que o contexto foi criado e o shader compilou, e a falha é capturada: nunca derruba a página.
- **Zona do efeito e zona do texto:** o efeito ocupa uma área e o título, outra, sobre base chapada ou véu. A fronteira é uma variável CSS por ponto de quebra, que o canvas lê. Efeito de cursor não ouve toque e não passa por cima do título.
- **Cores dos tokens:** o canvas lê as cores do CSS (`getComputedStyle`) e relê quando o tema muda. Nenhuma cor fixa no shader.
- **Ciclo de vida:** começa perto da tela, pausa fora dela e com a aba oculta, limita o salto de tempo, tem teto de quadros e de densidade (até 2), desenha só quando algo mudou e libera o contexto ao sair. Efeito desfocado roda de 30 a 50% da resolução.
- **Movimento reduzido:** um quadro escolhido à mão, ou um layout alternativo parado. O reset de CSS não alcança animação em JS: cada laço consulta a preferência e a pausa do site.
- **Conferir:** abrir com o WebGL desligado, com movimento reduzido e no toque; medir o contraste do título no ponto mais claro do efeito, nos dois temas ([como](qualidade.md#conferir-à-mão-ainda-sem-detector)). Método e medidas: [react-bits-templates.md](react-bits-templates.md#canvas-e-shader).

### Cartão que vira (frente e verso)

Com `backface-visibility: hidden` os dois lados continuam no DOM e na árvore de acessibilidade: o leitor de tela lê os dois e o teste de texto sobreposto acusa. Esconder o lado de trás com `visibility: hidden` até virar, e o da frente depois de virar, com a troca no meio do giro (`transition: visibility 0s linear <metade do tempo>`). O botão que vira leva `aria-pressed`. Rótulo do tipo "toque para virar" só no toque; com mouse, "vire" ou "clique".

### Frase que depende do relógio

"Aberto agora", "fecha às 23h", "hoje tem feijoada". O horário vem de fonte publicada, ou fica `[[provisório]]`. Calcular na hora do lugar (`Intl.DateTimeFormat` com `timeZone`), nunca na do visitante. Fechamento depois da meia-noite conta como 24 + hora, e a madrugada pertence ao dia anterior: o que vale "hoje" (o prato do almoço) não aparece às 1h, nem com a casa fechada. Prever onde marcar dia fora do normal (férias, reforma, feriado) por data. Expor a função que monta a frase (`fraseDoDia(dia, hora, data)`) e testar por dia e hora nos fluxos: madrugada, véspera fechada, fim de semana, dia marcado. Num caso real, esse teste achou erro de madrugada que a tela não mostrava.

### Cada página com a sua forma

Caso que gerou a regra: `/como-funciona`, `/vender` e `/ajuda` tinham o mesmo topo (título à esquerda e um painel azul-escuro à direita), e o usuário disse que estavam "100% iguais, quase". O bilhete é a linguagem da marca; usá-lo como molde de toda página deixa o site monótono, e o que importa em cada página fica igual.

- **Dar a cada página o arquétipo do que ela é.** Exemplos do que funcionou:
  - **Guia** (`/como-funciona`): painel-resumo à direita que mostra o caminho inteiro de uma olhada, e abas por perfil (comprar × vender).
  - **Ferramenta** (`/vender`): o título curto em cima e o trabalho em primeiro plano, com uma **prévia ao vivo** ao lado (o ingresso que se preenche enquanto a pessoa escreve, com as mesmas contas do sistema).
  - **Central de busca** (`/ajuda`): faixa grande com a busca e atalhos por assunto, perguntas em cartões na largura toda, contato como um bloco de ponta a ponta no fim.
  - **Catálogo** (`/eventos`): cabeçalho compacto e o conteúdo logo em seguida.
  - **Vitrine** (home e evento): foto, preço e a ação principal já na primeira tela.
- **O que se repete de propósito** é o sistema: tipografia, cores, formas da marca, controles. O que **não** se repete é a composição do topo e o ritmo da página.
- **Conferir lado a lado:** antes de entregar um bloco novo, olhar as capturas das páginas irmãs juntas. Se dá para trocar os títulos entre elas e ninguém notar, falta forma própria.
- **Não vale** diferenciar só trocando a cor do bloco: a estrutura (onde está o foco, quantas colunas, o que é fixo e o que rola) é que muda.

### Conteúdo demais vira abas, não parede

Caso que gerou a regra: a central de ajuda mostrava as 16 perguntas de uma vez, e o usuário disse que "dava medo".

- **Mais de uns seis itens paralelos** (perguntas, regras, passos, cartões de mesma natureza) entram em **abas ou filtros**, com **um grupo por vez**. Começar por um grupo curto (de cinco a oito itens), com a **contagem** em cada aba.
- **Acima de uns doze itens, somar uma busca** que procura em todos (pergunta e resposta, sem acento), com atalhos por assunto. Com busca ou filtro ativo, as abas dão lugar ao resultado (que procura em tudo), com o rótulo do grupo em cada item e um "limpar" à vista.
- **Estado vazio com saída:** "não achamos" e o caminho para a equipe, nunca uma tela em branco.
- **Celular:** três abas com contagem precisam caber em 360 px (menos folga, e a contagem sai nas telas mais estreitas), e a lista vira uma coluna. Medir a largura do documento, não só olhar.
- **Duas colunas independentes** (e não colunas de CSS) para os cartões, para abrir um item não fazer os outros trocarem de lado.

### O espaço é do conteúdo

Caso que gerou a regra (painel da SambaPass): uma aba de ingressos com a barra, um título grande, a descrição e as abas ocupando uns 40% da tela, e a lista de ingressos começando no meio. O usuário disse que isso é UI ruim: a pessoa abre a aba para **ver os ingressos** e executar uma ação, não para ler um cabeçalho. Vale no celular e no computador, em toda página, e se confere em todo o site.

- **Teto medido.** Soma da altura de tudo o que vem antes do primeiro item de conteúdo (barra do sistema e do app, título, descrição, abas, filtros) em relação à altura da janela: **até 20% em 1366×700 e até 25% em 390×844** (cerca de 140 px e 210 px). Passou: a tela falha, mesmo bonita.
- **Uma linha só no topo.** Título curto (ou nada, quando a aba ativa já nomeia a tela), abas e ação principal dividem a mesma barra. No celular, a barra tem uns 56 px e as abas ficam logo abaixo, rolando de lado, com a barra colada ao topo ao rolar.
- **As abas sobem.** Abas de seção ficam no alto, junto da barra, não numa faixa de título separada. O conteúdo começa logo depois.
- **Título grande só onde há abertura** (vitrine, home, evento). Tela de trabalho (lista, formulário, fila, portaria) não tem título de página em fonte de cartaz: o nome da tela é o rótulo da aba ou um título de uma linha, em tamanho de texto.
- **Texto de apoio não fica fixo.** A descrição vira um "?" que abre uma dica, ou aparece só no estado vazio. Em tela de uso recorrente, quem já conhece a tela não rola por explicação.
- **Filtro numa linha.** Busca e filtros cabem em uma linha, ou entram atrás de um botão "Filtrar" que abre uma gaveta. Nunca uma pilha de campos antes da lista.
- **Resumo em fita, não em cartões grandes.** Totais e contagens vão numa fita de uma linha (rola de lado no celular), a menos que os números sejam o objetivo da tela.
- **A ação principal não pede espaço próprio.** Um botão na barra (computador) ou fixo no pé, acima da navegação (celular).
- **Primeira tela já com conteúdo.** Em 390×844, ao menos três itens da lista à vista sem rolar; em 1366×700, ao menos seis.
- **Como medir.** Em cada página, na captura de 390×844 e de 1366×700, medir o `top` do primeiro item de conteúdo (`getBoundingClientRect`) dividido por `innerHeight`. Entra na revisão de toda tela nova e numa varredura de todas as telas existentes quando a regra for adotada ([qualidade.md](qualidade.md)).

### O peso do botão conduz a pessoa

Regra do usuário (12/11/2026, SambaPass): "o botão mais importante tem que ter um peso maior... e o menos relevante, peso menor, ou muda a cor ou diminui o tamanho... para sempre induzir a pessoa para o caminho que a gente quer. Em deletar conta, é sempre bom fazer a pessoa ler e ter certeza, então a gente dá ênfase ao botão de desistência, não ao de cancelar."

- **Escada de peso.** Peso 1: botão cheio, cor de ação, o maior (56 px no celular, largura total), um por tela. Peso 2: só contorno (48 px). Peso 3: só texto (44 px de alvo). Peso 4: texto vermelho pequeno (14 px), sem fundo, com rótulo específico ("excluir conta e todos os dados"). Peso = tamanho × tipo (cheio 1, contorno 0,55, texto 0,25) × posição de leitura.
- **O peso vai para o caminho que queremos.** Formulário: "salvar" cheio, "cancelar" texto. Onboarding: "continuar" cheio, "pular" texto. Planos: o recomendado cheio, os outros em contorno. Pagamento: o valor no rótulo ("pagar R$ 120,00").
- **Em ação que apaga, o peso vai para a desistência.** "Manter minha conta" é o botão grande e amarelo; "excluir conta" é texto vermelho pequeno. Vermelho cheio só quando destruir é a própria tarefa da tela.
- **Atrito pela gravidade.** Reversível: age na hora e mostra toast com "Desfazer" (8 s). Irreversível: janela com o item e até 3 efeitos, foco inicial no "manter". Irreversível com dinheiro, dados ou pessoas: atrito alto (digitar a palavra, botão de apagar nasce apagado e libera ao bater, rótulo específico, sem segundo "tem certeza?").
- **Conta de peso.** Medir o botão renderizado (largura × altura × tipo). O "manter" precisa pesar pelo menos 3 vezes o "apagar", e nunca há dois botões cheios no mesmo grupo.
- **Guiar, não enganar.** O botão leve continua legível (14 px, contraste 4,5:1, alvo de 44 px). Sair, cancelar plano e apagar a conta nunca ficam escondidos nem difíceis de achar.
- **Fluxo no guia.** Colocar no guia um "Qual peso dar?" interativo (o que oferecemos, dá para desfazer, mexe com dinheiro/dados/pessoas) que mostra o resultado com os botões reais e o peso medido, mais os modais de exemplo já nesse padrão. Na revisão de cada tela, listar os botões, atribuir pesos e conferir a conta.

### Ícones e ilustração

Regra do usuário: "ícones sempre são algo legal, ilustração facilita a vida, podemos usar ao nosso favor sempre".

- **Ícone: um estilo só, a favor da leitura.** Biblioteca única (Lucide: traço de 2 px, pontas e cantos redondos, grade de 24; no painel, `lucide-react`). Ícone junto da palavra em menu, abas do celular, cabeçalho de seção, linha de lista, botão de ação, campo (busca, e-mail, calendário), selo e aviso; sozinho só os universais, com nome acessível. Tamanhos 16/18/20/24. Cor herda o texto e só ganha cor com função. **Vocabulário fixo:** um conceito, um ícone, em todo o produto (tabela no guia).
- **Ícone alinhado de verdade** (o usuário reprovou a portaria com o ícone solto no topo e o título flutuando embaixo): ícone solto fica na altura exata da primeira linha do texto (ícone de 20 px com entrelinha de 20 px, e acompanha a quebra de linha); círculo de ícone ao lado de duas linhas fica no centro do bloco; resultado de tela cheia (portaria, sucesso) com ícone e texto empilhados e centralizados, igual em todos os estados; ícone de contorno em tamanho grande tem recuo interno de 2/24, compensar quando o ícone fica acima de um texto alinhado à esquerda. Conferir com uma auditoria que mede, em todas as telas, o centro do ícone contra a primeira linha do texto (`brand/tools/auditar-icones.mjs` da SambaPass).
- **Ilustração em todo momento sem trabalho:** estado vazio, sem resultado, sem conexão, sem acesso, erro, sucesso grande, boas-vindas, primeiros passos. Sempre com frase e ação, uma por tela, nunca em tela de trabalho cheia. **Estilo próprio da marca** (na SambaPass: adesivo, contorno de 5 px, cores da paleta, sombra elíptica, no jeito do mascote); gerar as peças em SVG leve e conferir a folha de contato antes de mostrar. Mascote para momentos de relação, ilustração de objeto para momentos de função.
- **No guia:** aba com a biblioteca inteira pesquisável (carregada pelo CDN pinado), o vocabulário, as ilustrações com a situação de cada uma e as regras.

### Painel bonito e simples (lista, cabeçalho, menu, modal ou página)

Regras do usuário depois de ver o primeiro painel pronto e achá-lo "feio" (12/11/2026). Valem para todo painel e sistema. Um revisor independente (outro modelo) confirmou que a causa de fundo era **um painel de celular esticado no computador**: controle de 44 a 48 px, texto de 16 px, linha de tabela de 72 a 125 px, 8 itens por tela e conteúdo travado em ~1150 px com margem de 300 px de cada lado.

- **Largura:** lista e tabela usam a largura toda (padding de 24 a 32 px). Limite só em formulário (`max-w-2xl`), detalhe (`max-w-5xl`), estado vazio e texto corrido. Tirar o limite SEM adensar a tabela piora (4 colunas esticadas em 1650 px): as duas mudanças vão juntas.
- **Densidade no computador:** linha de 52 px com duas linhas de texto (44 px com uma), célula de 14 px (o 16 px é do celular, por causa do zoom do iOS em campo), cabeçalho de 36 px grudado ao rolar, controles de 36 px em pílula, 12 a 14 itens por tela de 900 px.
- **Tabela legível:** `table-layout: fixed`, **uma linha por registro** (reticências e o texto inteiro no `title`; nunca o evento quebrado em três linhas com espaço sobrando), largura declarada por coluna, coluna que cede primeiro quando a tela estreita, sem coluna que repita o filtro ativo (a coluna "Situação" dentro da aba "A emitir"), contato e detalhe vão para a gaveta. **"Selecionar todos" é a caixa do cabeçalho, na primeira coluna, à esquerda**; com 1 ou mais marcados o cabeçalho vira a barra do lote com a ação cheia. Ação da linha: no máximo UM botão pequeno mais o "⋯"; a linha inteira abre o detalhe.
- **Tabela ou blocos:** tabela é o padrão para registro (venda, ingresso, extrato, auditoria). **Blocos só onde o item tem cara** (evento com capa, material), com alternador de duas vistas lembrado por tela; blocos em grade `auto-fill`, capa, data em selo, situação e responsável com avatar. No celular, lista compacta de 60 a 72 px, sem alternador.
- **Paginação padrão** em toda lista: rodapé "1–50 (de N)", "Por página [25 · 50 · 100]", Anterior e Próxima; padrão alto no computador (50) e "Carregar mais" no celular. Confira o teto real da API antes de oferecer um tamanho (oferecer 200 onde o servidor corta em 100 vira erro 422).
- **Cabeçalho uniforme:** todo controle com a mesma altura e o mesmo raio; no máximo título + busca + filtros à vista + vista + ação primária. Tema, Sair, perfil e escopo ("Todos os eventos") saem dele: menu da conta no pé do menu lateral e seletor de escopo único no topo do menu.
- **Filtro à vista no computador; gaveta de filtros só no celular** (13/11/2026: a gaveta lateral cobria a lista para mostrar um ou dois campos): até 3 filtros ficam na barra do topo como controles de 36 px que agem na hora (seletor "Cidade: Todas", pílula que liga e desliga, UM campo de período com atalhos "7 dias · 30 dias · Este mês · Tudo"); com 4 ou mais, um painel de ~320 px ancorado no botão "Filtrar", que não cobre a lista; filtro ligado vira chip removível ("Cidade: Maceió ✕") com "Limpar" quando há mais de um; só o celular tem a folha de baixo com os filtros.
- **Menu enxuto:** de 17 itens para ~7, em seções com título pequeno. Agrupar com título não basta (17 itens com 4 títulos continuam 17): telas irmãs viram **abas que são rotas** (link direto, voltar e a bolinha levam à aba certa; as rotas antigas redirecionam). **Aba troca de bloco; segmentado troca de filtro** (situação "A emitir · Enviados · Todos" é segmentado, nunca uma segunda linha de abas). Navegação principal fixa: com 7 itens não há o que aprender; a medição de uso fica nas abas de dentro das telas.
- **Modal é a exceção, página é o padrão** (critério na ordem): (1) desfaz? então não abre nada, age e mostra "Desfazer"; (2) é uma pergunta ou até 3 campos sobre algo que não volta? modal de confirmação; (3) criar, editar ou ver item de lista com até ~8 campos? **gaveta lateral** (480 a 560 px, a lista visível atrás, item na URL, folha de baixo no celular); (4) tem abas, mais de 8 campos ou é um lugar a que se volta? página própria. Confirmação grave, dinheiro e código continuam modais.
- **Hover tem que aparecer:** todo alvo clicável muda de fundo ou cor de forma visível, no hover, no toque e no foco (o X do modal que não muda é defeito). Use tokens de realce com contraste de pelo menos 1,25:1 entre antes e depois do hover. **Não confie no olho: meça com script** (computed style antes e depois do `mouse.move`, mais `Tab` e `mouse.down`); o jsdom não calcula CSS.
- **Contra a cara de planilha:** capa e avatar no lugar de texto cru, barra de vendido x lotação, número grande com frase ("Sobrou para o produtor: R$ ..."), faixa "pede sua atenção" no lugar de contadores soltos, ingresso desenhado como ingresso, estado vazio com ilustração, mascote na saudação. Gráfico de 3 séries: verde e neutros (verde, ouro e coral juntos reprovam para daltonismo no escuro).
- **Login:** duas metades (arte e formulário), fundo animado de React Bits só ali, carregado por `import()` só a partir de 1024 px, com versão parada de CSS quando houver movimento reduzido, economia de dados, pouca memória ou WebGL indisponível; um efeito por função.

### Modal e menu em `<dialog>`

Um módulo só, `src/js/dialogo.js`, para menu, gaveta, busca e zoom.

- **Rolagem:** `lenis.stop()` ao abrir e `start()` ao fechar. O navegador pode fechar um `<dialog>` no Esc sem o evento `cancel`, então um ouvinte de `close` em captura, no documento, religa a rolagem quando não sobra nenhum aberto.
- **Entrada e saída:** `clip-path` com `transition` e `@starting-style` na entrada; na saída, um atributo `data-saindo` e o `close()` depois do tempo da animação.
- **Painel que rola por dentro:** `data-lenis-prevent`. O limitador da roda ignora `dialog`.

### Header

- **Invisível só no alto da página e só sobre a abertura.** Mais abaixo, a foto clareia e o menu deixaria de ser lido. Depois de uns 24 px, ele é sólido. O atributo já sai no HTML gerado, para não piscar.
- **Some ao descer e volta ao subir,** e não some enquanto um painel estiver aberto.
- **Barra presa da página** (filtros, por exemplo): `.header:not([data-escondido]) ~ main .barra { top: var(--h-header); }`, para subir junto quando ele some.

### Esqueleto de espera

Sintoma: ao mudar de página, o rodapé aparece primeiro e o conteúdo surge depois, empurrando tudo. A causa é o JS da página: ele é baixado por `import()`, busca os dados e só então monta o conteúdo. Até lá, o `<main>` está vazio. Um esqueleto inserido pelo próprio JS não resolve, porque chega junto com ele.

1. **O esqueleto mora no HTML**, dentro do container que o JS vai encher: `<div class="grade" data-grade><!--espera:cartao:8--></div>`. `tools/partes-da-casca.js` troca o comentário por `src/casca/espera-cartao.html` repetido 8 vezes, no `dev` e no `build`. Uma espera pode conter outra. Gerador de tema (Shopify) faz a mesma troca nas páginas que copia.
2. **A forma é a do conteúdo final:** o cartão com a foto na proporção e as linhas de texto, a coluna de compra com o botão na altura do botão, a fileira de horários com os botões do tamanho deles. Usar as classes do componente de verdade (`.peca`, `.galeria__foto`, `.quadro`) para herdar a grade e o tamanho, e uma classe de espera (`.espera`, `.espera-linha`) para a névoa e o pulso.
3. **O JS não precisa limpar nada:** ao montar, ele troca o `innerHTML` do mesmo container. Conferir cada caminho que não troca (lista vazia, erro, estado sem dado): o esqueleto ficaria parado ali.
4. **Enquanto há esqueleto, a página ocupa ao menos uma tela** (`main:has(.espera) { min-height: 100svh }`): o rodapé nunca aparece antes do conteúdo. Com o footer que sobe por cima da última seção, somar a altura que ele avança (`+ var(--rodape-h)`): numa página cuja última seção ainda está escondida, ele subia por cima do próprio esqueleto e entrava na tela.
5. **Bloco que muda a forma conforme a página** (uma coleção que abre com foto, outra só com título) guarda o espaço certo desde o primeiro instante: um script curto logo depois do bloco decide pela URL, sem esperar o JS.
6. **Pulso lento e discreto** (opacidade, 1,8 s), sem pulso com movimento reduzido ou com a pausa de animações. É a névoa da marca, não um brilho que corre.
7. **O JS reaproveita o mesmo esqueleto** (`import esperaCartao from "../casca/espera-cartao.html?raw"`), para não haver dois desenhos.

Cobrado por dois detectores do `testa-tudo` ([qualidade.md](qualidade.md#o-que-cada-teste-prova)): `j.vazios(url)`, que liga a página sem JS e lista os containers com `data-*` vazios (quem é vazio de propósito leva `data-espera-nao`), e `j.pulos()`, que soma os pulos da página depois de abrir (acima de 0,05 é defeito). O detector de pulos só mede no computador: na emulação de celular, o Chrome não anota pulo nenhum. Pulo de elemento que já saiu da página não conta (o navegador não diz quem foi): é o esqueleto sendo trocado pelo conteúdo. Na dúvida sobre um pulo, filmar a troca de página quadro a quadro (`Page.captureScreenshot` em sequência logo depois do `Page.navigate`) e olhar.

### Troca de página

Em site de várias páginas, `@view-transition { navigation: auto; }` com o header nomeado (`view-transition-name`) deixa o topo parado e troca o miolo, sem JS. No console, `Transition was aborted ... Viewport size changed` é pista de estouro real de largura naquela tela: tratar como defeito, não como erro de transição.

### Coisas que estouram só em tela pequena

- **Grade com `align-items: start` e botões sem quebra:** o item cresce além da coluna. Usar `grid-template-columns: minmax(0, 1fr)`, `align-items: stretch` e `flex-wrap` na barra de botões.
- **Mensagem de erro entre dois botões:** fica espremida. Em tela estreita, `order: -1; flex: 0 0 100%`, em cima dos botões.
- **Barra com rótulo, contador e lista:** contador com `overflow: hidden; text-overflow: ellipsis`, e selo do filtro no canto do botão, para a largura não mudar ao filtrar. Conferir de 320 a 760 px, com e sem filtro. Cuidado com a especificidade: `.bt > span` ganha de `.selo`.
- **Texto digitado pela pessoa ou longo sem espaço** (e-mail): `overflow-wrap: anywhere`.
- **Botão fixo sobre ação da página:** ele sobe ou sai naquela página (`body[data-pagina="x"] .flutuante { ... }`). `j.cobertos()` acusa.

### Foto de catálogo no cartão

Fundo ruim e uniforme se resolve sem tocar no arquivo: vinheta em CSS que puxa o produto para fora do fundo, posição por tipo de produto, e a foto inteira só na página do produto, onde ela é prova. Testar nos produtos mais difíceis, como os da mesma cor do fundo.

### Peças pequenas

- **Link com sublinhado próprio** (pseudo-elemento de ponta a ponta): `width: fit-content`. Sem isso, grid ou coluna flex esticam o link e a linha passa do texto.
- **Barra presa embaixo** (compra, cookies): `scroll-padding-bottom` enquanto ela está na tela, para o foco do teclado não ficar atrás.
- **Elemento inclinado (adesivo):** só ao lado de outro. Sozinho numa coluna centrada, parece torto.

## Página de produto

Técnicas de lojas anteriores, de produto de consumo. O princípio se aplica; o conteúdo muda com o produto: em roupa, tamanho e condição; em serviço, o que está incluído.

- **Mídia:**
  - palco quadrado, com a imagem ocupando o quadro inteiro;
  - miniaturas na largura toda, uma coluna por imagem;
  - os números do rótulo ao lado do palco.
- **Header:** com a cor do fundo da compra (parece transparente) e sem linha embaixo.
- **Quantidade:**
  - as quantidades de verdade da loja (avulsa e packs), em cards que só dizem a quantidade;
  - o total aparece uma vez, com uma linha que o explica, e o botão só diz "Adicionar". Menos é mais.
- **Preço:**
  - sempre por uma função única, com os centavos menores e elevados em todo lugar, inclusive texto corrido e botões;
  - nenhum seletor de texto pode pegar o span dos centavos.
- **Esgotado claro de primeira:** selo forte, produto em cinza, preço apagado e "Avise-me".
- **Três cartões abaixo,** com o que mais pesa na decisão (na Rucá, sabor ou uso, ingredientes e informação nutricional):
  - no mesmo fundo da compra, só com contorno;
  - o mesmo esqueleto nos três: título grande, conteúdo curto e o fecho no pé, alinhado nos três.
- **Detalhe longo** (ingredientes, especificações, materiais):
  - no cartão, em destaques;
  - a lista completa e a tabela inteira ficam num painel com duas abas, como o da Rucá ("Ingredientes" e "Tabela nutricional"); cada link abre a sua aba.
- **Aba de detalhe:**
  - grupos com contagem;
  - cada item com um ícone próprio em SVG, no traço do sprite, mais o nome e a função;
  - embaixo, a lista oficial, quando houver rótulo ou ficha que valham;
  - os dados vêm do catálogo por uma função sem DOM, que também gera o HTML estático.
- **Abas no padrão acessível:** `role="tablist"`, `tab` e `tabpanel`; setas, Home e End trocam de aba; tabindex móvel.
- **Topo do painel:** fica preso, com o X e as abas, e tem uma linha embaixo; sem ela, o que rola por baixo parece cortado.
- **Nada repetido** entre a compra e os cartões. Se sobrar espaço, usar uma informação nova e aprovada (a ocasião de uso, por exemplo).

## Imagens de produto

- **Produto com rótulo fiel:** gerar só o cenário (Codex CLI, com a área vazia descrita em porcentagem) e compor o arquivo oficial por cima, inteiro, com sombra de contato e sombra projetada coerentes com a luz.
- **Posição e escala:**
  - medir a superfície onde o produto pousa pela cor dos pixels (topo do pódio, borda da mesa);
  - tirar a escala dos objetos de cena (bola, copo, bandeja);
  - renderizar duas ou três escalas lado a lado e escolher.
- **Série variada:**
  - cada foto da galeria com composição, cenário e tom próprios;
  - uma série com a mesma cena trocando só a variação do produto é rejeitada, e tons repetidos (três céus azuis) também.
- **Produto no card da vitrine:** inteiro e no centro, com a altura em porcentagem da altura do card e a largura pela proporção (`aspect-ratio`). Largura fixa com o produto preso embaixo corta a embalagem em tela baixa. Deixar folga para a pose do hover (inclinado e erguido).
- **Quadros de vídeo de cliente:** não entram na galeria de produto, porque destoam do estúdio. As pessoas reais ficam nos vídeos.
- **Sem gerador disponível:** desenhar as cenas em código (HTML com os ativos oficiais, fotografado no Chrome headless).
- **Saída:** AVIF e WebP em 300, 600 e 1200 px. Tirar do site as imagens que não aparecem em lugar nenhum.
- **Codex:** conferir que o arquivo do prompt existe antes de rodar (`test -s`). Com prompt vazio, ele só responde e gasta cota.

## Verificação que pega esses defeitos

O kit já faz boa parte disso: `npm run testa` (páginas), `npm run testa:estados` (o que só aparece depois de interagir) e `npm run testa:fluxos`. Ver [qualidade.md](qualidade.md#o-que-cada-teste-prova). O resto ainda se confere à mão:

- **Testar três condições separadas:**
  - celular com toque;
  - computador largo;
  - janela estreita de computador com mouse. Ela tem o layout do celular e o hover do computador, e é onde aparecem os conflitos.
- **Medir em número e olhar a captura:** centro dos cards, altura coberta pela arte, rolagem lateral, distância entre peças fixas. Número certo com imagem errada ainda é defeito.
- **Rolar com o mouse parado** em cima das peças interativas.
- **Posição da ação principal:** em 1366×700 (notebook) e em 1440×900, sem rolar, medir o `bottom` do botão principal de cada passo (entrar, cadastrar, reservar, publicar...) contra `innerHeight`. Botão abaixo da janela é defeito, mesmo com tudo "funcionando".
- **Páginas irmãs lado a lado:** abrir as capturas de topo das páginas internas juntas e conferir se alguma é cópia da outra (mesmo esqueleto, só com outro texto).
- **Largura do documento em 360 px:** `document.documentElement.scrollWidth` igual à largura real da janela, nunca a `innerWidth`: em emulação de celular, o `innerWidth` cresce junto com o conteúdo e a conta sempre dá zero (`j.estouro()` já mede certo). Uma palavra comprida que não quebra (nome de variável, e-mail) já estoura a tela.
- **Estados, não só páginas:** último passo de formulário, mensagem de erro, gaveta aberta, filtro ativo, lista vazia, e-mail comprido. Os estouros reais costumam estar aí.
- **Comportamentos que ligam por medida (cortina do rodapé, seção presa, barra fixa):** testar em várias ALTURAS de janela, não só em uma. Um limite como "cabe em 94% da janela" muda de lado sem aviso entre 700 e 900 px.
- **Tocar nos botões com emulação de toque** e ver se algum estado fica preso depois do toque.
- **Peça dentro de seção sticky** (como a última seção sob o footer): a captura recortada pode pegar o lugar errado quando a seção cresce. Conferir pela posição em número ou por uma captura da tela inteira.
- **No roteiro de capturas:**
  - declarar `prefers-reduced-motion`;
  - pedir quadros depois de rolar por script (o headless só pinta quando alguém pede um quadro).
- **O que os testes ainda não medem** (fonte aplicada, conteúdo invisível sem JS, página sem WebGL, movimento reduzido de verdade, palavra partida, números iguais, cartão com link): [qualidade.md](qualidade.md#conferir-à-mão-ainda-sem-detector).
- **Modo de desenvolvimento com CSS injetado por JS:** o estado inicial pode diferir do build. Preferir regras que leem a geometria atual (o card mais perto do meio) a regras que dependem da ordem dos eventos.

## Prévia publicada

Passo a passo, o que ler no servidor e o que já deu errado: [publicar-previa.md](publicar-previa.md).
