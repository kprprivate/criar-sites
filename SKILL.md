---
name: criar-sites
description: Usar quando o pedido for criar, refazer ou redesenhar um site ou página de qualquer tipo (loja, landing page, institucional, portfólio, conteúdo, SaaS, painel, portal); estudar o nicho ou referências para um site; criar identidade visual, padrão de botões ou animações para a web; construir ou ajustar seções; retomar um projeto de site; montar o prompt inicial de um projeto; pedidos de método Rucá; usar React Bits ou React Bits Pro; gerar tema Shopify a partir de um site local; ou publicar a prévia de um site.
---

# Criar sites com identidade

O método é uma ordem: **entender a marca → investigar o nicho → ver o que a marca já tem → criar o padrão visual → construir seção por seção**. Cada botão, hover e animação fica decidido antes da primeira seção. É isso que tira o site de "um site qualquer".

Vale para qualquer tipo de site; muda a profundidade ([adaptacoes.md](references/adaptacoes.md)). Cor, forma, gesto e tom saem da marca da vez. Projetos anteriores citados nos arquivos (Rucá, Bevi, GSL e outros) são casos que ensinam uma técnica, nunca um modelo a repetir.

## O caminho

| # | Etapa | O que sai dela | Para e mostra? |
|---|---|---|---|
| 1 | Entender a marca | Projeto criado com o kit, `docs/ESTADO.md`, `docs/INVENTARIO.md` se for refazer | Não |
| 2 | Investigar o nicho | Dossiê publicado, com sites premiados filmados e a identidade proposta, elemento por elemento | **Sim** |
| 3 | Ver o que a marca já tem | Manual lido, logo em vetor, teste de fotos | Não: entra na prancha do dossiê e no guia |
| 4 | Criar o padrão visual | Guia vivo publicado, `marca.css` e `marca.js` | **Sim** |
| 5 | Planejar as seções e ligar o link | Tabela de blocos e link local no ar | Junto do guia |
| 6 | Construir em ordem | Primeira seção, segunda seção, até o fim | **A cada bloco**, no modo acompanhado |
| 7 | Verificar | Testes, capturas olhadas, revisão independente | Com o relatório |
| 8 | Publicar | Prévia ou tema, conferidos no endereço real | Só com pedido |
| 9 | Devolver à skill | Lista do que vira kit, detector ou regra | **Sim**, aplica com OK |

