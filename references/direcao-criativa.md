# Construir uma direção própria

Usar esta referência para transformar referências visuais e conteúdo real em uma linguagem aplicável ao projeto. Produzir decisões observáveis; evitar descrições como “premium”, “moderno” ou “impactante” sem tradução concreta.

## 1. Ler referências por função

Examinar poucas referências relevantes e identificar por que cada uma ajuda. Considerar referências de navegação, conteúdo e uso, além de aparência. Se uma referência não estiver acessível, declarar essa limitação e trabalhar com o material fornecido.

| Referência ou trecho | Função percebida | Princípio aproveitável | Tradução para este projeto |
|---|---|---|---|
| Galeria com bastante espaço | Facilitar a leitura do objeto | Controlar escala e informação concorrente | Dar espaço ao material que precisa ser examinado |
| Menu de serviços agrupado | Ajudar a encontrar o caminho certo | Organizar pela intenção do visitante | Agrupar as tarefas reais deste público |
| Transição que conecta duas telas | Preservar orientação | Mostrar continuidade entre estados | Animar apenas a relação que precisa ficar clara |

Registrar também o que não transferir: personagens, ilustrações, composição distintiva, textos, ativos ou efeitos sem relação com o novo contexto. Verificar licença quando houver reutilização de código, fontes ou mídia. Não confundir uma técnica comum com autorização para reproduzir um ativo.

## 2. Formular regras geradoras

Partir da marca existente, do produto, do conteúdo, do ambiente e da personalidade desejada. Preservar regras consolidadas quando o projeto já tiver identidade. Quando faltar identidade, propor uma direção provisória e mostrar sua aplicação antes de expandi-la.

Para cada ideia geradora, preencher:

- **Origem:** qual atributo real do projeto sustenta a ideia.
- **Expressão:** como aparece em composição, forma, tipografia, cor ou interação.
- **Aplicação:** onde a ideia ajuda a experiência.
- **Limite:** onde deve ser discreta ou deixar de aparecer.

Exemplo: um escritório de arquitetura pode usar alinhamentos e relações de proporção vindos de seus projetos. A regra organiza títulos e galerias; não obriga a desenhar plantas decorativas em todas as telas. Um painel operacional pode expressar identidade na tipografia e nos detalhes, preservando a sobriedade da área de trabalho.

Definir o mínimo necessário para construir a amostra:

| Dimensão | Decisão a tornar concreta |
|---|---|
| Tipografia | Papéis, contraste entre níveis, legibilidade e comportamento com textos longos |
| Cor | Fundo, conteúdo, destaque, ação e estados; evitar depender só da cor para comunicar |
| Composição | Densidade, alinhamentos, respiro, largura de leitura e proporção entre elementos |
| Componentes | Botões, links, campos, cartões e estados coerentes com a mesma linguagem |
| Imagem | Enquadramento, luz, textura, escala, tratamento e relação com o texto |
| Movimento | Funções permitidas, intensidade e alternativa estática |

Não exigir formas derivadas do logo, determinada quantidade de ideias, uma estética minimalista ou um efeito obrigatório. Usar a identidade para dar coerência; proteger a compreensão dos controles.

## 3. Escrever conteúdo que sustenta a experiência

Antes de acrescentar uma seção, dizer qual pergunta, tarefa ou objeção ela resolve. Definir uma informação principal e uma continuação coerente. Em uma página de consulta, a continuação pode ser outra informação; não forçar uma chamada comercial.

- Tornar títulos específicos e textos de apoio complementares.
- Explicar características por meio de consequências compreensíveis, sem inventar benefícios.
- Usar números, avaliações, clientes e resultados somente quando houver fonte válida. Cada número mora num lugar só (um arquivo de dados) e todas as seções leem dali: o mesmo dado com valores diferentes na página destrói a prova. O valor final vai no HTML; a contagem animada é enfeite.
- Distinguir conteúdo confirmado, hipótese editorial e informação pendente.
- Ajustar a quantidade de informação à decisão; retirar repetição, não detalhes necessários.
- Escrever rótulos, instruções, mensagens de erro e confirmação junto com o fluxo.
- Manter terminologia consistente entre navegação, conteúdo e sistemas integrados.

