# criar-sites

Skill para agentes de código (Claude Code, Codex e similares) que cria, refaz e redesenha sites com identidade própria, em vez de "um site qualquer".

O método é uma ordem: **entender a marca → investigar o nicho → ver o que a marca já tem → criar o padrão visual → construir seção por seção**. Cada botão, hover e animação fica decidido antes da primeira seção. Vale para qualquer tipo de site: loja, landing page, institucional, portfólio, SaaS, painel, portal.

A skill está em português do Brasil.

## O que tem aqui

| Pasta ou arquivo | Para quê |
|---|---|
| `SKILL.md` | O caminho completo, em ordem. É o que o agente lê primeiro |
| `references/` | Um arquivo por etapa ou assunto (estudo do nicho, padrão visual, qualidade, React Bits, publicar prévia, tema Shopify) |
| `references/mundo-do-site.md` | O que torna um site reconhecível: o lugar inteiro (moldura, material, luz, rolagem), decidido antes do botão |
| `references/react-bits-templates.md` | O método extraído dos 18 templates do React Bits Pro: regras, defeitos medidos e receitas de mecânica |
| `assets/kit/` | Kit inicial de site (Vite), em cinza de propósito: o que é da marca vem marcado com `[[...]]` |
| `assets/estudo/` | Ferramentas de estudo de referências, entre elas a sonda que abre, mede e filma sites |
| `assets/novo-site.mjs` | Cria um projeto novo a partir do kit |

## Instalar

### Jeito mais fácil: colar um comando (sem instalar nada)

Não precisa de Git nem de Node. O comando baixa a skill do GitHub e coloca nas pastas do Claude Code e do Codex. Rodar de novo atualiza.

**Windows** (PowerShell):

```powershell
irm https://raw.githubusercontent.com/kprprivate/criar-sites/main/install.ps1 | iex
```

**Mac ou Linux** (Terminal):

```bash
curl -fsSL https://raw.githubusercontent.com/kprprivate/criar-sites/main/install.sh | sh
```

Depois, abra uma sessão nova do agente. Os scripts são `install.ps1` e `install.sh`, aqui no repositório, com poucas linhas: dá para ler antes de rodar.

### Se você tem o Node: `npx skills`

Precisa só do [Node](https://nodejs.org) instalado. No terminal:

```bash
npx skills add kprprivate/criar-sites -g
```

Ele baixa a skill e pergunta em quais agentes instalar (Claude Code, Codex e outros que ele encontrar no computador). O `-g` instala para todos os projetos; sem ele, instala só na pasta atual.

Depois, abra uma sessão nova do agente.

Para atualizar quando eu publicar novidades, e para remover:

```bash
npx skills update
npx skills remove criar-sites
```

### Mais fácil ainda: pedir ao próprio agente

Cole isto numa conversa com o Claude Code ou o Codex:

> Instale a skill criar-sites de https://github.com/kprprivate/criar-sites para todos os meus projetos.

### Instalar à mão

Uma skill é só uma pasta com um `SKILL.md` dentro. Basta colocá-la na pasta de skills do agente. O `SKILL.md` precisa ficar **direto** dentro da pasta `criar-sites`, sem uma pasta extra no meio.

#### Claude Code

Para valer em todos os projetos:

```bash
git clone https://github.com/kprprivate/criar-sites ~/.claude/skills/criar-sites
```

No Windows (PowerShell):

```powershell
git clone https://github.com/kprprivate/criar-sites "$HOME\.claude\skills\criar-sites"
```

Para valer só em um projeto, clone em `.claude/skills/criar-sites` dentro da pasta dele.

#### Codex e outros agentes

Clone na pasta de skills da ferramenta:

```bash
git clone https://github.com/kprprivate/criar-sites ~/.codex/skills/criar-sites
# ou, onde o agente lê ~/.agents/skills:
git clone https://github.com/kprprivate/criar-sites ~/.agents/skills/criar-sites
```

#### Usar em mais de um agente sem duplicar

Clone uma vez e aponte as outras pastas para ela com um link simbólico:

```bash
ln -s ~/.agents/skills/criar-sites ~/.claude/skills/criar-sites
```

No Windows (PowerShell, pode exigir o modo desenvolvedor ou um terminal como administrador):

```powershell
New-Item -ItemType SymbolicLink -Path "$HOME\.claude\skills\criar-sites" -Target "$HOME\.agents\skills\criar-sites"
```

#### Sem Git

Baixe o zip em **Code → Download ZIP** no GitHub, descompacte e mova a pasta para o lugar certo, renomeando-a para `criar-sites`.

## Conferir que funcionou

Abra uma sessão nova do agente. Digite `/criar-sites` (no Claude Code) ou peça algo como:

> Quero criar o site de uma padaria artesanal. Use a skill criar-sites.

O agente deve começar perguntando pela marca e investigando o nicho, e não saindo a escrever código.

## Atualizar

Se instalou com o comando `npx skills add`:

```bash
npx skills update
```

Se instalou à mão com `git clone`:

```bash
cd ~/.claude/skills/criar-sites   # ou a pasta onde você clonou
git pull
```

## Requisitos das ferramentas

A skill em si não precisa de nada. As ferramentas de `assets/` pedem:

- **Node 22 ou mais novo**, para a sonda, o kit e os testes.
- **Google Chrome** instalado, para a sonda de referências (ela roda sem interface e não mexe no seu navegador).
- **Python 3 com Pillow**, para preparar imagens e capturas do dossiê (`pip install pillow`).
- **ffmpeg** (opcional), só para filmar a rolagem dos sites estudados.

## React Bits Pro

A skill ensina a usar o React Bits e o React Bits Pro, mas **não inclui nenhum código deles**. Quem for usar os blocos e componentes do Pro precisa da **própria licença**:

- a skill pergunta logo no começo se você tem a chave e qual o plano, e cria o `.env.local` (que fica no `.gitignore`) com a linha vazia para você colar. A chave nunca vai em código, documento ou conversa;
- os componentes entram como reserva e atalho: a identidade do site é desenhada a partir da marca, não escolhida numa vitrine;
- a skill oficial `react-bits-pro` instalada no computador costuma ficar velha. O passo a passo para atualizá-la está em `references/react-bits.md`.

Os templates do Pro são produto pago. Os arquivos `references/react-bits.md` e `references/react-bits-templates.md` descrevem só técnica, proporção e medida, sem trechos deles. Se você adaptar um template, o código dele não vai para um repositório público.

## Sobre os nomes de projetos nos arquivos

Rucá, Bevi, GSL e outros aparecem como **casos que explicam uma técnica**, nunca como modelo a repetir. Cor, forma, gesto e tom saem da marca de cada projeto novo.