As paradas valem no modo acompanhado, sem pressa. Com pressa ou no modo liberado, elas caem (abaixo). Identificar em que etapa o projeto está e seguir dali: ler `docs/ESTADO.md` e o `CLAUDE.md` do projeto antes de refazer decisões. Pedido pequeno não reinicia o caminho (ver [Outros pedidos](#outros-pedidos)).

## Modos de trabalho

**Acompanhado (padrão).** Planejar o conjunto, construir só o bloco combinado, mostrar e esperar. "Próximo" libera um bloco; pedido de ajuste continua no bloco atual; elogio registra a aprovação e não libera o seguinte. Não adiantar seções por agentes, branches ou código escondido. Detalhes reversíveis se resolvem sem perguntar a cada comando.

**Liberado.** Quando o usuário disser "faz tudo", "vai trabalhando", "vou dormir" ou equivalente:

- Anotar as palavras e o alcance em `docs/ESTADO.md` e seguir sem pausas, na ordem, até esse alcance. Sem alcance dito, vai até o site local navegável e verificado.
- O que estava em avaliação passa a "pronto, à espera de avaliação": liberar não é aprovar.
- Cada bloco passa pelos testes. No fim, revisão independente e relatório.
- Dúvida reversível: escolher, seguir e anotar em "Decisões minhas, à espera de confirmação".
- Fato ou promessa sem fonte (preço, prazo, regra comercial, número): nunca inventar. Usar o que está publicado ou deixar `[[provisório]]`, e anotar em "Pendências do cliente".
- A liberação não cobre pôr o site em endereço público, gerar tema na loja, gastar nem tocar em sistema de terceiros. Atualizar o dossiê e o guia, que são privados, está coberto.
- Vale até o alcance acabar. Depois, volta ao acompanhado.

**Nunca esperar em silêncio.** Com tarefa em segundo plano, dizer o que está rodando e seguir no que não depende dela. Site bloqueado por verificação de robô: pedir ao usuário que resolva, se valer a pena, e continuar com os outros.

**Pressa encurta, não pula.** Com "já começa hoje": dizer em uma linha o que fica mais curto e começar na hora, **sem as paradas das etapas 2 e 4**. O estudo vira uma leva curta, em paralelo (8 a 12 sites, em triagem, sem dossiê). O padrão visual vira o mínimo que funciona: a ideia em uma frase, tokens, botão, link e um gesto, em `marca.css` e no `CLAUDE.md`. O guia completo fica para depois. O link sobe de cara e o primeiro bloco sai no mesmo dia, mostrado junto da folha do estudo e do padrão mínimo. O padrão visual nunca fica para depois da primeira seção, salvo se o usuário mandar expressamente.

## As etapas

### 1. Entender a marca

Antes de perguntar, ler tudo: pedido, pastas, site no ar, loja, redes, código. Perguntar de uma vez só o que muda o projeto (para quem é, o que precisa vender, referências que já ama ou detesta, destino) e **seguir trabalhando enquanto a resposta não vem**; o que não bloqueia vira hipótese anotada. Não pedir para escolher "nível de estudo": decidir pelo caso e dizer em uma linha.

- **Primeiro comando de um site novo:** `node <pasta-da-skill>/assets/novo-site.mjs <pasta> --nome "Marca"`. Traz casca, testes, publicação e documentos prontos, em cinza. As páginas próprias do negócio (coleção, produto, sacola, formulário) se escrevem no projeto. Destino Shopify: somar `--loja`, que prepara os endereços da loja. Projeto que já existe ou em React: `--so-ferramentas`, só testes, publicação e documentos.
- **Em loja:** `node tools/loja-retrato.mjs https://loja.com.br` já aqui, para o inventário e os dados reais. Tema editável ou fixo entra nas primeiras perguntas ([shopify-por-script.md](references/shopify-por-script.md)).
- **Escrever em `docs/ESTADO.md`:** o que é, o que vende, para quem, como fala, o que diferencia. Separar fato, observado e hipótese ([registros.md](references/registros.md), [pesquisa-publico-referencias.md](references/pesquisa-publico-referencias.md)).
- **Se for refazer:** `docs/INVENTARIO.md` com tudo o que existe no site antigo e onde entra no novo. Regra: o que existe no antigo existe no novo; o jeito é livre.
- **Olhar antes de afirmar:** foto, logo e texto se abrem de verdade. Descrição sem ter visto já custou correção do usuário.

### 2. Investigar o nicho

Sites renomados e premiados, de preferência. Frentes paralelas levantam de 50 a 70 candidatos, a sonda faz a triagem de todos, e de 10 a 12 são analisados a fundo, com filme da rolagem, hover em câmera lenta e celular. Sai um dossiê publicado, sem nenhuma linha de código do site. Na mesma tela, a identidade proposta, elemento por elemento e desenhada: logo e versões, cor, letra, formas, ícones, fotografia, componentes, aplicações e voz, cada um com a regra de uso. O usuário decide o branding vendo cada peça, não lendo sobre ela. Método, comandos e contrato do dossiê: **[estudo-do-nicho.md](references/estudo-do-nicho.md)**.

### 3. Ver o que a marca já tem

Corre junto da etapa 2: a prancha do dossiê já usa o logo em vetor e o que a marca tem de cor, letra e foto.

Manual, logo, fontes, cores, fotos, tom: decidir o que seguir, melhorar ou editar. Logo só em bitmap se redesenha em vetor. Fotos se reaproveitam: testar variações em poucas e mostrar a comparação a quem decide, sem refazer o catálogo. O que o cliente pediu em adjetivo ("cara de luxuoso") vira regra conferível. Tudo em **[padrao-visual.md](references/padrao-visual.md)**.

### 4. Criar o padrão visual

Parte da prancha de identidade do dossiê, já avaliada, e a aprofunda: uma ideia geradora que só esta marca poderia ter, regras conferíveis na tela, cor, letra, forma, de três a seis gestos nomeados (cada um com origem, como é, onde entra, limite e resposta ao toque), uma animação de texto, uma seção-assinatura e a tabela do que cada componente faz em repouso, com mouse, no toque e em cada estado. Tudo num guia vivo publicado, que usa os mesmos `marca.css` e `marca.js` do site: **[padrao-visual.md](references/padrao-visual.md)**. Teste final: trocando nome e logo, serviria para qualquer empresa? Se sim, ainda não acabou.

### 5. Planejar as seções e ligar o link

- **Link em tempo real:** `npm run dev` e passar o link assim que a construção começar, sem esperar o bloco ficar pronto. Deixar no ar. Dizer que ele só abre nesta máquina.
- **Tabela de blocos** em `docs/ESTADO.md`: quais seções, o que precisamos vender, o que precisa ficar claro, a função de cada uma (a pergunta, tarefa ou objeção que resolve). Sem seção de enchimento.
- **Desde o primeiro bloco:** dados reais (`tools/loja-retrato.mjs` em loja Shopify) e os endereços do destino (`tools/rotas.js`).
- **Se uma regra comercial ou integração pode invalidar o visual,** provar antes, num bloco técnico curto ([adaptacoes.md](references/adaptacoes.md)).

### 6. Construir em ordem

Uma seção por vez, de cima para baixo: conteúdo real, gestos da marca, mouse, foco e toque. Ciclo de cada bloco: construir → olhar a captura, e de perto cada peça mudada → criticar → ajustar → testar → registrar. Página ou estado novo entra em `tools/testes.config.mjs` no mesmo bloco. Decisão vira regra na hora, no `CLAUDE.md`. Fluxo e formato da rodada: [construcao-por-partes.md](references/construcao-por-partes.md). Técnicas que já quebraram e foram resolvidas: [padroes-de-marca.md](references/padroes-de-marca.md). Mídia e texto: [direcao-criativa.md](references/direcao-criativa.md).

### 7. Verificar

`npm run testa` (páginas como abrem), `npm run testa:estados` (o que só aparece depois de interagir) e `npm run testa:fluxos`. Depois, olhar as capturas em folha (`tools/folha.py`) e cada componente que mudou de perto, ampliado e em cada estado (`j.peca`), comparar páginas irmãs e pedir uma revisão crítica independente. "Sem estouro" só vale medido contra a largura real da janela. Critérios e o que cada coisa prova: [qualidade.md](references/qualidade.md).

### 8. Publicar

Só com pedido. Prévia em servidor: [publicar-previa.md](references/publicar-previa.md). Loja: [shopify-por-script.md](references/shopify-por-script.md). Antes de ter endereço público, reler o que era aceitável só no local: fluxo simulado avisa na tela, indexação fechada, imagem do link, direitos de uso. Depois, conferir no endereço real, byte a byte, e confirmar que os vizinhos do servidor seguem iguais. Configuração compartilhada (zona de DNS ou proxy, firewall, outros sites) não se altera sem pedido.

### 9. Devolver à skill

É assim que cada site fica mais fácil que o anterior. Durante o projeto, anotar em `docs/ESTADO.md`, seção "Para a skill", o que custou caro. Quando o projeto terminar, mesmo com um simples "valeu", propor a lista em poucas linhas e, com o OK, aplicar:

| O que apareceu | Para onde vai |
|---|---|
| Ferramenta escrita que serve a outros sites | `assets/` ou kit |
| Defeito que os testes deixaram passar | Detector novo em `tools/olhar.mjs`, validado contra o defeito |
| Técnica que quebrou e foi resolvida | [padroes-de-marca.md](references/padroes-de-marca.md) |
| Preferência nova do usuário, para todo site | Regra nesta página |
| Decisão só deste projeto (cor, número, frase) | Fica no projeto |

Regras para mexer na skill sem travá-la num projeto: [melhorar-a-skill.md](references/melhorar-a-skill.md).

## O que o usuário pede em todo site

Valem em todo site de marca, salvo pedido em contrário. Técnica de cada um em [padroes-de-marca.md](references/padroes-de-marca.md). Em painel e ferramenta de trabalho, ficam "o espaço é do conteúdo", "nada essencial escondido", "conteúdo demais vira abas", "elevar, não despejar" e "fatos reais"; o resto se decide pela tarefa ([adaptacoes.md](references/adaptacoes.md)).

- **Linguagem de interação própria**, padronizada no celular e no computador.
- **Branding à vista antes do site:** todos os elementos visuais (logo, cor, letra, formas, ícones, fotografia, componentes, aplicações, voz) aparecem desenhados no dossiê, cada um com a regra de uso, antes de qualquer seção. "Como vão ser todos os elementos visuais" se responde mostrando, não descrevendo. Com pressa, a prancha mínima (logo, cor, letra e botão) vai junto do primeiro bloco.
- **Rolagem suave igual à da Joy Rush** (Lenis, só com ponteiro fino) e **barra de rolagem que nunca aparece**, com outro meio de navegar nas listas.
- **O espaço é do conteúdo** (regra do usuário, em celular e computador, em toda página): o que vem antes do conteúdo (barra, título, descrição, abas, filtros) **não passa de 20% da altura da janela no computador (1366×700) nem de 25% no celular (390×844)**, medido, não olhado. Título, abas e ação principal dividem **uma linha só** no topo; as abas sobem para o topo e o conteúdo (ingressos, vendas, a lista) aparece logo, na primeira tela. Nada de faixa de título gigante nem de texto de apoio fixo numa tela em que a pessoa só quer clicar no botão e executar a ação ([como e como medir](references/padroes-de-marca.md#o-espaço-é-do-conteúdo)).
- **O peso do botão conduz a pessoa** (regra do usuário, 12/11/2026): em toda tela ou janela com mais de uma ação, o botão do caminho que queremos é o mais pesado (maior, cheio, cor de ação, primeiro na leitura) e o que desencorajamos é o mais leve (menor, só texto, sem cor de alarme). Em ação que apaga ou cancela, o peso vai para "manter/voltar", nunca para "apagar" ("deletar conta": o botão forte é "manter minha conta"), e o atrito cresce com a gravidade (desfazer, janela com os efeitos, palavra para digitar). Sem esconder a saída. Um botão cheio por tela. ([como e como medir](references/padroes-de-marca.md#o-peso-do-botão-conduz-a-pessoa))
- **Painel bonito e simples** (regra do usuário, 12/11/2026): tela de computador não é celular esticado: **largura toda, tabela densa de 1 linha por registro, "selecionar todos" no cabeçalho à esquerda, paginação padrão, cabeçalho com controles do mesmo tamanho, menu de ~7 itens com abas irmãs, segmentado para filtro, gaveta ou página no lugar de modal, hover visível medido por script**, e menos cara de planilha (capa, avatar, números grandes, "pede sua atenção"). ([regras e medidas](references/padroes-de-marca.md#painel-bonito-e-simples-lista-cabeçalho-menu-modal-ou-página))
- **Ícone e ilustração sempre a nosso favor** (regra do usuário): ícone junto da palavra em menu, abas, listas, botões de ação, campos e avisos; ilustração em todo estado vazio, de erro e de festa, com frase e ação. Um estilo só de cada ([como](references/padroes-de-marca.md#ícones-e-ilustração)).
- **Nada essencial escondido:** ação principal, erro e total à vista sem rolar, medidos em 1366×700.
- **Cada página com a sua forma:** o vocabulário se repete, o esqueleto não.
- **Conteúdo demais vira abas:** mais de uns seis itens paralelos, um grupo por vez; acima de uns doze, busca.
- **Elevar, não despejar:** conteúdo de apoio com o mesmo cuidado do resto.
- **Criatividade de verdade, não o padrão do kit** (regra do usuário: "ela precisa ser criativa"):
  - **Letra com estudo próprio:** de três a quatro direções e de oito a doze fontes, gratuitas e pagas, desenhadas no contexto da marca (título, rótulo, botão, número, acentos). Nunca a primeira serifa gratuita que "combina". Fonte paga entra no estudo pelo testador do site da fundição ou por arquivo de teste com o aceite do usuário; a licença é decisão dele ([padrao-visual.md](references/padrao-visual.md#estudo-de-letra)).
  - **Header com a forma da marca:** a barra de ponta a ponta não é padrão. O header é uma peça da marca (placa, selo, recorte, etiqueta), coerente no celular e no computador.
  - **Nada obrigatório depois da abertura:** a faixa que corre só entra quando fizer sentido para a marca. Nenhum enfeite vem de série.
  - **Cada seção com estudo próprio:** antes de construir, ver como os melhores resolvem aquele tipo de seção (com um ou dois casos medidos) e propor algo criativo, bonito e relevante, que faça a pessoa entender quem é a marca. Lista de fatos com ícone é o mínimo, e o usuário chama de simplório.
  - **A seção cabe numa tela no computador** (1440×900; a ação, também em 1366×700), salvo quando a rolagem é o próprio conteúdo. Pilha de rótulo, título, foto alta, texto e botão passa da tela: foto ao lado, não em cima.
  - **Largura máxima sempre:** em tela larga (1920 e 2560) nada fica colado num canto com um vazio no meio. Conferir as capturas largas antes de mostrar.
- **Nunca carregar do nada:** tudo que o JS monta depois chega no HTML com o esqueleto da forma final (`<!--espera:cartao:8-->`), e a página nunca abre vazia com o rodapé em cima. Cobrado pelo `testa-tudo` ([padroes-de-marca.md](references/padroes-de-marca.md#esqueleto-de-espera)).
- **Rodapé que sobe e enche a tela, voltar ao topo, seleção de texto na cor da marca, favicon com o logo de verdade.**
- **Fatos reais:** sem número, cliente, prêmio ou depoimento inventado. Fluxo simulado se apresenta como simulação.

## Erros que já aconteceram

| Tentação | O que fazer |
|---|---|
| "Pergunto o nível do estudo e escrevo o prompt inicial para aprovar" | Decidir pelo caso e começar. O prompt só existe se o usuário pedir ([partida.md](references/partida.md)) |
| "Escrevo o `vite.config`, a casca e o teste do zero" | O kit já traz, testado. Escrever só o que é da marca |
| "Mostro o estudo e a identidade fica para a etapa do guia" | O usuário quer ver os elementos visuais na mesma tela do estudo: a prancha de identidade entra no dossiê ([estudo-do-nicho.md](references/estudo-do-nicho.md#5-montar-o-dossiê)). E é só o visual: nenhuma seção do site |
| "Header de ponta a ponta, faixa embaixo da abertura e uma serifa gratuita que combina" | É a cara de todo site feito com o kit, e o usuário notou. Header com a forma da marca, faixa só se fizer sentido, letra com estudo de variações, pagas inclusive |
| "Copio o botão, o gesto ou a paleta do site anterior" | A técnica se reaproveita; a cara, nunca |
| "O JS monta a lista, o HTML pode vir vazio" | A página abre vazia, o rodapé aparece primeiro e o conteúdo chega empurrando. O esqueleto mora no HTML, na forma do que vem |
| "O teste deu 0 de estouro, está pronto" | Em emulação, `innerWidth` cresce com o conteúdo. E páginas como abrem não mostram gavetas, erros e etapas |
| "Passou nos testes" | Os testes não veem o que está feio. Olhar as capturas: a folha já pegou defeito que todos os testes deixavam passar |
| "Na captura da página inteira está bom" | Componente mudado se julga de perto, ampliado e em cada estado (`j.peca`). Trocou a foto: rever a caixa, o fundo e a legenda em volta ([qualidade.md](references/qualidade.md#olhar-de-perto)) |
| "Criei um detector novo, funcionou" | Só vale depois de pegar um defeito de propósito (`npm run testa:detectores`) |
| "Para o HTTPS, é só mudar a zona para Full" | A zona é de outros sites também. Ler como ela está e adaptar o vhost |
| "Vou esperar a captura terminar" | Seguir no que não depende dela e dar um status curto |
| "Terminamos, valeu" e fim | Etapa 9: propor o que volta para a skill |

## Outros pedidos

| Pedido | Como seguir |
|---|---|
| Correção ou ajuste pequeno | Preservar o sistema, corrigir a menor causa, testar o que a mudança afeta |
| Só uma seção ou página | Ler o padrão visual do projeto. Sem padrão, propor o mínimo antes de construir |
| Só o estudo ou só a identidade | Fazer a etapa e parar nela |
| Projeto de site em outra stack | Stack do projeto e `--so-ferramentas`. [react-bits.md](references/react-bits.md), se couber |
| Sistema, painel ou portal | Mesma ordem, com a tarefa no lugar da narrativa ([adaptacoes.md](references/adaptacoes.md)) |
| Prompt para começar em outro chat | [partida.md](references/partida.md) |

## Entregar

Abrir pelo resultado e pelo link. Depois: o que olhar primeiro, o que foi de fato verificado (emulado é emulado; simulado é simulado), decisões tomadas sem o usuário, pendências de terceiros e o próximo passo. Se algo dito antes estava errado, corrigir às claras. Não confundir quantidade de efeitos, páginas ou testes com qualidade.

## Recursos

| Arquivo | Quando |
|---|---|
| [estudo-do-nicho.md](references/estudo-do-nicho.md) | Etapa 2: frentes, sonda, filmes e dossiê |
| [pesquisa-publico-referencias.md](references/pesquisa-publico-referencias.md) | Etapas 1 e 2: público, evidências, fontes |
| [padrao-visual.md](references/padrao-visual.md) | Etapas 3 e 4: manual, logo, fotos, ideia, gestos, guia e receitas |
| [construcao-por-partes.md](references/construcao-por-partes.md) | Etapas 5 e 6: rodadas, avaliação, ordem dos blocos |
| [padroes-de-marca.md](references/padroes-de-marca.md) | Etapa 6: técnicas testadas para não quebrar. Ler antes de construir cada tipo de componente |
| [direcao-criativa.md](references/direcao-criativa.md) | Etapa 6: conteúdo, mídia, imagens geradas e movimento |
| [qualidade.md](references/qualidade.md) | Etapa 7: critérios, o que cada teste prova, revisão independente |
| [publicar-previa.md](references/publicar-previa.md) | Etapa 8: prévia em nginx, proxy, implantação atômica, conferência |
| [shopify-por-script.md](references/shopify-por-script.md) | Etapa 8: tema Shopify gerado por script, loja simulada |
| [adaptacoes.md](references/adaptacoes.md) | Tipo de site que não é vitrine de marca; ordem por incerteza |
| [registros.md](references/registros.md) | Como manter estado, decisões e evidências sem burocracia |
| [react-bits.md](references/react-bits.md) | Quando o projeto puder usar React Bits |
| [partida.md](references/partida.md) | Só quando pedirem o prompt inicial ou o briefing para outro chat |
| [melhorar-a-skill.md](references/melhorar-a-skill.md) | Etapa 9 |

Comandos prontos: `assets/novo-site.mjs` (projeto novo), `assets/estudo/` (sonda, modelo do dossiê), `assets/logo/vetoriza.py`, `assets/fotos/composicao.py`, `assets/shopify/`. Dentro de cada projeto, o `CLAUDE.md` lista as ferramentas de `tools/`.

Consultar documentação oficial atual para APIs e plataformas. Não instalar dependência, migrar stack nem publicar só por preferência desta skill. Ao escrever para o usuário, seguir a voz dele: português simples, sem jargão.
