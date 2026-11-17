# Registrar decisões e evidências sem burocracia

Reutilizar documentos e convenções do projeto. Manter estas informações em poucos lugares fáceis de encontrar; não criar todos os arquivos abaixo por obrigação. Atualizar o registro existente em vez de manter versões contraditórias.

## 1. O estado do projeto

Um arquivo só: `docs/ESTADO.md`. O kit traz o modelo. Quem retoma lê este arquivo e o `CLAUDE.md` e sabe onde tudo está.

| Seção | O que guarda |
|---|---|
| Topo | Modo de trabalho (e as palavras da liberação), link local, site no ar, prévia |
| Publicados | Links do dossiê, do guia e das comparações |
| Blocos | Número, bloco, função e estado |
| Decisões do usuário | Com data, nas palavras dele quando importar |
| Decisões minhas, à espera de confirmação | O que decidi sem ele poder responder, para aprovar ou trocar |
| Pendências do cliente | O que só ele resolve: direitos, regras comerciais, contatos, textos legais |
| Limites do que foi verificado | Emulado, simulado, data dos dados, o que não foi visto |
| Para a skill | O que custou caro e pode vir pronto no próximo site |

Na primeira leitura do projeto, responder ali: o que é a marca, para quem, o que o site precisa fazer, com fato, observado e hipótese separados. Distinguir desejo, evidência e decisão. Não registrar metas comerciais como resultados obtidos nem transformar uma preferência inferida em instrução do usuário.

As regras permanentes (identidade, técnica, como rodar, como publicar) ficam no `CLAUDE.md`. O inventário do site antigo, em `docs/INVENTARIO.md`.

## 2. Regras do projeto

Documentar apenas regras que orientem trabalho futuro. Referenciar tokens, componentes ou documentos existentes em vez de copiar definições. Usar o formato abaixo em uma tabela ou lista já adotada pelo projeto.

| Campo | O que registrar |
|---|---|
| Regra | Comportamento concreto que deve se repetir |
| Motivo | Problema que resolve ou princípio que preserva |
| Alcance | Global, página, componente ou situação específica |
| Exemplo | Aplicação ou referência visível no projeto |
| Exceção | Circunstância conhecida que exige outro tratamento |
| Estado | Provisória ou consolidada; origem da decisão quando relevante |

Registrar padrões de conteúdo, identidade, componentes, estados, mídia e movimento quando surgirem decisões úteis. Não promover automaticamente toda correção local a regra global.

## 3. Decisões e feedback

Transformar comentários em problemas verificáveis. Quando o feedback for amplo, observar a área citada e formular uma hipótese antes de modificar vários aspectos ao mesmo tempo.

```text
Observação: o que foi visto ou relatado, em qual contexto.
Hipótese: causa provável, ainda sujeita a verificação.
Mudança: alteração pequena o suficiente para avaliar seu efeito.
Resultado: evidência observada depois; registrar também ausência de melhora.
Decisão: manter, ajustar, retirar ou investigar.
Alcance: global, local ou experimento descartado.
```

Exemplo: “no celular, a pessoa rola e pensa que a página parou” é a observação. “A cena presa dura além do que o conteúdo justifica” é uma hipótese. Encurtar a cena é uma mudança; verificar compreensão e resposta no mesmo contexto produz o resultado.

Preservar experimentos relevantes em histórico ou controle de versão. Registrar por que foram retirados para evitar sua reintrodução sem nova evidência. Não acumular alternativas mortas no código que será entregue.

## 4. Evidências de conclusão

Associar cada verificação ao que foi realmente executado. Usar registros, capturas ou caminhos existentes quando forem úteis. Não exigir uma coleção de documentos e imagens para mudanças simples.

| Item | Ambiente e contexto | Ação executada | Resultado observado | Evidência ou pendência |
|---|---|---|---|---|
| Tarefa principal | Informar ambiente, tamanho e modo de interação | Descrever o percurso realizado | Informar sucesso ou defeito concreto | Referência disponível ou próximo passo |
| Integração | Informar se é teste, produção ou simulação | Descrever a operação verificada | Informar retorno e estado final | Registro sem dados sensíveis |
| Revisão visual | Informar a composição observada | Descrever inspeção relevante | Informar defeitos corrigidos ou restantes | Captura, anotação ou limitação |

Marcar cada critério como **atendido**, **não atendido**, **não verificado** ou **não se aplica**, com evidência ou motivo. Não usar “atendido” para trabalho apenas planejado, código apenas lido ou ferramenta indisponível. Distinguir o estado da integração (simulada, implementada ou verificada) do resultado de cada critério.

Distinguir verificações automáticas, inspeção visual e uso real. Uma não substitui as outras. Priorizar a tarefa principal e os riscos concretos; ampliar a verificação quando uma alteração puder afetar outra área.

## 5. Encerrar e retomar

Ao concluir uma etapa ou entregar o projeto, registrar o que está utilizável, a principal decisão tomada, a evidência disponível e as pendências que afetam o uso. Indicar o próximo passo apenas quando houver trabalho restante.

Ao retomar, ler esses registros antes de refazer decisões. Distinguir claramente planejado, em execução, em avaliação e aprovado. Conferir qual mensagem autoriza a rodada atual; não transformar elogio ou aprovação local em liberação do restante. Atualizar os pontos alterados e preservar o histórico útil. Tratar novas evidências como motivo para revisar uma regra, sem apagar a razão pela qual ela existia.
