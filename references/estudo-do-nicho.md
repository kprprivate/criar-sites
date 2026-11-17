# Investigar o nicho

Etapa 2 do caminho. Objetivo: ver como os melhores resolvem o que este site precisa resolver, de preferência sites renomados e premiados, e sair com ideias, medidas e uma estrutura. Sem escrever nenhuma linha do site.

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
| Pressa ("já começa hoje") | Uma leva curta, em segundo plano: 8 a 12 sites em triagem, uma folha de capturas, uma tabela curta e uma prancha mínima de identidade (logo, cor, letra e botão). Corre durante o primeiro bloco, e o que ela trouxer ajusta o bloco |
| Painel ou ferramenta de trabalho | Uma leva curta de ferramentas que são referência na mesma tarefa, com 2 ou 3 a fundo. O que pesa mais é a tarefa e o código que já existe |
| Ajuste ou página num site com padrão | As referências que o usuário der, mais de uma a três. Tabela de consequências |
| Só o estudo | Tudo abaixo, e parar no dossiê |

Público e fontes, em qualquer caso: [pesquisa-publico-referencias.md](pesquisa-publico-referencias.md).

## 1. Definir a régua e as frentes

**A régua** é um site que o usuário admira pelo nível, mesmo sem nada a ver com o negócio. Serve para medir acabamento e ambição, não para copiar. Ela costuma vir no pedido; se não vier, perguntar uma vez e seguir com a melhor hipótese.

**As frentes** são de três a cinco ângulos de busca, cada um num agente em paralelo. Pensar a partir do negócio e do imaginário da marca, não do setor apenas:

| Frente | O que procura |
|---|---|
| Prêmios e galerias | Premiados do setor e dos vizinhos, com linguagem de interação própria |
| O mesmo negócio, com design alto | Quem resolve o mesmo modelo muito bem, mesmo em outra categoria (acervo, assinatura, agendamento, proposta) |
| Os universos que a marca evoca | O imaginário dela, de onde vêm as ideias mais próprias (um esporte, uma época, um lugar, um ofício) |
| Referências do cliente | O que o dono indicou, e o que ele quis dizer com isso |
| Contexto local | Quando língua e hábitos pesarem |

Cada agente recebe: o que é a marca, a régua, a frente, a data de hoje e o que devolver. Pedir uma tabela com site, endereço, o que é, prêmio com link e data, e por que interessa, além do que não servir e por quê. Dizer que quer linguagem de interação padronizada (botões, hover, transições, texto que surge) e que os nomes dados são só ponto de partida. A curadoria e as capturas ficam com o coordenador.

## 2. Levantar candidatos

Galerias e premiações: Awwwards (Site do Dia, do Mês, do Ano e categorias), CSS Design Awards, The FWA, Webby Awards, Godly, SiteInspire, Land-book, Lapa Ninja, Minimal Gallery, One Page Love, Httpster, Commerce Cream, Maxibestof. Também estudos de caso de estúdios e listas sérias do assunto. Dar preferência aos dos últimos três anos.

## 3. Triar com a sonda

A sonda abre cada site de verdade no Chrome sem interface, em computador e celular, e mede o que interessa:

```
node <pasta-da-skill>/assets/estudo/sonda.mjs sites.json <pasta-saida> --mode triage --conc 3
```

- `sites.json` segue `assets/estudo/sites.exemplo.json`. A saída é pesada: pasta temporária, fora do projeto.
- Em cada pasta: capturas (`d-*` computador, `m-*` celular) e `relatorio.json`, com status, bloqueio, técnica (Lenis, GSAP, Shopify, WebGL...), fontes, cores, seções e a curva da rolagem.
- Rodar em segundo plano e seguir com outra coisa. Olhar as capturas em folha. Abrir o que chamou atenção.
- Site em que a sonda parou ou com "portão" de entrada: `portao` no JSON diz o texto a clicar. Se o sem interface for bloqueado, abrir no Chrome real.

Filtrar com critérios escritos: mesmo tipo ou princípio transferível, nível de acabamento, no ar e atual, conteúdo comparável, variedade de abordagens. Ao fim, de 10 a 12 finalistas em ordem de utilidade para esta marca, não de fama.

## 4. Analisar a fundo

```
node .../sonda.mjs finalistas.json <saida> --mode deep --conc 2     # hover em câmera lenta, páginas internas, celular
node .../sonda.mjs finalistas.json <saida> --mode filme --conc 2    # uma rolagem limpa de ~15 s, para o dossiê
node .../sonda.mjs lista.json <saida> --mode fotos                  # só as páginas em "pages", para comparar fotos
```

- **`pages`:** as páginas que o projeto precisa entender (produto, lista, serviço, contato).
- **Hover:** a sonda acha os botões, roda a animação a 20% da velocidade, fotografa os quadros e lê o CSS antes e depois (`ctas` no relatório). É daí que sai a comparação de como cada um padroniza os botões.
- **Medir em vez de achar:** se o usuário pergunta "alguma marca usa isso?", a resposta sai do CSS medido.
- **Separar o que foi visto do que foi lido.** Não afirmar hover, animação ou celular a partir de texto. Celular emulado se diz emulado.

