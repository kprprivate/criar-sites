# Adaptar o caminho ao tipo de site

A ordem é a mesma em qualquer site: entender, investigar, ver o que existe, criar o padrão, construir. O que muda é o que cada palavra quer dizer e o tamanho de cada etapa. A abertura foi adequada ao caso de origem; ela não é uma etapa obrigatória para todos os sites.

## O caminho em cada tipo

| Tipo | "A marca" é | "O nicho" é | O padrão visual é | Kit |
|---|---|---|---|---|
| Loja | A marca e o catálogo | Lojas premiadas e quem resolve o mesmo modelo de venda | Completo: o mundo sem cobrir o produto, cartão, preço, sacola | Sim; Shopify com `--loja` |
| Landing page | A oferta e quem compra | Landing pages premiadas, do setor e vizinhas | Enxuto: o mundo em uma frase e um protagonista forte | Sim |
| Institucional | A organização, os serviços e o público | Marcas do setor, e de fora dele que resolvam a mesma dúvida | Completo, sem efeito que atrase a informação | Sim |
| Portfólio | O autor e os trabalhos | Portfólios e estúdios de referência | Os trabalhos são a imagem; a linguagem os emoldura | Sim |
| Editorial | A voz e os conteúdos | Publicações com leitura excelente | A tipografia é o centro | Sim, ou o CMS do destino |
| SaaS | O produto e quem decide a compra | Páginas de produto premiadas, e a interface em si | Tokens e componentes usados no site e no produto | `--so-ferramentas`, na stack do produto |
| Painel ou portal | A tarefa, os dados e as permissões | Ferramentas de trabalho que são referência | Contido: o mundo fica na moldura, na tipografia, na densidade, nos estados e na resposta dos controles ([como](mundo-do-site.md#em-painel-sistema-e-site-de-conteúdo)) | `--so-ferramentas`, na stack do sistema |

Em painel e ferramenta de uso recorrente, a tarefa manda: sem abertura, sem efeito de primeira visita e sem rolagem suave imposta. O estudo pode ser menor e o padrão, sóbrio, mas a ordem fica: decidir o padrão antes de multiplicar telas.

Sistema já em produção: trabalhar e testar em ambiente local ou de teste, com dados de demonstração e usuário de teste. Testes automáticos nunca rodam contra a produção.

## 1. Escolher a amostra e o fluxo principal

| Tipo de projeto | Amostra representativa | Fluxo a demonstrar cedo | Verificação central |
|---|---|---|---|
| Loja | Oferta, seleção e apresentação de um produto | Selecionar variante ou kit, adicionar, revisar e seguir para o checkout | Preço, estoque, desconto e quantidade permanecem corretos |
| Landing page | Proposta, evidência e ação principal | Acionar o CTA, chegar ao destino e receber retorno | A oferta e o próximo passo são compreendidos |
| Institucional | Entrada e caminho até um serviço ou informação | Encontrar informação e iniciar contato ou solicitação | A navegação corresponde às intenções do público |
| Portfólio | Apresentação e um projeto completo | Descobrir um trabalho, entender a contribuição e contatar | O conteúdo demonstra o trabalho e sua autoria |
| Editorial | Listagem e uma publicação representativa | Encontrar, ler, navegar entre conteúdos e compartilhar | Leitura, taxonomia e manutenção editorial funcionam |
| SaaS | Página de produto e entrada na experiência, conforme escopo | Entender a proposta, escolher um caminho e iniciar uso ou demonstração | Promessa, plano e experiência entregue são coerentes |
| Dashboard ou portal | Área de trabalho com dados e controles | Acessar com a permissão adequada, executar tarefa e acompanhar resultado | Estados, legibilidade, permissões e recuperação são previsíveis |

Tratar projetos híbridos como combinação de jornadas. Uma plataforma pode ter site comercial e área autenticada; uma loja pode ter conteúdo editorial. Definir qual jornada vem primeiro e quais padrões devem permanecer compartilhados.

Não impor manifesto, avaliações, comparação, perguntas frequentes, popup, formulário ou CTA final. Incluir cada elemento quando houver conteúdo e função reais. Em ferramentas recorrentes, priorizar eficiência e orientação sobre efeitos de primeira visita.

## 2. Ordenar pelo que pode invalidar o restante

Identificar a decisão que, se estiver errada, exigirá reconstruir grande parte do projeto. Resolver essa incerteza com uma amostra pequena e verificável.

| Incerteza dominante | Investigar primeiro | Evitar fazer cedo demais |
|---|---|---|
| Identidade indefinida | Amostra visual com conteúdo representativo | Expandir várias páginas com uma direção provisória |
| Regra comercial complexa | Configuração e fluxo real de seleção, cálculo e compra | Animar ofertas ainda incompatíveis com os dados da loja |
| Integração restritiva | Contrato de dados, estados e operação mínima | Prometer comportamento que a plataforma não suporta |
| Conteúdo escasso | Inventário e produção de uma unidade completa | Criar seções que dependam de provas inexistentes |
| Uso intenso no celular | Tarefa principal no espaço e interação disponíveis | Tratar o celular como redução da tela grande |
| Aplicação existente | Arquitetura, componentes e limitações atuais | Reescrever a base apenas por preferência de ferramenta |
| Publicação com migração | Rotas, conteúdo preservado, ambiente e reversão | Descobrir exigências de destino ao terminar o visual |

Paralelizar trabalhos independentes depois que a direção e os contratos necessários estiverem claros. Manter um responsável por coerência visual e de conteúdo. Revisar contribuições no conjunto antes de concluir a etapa.

## 3. Definir plataforma e manutenção cedo

Examinar o projeto e seu destino antes de escolher ferramentas. Se a plataforma já estiver definida, trabalhar dentro dela e confirmar cedo a viabilidade dos comportamentos essenciais. Se estiver aberta, justificar a escolha pelas necessidades do projeto.

- Identificar quem atualizará textos, imagens, produtos ou dados e com que frequência.
- Identificar necessidade de conteúdo indexável, rotas próprias e compartilhamento.
- Mapear autenticação, permissões, pagamentos e serviços externos quando fizerem parte do escopo.
- Confirmar ambientes de desenvolvimento, revisão e publicação disponíveis.
- Definir a fonte de verdade para informação operacional e evitar duplicá-la no código visual.
- Aproveitar convenções, componentes e dependências existentes quando forem adequados.
- Considerar custo de manutenção e operação além da velocidade do primeiro protótipo.

Não prescrever framework, ausência de framework, hospedagem, CMS ou estratégia de renderização universal. Quando houver conversão entre ambientes, demonstrar cedo um trecho no destino. Verificar rotas, caminhos de mídia, dados, estilos e comportamento após a conversão. Site local que vira tema Shopify: [shopify-por-script.md](shopify-por-script.md).

Manter separadas as responsabilidades de apresentação e integração o suficiente para evoluir o visual sem reescrever regras de negócio. Não acrescentar camadas de arquitetura que o escopo não exige.

## 4. Adaptar estados e conteúdo

Especificar os estados relevantes da tarefa: inicial, carregando, vazio, sucesso, erro e restrição de acesso, conforme aplicável. Incluir ausência de mídia, texto longo e dados incompletos quando puderem ocorrer.

Em loja, testar combinações reais de variantes, quantidades e descontos. Em formulários, preservar dados após falha e confirmar o destino efetivo da solicitação. Em áreas autenticadas, verificar o comportamento por permissão, não apenas o aspecto de botões ocultos.

Em projetos editoriais, testar títulos extensos, formatos de publicação e inserção de conteúdo pelo responsável. Em portfólios, preservar diferenças entre trabalhos sem criar uma interface diferente para cada um.

Usar dados de demonstração identificados quando o ambiente ainda não tiver integração. Registrar o que falta e não declarar o fluxo real concluído. Evitar misturar amostras com informações reais de modo que pareçam resultados do negócio.

## 5. Aplicar em situações concretas

### Loja com kits e desconto progressivo

Mapear a regra comercial e a fonte dos preços. Construir a seleção de um produto e o carrinho mínimo com cálculo real. Usar essa estrutura para desenvolver a apresentação e a narrativa da oferta. Verificar novamente no checkout e no ambiente de destino antes de concluir.

### Escritório com portfólio e formulário

Selecionar um trabalho com material completo. Definir como mostrar imagens, contexto e contribuição, junto de uma entrada clara para os serviços. Demonstrar o contato e sua confirmação. Expandir para outros projetos depois de verificar se o padrão comporta diferenças de conteúdo.

### Portfólio de projetos de tecnologia

Projetos de natureza diferente no mesmo site: sites e lojas, sistemas (autenticação, back-end), baixo nível (drivers), produtos.

- **Antes da direção:** estudar a fundo como bons portfólios de engenharia e de estúdios de produto se organizam ([estudo-do-nicho.md](estudo-do-nicho.md)).
- **Agrupamento:** definir como os projetos se agrupam (por área ou por tipo de problema) e qual a página de cada um:
  - contexto e problema;
  - papel do autor;
  - decisões técnicas e stack;
  - resultado;
  - links.
- **Projetos com visual** (sites): o próprio trabalho é a imagem, com capturas e vídeo curto do site no ar.
- **Projetos sem visual** (autenticação, driver): uma linguagem gráfica própria e coerente com o site, em vez de imagem genérica de "código":
  - diagramas da arquitetura;
  - fluxo da requisição;
  - terminal ou trecho de código real;
  - métricas.
- **Confidencialidade:** confirmar o que é público. Projeto de cliente ou sob sigilo aparece só com o que pode ser mostrado, e isso fica registrado.
- **Amostra:** a home e um projeto completo, de preferência um sem visual, que é o caso mais difícil. Depois, conferir se o modelo serve para os outros.

### Portal de acompanhamento de pedidos

Começar pela tarefa de localizar um pedido e compreender seu estado. Usar dados representativos e verificar permissões e atualizações. Resolver estados vazios e de erro antes de adicionar detalhes visuais. Não acrescentar narrativa comercial à área de trabalho sem necessidade.

### Publicação com atualização frequente

Começar por uma listagem e um artigo completo. Verificar leitura, navegação, mídia e edição pelo responsável. Construir a identidade com os elementos que se repetem no conteúdo. Confirmar que uma publicação nova funciona sem ajustes manuais no código.

## 6. Ajustar o tamanho do processo

Em uma página pequena, reunir etapas e registros quando isso reduzir trabalho sem esconder decisões. Em um projeto maior, separar responsabilidades e manter contratos claros entre áreas. Reaproveitar o que já foi validado; testar novamente quando conteúdo, contexto ou comportamento alterar o risco.

Tratar a sequência como orientação adaptável. Preservar os critérios de qualidade e avaliar um bloco com o usuário antes de implementar o seguinte. Resolver detalhes reversíveis dentro da rodada sem perguntar a cada comando; nunca usar essa autonomia para antecipar blocos futuros.
