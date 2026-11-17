# Prompt inicial: só quando pedirem

Esta etapa **não faz parte do caminho normal**. O site novo começa direto na etapa 1 do `SKILL.md`, com o que foi dito no pedido. Escrever prompt inicial para aprovação só atrasa.

Usar este arquivo quando o usuário pedir o prompt, o briefing de partida ou quiser preparar o projeto para começar em outro chat ou com outra pessoa. Se já existe um prompt (`docs/PROMPT-INICIAL.md` ou o que ele colou), seguir com ele.

## Sumário

- [1. Perguntar só o que falta](#1-perguntar-só-o-que-falta)
- [2. Estudo](#2-estudo)
- [3. Escrever o prompt inicial](#3-escrever-o-prompt-inicial)
- [4. Aprovar e seguir](#4-aprovar-e-seguir)

## 1. Perguntar só o que falta

Primeiro ler o que já existe: pedido, pastas, repositório, marca, textos, fotos, sites atuais. Depois perguntar, de uma vez e em poucas perguntas, só o que muda o projeto. O que não bloquear vira hipótese registrada no prompt.

| Assunto | O que saber |
|---|---|
| O site | O que é, de quê, para quem e qual a ação principal (comprar, contratar, contatar, se cadastrar) |
| As unidades | A lista de projetos, produtos ou serviços e o que existe de cada uma (material, links, papel do autor, público ou confidencial) |
| Materiais | Onde estão a marca, os textos, as fotos, os vídeos e os trabalhos; o que é oficial e o que é provisório |
| Referências | Sites de que gosta e **o que** gosta em cada um, e o que quer evitar |
| Recursos permitidos | Bibliotecas de componentes ([react-bits.md](react-bits.md)), imagens geradas, fotos reais, fontes com licença |
| Destino | Onde vai rodar e ser publicado: Shopify ([shopify-por-script.md](shopify-por-script.md)), servidor próprio, hospedagem estática. Também domínio, prévia e quem mantém o conteúdo depois |
| Limites | Idioma, prazo, o que não pode (alegações, dados de clientes, conteúdo inventado), contrato |

## 2. Estudo

Só o suficiente para o prompt ficar concreto: inventário das pastas, o que falta, e as referências abertas de verdade, com o princípio que interessa em cada uma, fonte e data. Se o usuário quiser o estudo completo antes do prompt, fazer a etapa 2 ([estudo-do-nicho.md](estudo-do-nicho.md)), mostrar o dossiê e só então escrever.

Stack provável: decorre do destino e dos recursos. React Bits pede React. Shopify por script pede site em HTML, CSS e JS puros.

## 3. Escrever o prompt inicial

Usar o modelo [assets/prompt-inicial.modelo.md](../assets/prompt-inicial.modelo.md):

- preencher com o que foi dito e estudado;
- marcar hipóteses como hipóteses;
- tirar os blocos que não se aplicam.

Salvar no projeto, em `docs/PROMPT-INICIAL.md`.

O prompt precisa:

- começar chamando a skill: `/criar-sites` no Claude Code e no Kiro, `$criar-sites` no Codex;
- dizer onde estão os materiais, sem presumir nomes de arquivo;
- trazer o modo de trabalho (acompanhado, salvo se o usuário liberar);
- trazer as referências com o que se quer de cada uma;
- dizer os recursos permitidos e as regras deles (React Bits adaptado à identidade, chave fora do código);
- trazer o destino e a stack;
- trazer a sequência inicial de blocos, se já houver;
- trazer a ordem do método: marca, nicho, o que a marca já tem, padrão visual, seções;
- terminar dizendo o que executar primeiro, sem pedir nova aprovação do prompt.

## 4. Aprovar e seguir

- Mostrar o prompt ao usuário e ajustar até ele aprovar.
- Se o usuário for começar em outro chat, dizer exatamente o que fazer:
  1. abrir o agente (Claude Code, Codex ou Kiro CLI) na pasta do projeto;
  2. colar o conteúdo de `docs/PROMPT-INICIAL.md`.
- Se for no mesmo chat, seguir o caminho do `SKILL.md`.
- Registrar no estado do projeto: a data, o prompt aprovado e as hipóteses abertas.
