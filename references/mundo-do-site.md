# O mundo do site

Primeira decisão da etapa 4, antes de cor, letra e botão. Um site é um lugar com regras próprias. O que o torna reconhecível é esse lugar inteiro (onde a página acontece, de que é feita, como é iluminada, o que a rolagem faz), não o botão. Um botão diferente, um fundo diferente e umas animações sobre uma página comum dão um site comum com enfeite.

Serve para qualquer marca e tipo de site. Mundo não é WebGL, nem tema escuro, nem efeito: um site de conteúdo sóbrio tem mundo (papel, margem, régua, ritmo). Os templates do React Bits Pro aparecem aqui só como casos; medidas e mecânicas deles estão em [react-bits-templates.md](react-bits-templates.md).

## Sumário

- [As quatro escalas](#as-quatro-escalas)
- [O que os templates mostram](#o-que-os-templates-mostram)
- [Mundo ou papel de parede](#mundo-ou-papel-de-parede)
- [As camadas do mundo](#as-camadas-do-mundo)
- [Como achar o mundo de uma marca](#como-achar-o-mundo-de-uma-marca)
- [A peça herda](#a-peça-herda)
- [Testes](#testes)
- [Onde se erra](#onde-se-erra)
- [Em painel, sistema e site de conteúdo](#em-painel-sistema-e-site-de-conteúdo)
- [Do mundo ao guia vivo](#do-mundo-ao-guia-vivo)
- [React Bits: reserva e atalho](#react-bits-reserva-e-atalho)

## As quatro escalas

A ideia da marca mora em quatro escalas. Decidir de cima para baixo, e gastar o esforço nessa ordem.

| Escala | O que decide | Pergunta |
|---|---|---|
| 1. Mundo | O lugar: superfície, moldura, material, luz, escala, o que a rolagem faz | "Esta página é o quê?" |
| 2. Arco da página | Ordem, ritmo, onde fica o momento forte, abertura que rima com o fecho | "O que muda do topo ao rodapé?" |
| 3. Objeto | O protagonista: o produto, a imagem ou a atividade que ocupa o palco | "Quem a pessoa veio ver?" |
| 4. Peça | Botão, link, campo, cartão | "Como isto se comporta dentro deste lugar?" |

A peça herda do mundo (raio, linha, letra do rótulo, cor de ação, curva) e pode ser quase neutra. Quando só a escala 4 foi decidida, o resultado é o que o usuário chamou de engessado: "cria um botão diferente, um fundo diferente, umas animações, e fica nisso".

Caso que gerou a regra: o padrão visual pedia uma ideia que gerasse "botão, link e uma seção", e os gestos obrigatórios eram os dos botões e das peças pequenas. Os sites saíam com o esqueleto do kit e a identidade concentrada no hover.

## O que os templates mostram

Visto nas capturas de rolagem dos 18 (computador, 1440×900). O hover dos botões foi medido pela sonda em 11 deles; nos outros 7, não.

- **O botão é simples na maioria.** Em 13 dos 18, a ação principal é uma pílula ou um retângulo de canto arredondado, claro sobre escuro (ou o inverso), às vezes com uma seta. Nos 11 medidos, o hover muda o tom ou a opacidade em 10 a 20%, sobe 2 px ou cresce 2%. Duas exceções: num, o raio vira pílula (`minimal`); noutro, o botão de contato se alarga para mostrar o e-mail (`portfolio`).
- **Onde o botão tem forma própria, ela vem do mundo.** Em 5 há alguma forma: o canto em escada (`8-bit`), o chanfro (`security`), o botão de duas peças com o acento atrás (`saas`), o quadrado da seta separado (`shader`) e o raio que muda no hover (`minimal`). Nos dois primeiros, é a unidade mínima da página inteira aplicada também ao botão, não uma invenção do botão. Só no `minimal` o hover é parte da assinatura.
- **Tapando os botões, a identidade fica.** O que diz de que site é: a moldura fixa com a aba do logo, a prancheta de trilhos, o céu com a janela do produto dentro, o notebook que abre, a paisagem em pixel com o produto por cima, toda foto em pílula, o azul único sobre toda imagem.
- **O mundo some no meio em vários deles.** Na altura dos preços e das perguntas, parte dos templates vira uma página escura comum: a luz, o céu e o fluido ficaram na abertura e no convite final. Atravessam a página inteira os mundos feitos de **estrutura** (moldura fixa, trilhos, faixas hachuradas entre as seções, cruzes de canto, grade de linhas com rótulos numerados) e de **tratamento de imagem** (duotone, pílula). Luz e efeito, sozinhos, não atravessam.
- **Base escura e neutra em quase todos.** É hábito desse catálogo, não regra: três abrem claros (`reworker`, `saas`, `ai-saas`).

## Mundo ou papel de parede

| | Mundo | Papel de parede |
|---|---|---|
| O que muda | Estrutura, espaço, moldura, material, luz, escala, o que a rolagem faz, como o conteúdo é encenado | Só a tinta: o fundo, a cor, o hover |
| Tirando o efeito | A página continua sendo aquele lugar | Volta a ser a página do kit |
| Onde aparece | Do topo ao rodapé, em doses | Na abertura |
| O conteúdo | Está dentro dele (o produto dentro do céu, a foto sob a moldura) | Está por cima dele |

Teste rápido: desligar o canvas, o vídeo ou a animação de fundo e olhar a captura. Se nada mais mudou na estrutura (mesma barra de ponta a ponta, mesmas seções empilhadas, mesmos cartões), era papel de parede.

Casos: o mesmo campo de caracteres é mundo no `wireframe`, porque a página inteira é uma prancheta e o campo é a única imagem dela; seria papel de parede atrás de uma abertura comum. No `cloudlight`, o céu vira mundo porque a janela do produto está dentro dele, cortada pela borda do cartão, com as nuvens aparecendo através do vidro.

## As camadas do mundo

Responder às nove para a marca, em uma linha cada. Nem toda camada precisa de resposta forte: três ou quatro bem decididas já fazem um lugar; as outras ficam neutras de propósito. Camada sem resposta escrita sai com a cara do kit.

| Camada | Pergunta para a marca | Casos |
|---|---|---|
| **Onde acontece** | Qual é a superfície? Há moldura? O que fica fixo enquanto o resto passa? Onde mora o menu? | Moldura fixa recuada da borda, com o logo numa aba recortada dela (`reworker`). A página tratada como janela de aplicativo, com o menu pendurado na moldura (`saas`). Prancheta: fio lateral do topo ao rodapé e alças nas quinas das seções (`wireframe`) |
| **De que é feito** | Qual é o material e a unidade mínima que se repete? O que preenche o vão entre as seções? | Um degrau de pixel em botão, ícone, avatar e fundo, com faixa hachurada no lugar do espaço vazio (`8-bit`). Chanfro e cruzes de canto de desenho técnico (`security`). Foto, raio e sombra, sem canvas nenhum (`sparkdesign`) |
| **Como é iluminado** | De onde vem a luz? Qual a temperatura? O que tem sombra? O que muda entre os temas? | Luz quente que sobe do pé e volta como halo no plano em destaque (`arclight`). A luz sai da tela do objeto e pinta o teclado (`genai`). Preto e branco absoluto (`portfolio`). O tema troca o dia pela noite na mesma cena (`cloudlight`, `reworker`) |
| **Escala e câmera** | O que é grande e o que é pequeno? O enquadramento é de cartaz, de bancada, de ficha? Algo se aproxima? | Objeto grande e título pequeno (`genai`). Título de cartaz e quase nada além (`minimal`, `agency`). Miniatura que cresce até ocupar a tela (`imageworks`). Centro vazio para o título, com as fotos em órbita (`ai-app`) |
| **O que a rolagem é** | Rolar revela, viaja, monta, passa de cena? Ou só passa a página? | Abre um objeto no começo e fecha no fim (`genai`). Encena o uso: o pedido vira resultado, doze viram uma (`imageworks`). Aproxima o tempo: o dia, a semana, o ano (`reworker`). Só passa, sem efeito de rolagem, e está certo (`portfolio`, `sparkdesign`) |
| **Arco e rima** | Qual é o momento forte e onde fica? O que do topo volta no fim, e mudado como? | O acento começa num botão e termina como superfície inteira (`minimal`). O campo da abertura volta girado no rodapé (`8-bit`). A moldura da abertura reaparece no rodapé (`finance`). O "faça" vem antes do "entenda" (`agentframe`) |
| **Protagonista** | Que objeto ou atividade da marca ocupa o palco? Ele aparece funcionando? | A janela do produto dentro do cenário (`cloudlight`). Uma área de teste que se opera, sobre a paisagem (`agentframe`). O produto em uso, com comentário e cursor de outra pessoa (`sparkdesign`). O retrato (`portfolio`) |
| **Imagem** | Qual é o tratamento único de toda imagem? Onde a cor original volta? | Um duotone da marca sobre fotos de origens diferentes (`ai-saas`, `security`). Nenhuma cor de marca: a cor vem só das fotos (`ai-app`). Toda foto no mesmo recorte (`agency`) |
| **Voz** | Como falam os rótulos, os números e a microcópia? Que palavra só este lugar usa? | Rótulos numerados em mono e caixa-alta, de ficha técnica (`agentframe`). A porcentagem de leitura ao lado do menu (`ai-app`). Microtexto franco sob cada ação (`sparkdesign`) |

Medidas e técnica de cada caso: [o método](react-bits-templates.md#o-método) (enquadramento na regra 6, rima na 5, imagem na 10, zona do efeito na 18) e as [receitas de mecânica](react-bits-templates.md#receitas-de-mecânica). Levar a pergunta, nunca a resposta do template: moldura mais duotone mais caracteres é a identidade de quem a criou.

## Como achar o mundo de uma marca

1. **Listar o que a marca já tem de físico e de próprio:** o produto e a embalagem, o ofício e suas ferramentas, o lugar (balcão, ateliê, pista, sala), o material (papel, tecido, metal, massa), o gesto de uso, o objeto de bancada, o documento que ela produz (nota, ficha, laudo, cardápio), a hora do dia em que acontece.
2. **Escolher um e completar a frase:** "esta página é ___". Um lugar ou um objeto concreto, não um adjetivo. "Esta página é premium" não gera nada; "esta página é a mesa de corte do ateliê" gera superfície, material, luz e escala.
3. **Responder às camadas** a partir da frase. Se a frase não responde a pelo menos quatro, trocar de frase.
4. **Escrever o que o mundo proíbe.** Um lugar tem regras: o que nunca aparece nele (sombra, degradê, foto recortada, canto redondo) define tanto quanto o que aparece.
5. **Traduzir, não ilustrar.** O mundo é estrutura e regra, não cenário desenhado. A página da mesa de corte não precisa de uma foto de mesa: precisa de régua na margem, peças alinhadas pela borda e luz de cima.
6. **Propor duas ou três frases** quando houver dúvida, cada uma com o esboço da abertura, e deixar o usuário escolher vendo.

Três exemplos de método, de setores diferentes. São raciocínio, não modelo: outra padaria teria outra frase.

| | Padaria de bairro | Consultoria jurídica | App de treino |
|---|---|---|---|
| O que a marca tem | Fornada com hora marcada, papel de embrulho, balcão, lousa do dia | Pareceres, prazos, autos numerados, a mesa de reunião | A ficha de treino, o cronômetro, séries e repetições |
| A frase | "Esta página é o balcão na hora da fornada" | "Esta página é um parecer bem diagramado" | "Esta página é a ficha de treino presa na prancheta" |
| Onde acontece | Uma faixa fixa com a próxima fornada e o horário; o conteúdo passa atrás dela como a vitrine atrás do balcão | Folha com margem larga à esquerda, onde moram a numeração e as notas; nada de ponta a ponta | Folha quadriculada com um prendedor fixo no topo, onde fica o menu |
| De que é feito | Papel pardo, carimbo, giz | Papel, fio fino, numeração de parágrafo | Linha de tabela, caixa de marcar, número grande |
| Luz e escala | Luz quente e baixa de madrugada; o pão em tamanho real | Sem sombra nenhuma; texto em medida de leitura, títulos contidos | Luz chapada; o número da série é o maior elemento da tela |
| A rolagem | Passa o dia: da primeira fornada ao fim do estoque | Só passa, com o índice acompanhando na margem | Completa a semana: cada dia rolado se marca como feito |
| Protagonista | O pão do dia, com hora e quantidade | O caso resolvido, em fatos | A semana de treino, operável |
| O botão | Retângulo simples na cor de ação, rótulo na letra do carimbo | Texto sublinhado e um botão cheio discreto | Caixa de marcar grande; o botão comum é neutro |
| Sem canvas? | Sim | Sim | Sim |
| Seria papel de parede | Farinha caindo atrás de uma abertura comum | Colunas e balança de fundo | Foto de academia escurecida com título por cima |

## A peça herda

- O botão recebe do mundo o raio, a altura, a linha, a letra do rótulo, a cor de ação e a curva. Com isso decidido, ele pode ser um retângulo.
- Forma própria no botão só quando é a unidade mínima do mundo aplicada a ele (o degrau, o chanfro, a etiqueta). Nunca reduz a área de toque nem o contraste.
- O hover fala a língua do mundo e quase sempre é pequeno: troca de tom no que é seco e técnico, subida curta no que é macio. O gesto elaborado fica para onde houver motivo.
- O esforço que sobrava no botão vai para o header (a peça que mais carrega o mundo, porque está em toda tela), para o vão entre as seções e para o protagonista.
- As regras de toque, foco, contraste e peso do botão continuam valendo inteiras ([padrao-visual.md](padrao-visual.md#8-os-gestos), [padroes-de-marca.md](padroes-de-marca.md#o-peso-do-botão-conduz-a-pessoa)).

## Testes

Rodar no esboço do mundo, de novo no guia e de novo com o site montado. Roteiro e critério de reprovação: [qualidade.md](qualidade.md#o-mundo-do-site).

| Teste | Como | Reprova quando |
|---|---|---|
| **Recorte** | Capturar a abertura e uma seção do meio, com o logo e o texto escondidos | Não dá para dizer de que marca é; ou as duas capturas parecem de sites diferentes |
| **Botões neutros** | Trocar todo botão e hover por um padrão cinza e capturar de novo | A identidade sumiu: a ideia estava na escala errada |
| **Meio** | Olhar a quinta seção, ou a metade da altura da página, sozinha | Só a abertura e o fecho têm o mundo; o meio é a página do kit |
| **Troca** | Pôr outro nome e outro logo | Serviria para qualquer empresa do setor |

O teste da troca vale para a ideia desde o começo ([padrao-visual.md](padrao-visual.md#5-a-ideia-geradora)). Os outros três só se fazem com a página na tela: por isso o mundo é esboçado antes do guia.

## Onde se erra

| Erro | Sinal | O que fazer |
|---|---|---|
| Efeito de fundo vendido como mundo | Desligando o efeito, sobra o esqueleto do kit | Voltar às camadas: onde acontece e de que é feito vêm antes da luz |
| Mundo só na abertura | Reprova no teste do meio | Levar o mundo pela estrutura (moldura, fio, vão, rótulo, tratamento de imagem) e repetir o efeito em doses menores ([regra 4](react-bits-templates.md#identidade)) |
| Cenário no lugar de regra | Ilustração do tema por toda parte; o conteúdo virou legenda | Traduzir: tirar a figura e manter a estrutura que ela sugeria |
| Mundo que atrapalha a tarefa | Texto sobre o efeito, ação principal atrás de cena presa, moldura cobrindo conteúdo, preço depois de três telas de espetáculo | O layout manda e o efeito obedece ([regra 18](react-bits-templates.md#canvas-e-shader)); prender a tela só com mudança de estado a mostrar ([regra 17](react-bits-templates.md#rolagem)); "o espaço é do conteúdo" continua valendo |
| Mundo que só existe com WebGL, mouse e movimento | Sem um dos três, vira página comum ou cai | As três reservas ([regra 22](react-bits-templates.md#canvas-e-shader)); e conferir que estrutura, material e imagem seguram o lugar sozinhos |
| Mundo copiado da referência | Parece com o site estudado | Levar a pergunta da camada, responder com o que é da marca |
| Mundo grande demais para o prazo | Um objeto 3D prometido e uma semana de trabalho | Escolher a versão que se faz com CSS e imagem tratada primeiro ([regra 23](react-bits-templates.md#canvas-e-shader)); componente pronto como reserva ([abaixo](#react-bits-reserva-e-atalho)) |
| Todas as camadas no máximo | Moldura, textura, luz, cena presa e cursor na mesma tela | Um lugar barulhento por tela; três ou quatro camadas fortes, o resto neutro |

Custo, do mais barato ao mais caro: moldura e fio (CSS); material no vão e na borda (CSS); tratamento único de imagem (CSS ou uma passada nas fotos); voz (texto); luz por gradiente; protagonista em HTML com estado; rolagem que encena; canvas. Começar pelo barato: é também o que atravessa a página inteira.

## Em painel, sistema e site de conteúdo

O mundo é mais contido, nunca ausente. Sai do efeito e fica em moldura, tipografia, ritmo e densidade.

- **Painel e ferramenta de trabalho:** o lugar é a mesa de trabalho da tarefa. Responder a quatro camadas: onde acontece (o que é fixo: menu, cabeçalho, barra de estado, e como eles se encaixam), de que é feito (linha, densidade da tabela, raio único), voz (rótulos, números com unidade, estados vazios) e protagonista (o registro, a fila, o número que a pessoa veio ver). Luz, câmera e rolagem ficam neutras. Nada de cena presa nem de efeito sobre área de trabalho ([adaptacoes.md](adaptacoes.md)).
- **Site de conteúdo e editorial:** o lugar é a página impressa da marca. Largura da medida, margem com função (data, seção, nota, índice), régua entre matérias, hierarquia de títulos, tratamento único das fotos, capitular ou número de edição se fizer sentido. A rolagem só passa.
- **Loja:** o protagonista é o produto e o mundo não pode cobri-lo. Material e moldura na vitrine e no cartão; a foto do produto inteira e na cor real onde ela é prova.
- **Em qualquer um:** os testes do recorte e do meio valem do mesmo jeito. Um painel reconhecível de costas para o logo tem mundo.

## Do mundo ao guia vivo

1. **Escrever** em `docs/ESTADO.md`: a frase "esta página é ___", de onde ela vem, as nove camadas em uma linha cada e o que o mundo proíbe.
2. **Esboçar em página inteira,** em tela cheia, no link local: `docs/guia/mundo.html` (o modelo vem no projeto), aberto em `http://127.0.0.1:<porta>/docs/guia/mundo.html`. Só a abertura, uma seção do meio e o fecho, com texto real curto. Sem componentes: botão cinza, sem hover, sem cor de acento se ela não for do lugar. É onde se veem moldura, material, luz, escala e o que a rolagem faz.
3. **Passar os testes** do recorte, dos botões neutros e do meio no esboço. Olhar no computador e no celular.
4. **Mostrar e esperar** (modo acompanhado). A pergunta ao usuário é uma: "este é o lugar da marca?". Com duas ou três frases candidatas, um esboço de abertura para cada.
5. **Só então** arco, objeto, cor, letra e peças: [padrao-visual.md](padrao-visual.md#4-o-mundo-do-site). O esboço aprovado vira a primeira seção do guia e a regra de abertura do `CLAUDE.md` do projeto.

Com pressa, o mundo não cai: ele encolhe para a frase, três camadas (onde acontece, de que é feito, protagonista) e a abertura do primeiro bloco já dentro dele.

## React Bits: reserva e atalho

O mundo e a identidade são desenhados aqui, a partir da marca. Os componentes do React Bits (o grátis, sempre; o Pro, com chave) entram depois, para **executar**: quando um efeito próprio sai caro, quebra, não fecha no prazo, ou quando o mundo pede uma mecânica que já existe pronta (campo que reage ao cursor, texto que se parte, fundo em shader, cartões, carrossel). Pega-se o componente, religa-se aos tokens e à ideia da marca e segue-se. Escolher um componente e depois procurar um mundo que o justifique é o caminho de volta ao papel de parede. Como instalar e adaptar: [react-bits.md](react-bits.md#como-usar-sem-perder-a-identidade).
