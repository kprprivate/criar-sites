/criar-sites

<!-- No Codex, a primeira linha é `$criar-sites`; no Claude Code e no Kiro, `/criar-sites`.
     MODELO do prompt inicial, só para quando o usuário pedir (references/partida.md). A skill preenche com o que o usuário disse
     e o que já foi visto, marca hipóteses como hipóteses e tira os blocos que não se aplicam. Salvar em docs/PROMPT-INICIAL.md.
     Os colchetes são o que preencher; os blocos [OPCIONAL] saem quando não servem. -->

Vamos [fazer / refazer] o site [de quem ou do quê], seguindo a skill: entender a marca, investigar o nicho, ver o que a marca já tem, criar o padrão visual e só então construir, seção por seção.

## Projeto e materiais

- **Pasta do projeto:** `[caminho]`. [Se for refazer: site atual em https://...; tudo o que existe nele precisa existir no novo.]
- **Marca:** [manual, logo, cores, fontes]. Leia `[docs/...]` antes de propor a direção.
- **Conteúdo:** [textos, fotos, vídeos].
  - Portfólio: [os trabalhos, com o que existe de cada um: imagens, papel na equipe, resultado, links].
  - Localize e inspecione os arquivos; não presuma nomes.
- **Pastas só de consulta** (não alterar): [caminhos].
- Leia as instruções do repositório e confira o Git antes de alterar arquivos.

## Como vamos trabalhar

[Quero acompanhar a construção aos poucos: ao terminar cada parte, mostre a versão e espere minha avaliação. / Pode trabalhar sem pausas até [alcance].]

- Quero o link local em tempo real desde o início da construção.
- Decisão vira regra na hora: no `CLAUDE.md`, no estado do projeto e no guia vivo.

## O que é o site, e de quê

- **Tipo e assunto:** [ex.: portfólio dos meus projetos de tecnologia].
- **As unidades** (uma linha por projeto, produto ou serviço): [nome: o que é, meu papel, o que existe de material, link, público ou confidencial].

## Objetivo e público

- **O site existe para:** [público] [fazer o quê] e [ação principal: contratar, contatar, comprar, se cadastrar].
- **O que precisa ficar claro:** [valor, diferença, prova].
- **Público:** [o que se sabe]. Separe o que é declarado, observado nas fontes e inferido por você; não invente dados de público.

## Direção

- **Tom e sensação:** [ex.: preciso e calmo, expressivo, editorial].
- **Ativos exclusivos para a identidade:** [ex.: o produto, a embalagem, o logo, os próprios trabalhos].
- **Imaginário que a marca evoca:** [ex.: um esporte, uma época, um lugar].
- **Evitar:** [caminhos, estilos ou clichês].

## Referências

- **A régua:** [site], pelo [nível, o que se quer dele], mesmo sem ter a ver com o negócio.
- **Outras:** [sites e o que interessa em cada um].
- Estude o nicho, de preferência em sites premiados, e diferencie o que leu do que viu funcionando.

## [OPCIONAL] Componentes do React Bits

Podemos usar elementos do React Bits (https://reactbits.dev) e do React Bits Pro (https://pro.reactbits.dev); tenho conta [plano]. Siga `references/react-bits.md` da skill:

- use como matéria-prima, adaptada à nossa identidade, e nunca com a cara da demo;
- um efeito por função;
- versão parada com movimento reduzido.
- **Chave de licença:** fica no `.env.local`, que eu preencho; nunca a peça nem a escreva em código ou documento.

## Destino e stack

- **Destino:** [hospedagem estática / servidor próprio / Shopify / outro]. [Domínio e prévia.]
- **Stack:** [ex.: o kit da skill, em HTML, CSS e JS puros, que também vira tema Shopify por script; ou Vite + React, por causa do React Bits].
- **Quem mantém o conteúdo depois:** [quem e como].
- [Shopify: o tema precisa ser editável no editor de temas ou fixo? Ver `references/shopify-por-script.md`.]

[Não invente trabalhos, clientes, depoimentos ou números para preencher seções.]

## Comece agora

Comece pela etapa 1 e siga para o estudo do nicho. Me mostre o dossiê quando estiver pronto, e me traga só as perguntas que mudem a direção.