## 5. Montar o dossiê

A entrega é uma página publicada, com filmes e imagens, para o usuário abrir e decidir. Partir de `assets/estudo/dossie.modelo.html`, dar a ela um conceito próprio do nicho, e reduzir as capturas:

```
python -I <pasta-da-skill>/assets/estudo/prepara-capturas.py lista.json <pasta-da-sonda> docs/estudo
```

Seções, nesta ordem:

1. **Abertura:** o achado principal numa frase que se discuta, e os números (levantados, abertos, a fundo, zero linhas de código).
2. **A identidade proposta, elemento por elemento:** a prancha de branding, desenhada na tela, nunca descrita. Não é site nem guia final: é o que se decide junto com as referências. Cada peça com a regra de uso:
   - **A ideia**, em uma ou duas frases, e o teste da troca de logo.
   - **Logo** em vetor: principal, sobre fundo escuro, em uma cor, invertido, só o símbolo, nos tamanhos pequenos (64, 32 e 16 px) e, se couber, um selo. Respiro, menor tamanho e o que nunca fazer.
   - **Cor:** amostras com nome, código e papel, o contraste medido de cada par de texto e os temas da marca lado a lado.
   - **Letra:** cada papel (título, texto, rótulo e número, o que mais houver) com amostra real no idioma do site, acentos incluídos.
   - **Formas e padrões** que saem da marca: borda, textura, moldura, divisor.
   - **Ícones** num traço só, com a regra.
   - **Fotografia:** a direção com exemplos, o que sempre e o que nunca.
   - **Componentes** funcionando: botões com o gesto, link, abas, estados (aberto, selecionado, erro) e a unidade principal do site (item de cardápio, cartão de produto, projeto).
   - **Aplicações:** de duas a quatro, como a tela do celular, uma peça física, o topo ou o rodapé.
   - **Voz:** sim e não, com frases reais da marca.

   A ideia da prancha é a proposta de direção; as ideias da seção 6 são alternativas ou peças dela, e a etapa 4 confirma a escolhida como ideia geradora. O código da prancha é do dossiê, não do site ("zero linhas" vale para o site): o que for aprovado é reescrito em `marca.css` e `marca.js` na etapa 4. Ela vem antes dos achados porque é o que o usuário decide; os achados a justificam logo abaixo.

   A prancha usa as cores e letras da marca, não as do dossiê. Logo só em PNG se redesenha em vetor antes ([padrao-visual.md](padrao-visual.md#2-logo-em-vetor)); quando o arquivo de origem é fraco, a prancha diz que o vetor é de trabalho. Testar as letras em amostra real antes de escolher.
3. **O que o estudo descobriu:** de quatro a seis achados, cada um com evidência e consequência.
4. **As analisadas a fundo:** uma ficha por site, com o que vi, levar, não levar, o que foi medido, capturas e filmes.
5. **Como cada um padroniza os botões:** forma, o que acontece, quadros do hover.
6. **Ideias que o estudo abriu:** cada uma saída de algo que só esta marca tem, com origem, forma, onde e limite. Se der, funcionando na página.
7. **Como esses sites se organizam:** uma linha por referência (navegação, home, página da unidade, prova, o fluxo do negócio, o que aproveitar).
8. **A estrutura que eu proporia:** menu, home, página da unidade e o que vamos precisar.
9. **O que evitar:** os clichês do nicho, com quem faz.
10. **Perguntas desta rodada:** poucas, que mudem a direção.
11. **Tudo o que foi levantado:** a lista, com situação de cada site (analisado, reserva, bloqueado, não abriu).

Publicar: no Claude Code, pela ferramenta Artifact, com `capturas/` e `filmes/` como arquivos de apoio (carregar a skill de design de artifact antes). Em outro agente, servir localmente e passar o caminho. Guardar a cópia em `docs/estudo/` e o link em `docs/ESTADO.md`.

## 6. Ouvir e seguir

Pedir que escolha de 3 a 5 e comente o que gostou e o que detestou, e o que mudaria na prancha de identidade. Se deixar a escolha com você, escolher, dando um papel a cada referência, e seguir. As ideias e as respostas alimentam as etapas 3 e 4. No modo liberado, não parar aqui: escolher, registrar e seguir.

## Cuidados

- **Verificação de robô:** a sonda não disfarça o navegador e nada passa por CAPTCHA. Site que bloquear fica marcado. Se ele fizer muita falta, pedir ao usuário que resolva no Chrome dele; enquanto isso, seguir com os outros.
- **Cookies:** recusar. A sonda tenta recusar, senão esconde o aviso, sem aceitar.
- **Disco:** filmar gera milhares de quadros até virar mp4. Conferir o espaço antes dos finalistas e apagar temporários depois. Já encheu um disco no meio de uma captura.
- **Máquina:** a sonda em paralelo trava o Chrome real. Olhar sites no Chrome real quando ela terminar.
- **Prêmios:** vêm das páginas citadas. Dizer no dossiê se não foram conferidos na origem.
- **Direitos:** o dossiê é estudo interno. Princípio se aproveita; ativo, texto, ilustração e código, não.