**A fonte entra junto com o fato.** Cada prato, data, número, nome e citação ganha a fonte anotada no momento em que entra no site: de onde veio, de quando é e o que ficou de fora (preço velho, contagem de matéria paga). Num documento do projeto, como `docs/CARDAPIO.md` ou `docs/HISTORIA.md`, por item. Conferir no fim custa caro: nenhum teste acha frase inventada, contagem de 2018 ou clichê que o `CLAUDE.md` proíbe. Caso que gerou a regra: num restaurante, a revisão independente achou isso tudo depois de todos os testes passarem. Fonte velha entra com a data, ou sai.

Se uma afirmação depender de validação técnica, comercial ou regulatória, registrar a pendência e usar uma formulação factual disponível. Não apresentar aprovação, certificação ou resultado ainda não confirmado.

## 4. Produzir mídia como uma série coerente

Inventariar o que existe antes de gerar ou comprar mídia. Preferir material real quando representar pessoas, produtos, trabalhos ou evidências do negócio. Usar geração quando ela cumprir a finalidade sem criar uma representação enganosa.

Para uma série, registrar assunto, composição, iluminação, fundo, tratamento, proporções, áreas para texto e restrições. Manter referências e instruções de produção reproduzíveis quando houver várias imagens. Testar uma amostra antes de produzir a série inteira.

**Fotos da própria marca no Instagram,** como provisórias: o endereço público `https://www.instagram.com/p/<código>/media/?size=l` entrega a imagem com 1080 px, sem login. Os códigos saem da árvore de acessibilidade da página do perfil (links `/p/...`). Abrir cada foto antes de usar: post de vídeo entrega um quadro do vídeo, que pode trazer texto sobreposto, menu de outro aplicativo ou a seta do mouse de uma gravação de tela. Recortar fora disso, ou trocar.

Preservar origem e licença dos ativos. Verificar recortes na composição final, legibilidade de embalagens, fidelidade do objeto, alternativas textuais e peso de entrega. Escolher formatos e tamanhos pelo destino e pelo uso; não enviar o original pesado apenas porque está disponível.

### Gerar imagens com o Codex CLI

Quando o Codex CLI estiver disponível e não houver foto real adequada, usá-lo para gerar as imagens que fizerem sentido no site.

- **Cores antes da imagem:** definir cores, tipografia, hierarquia e composição da seção com os ativos reais. Gerar a imagem e as variações depois, para servir à composição aprovada.
- **Série organizada:**
  - um `STYLE.md` por série: luz, cor, enquadramento, proporção e áreas livres para texto;
  - um `PROMPT-*.md` por imagem;
  - originais e prompts fora do repositório; no site entram só versões otimizadas (AVIF/WebP).
