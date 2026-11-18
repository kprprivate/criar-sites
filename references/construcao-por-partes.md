# Planejar e construir em ordem

Etapas 5 e 6 do caminho. O padrão visual já existe, com o mundo do site aprovado: agora ele vira seções, de cima para baixo, uma por vez, todas dentro do mesmo lugar. Os dois modos de trabalho estão no `SKILL.md`: acompanhado (padrão) e liberado.

## 1. Planejar os blocos

Antes da primeira seção, responder na tabela de blocos de `docs/ESTADO.md`: quais seções vamos ter, o que precisamos vender, o que precisa ficar claro e como. Cada bloco tem uma função: a pergunta, tarefa ou objeção que ele resolve. Se não tem função ou conteúdo real, não existe.

- Um bloco é um resultado pequeno e revisável: uma seção, uma tela ou um trecho de jornada. Elementos inseparáveis podem ir juntos, como header e abertura.
- Em redesign, cruzar a tabela com `docs/INVENTARIO.md`: nada do site antigo fica sem lugar.
- Dar a cada página o arquétipo do que ela é ([padroes-de-marca.md](padroes-de-marca.md#cada-página-com-a-sua-forma)).
- Marcar o arco na tabela: onde fica o momento forte, o que a abertura promete e como o fecho rima com ela. E dizer, em cada bloco do meio, o que do mundo aparece nele (moldura, material, tratamento de imagem, voz): é no meio que o mundo costuma sumir ([mundo-do-site.md](mundo-do-site.md#onde-se-erra)).
- Não inventar kits, ofertas, avaliações ou mídia para preencher a sequência.

**Ponto de partida para site de marca**, ajustando ao pedido e ao que existir:

1. Header, menu do celular e abertura (com faixa de anúncio, se houver), com a ação principal na primeira tela.
2. A vitrine ou o conteúdo principal, com a unidade (cartão de produto, projeto, serviço) na linguagem da marca.
3. O protagonista em cena (a seção-assinatura), se o mundo pedir uma.
4. O que prova e o que explica: diferenciais, marcas, resultado, como funciona.
5. A ação principal do negócio: comprar, agendar, pedir orçamento, vender.
6. Rodapé que sobe, voltar ao topo e botões fixos.
7. Páginas internas, cada uma com a sua forma: as do negócio (lista, unidade, sacola ou formulário), sobre, ajuda, políticas e 404.
8. Revisão do conjunto.

Em portfólio, editorial, sistema ou painel, delimitar os blocos pela tarefa principal ([adaptacoes.md](adaptacoes.md)). Se uma regra comercial ou integração condicionar o visual, provar antes, num bloco técnico curto.

## 2. Manter o estado visível

| Estado | Significado | O que pode |
|---|---|---|
| Aprovado | Avaliado e aceito pelo usuário | Preservar; propor mudança com o impacto dela |
| Em construção | Autorizado agora | Implementar, revisar, corrigir |
| Em revisão | Mostrado, à espera da avaliação | Esperar ou esclarecer; não começar o próximo. Se o usuário liberar, passa a "pronto": liberar não é aprovar |
| Pronto, à espera de avaliação | Feito no modo liberado | Seguir; o usuário avalia depois |
| Próximo, falta | Planejado | Só planejar, até ser liberado |

Registrar em `docs/ESTADO.md`, sem documento duplicado: bloco atual, último feedback e próximo proposto.

## 3. Construir e mostrar

- **O link local já está no ar desde a etapa 1** (`npm run dev`): o usuário viu o dossiê, o mundo e o guia nele, e vê cada bloco nascer. Se o servidor caiu, subir de novo antes de qualquer coisa. Dizer que o link só abre nesta máquina e o que ainda não funciona. Nada de Artifact nem de endereço público para mostrar bloco.
- Conteúdo representativo e real, com comprimentos plausíveis. Distinguir dado real, provisório e integração simulada.
- Ver a captura de cada bloco, em tela grande e pequena, antes de mostrar. Comparar com os blocos vizinhos e com a abertura: o bloco ainda é o mesmo lugar?
- Rodar os testes do que mudou: `node tools/testa-tudo.mjs <pasta> home 360x740,1366x700` é rápido. A bateria inteira fica para o fim ou para o segundo plano.
- Página ou estado novo entra em `tools/testes.config.mjs` no mesmo bloco, e fluxo novo em `tools/testa-fluxos.mjs`.
- Decisão vira regra na hora, no `CLAUDE.md` do projeto.

Não avançar porque o build passou ou porque o resultado pareceu bom a você. No modo acompanhado, quem libera é o usuário.

## 4. Encerrar cada rodada

```text
O que ficou pronto e onde ver:
O que olhar primeiro:
Decisões que mais pesaram:
O que foi verificado, em quais janelas (emulado é emulado):
O que ainda não funciona ou é simulado:
O que preciso de você:
Próximo bloco proposto, ainda não feito:
```

Pedir uma avaliação específica quando útil: hierarquia, tom, densidade, composição, comportamento. Responder primeiro ao que o usuário perguntou.

## 5. Interpretar o feedback

- **"Ficou bom":** registrar a aceitação. Não libera o resto do site.
- **"Próximo", "pode seguir":** libera só o próximo bloco já proposto.
- **Pedido de correção:** ajustar e mostrar de novo. Não libera o próximo.
- **Nova preferência:** aplicar no alcance pedido; mostrar quando afetar partes aprovadas. Se parecer valer para todo site, anotar em "Para a skill".
- **Mudança de ordem:** atualizar a tabela.
- **Correção de um fato:** corrigir em todo lugar em que ele foi escrito, inclusive no dossiê e no guia, e dizer que corrigiu.

Se o bloco foi aprovado sem indicar avanço, confirmar em uma linha qual é o próximo, sem fazer.

## 6. Modo liberado, na prática

O usuário foi dormir e pediu para deixar pronto. O resultado é ele acordar com um site navegável, um relatório curto e nenhuma surpresa.

1. Registrar a liberação e reler tudo o que a marca já tem, porque as seções partem disso.
2. Seguir a tabela de blocos, na ordem. Criatividade e pesquisa continuam: "não pode ser um site qualquer" vale de madrugada também. Se a seção pede, pesquisar como os melhores fazem.
3. Cada bloco passa pelos testes e pela captura antes do próximo.
4. Dar status curto de vez em quando; ele pode acordar e olhar.
5. Dúvida reversível: decidir e anotar em "Decisões minhas, à espera de confirmação". Fato sem fonte: `[[provisório]]`, em "Pendências do cliente".
6. Ao terminar, bateria completa e revisão crítica independente ([qualidade.md](qualidade.md#revisão-independente)). Aplicar o que procede e repetir os testes.
7. Parar antes de publicar, gastar ou mexer em sistema de terceiros.

Relatório de manhã: o link, o que olhar primeiro, o que foi testado, o que é simulado, decisões minhas para aprovar ou trocar, pendências do cliente.

## 7. Usar paralelismo dentro do limite

Agentes servem para pesquisa, auditoria de ativos, revisão e testes do bloco atual. Reunir os resultados sob uma direção única. No modo acompanhado, não construir seções futuras por subagentes, branches, arquivos ocultos ou código desativado: aguardar a avaliação é parte do processo.
