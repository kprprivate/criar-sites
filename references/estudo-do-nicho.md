# Investigar o nicho

Etapa 2 do caminho. Objetivo: ver como os melhores resolvem o que este site precisa resolver, de preferência sites renomados e premiados, e sair com ideias, medidas e uma estrutura. Sem escrever nenhuma linha do site.

O olhar é pela página inteira, não pela peça: o que faz cada referência ser reconhecível é o **mundo** dela (onde a página acontece, de que é feita, como é iluminada, o que a rolagem faz), e é isso que o estudo registra primeiro. Botão e hover vêm depois, e na maioria dos sites bons são simples ([mundo-do-site.md](mundo-do-site.md)).

Serve para qualquer tipo de site. Em portfólio, os melhores portfólios e estúdios; em SaaS, os produtos e as páginas de produto premiadas; em painel, as ferramentas de trabalho com interface referência; em loja, as lojas e as marcas.

## Sumário

- [Quanto estudar](#quanto-estudar)
- [1. Definir a régua e as frentes](#1-definir-a-régua-e-as-frentes)
- [2. Levantar candidatos](#2-levantar-candidatos)
- [3. Triar com a sonda](#3-triar-com-a-sonda)
- [4. Analisar a fundo](#4-analisar-a-fundo)
- [5. Montar o dossiê](#5-montar-o-dossiê)
- [6. Ouvir e seguir](#6-ouvir-e-seguir)
- [Cuidados](#cuidados)

## Quanto estudar

Decidir pelo caso e dizer em uma linha. Não pedir para o usuário escolher.

| Situação | O que fazer |
|---|---|
| Site novo de marca (padrão) | Tudo abaixo: de 50 a 70 candidatos, de 10 a 12 a fundo, dossiê completo |
| Pressa ("já começa hoje") | Uma leva curta, em segundo plano: 8 a 12 sites em triagem, uma folha de capturas, uma tabela curta (com o mundo de cada um em uma frase) e uma prancha mínima de identidade (o mundo em uma frase, logo, cor, letra e botão). Corre durante o primeiro bloco, e o que ela trouxer ajusta o bloco |
| Painel ou ferramenta de trabalho | Uma leva curta de ferramentas que são referência na mesma tarefa, com 2 ou 3 a fundo. O que pesa mais é a tarefa e o código que já existe |
| Ajuste ou página num site com padrão | As referências que o usuário der, mais de uma a três. Tabela de consequências |
| Só o estudo | Tudo abaixo, e parar no dossiê |

Público e fontes, em qualquer caso: [pesquisa-publico-referencias.md](pesquisa-publico-referencias.md).

## 1. Definir a régua e as frentes

**A régua** é um site que o usuário admira pelo nível, mesmo sem nada a ver com o negócio. Serve para medir acabamento e ambição, não para copiar. Ela costuma vir no pedido; se não vier, perguntar uma vez e seguir com a melhor hipótese.

**As frentes** são de três a cinco ângulos de busca, cada um num agente em paralelo. Pensar a partir do negócio e do imaginário da marca, não do setor apenas:

| Frente | O que procura |
|---|---|
| Prêmios e galerias | Premiados do setor e dos vizinhos, em que a página inteira é um lugar próprio, não só um efeito |
| O mesmo negócio, com design alto | Quem resolve o mesmo modelo muito bem, mesmo em outra categoria (acervo, assinatura, agendamento, proposta) |
| Os universos que a marca evoca | O imaginário dela, de onde vêm as ideias mais próprias (um esporte, uma época, um lugar, um ofício) |
| Referências do cliente | O que o dono indicou, e o que ele quis dizer com isso |
| Contexto local | Quando língua e hábitos pesarem |

Cada agente recebe: o que é a marca, a régua, a frente, a data de hoje e o que devolver. Pedir uma tabela com site, endereço, o que é, prêmio com link e data, e por que interessa, além do que não servir e por quê. Dizer que quer sites reconhecíveis pela página inteira (moldura, material, luz, o que a rolagem faz, como o conteúdo é encenado), e não só por botão, hover ou fundo animado, e que os nomes dados são só ponto de partida. Pedir, para cada um, uma frase: "esta página é ___". A curadoria e as capturas ficam com o coordenador.

## 2. Levantar candidatos

Galerias e premiações: Awwwards (Site do Dia, do Mês, do Ano e categorias), CSS Design Awards, The FWA, Webby Awards, Godly, SiteInspire, Land-book, Lapa Ninja, Minimal Gallery, One Page Love, Httpster, Commerce Cream, Maxibestof. Também estudos de caso de estúdios e listas sérias do assunto. Dar preferência aos dos últimos três anos.

## 3. Triar com a sonda

A sonda abre cada site de verdade no Chrome sem interface, em computador e celular, e mede o que interessa:

```
node <pasta-da-skill>/assets/estudo/sonda.mjs sites.json <pasta-saida> --mode triage --conc 3
```

- `sites.json` segue `assets/estudo/sites.exemplo.json`. A saída é pesada: pasta temporária, fora do projeto.
- Em cada pasta: capturas (`a-*` os primeiros segundos da abertura, `d-*` a rolagem no computador, `m-*` celular) e `relatorio.json`, com status, bloqueio, técnica (Lenis, GSAP, Shopify, WebGL...), fontes, cores, seções e a curva da rolagem.
- Rodar em segundo plano e seguir com outra coisa. Olhar as capturas em folha, **a rolagem inteira de cada site** (`d-00` em diante, e o celular), não só a abertura. Abrir o que chamou atenção.
- A pergunta ao olhar: tapando os botões, o que ainda diz de que site é? O que muda na estrutura, na moldura, na luz e no que a rolagem faz? O mundo continua na metade da página ou ficou na abertura?
- Site em que a sonda parou ou com "portão" de entrada: `portao` no JSON diz o texto a clicar. Se o sem interface for bloqueado, abrir no Chrome real.

Filtrar com critérios escritos: mesmo tipo ou princípio transferível, nível de acabamento, no ar e atual, conteúdo comparável, variedade de mundos (não dez sites com a mesma página e botões diferentes). Ao fim, de 10 a 12 finalistas em ordem de utilidade para esta marca, não de fama.

## 4. Analisar a fundo

```
node .../sonda.mjs finalistas.json <saida> --mode deep --conc 2     # hover em câmera lenta, páginas internas, celular
node .../sonda.mjs finalistas.json <saida> --mode filme --conc 2    # uma rolagem limpa de ~15 s, para o dossiê
node .../sonda.mjs lista.json <saida> --mode fotos                  # só as páginas em "pages", para comparar fotos
```

- **`pages`:** as páginas que o projeto precisa entender (produto, lista, serviço, contato).
- **O mundo primeiro.** Para cada finalista, com o filme e todas as capturas da rolagem na frente, registrar:
  - **a frase:** "esta página é ___";
  - **as camadas** que ele decidiu, uma linha cada: onde acontece (superfície, moldura, o que fica fixo), de que é feito (material, unidade mínima, o vão entre as seções), como é iluminado, escala e câmera, o que a rolagem é, arco e rima (o que da abertura volta no fecho), protagonista, tratamento da imagem e voz ([as perguntas](mundo-do-site.md#as-camadas-do-mundo));
  - **em que escala mora a identidade:** na página, no arco, no objeto ou na peça. E se ela chega ao meio da página.
  - **o que seria papel de parede** ali: o efeito que, tirado, não mudaria nada.
- **Depois, peça por peça, a fundo** (regra do usuário: "a gente tem que pensar em cada detalhe"). Nenhum finalista fica sem esta leitura, e cada linha diz o que foi visto, não o que se supõe:

  | O que | O que registrar |
  |---|---|
  | **Como o site abre** | Há carregador ou animação de abertura? O que aparece primeiro, em que ordem, em quanto tempo (quadros `a-*` e o começo do filme)? Dá para pular? Acontece só na primeira visita? |
  | **Header** | A forma (barra, ilha, aba, pílula, duas peças), onde mora, o que faz ao rolar (some, encolhe, muda de cor, vira outra coisa), como é o menu aberto no computador e no celular |
  | **Hero** | A composição, quem é o protagonista (produto, foto, vídeo, objeto, só letra), o tamanho do título em relação ao resto, onde está a ação principal, o que se move sem ninguém tocar |
  | **Fundo** | Chapado, foto, vídeo, textura, gradiente, canvas? Parado ou vivo? Reage ao cursor? Continua pela página ou fica na abertura? Muda entre as seções? |
  | **Animação diferenciada** | Qual é a que só este site tem, onde fica, o que a dispara (carga, rolagem, cursor, clique), quanto dura, como termina |
  | **Rolagem** | Há paralaxe (o que anda mais devagar que o quê)? Cena presa? Algo que cresce, gira ou se monta com a rolagem? A rolagem é suave? Quanto da página fica preso? |
  | **Entrada dos blocos e transições** | Como títulos, fotos e cartões chegam; a troca de página; o que acontece ao abrir um item |
  | **Imagem, voz e fecho** | O tratamento das fotos, a microcópia, e como a página termina (o rodapé repete a abertura?) |
  | **Celular** | O que de tudo isso sobrevive, o que troca e o que some |

  Para **cada animação** achada, quatro respostas: **como é** (o que se move, de onde para onde, em quanto tempo, com que curva, medido quando der); **de que é feita** (usa um elemento da marca, como o logo, o produto, o material, uma letra, a forma da embalagem, ou é um efeito genérico?); **o que comunica** (apresenta, orienta, prova, só enfeita); e **o que isso vira para a nossa marca** (qual elemento nosso faria o mesmo papel). A última é a que vai para o dossiê: animação feita de um elemento da marca é o que se leva como princípio; a que serviria a qualquer site, não.

  O que a sonda não mostra, abrir no Chrome real e olhar: a abertura de primeira visita, o cursor passando pela hero, a rolagem devagar e a rápida.
- **Hover, depois:** a sonda acha os botões, roda a animação a 20% da velocidade, fotografa os quadros e lê o CSS antes e depois (`ctas` no relatório). É daí que sai a comparação de como cada um padroniza os botões, e a conta de quantos têm botão neutro. Botão simples num site forte é achado, não falta.
- **Medir em vez de achar:** se o usuário pergunta "alguma marca usa isso?", a resposta sai do CSS medido.
- **Separar o que foi visto do que foi lido.** Não afirmar hover, animação ou celular a partir de texto. Celular emulado se diz emulado.

## 5. Montar o dossiê

A entrega é uma página com filmes e imagens, aberta no link local, para o usuário acompanhar enquanto é montada e decidir. Partir de `assets/estudo/dossie.modelo.html` (copiar para `docs/estudo/index.html`), dar a ela um conceito próprio do nicho, e reduzir as capturas:

```
python -I <pasta-da-skill>/assets/estudo/prepara-capturas.py lista.json <pasta-da-sonda> docs/estudo
```

Seções, nesta ordem:

1. **Abertura:** o achado principal numa frase que se discuta, e os números (levantados, abertos, a fundo, zero linhas de código).
2. **A identidade proposta, elemento por elemento:** a prancha de branding, desenhada na tela, nunca descrita. Não é site nem guia final: é o que se decide junto com as referências. Cada peça com a regra de uso:
   - **O mundo**, antes de tudo: a frase "esta página é ___", de onde ela vem, as camadas em uma linha cada e o esboço da abertura e de uma seção do meio, sem componentes. Com duas ou três frases candidatas, uma abertura para cada. O teste da troca de logo.
   - **A ideia**, em uma ou duas frases: o que o mundo dá, dito como regra.
   - **Logo** em vetor: principal, sobre fundo escuro, em uma cor, invertido, só o símbolo, nos tamanhos pequenos (64, 32 e 16 px) e, se couber, um selo. Respiro, menor tamanho e o que nunca fazer.
   - **Cor:** amostras com nome, código e papel, o contraste medido de cada par de texto e os temas da marca lado a lado.
   - **Letra:** cada papel (título, texto, rótulo e número, o que mais houver) com amostra real no idioma do site, acentos incluídos.
   - **Formas e padrões** que saem da marca: borda, textura, moldura, divisor.
   - **Ícones** num traço só, com a regra.
   - **Fotografia:** a direção com exemplos, o que sempre e o que nunca.
   - **Componentes** funcionando: a unidade principal do site (item de cardápio, cartão de produto, projeto) e, depois, botões, link, abas e estados (aberto, selecionado, erro). Podem ser simples: dizer o que herdam do mundo.
   - **Aplicações:** de duas a quatro, como a tela do celular, uma peça física, o topo ou o rodapé.
   - **Voz:** sim e não, com frases reais da marca.

   O mundo da prancha é a proposta de direção; as ideias da seção 7 são alternativas ou peças dele, e a etapa 4 o confirma em página inteira, antes das peças. O código da prancha é do dossiê, não do site ("zero linhas" vale para o site): o que for aprovado é reescrito em `marca.css` e `marca.js` na etapa 4. Ela vem antes dos achados porque é o que o usuário decide; os achados a justificam logo abaixo.

   A prancha usa as cores e letras da marca, não as do dossiê. Logo só em PNG se redesenha em vetor antes ([padrao-visual.md](padrao-visual.md#2-logo-em-vetor)); quando o arquivo de origem é fraco, a prancha diz que o vetor é de trabalho. Testar as letras em amostra real antes de escolher.
3. **O que o estudo descobriu:** de quatro a seis achados, cada um com evidência e consequência.
4. **As analisadas a fundo:** uma ficha por site, com o mundo em uma frase, a leitura peça por peça (como abre, header, hero, fundo, animação diferenciada, rolagem e paralaxe), o que cada animação vira para esta marca, levar, não levar, o que foi medido, capturas (os quadros da abertura, a hero e uma seção do meio, pelo menos) e filmes.
5. **O mundo de cada um:** uma linha por referência, com a frase e as camadas, e se o mundo chega ao meio da página.
6. **Como cada um padroniza os botões:** forma, o que acontece, quadros do hover, e quantos são neutros.
7. **Ideias que o estudo abriu:** cada uma saída de algo que só esta marca tem, com origem, forma, a escala em que entra (página, arco, protagonista ou peça) e limite. Se der, funcionando na página.
8. **Como esses sites se organizam:** uma linha por referência (navegação, home, página da unidade, prova, o fluxo do negócio, o que aproveitar).
9. **A estrutura que eu proporia:** menu, home, página da unidade e o que vamos precisar.
10. **O que evitar:** os clichês do nicho, com quem faz.
11. **Perguntas desta rodada:** poucas, que mudem a direção.
12. **Tudo o que foi levantado:** a lista, com situação de cada site (analisado, reserva, bloqueado, não abriu).

**Mostrar no link local, desde o primeiro rascunho.** O dossiê mora em `docs/estudo/` (`index.html`, `capturas/`, `filmes/`) e o servidor do projeto já o serve: `http://127.0.0.1:<porta>/docs/estudo/`, com `npm run dev` no ar. Passar o link assim que a página existir, mesmo incompleta, e dizer que ele só abre nesta máquina. Em projeto sem o kit, servir a pasta: `python -m http.server <porta> --bind 127.0.0.1 -d docs`. Guardar o link em `docs/ESTADO.md`.

Não publicar pela ferramenta Artifact nem em endereço público por iniciativa própria. Só quando o usuário pedir para mandar a alguém: aí, Artifact (se ele pedir por ela) ou prévia em servidor ([publicar-previa.md](publicar-previa.md)).

## 6. Ouvir e seguir

Pedir que diga primeiro se o mundo proposto é o lugar da marca, depois que escolha de 3 a 5 referências e comente o que gostou e o que detestou, e o que mudaria na prancha de identidade. Se deixar a escolha com você, escolher, dando um papel a cada referência, e seguir. As ideias e as respostas alimentam as etapas 3 e 4. No modo liberado, não parar aqui: escolher, registrar e seguir.

## Cuidados

- **Verificação de robô:** a sonda não disfarça o navegador e nada passa por CAPTCHA. Site que bloquear fica marcado. Se ele fizer muita falta, pedir ao usuário que resolva no Chrome dele; enquanto isso, seguir com os outros.
- **Cookies:** recusar. A sonda tenta recusar, senão esconde o aviso, sem aceitar.
- **Disco:** filmar gera milhares de quadros até virar mp4. Conferir o espaço antes dos finalistas e apagar temporários depois. Já encheu um disco no meio de uma captura.
- **Máquina:** a sonda em paralelo trava o Chrome real. Olhar sites no Chrome real quando ela terminar.
- **Prêmios:** vêm das páginas citadas. Dizer no dossiê se não foram conferidos na origem.
- **Direitos:** o dossiê é estudo interno. Princípio se aproveita; ativo, texto, ilustração e código, não.
