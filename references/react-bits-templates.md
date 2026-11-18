# O método dos templates do React Bits Pro

O que os 18 templates públicos do React Bits Pro ensinam sobre **como se constrói** um site que fica bom. Não é catálogo nem modelo: cada template aparece só como caso que explica uma técnica. As regras valem para qualquer marca e tipo de site; a identidade continua sendo do projeto ([direcao-criativa.md](direcao-criativa.md)).

Levantado em 17/11/2026: a página de docs de cada template e a demo pública, medida com a sonda em 1440×900 e 390×844. "Medido" saiu do navegador; "lido" saiu do que a demo serve a qualquer visitante; "estimado" é conta feita sobre captura. Os templates são produto pago: aqui só há técnica, proporção e medida, nenhum trecho deles.

## Sumário

- [Mapa dos 18](#mapa-dos-18)
- [O método](#o-método)
- [Defeitos que os próprios templates têm](#defeitos-que-os-próprios-templates-têm)
- [Receitas de mecânica](#receitas-de-mecânica)
- [Escolher e adaptar um template ou bloco](#escolher-e-adaptar-um-template-ou-bloco)
- [Como estudar um template](#como-estudar-um-template)

## Mapa dos 18

Só para achar um caso. Todos declaram Next.js, React, TypeScript, Tailwind v4 e Motion; a coluna da stack lista o que cada um declara além disso. Demo em `https://rbp-<slug>-template.vercel.app/` (o `portfolio` fica em `rbp-portfolio.vercel.app`).

| Slug | Tipo | Assinatura | Declara além da base |
|---|---|---|---|
| `saas` | SaaS | Moldura de janela com aba de menu; paisagem pontilhada que é uma foto | Lenis |
| `ai-saas` | SaaS de IA | Caixa de prompt como ação principal; galeria que se monta pelas laterais | GSAP, Lenis, React Three Fiber |
| `ai-app` | App de IA | Campo orbital de fotos; vídeo que cresce; celular preso que troca de tela | WebGL, Three.js, React Three Fiber, Lenis, next-themes |
| `shader` | SaaS | Fluido de cor no topo; faixas de luz que mudam a cada ato da história | WebGL, next-themes |
| `cloudlight` | SaaS (arquivos) | Céu com nuvens e janela de vidro do produto dentro dele | React 19, WebGL2, next-themes, Lucide |
| `arclight` | SaaS (mensagens) | Luz que sobe do pé; a grade acende no caminho do cursor | React 19, WebGL2, Lenis, next-themes, Lucide |
| `agency` | Agência | Toda foto em pílula; case revelado por mancha líquida, com ondas sob o cursor | GSAP, Lenis, React Three Fiber |
| `portfolio` | Portfólio pessoal | Preto e branco; retrato que troca de foto pelo lado de onde o cursor veio | WebGL, Lenis, Matter.js, next-themes |
| `imageworks` | Produto de imagem | Fita 3D de imagens; cenas presas que encenam o uso do produto | React 19, Three.js, WebGL, Lenis, next-themes, Lucide |
| `8-bit` | Landing de produto | Degrau de pixel em botão, ícone, glifo, fundo e fogo; texto em sans normal | WebGL, Cobe, Lenis, next-themes |
| `wireframe` | Landing de produto | Prancheta: trilhos, alças de canto e um campo ASCII em doses | WebGL, Lenis, next-themes (Next.js 15+) |
| `minimal` | Landing de produto | Preto, branco e um amarelo; retícula que segue o cursor | Lenis, React Three Fiber |
| `security` | Segurança | Chanfro e cruzes de canto; toda imagem vira "sinal" (duotone, ASCII, pixel) | WebGL, Three.js, React Three Fiber, Lenis, next-themes |
| `finance` | Banco digital | Aurora quente dentro de marcas de corte; serifa com itálico | Three.js, Lenis |
| `sparkdesign` | Ferramenta de design | Nenhum canvas: foto, raio, sombra e o produto em uso num cartão | React 19, next-themes, Lucide |
| `genai` | App de IA | Notebook 3D feito em código que abre com a rolagem e fecha no fim | React 19, Three.js, WebGL2, Lenis, next-themes, Lucide |
| `reworker` | App de treino | Moldura fixa com aba do logo; foto em duotone sob ASCII que o cursor limpa | React 19, WebGL2, Lenis, next-themes, Lucide |
| `agentframe` | Plataforma de agentes | Paisagem em pixel com o produto rodando por cima; grade de linhas finas | React 19, Canvas 2D, next-themes, Lucide |

`genai`, `reworker` e `agentframe` são os mais novos. Neles o autor largou as bibliotecas de efeito (GSAP, React Three Fiber) por WebGL2 ou Canvas 2D direto, encolheu o título e passou a tratar a acessibilidade como recurso. É a direção do método abaixo.

## O método

Em uma frase: **escolher um objeto ou atividade do produto para ser o palco, construir esse único gesto bem, ligá-lo a um número de progresso, e gastar o resto em tipografia contida, tokens e reservas**. Cada regra traz o que foi medido e como aplicar fora de SaaS.

Estas regras dizem **como construir**. **Que lugar construir** (o mundo do site, do qual o objeto, o efeito e o botão descendem) se decide antes, em [mundo-do-site.md](mundo-do-site.md): relidos por essa lente, os 18 se distinguem pela moldura, pelo material, pela luz e pelo que a rolagem faz, e quase nunca pelo botão.

### Identidade

**1. O efeito carrega o produto.** Antes de escolher um efeito, perguntar que objeto ou atividade do negócio pode ser a abertura. Nos templates antigos o efeito é fundo (fluido, partículas) e o título tem de 84 a 115 px. Nos novos, a tela do notebook mostra o app, a paisagem hospeda uma área de teste, a janela do produto mora dentro do céu, e o título cai para 53 a 80 px (num deles, o h1 de 53 px é menor que o h2 de 60 px). Fora de SaaS: a lata, o prato, a planta, um documento que se monta. Efeito que não mostra o que a marca faz é enfeite.

**2. Uma unidade mínima, em todas as camadas.** A ideia geradora ([padrao-visual.md](padrao-visual.md#5-a-ideia-geradora)) vira uma medida que se repete. Caso: um degrau de 4 px gera o canto do botão, do avatar, a grade do ícone, os glifos, o fundo e o shader do `8-bit`; uma linha de 1 px gera trilhos, bordas e alças de 7 px no `wireframe`; um chanfro de 9, 12 e 28 px (conforme a peça) e cruzes de canto no `security`. Conferir a ideia camada por camada: letra, cor, borda e forma, ícone, imagem, textura, movimento, hover, rótulo, abertura e fecho. Camada em que a ideia não aparece é camada genérica.

**3. A estética mora nos objetos e nas bordas; o texto corrido fica neutro.** O `8-bit` não usa fonte de pixel: título e parágrafo são sans comum, e o pixel está em botão, ícone, marcador e fundo. Vale para qualquer tema forte (retrô, técnico, artesanal): o tema vai para moldura, botão, ícone, marcador, separador e rótulo curto. Parágrafo de 16 a 18 px, entrelinha de 1,5 a 1,6, sem estilização.

**4. Uma ideia de efeito, em várias doses.** O mesmo campo ASCII aparece a 100% na abertura, a 40% como textura do plano em destaque, numa placa na chamada final e a 22% num fundo (`wireframe`). A mesma retícula vem forte e amarela no topo e preta a 10% no fim (`minimal`). Quando surgir vontade de um segundo efeito, transformá-lo numa dose do primeiro: outra opacidade, outra cor do sistema, outro tamanho. Um lugar "barulhento" por tela.

**5. A página fecha rimando com a abertura.** Repetiu-se em todos os grupos estudados: o mesmo shader no topo e na chamada final, mais contido no fim (num caso, o teto da luz cai de 490–640 px para 215–300 px); o mesmo campo girado 180° no rodapé; o notebook que abre no início e fecha no fim; a mesma paisagem nítida em cima e borrada embaixo. Custa um componente reaproveitado. O acento também pode crescer até o fim: um botão no topo, a superfície inteira na última seção.

**6. O enquadramento é a identidade mais barata.** Uma moldura fixa com a aba do logo, trilhos laterais do topo ao rodapé, ou o canvas dentro de um cartão (respiro de 8 a 16 px da borda da tela, raio de 24 a 40 px) dão unidade a uma página de 10 mil px. O cartão transforma o efeito em objeto emoldurado, não em papel de parede. Decidir de propósito o que passa por baixo da moldura: conteúdo cortado por ela às vezes parece erro.

### Letra e cor

**7. Título proporcional: menor quando há mais ornamento.** Medido: muito ornamento, h1 de 56 a 60 px e 3,3 a 3,5 vezes o corpo (`8-bit`, `security`); ornamento médio, 88 px e 5,5 vezes (`wireframe`); só letra e espaço, 96 a 115 px e 5,3 a 6 vezes (`minimal`, `agency`). Com um objeto forte na abertura, o título fica em até uns 4vw. Título de cartaz e efeito forte na mesma tela competem. Tamanho em `clamp()`, não em salto por ponto de quebra: os que saltam (96 para 48 px) perdem o equilíbrio nas larguras do meio.

**8. Hierarquia por contraste de estilo, não por negrito.** Títulos em peso 400 a 500, tracking de −0,025 a −0,05em (mais apertado quanto maior), entrelinha de 1,0 a 1,13. A ênfase vem de **um** recurso, sempre o mesmo no site: uma palavra em itálico, a troca de família numa palavra-chave, a segunda linha em cinza, ou degraus de opacidade (100, 65, 50). Duas vozes têm papéis fixos: uma é a voz (título, número, citação), a outra é a informação (corpo, botão, rótulo), e a primeira nunca entra em botão nem formulário. Quando o tamanho cai, abrir a entrelinha e afrouxar o tracking (medido: 1,13 e −2,8 px aos 80 px; 1,18 e −1,5 px aos 55 px). Em português, entrelinha abaixo de 0,95 em duas linhas bate nos acentos: testar com o texto real.

**9. Base neutra, um acento com papel escrito, em cerca de 5% da área.** Os templates usam os mesmos cinco cinzas e se distinguem pelo que vem por cima. O acento marca o que importa agora (estado ativo, número-chave, plano recomendado, ação) e aparece em área grande uma vez só, na seção que carrega a tese ou no convite final. Escrever o papel do acento no padrão visual e **testar o acento como texto nos dois temas**: medido, um laranja de destaque em texto de 12 px no tema claro dá 3,56:1; o amarelo que acerta nunca vira texto sobre claro (daria 1,38:1), só fundo com texto preto. Para destacar um plano, uma seção ou a própria barra num gráfico, inverter fundo e texto ou mudar a forma (barra vazada), em vez de criar outra cor. Neutros e sombras puxam a temperatura da luz: sombra marrom sob luz quente, azul-marinho sob luz fria, nunca preta pura sobre luz colorida.

**10. Um tratamento só para todas as imagens, e a cor plena só no foco.** Fotos de origens diferentes viram série com um único tratamento aplicado por CSS ou shader: duotone da marca, preto e branco, ou escala de cinza com a cor da marca por cima em mistura. A cor original fica para o item ativo, o trabalho ou a foto que é prova. Duotone pede foto com bom contraste; em foto de produto para venda, não cobrir o produto.

### Movimento

**11. Uma curva por site e três durações.** A mesma desaceleração longa, `cubic-bezier(.22,1,.36,1)`, aparece na maioria dos 18; os outros também têm uma só. Durações por função: resposta de controle de 0,15 a 0,3 s, entrada de bloco de 0,6 a 0,9 s, contagem de 1,5 a 2 s; laços de 4 a 6 s. Mola só para o que segue o ponteiro. A curva tem temperamento e acompanha a estética: seca e curta (subida de 12 px) no técnico, macia e longa (20 a 40 px) no editorial. Declarar como tokens em `marca.css` e não inventar duração por componente.

**12. O título se lê no primeiro quadro.** A entrada do topo é uma linha do tempo única: os apoios (selo, subtítulo, ação, prova) entram em cascata, com passos de 60 a 200 ms, e tudo assenta em até cerca de 1,2 s. Contraexemplo medido: abertura de 1,8 s com o título só a partir de 1,4 s. Para animar o título, máscara de linha (a linha sobe de dentro de uma caixa com `overflow: hidden`) em vez de letra a letra. Depois, cada bloco entra uma vez só, com subida curta.

**13. O que segue rolagem ou cursor se suaviza pelo tempo.** Valor contínuo não usa duração fixa nem "x% por quadro" (que muda com a taxa da tela): usa decaimento pelo tempo, `v += (alvo − v) · (1 − e^(−dt/τ))`. Medido num caso: τ de 80 a 120 ms para o que acompanha a rolagem (fiel) e de 260 a 320 ms para o que acompanha o cursor (calmo). Dá para inverter no meio sem salto.

**14. Movimento contínuo para sozinho e tem interruptor.** Todo laço (troca automática, faixa, shader) para fora da tela, com a aba oculta e com movimento reduzido. Troca automática mostra quanto falta (barra ou anel de progresso) e **para de vez quando a pessoa escolhe um item**. Caso: uma troca de 5,5 s com cinco condições de parada; o valor está nas condições, não no tempo. A pausa geral no rodapé, que a skill já pede, cobre o interruptor.

**15. O que troca não mexe no layout.** Citações, frases e painéis que se alternam ficam empilhados na mesma célula da grade, com só o ativo visível: a altura é a do maior e nada pula. Texto que acende palavra a palavra usa tempo total fixo, não tempo por palavra.

### Rolagem

**16. Um número de progresso por seção, gravado em variáveis CSS.** O JS calcula o progresso (0 a 1) uma vez por quadro e escreve uma variável no contêiner; o CSS faz o resto com `calc()`. Caso: 365 elementos acendem com uma variável só, sem laço por elemento. Dispensa biblioteca de rolagem e funciona em HTML puro. A rolagem é do documento: página inteira dentro de um `div` com rolagem própria zera `scrollY` e quebra o que depende dele.

**17. Prender a tela só quando há mudança de estado a mostrar.** Antes e depois, montagem, pedido que vira resultado, doze opções que viram uma: sim. Frase de efeito: revelação comum, sem prender. Quando prender:

- **Altura proporcional ao conteúdo:** de 70 a 100% da altura da tela por estado que se lê, cerca de 25% por item que só passa, mais uma folga de entrada e saída. Medido: 420% para quatro estados; 70% por janela mais 60%; 26% por cartão mais 108%.
- **Zonas de repouso:** a troca acontece no miolo de cada trecho e o estado fica parado no resto (receita "janela de prender", em [Receitas de mecânica](#receitas-de-mecânica)).
- **Primeiro quadro nunca vazio:** cena que começa com tudo a zero vira uma tela inteira vazia (medido em dois templates; num deles, tela preta no celular).
- **Indicador e atalho:** linha, barras ou número mostram que há fim; os itens da lista ao lado são botões que pulam para o ponto.
- **Poucas:** uma por página, duas no máximo. Num template com quatro, a soma das alturas põe cerca de dois terços da rolagem com algo preso, e quem só quer o preço cansa.
- **A versão empilhada se escreve primeiro.** O efeito entra por cima, numa condição de "palco" (caso: tela de ao menos 1024×660 e sem movimento reduzido). No celular, encurtar ou ficar na lista.

### Canvas e shader

**18. O efeito ocupa uma zona e o texto, outra.** A luz sobe do pé até um teto; as nuvens ficam abaixo de meia altura; o campo nasce no canto oposto ao título. Onde o título fica sobre base chapada, o contraste estimado foi de 18,6:1; sobre o fluido, sem véu, de 1,5 a 2,2:1. A fronteira é decidida no CSS (uma variável por ponto de quebra) e o shader a lê: o layout manda, o canvas obedece. Sobre fundo animado, o menu é um objeto com fundo próprio.

**19. As cores do canvas vêm dos tokens CSS.** O shader recebe cores; nunca tem cor fixa no código. Lê as variáveis com `getComputedStyle`, observa a troca de tema no `<html>` e interpola a mudança (medido: 8 a 12% por quadro), sem recarregar. Trocar de tema, de coleção ou de cliente vira troca de tokens.

**20. A resolução acompanha a nitidez do efeito.** O que é desfocado (névoa, nuvem, aurora) roda de 30 a 50% da resolução e pode ficar em 30 quadros por segundo (medido: canvas de 501×366 numa área de 1393×1016 px). O que tem linha fina (grade, contorno) precisa da densidade real, com teto de 1,5 a 2. Estética de pixel roda bem a 24 quadros por segundo.

**21. Ciclo de vida completo em todo canvas.** Começar perto da tela (margem de 80 a 200 px), pausar fora dela e com a aba oculta, limitar o salto de tempo (50 ms), teto de quadros e de densidade, desenhar só quando algo mudou, liberar o contexto ao desmontar, e entrar com esmaecimento depois do primeiro quadro. Sem isso, três canvas numa página gastam a bateria do celular.

**22. Cada efeito tem três reservas.** [Como conferir](qualidade.md#conferir-à-mão-ainda-sem-detector).

- **Sem WebGL:** o contêiner já tem a cor ou um gradiente CSS que imita o shader parado, e o canvas só é anexado depois que o contexto existe. Nos casos medidos, uma reserva deixa a página intacta, outra perde a luz que era a identidade, e a que não existe derruba o site.
- **Movimento reduzido:** um quadro bonito escolhido à mão (não o instante zero) ou um layout alternativo que conta a mesma história (a cena presa vira título e grade; o vídeo ganha controles). O reset de CSS não alcança animação feita em JS: cada biblioteca consulta a preferência.
- **Toque:** efeito de cursor não existe no celular. A versão sem cursor precisa ser boa sozinha, ou ganhar equivalente (acender pela rolagem).

**23. Antes do shader, perguntar se uma imagem tratada resolve.** Um dos templates tem "cara de shader" com uma foto já pontilhada de 383 KB e nenhum canvas; outro é dos mais bem acabados sem efeito nenhum, só com foto, raio, sombra e microinteração. Canvas só onde ele é a assinatura.

### Produto e prova

**24. O produto aparece em HTML, com estado, não em imagem.** Um painel, uma janela ou um cartão construídos em DOM ficam nítidos, seguem o tema e se traduzem. Os melhores são operáveis: abas, seletor, uma execução que avança passo a passo, copiar com confirmação. Em SaaS, a tarefa principal em três ou quatro passos clicáveis, com dados plausíveis e coerentes entre si. Fora de SaaS, um simulador mínimo (frete, parcela, agenda). Texto pintado dentro de canvas não se lê nem se seleciona: só ilustração.

**25. Prova com dono, e uma fonte só para os números.** Cada número diz de quem é e de quando. O valor final já está no HTML e a contagem é enfeite. Todas as seções leem os números do mesmo arquivo. A prova sobe da mais ampla à mais específica (logos, depoimento com rosto **e frase**, número atribuído, caso com antes e depois). Sem prova real, não inventar: demonstração e franqueza no lugar. Sob toda ação de captura, uma linha diz o que acontece depois ("sem cartão", "resposta em um dia útil"). Em portfólio e agência, todo trabalho tem endereço próprio.

## Defeitos que os próprios templates têm

Medidos nas demos. Template profissional não é garantia: cada um destes passa por quem só olha o código. A técnica para evitar está em [padroes-de-marca.md](padroes-de-marca.md#fonte-carregada-que-não-aparece) e a conferência, em [qualidade.md](qualidade.md#conferir-à-mão-ainda-sem-detector).

| Defeito | Sintoma | Causa | Como conferir |
|---|---|---|---|
| **Fonte carregada e nunca aplicada** (11 dos 18) | O site sai na fonte do sistema e muda de cara entre Windows e Mac; o contraste de famílias planejado some | A variável da fonte é criada no `<body>`, e o token que a usa é resolvido no `:root`, onde ela ainda não existe | A família calculada do h1, do h2 e do parágrafo contra a lista de fontes carregadas |
| **Conteúdo que nasce invisível** (22 a 92 elementos nos 9 em que se contou; em dois, o h1) | Sem JS ou com JS lento, some; rolando rápido, telas inteiras vazias (num caso, 4 de 13 quadros pretos) | O estado inicial da animação (`opacity: 0`) vai no HTML do servidor | Abrir com o JS desligado e listar texto com opacidade zero; capturar rolando rápido |
| **Palavra partida no meio** | Uma linha termina no meio da palavra e a seguinte começa com o resto, no título ou no manifesto | Cada letra é um bloco independente, sem um invólucro por palavra | Capturar o texto animado em 360 e 390 px, depois da animação |
| **Título ilegível sobre o efeito** | Branco sobre fluido claro (estimado de 1,5 a 2,2:1); rastro do cursor que escurece o título no toque; acento em texto pequeno no tema claro (3,56:1) | Sem zona calma nem véu; efeito de cursor ouvindo toque e passando por cima do texto; acento nunca testado como texto | Contraste do título no ponto mais claro do efeito, nos dois temas; deslizar o dedo sobre a abertura |
| **Sem WebGL, o site inteiro cai** | Tela branca de erro no lugar da página | O renderizador lança erro sem contexto e nada o segura | Abrir com o WebGL desligado |
| **Movimento reduzido pela metade** | A cena presa, a contagem e o shader continuam com a preferência ligada (captura idêntica à normal) | Só o CSS e a rolagem suave obedecem; as animações em JS não consultam a preferência | Capturar com a preferência ligada e comparar com a normal |
| **Números que se contradizem** | Quatro contagens de clientes diferentes na mesma página; captura pega a contagem no meio ("149+" de 150); contador que chega como zero no HTML | Número digitado em cada seção; valor final só existe depois da animação | Listar todos os números da página lado a lado; ler o HTML sem JS |
| **Trabalho sem endereço** | Cartão com cursor de clique que não leva a lugar nenhum, ou que abre uma camada sem URL | Cartão é um `div` clicável; o caso não tem página | Cada cartão é um link com `href`, e o Tab chega nele |
| **Título cortado** | Reticências no meio da última palavra; duas palavras coladas no celular | `nowrap` com reticências em título; quebra de linha escondida no celular sem espaço antes | Ler cada título em 360 px |
| **Página que rola dentro de uma caixa** | A barra do navegador não recolhe no celular; a sonda mede altura de uma tela e rolagem zero | O conteúdo todo está num `div` de altura de tela com rolagem própria | `document.documentElement.scrollHeight` maior que a janela |

Outros riscos vistos, para não herdar ao adaptar: um canvas WebGL por cartão (aceitável com três, não com doze); biblioteca 3D inteira para um efeito de cursor em 2D (dobrou o peso da página); gráfico em SVG esticado sem proporção, ilegível no celular; rótulos de 8 e 9 px; logos de marcas reais e benchmark com concorrentes nomeados, que só existem como recheio de demonstração.

## Receitas de mecânica

A técnica em palavras, sem o desenho. Servem à ideia da marca da vez. Todas precisam das três reservas da regra 22.

**Campo orbital.** Anéis concêntricos de ladrilhos com raio proporcional ao maior lado da tela, fases iniciais diferentes e período próprio: os de fora giram mais devagar, o que dá profundidade sem 3D. Cada ladrilho é uma janela para uma imagem um pouco maior, que parece deslizar por dentro ao girar. Uma máscara radial deixa o centro vazio para o título. A velocidade da rolagem soma um reforço suavizado ao giro. Sem WebGL, cabe em uns 30 elementos com `rotate` e `mask-image`.

**Ondas de água sob o cursor.** Um conjunto fixo de "pinceladas" (gradiente radial) é reciclado: a cada poucos pixels de movimento, a próxima é posta sob o ponteiro e, a cada quadro, cresce, gira e perde opacidade. Elas são desenhadas num alvo de meia resolução, usado como mapa de deslocamento das coordenadas da foto. Custo fixo, sem simulação de fluido.

**Máscara de borda com ruído que cresce com a rolagem.** O progresso vira um raio em pixels. Cada pixel compara sua distância ao centro com o raio, numa transição curta, e a borda é deslocada por ruído animado: sai uma mancha que respira, não um círculo. Sem shader, um `clip-path` animado dá a versão simples.

**Troca de foto pela borda de onde o cursor veio.** Duas imagens com a mesma composição. Na entrada do ponteiro, achar a borda mais próxima (e refinar pela direção do movimento nos primeiros instantes). Um gradiente nessa direção, somado a ruído, vira uma frente irregular que atravessa a imagem. A ondulação e o escurecimento da frente têm forma de sino: zero no começo e no fim. O progresso persegue o alvo por decaimento, então inverte no meio sem salto; na saída, a frente recua pela borda de saída. No toque, trocar por toque explícito e garantir a volta. O mesmo cálculo serve a um realce de lista que "vem de onde o cursor veio".

**Campo ASCII em doses.** Dividir a área em células de uns 10 px, calcular uma luminosidade por célula (ondas somadas, ou a luminância de uma foto), somar uma matriz de pontilhado ordenado, quantizar em poucos níveis e desenhar um glifo por nível, por geometria. Sobre foto, multiplicar pela diferença entre a amostra nítida e a borrada: os caracteres somem nas áreas lisas e ficam nas bordas. O mesmo componente aceita opacidade, escala e modo transparente, para servir de imagem, textura e fundo.

**Cursor que limpa.** Uma grade de "umidade" de baixa resolução: o ponteiro carimba círculos ao longo do trajeto (interpolando para não deixar falha), a umidade se espalha para os vizinhos e evapora em cerca de meio segundo. Onde está úmido, o shader tira o tratamento e devolve a foto original.

**Grade que acende no caminho do cursor.** Uma grade desenhada em CSS dá a textura sempre. O shader desenha a mesma grade, alinhada, e só ela acende: a posição do mouse entra numa fila curta de pontos, cada um com peso que cai com a idade, e cada célula acende conforme a distância ao rastro, com uma intensidade fixa sorteada por célula. O cursor revela uma estrutura que já estava lá, em vez de deformar a imagem.

**Degrau único de pixel.** Botão com canto em escada: `clip-path: polygon(...)` com vértices em múltiplos do passo. Como a borda CSS não segue o recorte, usar duas camadas com o mesmo polígono, a de trás na cor da borda e a da frente 1 px para dentro (vale para qualquer chanfro). Ícone no mesmo degrau sem redesenhar: rasterizar o ícone vetorial num canvas pequeno, com suavização, e ampliar sem suavização (`image-rendering: pixelated`), relendo a cor ao trocar o tema. Shader no mesmo degrau: arredondar a coordenada para a grade antes de qualquer cálculo e usar faixas de cor sem degradê.

**Foto em pixel com paleta fixa.** Desenhar a foto num canvas pequeno, aplicar pontilhado ordenado e trocar cada pixel pela cor mais próxima de uma paleta curta; ampliar sem suavização. O processamento roda uma vez por redimensionamento; só a parte viva (a água, por exemplo) se redesenha, em faixas deslocadas por senoides.

**Janela de prender com troca no miolo.** Seção alta com miolo `sticky`. Dentro de cada trecho, a troca de estado só acontece entre 24% e 76%, com curva suave; no resto, o estado fica parado. Quando a rolagem para por um instante (140 ms), encaixar no estado mais próximo.

**Tambor de janelas.** Cada painel gira em torno de um eixo que fica atrás dele: afastar, girar em X, trazer de volta. O ângulo é a distância do painel até a posição atual vezes um passo fixo; painel distante some e escurece. Ligado à janela de prender acima, com a lista ao lado servindo de navegação.

**Calendário que acende por uma variável.** Cada item recebe a própria posição numa variável (`--i`, de 0 a 1) e o contêiner recebe o progresso (`--p`). A opacidade de cada um é `calc((var(--p) - var(--i)) * N)`, com N definindo a largura da janela de transição. O JS só atualiza `--p`.

**Moldura fixa por sombra.** Um elemento fixo, recuado da borda, com raio e sem receber cliques, leva `box-shadow: 0 0 0 100vmax` na cor do fundo: pinta tudo fora do retângulo arredondado. Sobre o fundo ela é invisível; aparece quando passa foto por baixo. A aba do logo é um SVG na cor do fundo, com cantos concêntricos aos da moldura.

**Cena que cresce de miniatura a tela cheia.** A escala inicial sai do tamanho real do contêiner. Para o canto parecer constante durante a escala, animar o raio como raio ÷ escala. Mídia só toca se estiver visível **e** com o progresso acima de um limite.

**Peças pequenas.** Raio de cartões aninhados: externo = interno + respiro. Imagens de proporções diferentes com a mesma altura, lado a lado: `flex-grow` igual à razão largura ÷ altura de cada uma. Hover em duas velocidades: a moldura responde em 0,4 s e a imagem de dentro em 0,7 s. Fundo de vidro com reserva opaca por `@supports`.

## Escolher e adaptar um template ou bloco

Dentro do fluxo da skill, o template entra **depois** do padrão visual (etapa 4), nunca no lugar dele: é reserva e atalho de execução, e o mundo do site já está decidido quando ele chega ([mundo-do-site.md](mundo-do-site.md#react-bits-reserva-e-atalho)). Instalação e chave: [react-bits.md](react-bits.md).

1. **Escolher pela mecânica, não pela aparência.** Com o mundo, a ideia geradora e os gestos definidos, procurar no mapa o caso cuja técnica serve àquele mundo (uma cena presa que mostra mudança de estado, um efeito em doses, um produto em HTML). Se a escolha é "porque é bonito", ainda falta a ideia.
2. **Separar o que fica do que sai.** Fica: estrutura de seções, mecânica de rolagem, ciclo de vida do canvas, componentes acessíveis. Sai: paleta, fontes, textos, fotos, logos e números de demonstração, e a combinação de assinatura (moldura mais duotone mais ASCII é a identidade de quem a criou). Levar o princípio: "um enquadramento fixo", "um tratamento próprio de foto".
3. **Trocar o objeto.** Perguntar qual objeto ou atividade **desta** marca ocupa o lugar do que o template mostra (regra 1). Sem resposta, a mecânica não serve.
4. **Religar aos tokens do projeto:** cores do canvas, curva e durações, raios, a unidade mínima.
5. **Passar pela lista de defeitos** acima antes de mostrar: os templates trazem vários de fábrica, e o primeiro é a fonte.
6. **Stack.** Usar um template inteiro é adotar Next.js, Tailwind v4 e Motion. Em site de HTML, CSS e JS puros, o template é só estudo: as receitas acima se escrevem à mão, e as mais novas já usam só CSS, Canvas 2D ou WebGL direto.
7. **Teste final:** trocando nome e logo, serviria para qualquer empresa? E parece com o template? Se sim para qualquer uma, não acabou.

O código do template é material pago: não vai para repositório público ([react-bits.md](react-bits.md#stack)).

## Como estudar um template

Foi o método que gerou este arquivo; repetir quando sair template novo.

1. **Ler a página de docs:** stack declarada, recursos e seções. É a intenção do autor. A stack declarada nem sempre é a carregada (um caso não declara a rolagem suave que usa): o que vale é o medido.
2. **Rodar a sonda** ([estudo-do-nicho.md](estudo-do-nicho.md#3-triar-com-a-sonda)): `node assets/estudo/sonda.mjs sites.json <saída> --mode triage`, depois `--mode deep` nos que interessam. Olhar todas as capturas, do computador e do celular.
3. **Medir a fonte aplicada:** no `relatorio.json`, a lista `fontes` e a família calculada dos títulos. Lista vazia com fonte declarada é o defeito número um.
4. **Capturar o que a sonda não cobre:** tema claro (ela usa o do sistema), WebGL desligado, movimento reduzido e o cursor passando pela abertura.
5. **Anotar o mundo em uma frase e as camadas** ([quais](mundo-do-site.md#as-camadas-do-mundo)), olhando a rolagem inteira com os botões tapados, e só depois **a mecânica em palavras**. Separar medido, lido e inferido. Inferido não vira regra.
6. **Perguntar o porquê de cada escolha** (por que o título é pequeno, por que o efeito para ali) e escrever a regra para outro setor. Regra que só serve àquele site fica de fora.
7. **Procurar os defeitos**, com a tabela acima. O que o template erra ensina tanto quanto o que acerta.
