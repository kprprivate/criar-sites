# {{NOME}}: site

[[Uma frase: o que é a marca e o que o site faz.]] Estado, decisões e pendências: `docs/ESTADO.md`. Skill: `criar-sites`.

## Rodar

- `npm run dev` sobe o site em http://127.0.0.1:{{PORTA}}/. É o link que o usuário acompanha em tempo real: subir assim que o projeto existir, antes do estudo e do guia, e deixar no ar enquanto se trabalha. O mesmo servidor mostra o estudo em `/docs/estudo/`, o esboço do mundo em `/docs/guia/mundo.html` e o guia vivo em `/docs/guia/`. O link só abre nesta máquina; dizer isso ao passar. Não publicar como Artifact nem em endereço público sem pedido.
- `npm run build` gera `dist/`; `npm run preview` serve o build em {{PORTA_PREVIEW}}.
- `npm run testa`: todas as páginas, como abrem, em todas as janelas. Mede estouro, quem sai da tela, texto encavalado, botão fixo sobre ação, ação principal abaixo da dobra e erro de console, com capturas em `.capturas/`.
- `npm run testa:estados`: o que só aparece depois de interagir (etapas, gavetas, filtros, zoom, erros, listas vazias).
- Página ou estado novo entra em `tools/testes.config.mjs`, no mesmo bloco em que for construído.
- `python -I tools/folha.py .capturas/paginas 360 folha.jpg`: junta capturas numa folha. Passar nos testes não dispensa olhar.
- `tools/olhar.mjs` é a base para roteiros de teste. `j.peca(".seletor", "nome")` fotografa um componente de perto, ampliado: é assim que se julga um cartão, botão ou campo que mudou, em cada estado, antes de mostrar. `j.recorte()` esconde texto e logo (e, com `{ botoes: true }`, pinta os botões de cinza) para conferir se a página ainda diz de quem é: fazer na abertura e numa seção do meio. `j.bordas()` lista onde começa e termina o conteúdo de cada seção: todas na mesma linha, salvo a abertura de ponta a ponta. `j.vazios(url)` e `j.pulos()` cobram o esqueleto de espera: nada carrega do nada (abaixo). Em modo celular, o `innerWidth` cresce junto com o conteúdo: medir largura sempre contra a janela real, como `j.estouro()` faz.
- `npm run pendencias`: lista o que ainda está como `[[provisório]]`.
- No Git Bash (Windows), passar endereço a um script com `MSYS_NO_PATHCONV=1` antes do comando: sem isso, "/" vira caminho do Windows e o roteiro abre a página errada.
- `npm run favicon`: gera os PNG do favicon a partir de `public/img/favicon.svg`. `python -I tools/imagens.py`: AVIF e WebP. Em loja Shopify, `node tools/loja-retrato.mjs`: os dados públicos dela.

## Publicar a prévia

Passo a passo: `references/publicar-previa.md`, na skill. Em resumo: `npm run pacote`, enviar, extrair em `releases/<data>`, trocar o link `current` de uma vez, `node tools/confere-publicado.mjs` e os dois testes com `SITE_BASE=https://{{DOMINIO}}`. O vhost sai de `node tools/gera-vhost.mjs`.

## Estrutura

- `*.html` na raiz: uma por página, só com o `<main>` e o que é só dela. O Vite pega todas sozinho.
- `src/casca/`: `cabeca.html`, `topo.html` e `fim.html`. Entram nas páginas pelos comentários `<!--cabeca-->`, `<!--topo-->` e `<!--fim-->`.
- `tools/rotas.js`: os endereços do destino, iguais no servidor local e no vhost.
- `src/css/site.css` junta as folhas e entra por `<link>` no `<head>`. Nunca importar CSS pelo JS. `marca.css` tem os tokens e os componentes; o resto é por área.
- `src/js/main.js` começa o que é global e carrega por `import()` o módulo da página, escolhido por `<body data-pagina>`.
- `src/js/marca.js` tem os gestos da marca. `docs/guia/` é o guia vivo (e `mundo.html`, o esboço do mundo em tela cheia): no servidor local eles leem o `marca.css` e o `marca.js` direto de `src/`; `npm run guia` copia os dois para lá só quando o guia for para outra máquina.

## Identidade: [[o nome da ideia]]

[[A ideia geradora, em duas frases. De onde ela vem.]] Guia: http://127.0.0.1:{{PORTA}}/docs/guia/. Estudo: http://127.0.0.1:{{PORTA}}/docs/estudo/.

- **O mundo:** [[esta página é ___. O que fica fixo, de que é feita, como é iluminada, o que a rolagem faz, quem é o protagonista. O que este lugar proíbe.]] Vale do topo ao rodapé, em toda seção.
- **Cor:** [[quais, e onde cada uma entra. O que foi rejeitado.]]
- **Letra:** [[títulos, serviço, números.]]
- **Forma:** [[moldura, vão entre seções, cartão e, por último, botão: o que cada um herda do mundo.]]
- **Logo:** [[onde está o vetor.]]
- **Gestos:** [[nome: onde entra.]] Antes de criar um efeito novo, perguntar se ele já não é um destes.
- **Tom:** [[fato antes de adjetivo? O que nunca dizer.]]
- **Foto:** [[a regra.]]

Decisão vira regra na hora, aqui.

## Regras técnicas

- Lenis só com ponteiro fino e sem movimento reduzido, parado com menu aberto. Tudo que rola por dentro leva `data-lenis-prevent`. Barra de rolagem nunca aparece.
- `:hover` só com mouse: o plugin `tools/hover-so-com-mouse.js` faz isso no build. Não escrever `@media (hover: hover)` à mão, salvo para decidir layout.
- Modal e menu em `<dialog>`, por `src/js/dialogo.js`: foco no próprio painel, nunca no X.
- Header invisível só no alto da página, e só em página com `data-heroi`.
- O rodapé sobe por cima da última seção do `main` (`src/js/rodape.js`). Lista de lado sem barra: no toque desliza; com mouse, setas (`src/js/lista-lado.js`).
- Testar em 360, 390, 600, 1100, 1280, 1366×700, 1440 e 1920. Em 1366×700, a ação principal fica à vista sem rolar. A largura do documento nunca passa da janela.
- Botão fixo não pode cobrir ação principal: onde cobre, ele sobe ou sai.
- Fluxo sem sistema por trás avisa na tela que é simulação. Com endereço público, "recebemos o seu pedido" sem nada enviado é afirmação falsa.

## Nunca carregar do nada

Tudo que o JS monta depois (cartões, a ficha de um produto, uma lista) chega no HTML com o esqueleto da forma final: `<div class="grade" data-grade><!--espera:cartao:8--></div>`, com o desenho em `src/casca/espera-cartao.html` (`espera-bloco.html` é o exemplo). O JS troca o conteúdo do mesmo container e o esqueleto sai sozinho. Enquanto ele está na página, ela ocupa ao menos uma tela, e o rodapé nunca aparece antes do conteúdo. O `testa-tudo` acusa o bloco que chega vazio antes do JS e a página que pula ao carregar.
