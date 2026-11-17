# React Bits e React Bits Pro

Bibliotecas de componentes animados para React: fundos, efeitos de texto, cursor, cartões, galerias e seções prontas. Nesta skill, servem como **matéria-prima de movimento e de peças**. A identidade continua sendo do projeto ([direcao-criativa.md](direcao-criativa.md)).

Componentes e blocos levantados em out/2026; templates, em 17/11/2026, nas páginas oficiais. Os números mudam; conferir na hora de usar.

O que os templates do Pro ensinam sobre como construir (método, defeitos medidos e receitas): **[react-bits-templates.md](react-bits-templates.md)**.

## Sumário

- [O que cada um oferece](#o-que-cada-um-oferece)
- [Como usar sem perder a identidade](#como-usar-sem-perder-a-identidade)
- [Templates do Pro](#templates-do-pro)
- [Stack](#stack)
- [Configurar no projeto](#configurar-no-projeto)
- [Atualizar a skill oficial sozinha](#atualizar-a-skill-oficial-sozinha)
- [Verificar](#verificar)

## O que cada um oferece

### React Bits (grátis) — https://reactbits.dev

- **Acervo:** cerca de 216 componentes.
  - Text Animations: 33.
  - Animations: 38 (cursor, hover, bordas, imagem).
  - Components: 48 (cartões, navegação, carrosséis, galerias).
  - Micro: 34.
  - Backgrounds: 63 (gradientes, partículas, grades, shaders).
- **Variantes:** cada componente vem em JS ou TS, com CSS ou Tailwind. O sufixo escolhe: `SplitText-TS-CSS`, `SplitText-TS-TW`.
- **Instalação:**
  - `npx shadcn@latest add @react-bits/SplitText-TS-CSS`. O registro `@react-bits` aponta para `https://reactbits.dev/r/{name}.json` e é público;
  - pelo jsrepo: `npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW`;
  - ou copiando da aba Code de cada componente.
- **Licença:** MIT + Commons Clause. Uso livre em projetos pessoais e comerciais, mas não se pode vender os componentes em si. Manter o aviso de licença no código.

### React Bits Pro (com conta) — https://pro.reactbits.dev

- **Planos:** Starter, Pro e Ultimate. O prefixo da chave diz o plano: `rbps-`, `rbpp-`, `rbpu-`.
- **Registro `@reactbits-starter`:** componentes, em todos os planos (cerca de 230). Sufixo `-tw` ou `-css` obrigatório, como em `silk-waves-css`.
- **Registro `@reactbits-pro`:** blocos de seção (cerca de 300 de marketing), Application UI (cerca de 300) e Agent Kit. Só nos planos Pro e Ultimate. Sem sufixo, como em `hero-1`.
- **Templates:** 18 públicos, cada um com demo e página de docs; download em `.zip` pelo site, no plano Ultimate ([abaixo](#templates-do-pro)).
- **Agent Kit:**
  - a skill oficial (`@reactbits-starter/skill`);
  - design skills (Apple Minimal, Editorial, Neobrutalism, Playful Motion, Swiss Grid e outras);
  - prompts por setor (Agency, Ecommerce Brand, SaaS...);
  - receitas (Agency Homepage, Product Launch, SaaS Homepage).
- **Detalhes de instalação:** importar (ler a linha de `export` do bloco), `"use client"` e pai com tamanho nos componentes WebGL. Estão na skill oficial `react-bits-pro`, que deve estar atualizada (abaixo).

## Como usar sem perder a identidade

- **Escolher pelo papel, não pela vitrine:** primeiro a linguagem de interação do projeto, depois o efeito que a serve. Perguntar: "como isso fica com os movimentos da marca?".
- **Adaptar sempre:**
  - cores dos tokens do projeto, tipografia da marca, tempo e easing da linguagem de movimento;
  - o texto real;
  - menos partículas e mais contenção.
  - Componente com a cara da demo é resultado "a menos".
- **Um efeito por função.** Não empilhar fundo animado, cursor, texto que se parte e cartão que inclina na mesma tela.
- **Blocos e templates do Pro:**
  - servem de estrutura e atalho técnico, e o desenho é refeito;
  - passar no teste "se trocarmos nome e logo, serve para qualquer empresa?";
  - receitas e design skills do Agent Kit são referência no estudo, não direção.
- **Créditos:** registrar o que veio de cada biblioteca no registro do projeto.

## Templates do Pro

Em 17/11/2026, 18 templates com demo pública: `saas`, `ai-saas`, `ai-app`, `shader`, `cloudlight`, `arclight`, `agency`, `portfolio`, `imageworks`, `8-bit`, `wireframe`, `minimal`, `security`, `finance`, `sparkdesign`, `genai`, `reworker` e `agentframe`. O mapa, com tipo, assinatura e stack de cada um, está em [react-bits-templates.md](react-bits-templates.md#mapa-dos-18).

- **Stack declarada nas docs:** todos em Next.js (16+; um declara 15+), React, TypeScript, Tailwind v4 e Motion. Lenis em 14, Three.js ou React Three Fiber em 8, GSAP em 2. Os 7 mais novos declaram React 19 e Lucide, e nenhum deles declara GSAP nem React Three Fiber. Usar um template inteiro é adotar essa stack.
- **O que vem junto:** tema claro e escuro, um arquivo de configuração central na maioria e, nos mais novos, movimento reduzido tratado, dados estruturados e sitemap. Um deles (`agentframe`) traz páginas além da home.
- **Licença:** download no plano Ultimate. A docs do `portfolio` o declara de uso livre em projetos pessoais e comerciais; conferir os termos de cada um na página antes de usar.
- **Não é garantia:** 11 dos 18 carregam uma fonte que nunca é aplicada, e vários entregam o título invisível até o JS rodar. Antes de mostrar, passar pela [lista de defeitos](react-bits-templates.md#defeitos-que-os-próprios-templates-têm).
- **Como escolher e adaptar:** pela mecânica, depois do padrão visual, trocando o objeto e religando aos tokens do projeto ([passo a passo](react-bits-templates.md#escolher-e-adaptar-um-template-ou-bloco)).

## Stack

React Bits é **React**:

- **Portfólio, landing e institucional com React Bits:** Vite + React + TypeScript.
  - Com componentes `-css`, os tokens e o CSS do projeto continuam mandando.
  - Com blocos do Pro, é preciso Tailwind (v4) e o helper `cn()`.
- **Next.js** só quando o projeto pedir servidor (rotas dinâmicas, SEO por página gerada, API), ou quando a base for um template do Pro, que é Next.js.
- **Site em HTML, CSS e JS puros** (como os que viram tema Shopify por script): o React Bits não entra direto. Portar à mão só efeitos simples, respeitando a licença. Senão, escolher o efeito equivalente próprio.
- **Repositório público:** o código-fonte de componentes do **Pro** publicado num repositório aberto expõe material pago. Manter o repositório privado ou conferir os termos da licença antes.

## Configurar no projeto

1. Fazer o projeto ser um projeto shadcn: `npx shadcn@latest init`. Isso cria o `components.json`; com Tailwind, também o `cn()`.
2. Pôr os registros no `components.json`. Juntar ao que já existe, sem apagar campos:

   ```json
   {
     "registries": {
       "@react-bits": "https://reactbits.dev/r/{name}.json",
       "@reactbits-starter": {
         "url": "https://pro.reactbits.dev/api/r/starter/{name}.json",
         "headers": { "Authorization": "Bearer ${REACTBITS_LICENSE_KEY}" }
       },
       "@reactbits-pro": {
         "url": "https://pro.reactbits.dev/api/r/pro/{name}.json",
         "headers": { "Authorization": "Bearer ${REACTBITS_LICENSE_KEY}" }
       }
     }
   }
   ```

3. **Chave de licença:**
   - o **usuário** coloca no `.env.local` da raiz: `REACTBITS_LICENSE_KEY=...`;
   - o `.env.local` fica no `.gitignore`;
   - nunca pedir a chave na conversa, nunca ler o arquivo, nunca escrever a chave em código, documento ou prompt. O CLI lê do ambiente.
   - Nas páginas do Pro logadas, a chave aparece na tela: não copiar nem registrar.
4. **MCP** (buscar, listar e instalar pedindo em texto):
   - o servidor é sempre o mesmo, `npx shadcn@latest mcp`, rodando na raiz do projeto. Muda só onde cada agente guarda a configuração:
     - **Claude Code:** `npx shadcn@latest mcp init --client claude` grava o `.mcp.json` do projeto. Reiniciar e conferir em `/mcp` que o `shadcn` está `Connected`.
     - **Codex:** `npx shadcn@latest mcp init --client codex`, ou à mão em `~/.codex/config.toml`: `[mcp_servers.shadcn]`, com `command = "npx"` e `args = ["shadcn@latest", "mcp"]`. Reiniciar o Codex.
     - **Kiro CLI:** em `.kiro/settings/mcp.json` do projeto, o mesmo bloco abaixo. Reiniciar o chat.

     ```json
     {
       "mcpServers": {
         "shadcn": { "command": "npx", "args": ["shadcn@latest", "mcp"] }
       }
     }
     ```

   - ele enxerga os registros do `components.json`, inclusive o grátis.
   - **Erros comuns:**
     - 401: falta o `.env.local` ou o `components.json` não está na raiz aberta;
     - 403: bloco no plano Starter;
     - sem ferramentas: `npx clear-npx-cache` e religar o servidor.
5. **Instalar:**
   - grátis: `npx shadcn@latest add @react-bits/<Nome>-TS-CSS`;
   - Pro: `npx shadcn@latest add @reactbits-starter/<slug>-css` e `@reactbits-pro/<slug>`;
   - ver antes de instalar: `npx shadcn@latest view <item>`.

## Atualizar a skill oficial sozinha

A skill `react-bits-pro` instalada no computador pode estar velha. A cópia de 01/07/2026 falava em 101 componentes e 158 blocos; em out/2026, eram 230 componentes e cerca de 600 blocos.

**Na partida de todo projeto que usa o Pro**, depois que o usuário pôs a chave no `.env.local`:

1. Na raiz do projeto, rodar `npx shadcn@latest add @reactbits-starter/skill`. Ele grava a versão atual em `./SKILL.md` e precisa da chave: sem ela, responde 401.
2. Mover o arquivo para a pasta de skills do projeto, conforme o agente em uso. Assim, a raiz fica limpa e a skill vale neste projeto.
   - Claude Code: `.claude/skills/react-bits-pro/SKILL.md`.
   - Codex: `.agents/skills/react-bits-pro/SKILL.md`.
   - Kiro CLI: `.kiro/skills/react-bits-pro/SKILL.md`.
3. Comparar com as cópias do usuário que existirem: `~/.claude/skills/react-bits-pro/`, `~/.codex/skills/react-bits-pro/`, `~/.agents/skills/react-bits-pro/` e `~/.kiro/skills/react-bits-pro/`. Em cada uma que mudou:
   - guardar a antiga como `SKILL.md.bak`;
   - pôr a nova no lugar;
   - recolocar no topo o aviso de atualização;
   - contar ao usuário o que mudou (números, comandos).
4. Sem chave ainda: seguir com o React Bits grátis e deixar a atualização como primeiro passo quando a chave chegar.

## Verificar

Além dos critérios de [qualidade.md](qualidade.md):

- **Movimento reduzido:** muitos componentes não tratam `prefers-reduced-motion`. Envolver e trocar pela versão parada.
- **Tela:** pausar fora da tela e com a aba oculta (WebGL, partículas, laços de animação).
- **WebGL:** pai com tamanho definido; versão sem WebGL quando o contexto falhar.
- **Celular:** medir o peso (three, ogl, gsap) e o tempo de abertura; reduzir partículas e resolução.
- **Texto animado** (SplitText e semelhantes): o leitor de tela lê a frase inteira, não letra por letra.
- **Toque e teclado:** efeito de cursor e de hover precisa de equivalente no toque e no foco.

O que os templates do Pro deixam passar, medido ([tabela](react-bits-templates.md#defeitos-que-os-próprios-templates-têm)):

- **Fonte:** com `next/font` e Tailwind v4, a classe da variável da fonte vai no `<html>`, não no `<body>`. Medir a família calculada do h1 ([como](padroes-de-marca.md#fonte-carregada-que-não-aparece)).
- **Nascer invisível:** o estado inicial do Motion (`opacity: 0`) vai no HTML do servidor. O título não entra nessa animação ([como](padroes-de-marca.md#conteúdo-que-nasce-invisível)).
- **Movimento reduzido em JS:** o reset de CSS não alcança Motion, GSAP nem shader. Cada um consulta a preferência, por um provedor único.
- **Sem WebGL:** a falha do contexto não pode derrubar a página. Abrir com o WebGL desligado antes de entregar ([como](qualidade.md#conferir-à-mão-ainda-sem-detector)).
- **Texto por letra:** um invólucro que não quebra por palavra, com as letras dentro.