- **Comando:** `codex exec --skip-git-repo-check -s workspace-write -C <pasta> "<prompt>" < /dev/null`. Sem o `< /dev/null`, ele espera entrada e trava.
- **Produto com rótulo ou embalagem que precisa ser fiel:** gerar o cenário sem o produto e compor o arquivo oficial por cima. Não aceitar rótulo redesenhado pela IA.
- **Recortar ou trocar o fundo de foto real:** o gerador reinventa tecido e textura. Usar a saída dele só como molde e compor os pixels da foto ([padrao-visual.md](padrao-visual.md#3-fotos)).
- **Pessoas geradas:** só como cenas ilustrativas, marcadas como tal; nunca como clientes, depoimentos ou resultados.
- **Revisão:** conferir cada imagem antes de usar (fidelidade, luz, sombra, mãos, texto) e registrar o prompt.
- **Variedade e composição do produto:** cada foto com cenário próprio; escala tirada dos objetos de cena; quadros de vídeo de cliente fora da galeria ([padroes-de-marca.md](padroes-de-marca.md#imagens-de-produto)).

## 5. Dar uma função ao movimento

Para cada efeito, responder: **o que comunica, quando começa, quando termina e como funciona sem ele?** Priorizar feedback de ação, orientação, continuidade e explicações que se beneficiem de mudança visual.

- Manter informação essencial disponível antes e depois da animação.
- Garantir que toque, teclado e redução de movimento tenham comportamento coerente.
- Evitar áreas que pareçam vazias enquanto aguardam rolagem ou carregamento.
- Preservar controle e orientação quando a rolagem participa da narrativa.
- Verificar o custo em contexto, com as outras mídias e interações presentes.
- Reduzir ou retirar o efeito quando prejudicar leitura, resposta ou conclusão da tarefa.
- Preferir o efeito que mostra o produto ou um objeto do negócio ao efeito de fundo, e uma ideia de efeito em várias doses a vários efeitos ([método](react-bits-templates.md#identidade)).

Não transformar conteúdo preso, WebGL, vídeo automático ou efeitos de cursor em assinatura obrigatória. Não reaproveitar correções específicas de navegador sem reproduzir e compreender o problema atual.

### Linguagem de interação própria

Sites profissionais têm movimentos reconhecíveis. Os gestos da marca, com nome, origem e limite, são decididos no padrão visual, antes da primeira seção, e demonstrados no guia vivo: [padrao-visual.md](padrao-visual.md#7-os-gestos). Antes de criar um efeito novo, perguntar se ele já não é um deles.

### Padrões de movimento para sites de marca

Usar por padrão, salvo motivo do projeto:

- **Rolagem suave com Lenis (MIT), a mesma da Joy Rush (regra do usuário, não opcional):**
  - **configuração da Joy Rush** (lida no código dela, Lenis 1.3.8): `duration: 1`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `wheelMultiplier: 1`. Um clique grande da roda é **limitado a 100** (`deltaY`, em um `wheel` com `capture`), senão vira salto. Usar a versão atual do pacote com `autoRaf: true`, e importar `lenis/dist/lenis.css`;
  - só com ponteiro fino; no toque fica a rolagem nativa do aparelho;
  - desligada com `prefers-reduced-motion` e **parada com `lenis.stop()` e `start()`** com modal ou menu aberto (só `overflow: hidden` não segura o Lenis); dar `data-lenis-prevent` ao painel que rola sozinho;
  - o link de pular conteúdo continua movendo o foco (não ligar `anchors: true` para ele);
  - o evento `scroll` da janela continua chegando (o Lenis rola a janela de verdade), então o que depende dele (como o Pico) segue funcionando.
- **A barra de rolagem nunca aparece (regra do usuário, não opcional):**
  - `html, * { scrollbar-width: none; -ms-overflow-style: none }` e `*::-webkit-scrollbar { display: none }`: na página, em listas, modais, menus e áreas com rolagem própria (é o que a Joy Rush faz no `html` e nas listas);
  - como a barra não existe, **toda lista de lado e toda área que rola tem outro meio de navegação** (setas só com ponteiro fino, toque, encaixe) e nada que só se acha rolando fica sem pista visual de que há mais conteúdo (o próximo cartão espia);
  - conferir que a largura da barra é 0 (`innerWidth - documentElement.clientWidth`).
- **Faixas que aceleram com o scroll:**
  - a faixa anda em velocidade constante e, quando a pessoa rola, acelera em pico e volta ao ritmo em menos de um segundo;
  - mudar o `playbackRate` da animação, sem reiniciar a posição;
  - não pausar no hover e não ter botão próprio (pedido do usuário); a pausa de todas as animações automáticas fica num botão de texto no rodapé, em todas as páginas;
  - parar com movimento reduzido e fora da tela.
- **Sem trava de scroll por seção:**
  - trechos presos, quando houver, devem ser curtos;
  - prender só quando há uma mudança de estado a mostrar (antes e depois, montagem, pedido que vira resultado), nunca para uma frase de efeito; altura, repouso e reservas em [react-bits-templates.md](react-bits-templates.md#rolagem);
  - com `position: sticky` e rolagem nativa, são aceitos (seção conduzida, footer que sobe);
  - testar no celular a sensação de "site travado".
- **Técnicas testadas e o que o usuário pede em todo site:** [padroes-de-marca.md](padroes-de-marca.md).

## 6. Criticar a amostra antes de expandir

Ver a amostra em movimento e em tamanhos relevantes. Identificar o defeito com localização e consequência: “o texto secundário compete com o preço” é útil; “falta impacto” ainda precisa ser traduzido.

Perguntar se a pessoa entende o assunto e o próximo passo; se o conteúdo determina a composição; se os detalhes pertencem à mesma linguagem; e se a identidade continua reconhecível sem depender de um único efeito.

Corrigir primeiro os problemas que comprometem direção, entendimento e tarefa. Registrar a decisão e seu alcance. Expandir quando a amostra puder orientar as próximas telas, sem exigir que todo detalhe secundário esteja finalizado.
