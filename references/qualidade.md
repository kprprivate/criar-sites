# Verificação da qualidade

Use antes de expandir a amostra e antes da entrega. Avalie a versão realmente observada, considerando o objetivo, o público, os dispositivos prioritários e o escopo combinado.

## Sumário

- [Aplicação e estados](#aplicação-e-estados)
- [O que cada teste prova](#o-que-cada-teste-prova)
- [Olhar de perto](#olhar-de-perto)
- [Revisão independente](#revisão-independente)
- [Critérios](#critérios)
- [Registro e conclusão](#registro-e-conclusão)

## Aplicação e estados

Na amostra, valide a direção e a jornada representativa antes de multiplicar componentes. Na entrega, cubra os fluxos essenciais, os componentes compartilhados e as diferenças relevantes entre páginas.

Use inspeção visual, execução de tarefas, leitura de código e testes conforme a questão. Código correto não comprova acabamento visual; screenshot não comprova integração. Registre o ambiente e a versão quando isso afetar a conclusão.

| Estado | Como registrar |
|---|---|
| Atendido | Identifique a evidência observada e o escopo que ela cobre. |
| Não atendido | Descreva o defeito, seu impacto e a correção necessária. |
| Não verificado | Informe o que falta verificar e por quê; não trate ausência de evidência como sucesso. |
| Não se aplica | Explique por que o critério não pertence a este projeto ou a esta etapa. |

Não atribua nota arbitrária nem use a quantidade de itens concluídos como certificado de qualidade. Priorize bloqueios da tarefa principal e problemas recorrentes. Repita verificações apenas quando uma mudança criar risco concreto ou houver uma exigência do projeto.

## O que cada teste prova

| Teste | Mede | Não vê |
|---|---|---|
| `npm run testa` | Cada página como abre, em 8 janelas: estouro contra a largura real, quem sai da tela, texto sobre texto, botão fixo sobre ação, ação principal abaixo da dobra, barra de rolagem, erro de console, página que pula ao carregar (só no computador) e bloco que chega vazio antes do JS, sem o [esqueleto de espera](padroes-de-marca.md#esqueleto-de-espera). Deixa capturas | O que só aparece depois de interagir; o que está feio |
| `npm run testa:estados` | O mesmo, em etapas, gavetas, filtros, zoom, erros e listas vazias de `tools/testes.config.mjs` | Estado que não está na lista: tela ou estado novo entra lá |
| `npm run testa:fluxos` | Fazer o que a pessoa faria: abrir, tocar, teclar, comprar, enviar. Foco, Esc, rodapé em várias alturas | O que não tem roteiro |
| `npm run testa:detectores` | Se os detectores ainda pegam defeito de propósito. Rodar depois de mexer em `olhar.mjs` | |
| Capturas em folha (`tools/folha.py`) | Hierarquia, recorte, alinhamento, feiura, página parecida com a irmã | Comportamento |
| `tools/confere-publicado.mjs` | O site no ar igual ao build, byte a byte, com endereços, 404 e links | Aparência |

Medir no alvo certo: em emulação de celular, `innerWidth` cresce com o conteúdo, e `scrollWidth - innerWidth` sempre dá zero. Um relatório de "sem estouro" feito assim não prova nada; corrigir às claras se isso já foi dito.

Testes em muitas janelas demoram: rodar em segundo plano e seguir trabalhando. Com detector novo, primeiro confirmar que ele acusa um defeito conhecido; depois, que não acusa uma tela boa.

## Olhar de perto

Antes de mostrar, cada componente que mudou se julga de perto, nunca só na página inteira reduzida: ali um cartão de 100 px parece certo mesmo quando está esquisito.

- `await j.peca(".seletor", "nome")` (em `tools/olhar.mjs`) fotografa só o elemento, ampliado, com uma folga em volta. Fazer no computador e no celular, em cada estado que a mudança toca: normal, escolhido, com o mouse, com erro.
- Para escolher pelo mouse, usar clique de verdade (`j.cmd("Input.dispatchMouseEvent", ...)`), não `click()` por script: o clique por script pode acender o anel de foco do teclado e enganar o julgamento.
- Olhando a imagem, uma pergunta por vez:
  1. Isto parece de uma marca do nível da régua? Se o dono olhasse só este pedaço, reclamaria de quê?
  2. Sobrou caixa, fundo, borda ou legenda feitos para o estilo anterior? Trocar a foto de um componente pede rever a caixa em volta: uma foto escura numa caixa clara com borda vira "foto com legenda".
  3. Foto, texto e fundo falam a mesma língua, e o componente segue o jeito dos outros do site (a mesma regra de foto e nome das categorias, por exemplo)?
  4. O estado escolhido se lê de longe e não parece defeito? Um friso da cor do fundo só faz a foto parecer menor.
  5. Texto apertado na borda, quebra de linha feia, alinhamento torto?
- As seções da página começam e terminam na mesma linha? `console.log(await j.bordas())` dá a borda esquerda e a direita do conteúdo de cada seção, no computador e no celular. Uma fila que começa mais para dentro que o título de baixo salta aos olhos de quem é dono e passa por todos os testes.
- Achou algo esquisito: corrigir antes de mostrar e olhar de perto de novo. Quando o usuário diz "ficou esquisito" depois de uma entrega, este passo foi pulado.

## Revisão independente

Ao fechar um conjunto de páginas, pedir uma revisão a um agente de contexto limpo, com o papel de diretor de arte exigente. Dar a ele: o que é o site, a régua, as regras do projeto e a pasta de capturas de cada tela. Não dar a sua opinião. Pedir defeitos reais, vistos nas imagens: hierarquia confusa, texto ilegível sobre foto, contraste, recorte feio, alinhamento torto, espaço morto, composição repetida entre páginas, frase repetida, o que parece genérico. Dar também os documentos de fonte do projeto e pedir que confira cada fato da tela contra eles: frase sem fonte, número velho, adjetivo no lugar de fato. Pedir local e conserto concreto, sem editar nada. Depois, conferir cada ponto com os próprios olhos, aplicar o que procede, repetir os testes e dizer no relatório o que ficou de fora.

## Critérios

### 1. Identidade e direção

- **Observar:** relação entre público, proposta e linguagem visual; distinção em relação às referências; consistência entre tipografia, cor, composição, imagens e interação.
- **Evidência:** amostra implementada em contexto, screenshots representativos, referências identificadas e justificativas associadas a decisões visíveis.
- **Atende quando:** a proposta é compreensível, as decisões formam um sistema utilizável nas outras telas e a identidade não depende apenas de trocar o logo de um modelo. Descreva o julgamento estético com exemplos; não o apresente como medição objetiva.

### 2. Acabamento visual

- **Observar:** hierarquia, alinhamento, espaçamento, contraste, densidade, quebras de texto, recortes de imagens, bordas e sobreposição de elementos fixos. Inclua os estados relevantes: foco, hover, seleção, expansão, carregamento e erro.
- **Evidência:** inspeção de screenshots da implementação, com conteúdo representativo e variações que possam afetar o layout, como títulos longos ou ausência de imagem.
- **Atende quando:** nenhum defeito relevante prejudica leitura, entendimento ou interação nas condições avaliadas; componentes equivalentes seguem a mesma regra e exceções têm propósito identificável. Páginas internas não repetem o mesmo esqueleto de topo (cada uma tem a forma do que é), e nenhum grupo de itens paralelos passa de uns seis sem abas ou filtro.

### 3. UX e navegação

- **Observar:** clareza da ação principal, orientação, destino dos links, sequência da tarefa, retorno, fechamento de camadas e recuperação de erros. Verifique se animações atrasam ações ou fazem o site parecer parado.
- **Evidência:** execução da jornada principal desde a entrada até seu resultado; percurso de recuperação pertinente; abertura direta e atualização de rotas que devam funcionar assim.
- **Atende quando:** a tarefa pode ser completada sem instruções externas, a ação que leva ao passo seguinte está visível sem rolar até o fim (medida em janela de notebook, inclusive em lista ou formulário longo), os controles produzem respostas compreensíveis e a pessoa consegue continuar ou corrigir um erro. Não crie FAQ, popup ou seção comercial sem necessidade da jornada.

- **Painel e ferramenta de trabalho (conferir medindo, em 1440×900 e 1920×1080):** conteúdo sem limite de largura em lista; linha de tabela de no máximo 52 px com uma linha por registro; "selecionar todos" no cabeçalho, à esquerda; paginação com tamanho escolhível dentro do teto real da API; cabeçalho com controles de mesma altura e raio; menu com cerca de 7 itens e nenhum rótulo quebrado em duas linhas; **nenhum controle clicável sem mudança visível no hover, no toque e no foco (script, não olho)**; modal só para confirmação e até 3 campos.

### 4. Responsividade e entrada

- **Peso dos botões (medido):** em cada tela e janela com mais de uma ação, listar os botões visíveis, calcular o peso (largura × altura × tipo: cheio 1, contorno 0,55, texto 0,25) e conferir: um só botão cheio por grupo, o botão do caminho desejado é o mais pesado, e em ação que apaga ou cancela o "manter" pesa pelo menos 3 vezes o "apagar" (que fica em texto, nunca em vermelho cheio). Irreversível com dados ou dinheiro pede atrito (palavra para digitar). O botão leve mantém alvo de 44 px e contraste AA ([regra](padroes-de-marca.md#o-peso-do-botão-conduz-a-pessoa)).
- **Ícone e ilustração presentes:** menu, abas, listas e botões de ação com ícone da biblioteca única; todo estado vazio, de erro e de sucesso com ilustração, frase e ação ([regra](padroes-de-marca.md#ícones-e-ilustração)).

- **O espaço é do conteúdo (medido):** em cada página, em 1366×700 e 390×844, o `top` do primeiro item de conteúdo dividido pela altura da janela fica **até 20% no computador e até 25% no celular**, com ao menos três itens (celular) ou seis (computador) à vista sem rolar. Cabeçalho, título de cartaz, descrição fixa, faixa de abas separada ou pilha de filtros acima disso reprova a página, também no site e não só no painel ([regra](padroes-de-marca.md#o-espaço-é-do-conteúdo)).

- **Observar:** composição em larguras pequenas, intermediárias e grandes pertinentes; orientação quando relevante; rolagem; teclado virtual; menus; tabelas; controles fixos; disponibilidade de ações sem hover.
- **Evidência:** screenshots e interação em larguras registradas; dispositivo real quando necessário e disponível. Identifique emulação como emulação, sem apresentá-la como teste físico.
- **Atende quando:** conteúdo e tarefas essenciais permanecem acessíveis, legíveis e operáveis nas condições verificadas, sem cortes ou overflow involuntários. Uma tabela com rolagem intencional pode ser adequada se sua operação for clara.
- **Defeitos que já escaparam:** conferir [padroes-de-marca.md](padroes-de-marca.md#verificação-que-pega-esses-defeitos):
  - janela estreita de computador com mouse, como condição separada;
  - arte de fundo cobrindo a altura toda;
  - listas de lado alcançáveis do primeiro ao último item, também com mouse;
  - seleção de texto na cor da marca;
  - campos que não mudam de tamanho no foco;
  - nada preso depois do toque (hover grudado, card aceso por `:focus-within`, retângulo de toque);
  - peças fixas que não cobrem o foco nem umas às outras.

### 5. Acessibilidade

- **Observar:** semântica, hierarquia de títulos, nomes de controles, rótulos, erros de formulário, foco visível e ordem de navegação; contraste; ampliação de texto; alternativas de imagens e mídia; preferência por movimento reduzido.
- **Evidência:** percurso por teclado dos fluxos principais, inspeção dos nomes e estados acessíveis, verificação de contraste e comportamento com ampliação e redução de movimento, conforme os elementos existentes.
- **Atende quando:** as tarefas avaliadas não dependem exclusivamente de mouse, cor ou animação; o foco permanece compreensível; informações essenciais continuam disponíveis. Modais, quando usados, permitem saída e restauração adequada do foco.
- **Limite da conclusão:** não declare conformidade integral com uma norma a partir desta revisão. Se houver requisito formal, confira a norma aplicável e execute a avaliação correspondente.

### 6. Funcionamento e integrações

- **Observar:** destinos dos CTAs, validação, estados vazio/carregando/erro/sucesso, persistência esperada, consistência de dados e comportamento diante de repetição ou indisponibilidade relevante. Identifique qual sistema é responsável por cada dado.
- **Evidência:** execução dos fluxos com dados apropriados e inspeção do resultado no sistema receptor, quando acessível e autorizado. Use testes automatizados para lógica ou regressões que justifiquem manutenção; não escreva testes que apenas repitam a implementação.
- **Atende quando:** o resultado observado corresponde à ação solicitada, falhas têm tratamento útil e a interface não confirma operações que não ocorreram. Fluxo sem sistema por trás avisa na tela que é simulação, principalmente com endereço público. Preços, disponibilidade, permissões e outros dados críticos seguem a fonte responsável.
- **Limite da conclusão:** diferencie protótipo, simulação, ambiente de teste e integração verificada. Não envie mensagens, gere cobranças nem altere dados reais para testar sem autorização aplicável. Verifique que credenciais e segredos não foram expostos no cliente.

### 7. Conteúdo e mídia

- **Observar:** clareza, utilidade, consistência de nomes e tom, informação repetida, afirmações factuais, origem de depoimentos, adequação de imagens e direitos de uso. Antes de publicar, `npm run pendencias` lista cada texto `[[provisório]]`. Confira se cada seção ajuda uma decisão ou tarefa.
- **Evidência:** revisão contra os materiais fornecidos e fontes pertinentes; inventário das afirmações ainda pendentes; inspeção da mídia no tamanho, recorte e contexto em que será exibida.
- **Elevar, não despejar:** conteúdo de apoio (ingredientes, especificações, tabelas, listas) jogado cru num bloco ou modal não atende. Ele precisa da mesma estrutura e acabamento do resto, como abas, grupos, ícones e rótulos, no nível da referência.
- **Atende quando:** textos e imagens servem ao objetivo, não há prova social ou dado inventado apresentado como real, e placeholders relevantes foram resolvidos ou explicitados. Imagem gerada não deve fingir ser registro real de cliente, instalação ou resultado.
- **Aplicação proporcional:** exija validação especializada quando o conteúdo efetivamente depender dela; não imponha revisão regulatória genérica a qualquer site. Registre créditos e licenças onde forem necessários.

### 8. Desempenho e movimento

- **Observar:** abertura, resposta à interação, estabilidade do layout, mídia, fontes, código carregado e trabalho causado por animações ou conteúdo fora da tela. Confira alternativas quando um efeito não puder executar.
- **Evidência:** medição ou observação reproduzível com ferramenta, versão, dispositivo e condições registrados. Para alegar melhoria, compare antes e depois em condições equivalentes e descreva o alcance da medição.
- **Atende quando:** os objetivos definidos para este projeto são cumpridos nas condições verificadas e não há atraso ou regressão material conhecida nos fluxos prioritários. Se não houve medição, registre a limitação; não invente pontuações ou ganhos.
- **Aplicação proporcional:** não imponha efeitos, bibliotecas ou limites universais. Investigue causas antes de aplicar correções circunstanciais. Reduzir movimento deve preservar conteúdo e funcionalidade; a página não pode depender de uma animação para deixar de estar vazia.

### 9. Publicação e entrega

- **Observar:** build de produção, configuração do destino, rotas diretas, assets, integrações, metadados e indexação conforme o propósito. Considere cache, diferenças de ambiente e reversão quando pertinentes.
- **Evidência:** resultado do build e da versão de preview; identificação da versão entregue; após publicação autorizada, inspeção da URL final e confirmação breve dos fluxos críticos disponíveis.
- **Evidência adicional:** `node tools/confere-publicado.mjs` e os testes com `SITE_BASE` no endereço real ([publicar-previa.md](publicar-previa.md#conferir)).
- **Atende quando:** o que foi entregue corresponde ao escopo e às evidências. Uma entrega em preview pode estar completa quando esse for o pedido; uma publicação só está confirmada depois de verificar o destino publicado.
- **Limite da conclusão:** não infira funcionamento em produção a partir de localhost, nem compatibilidade universal a partir de um navegador. Respeite a autorização existente e prepare a versão revisável antes de apontar qualquer passo restante.

## Registro e conclusão

Use um registro curto, agrupando critérios equivalentes e mantendo visíveis os problemas que afetam a tarefa principal:

| Critério / fluxo | Estado | Evidência e ambiente | Problema, limitação ou motivo de não aplicação |
|---|---|---|---|
| [Item avaliado] | [Estado] | [Observação verificável] | [Detalhe, se houver] |

Antes de expandir a amostra, resolva problemas que contaminariam todo o sistema: direção incoerente, tarefa principal inviável ou comportamento compartilhado inadequado. Não exija que páginas ainda fora da amostra estejam prontas.

Apresente o bloco verificado ao usuário e aguarde sua avaliação antes de implementar o seguinte. A validação técnica não substitui essa revisão. Um agente pode revisar a rodada atual; não deve construir seções futuras em paralelo.

Antes de encerrar, confira se o objetivo combinado foi atendido, a entrega está identificada e as limitações materiais foram comunicadas. Não declare concluído um fluxo essencial não verificado; informe precisamente o que foi entregue e o que permanece pendente.

Pare as verificações adicionais quando houver evidência suficiente para o escopo. Proponha refinamentos opcionais separadamente, sem transformar preferências novas em defeitos da entrega atual.
