# Melhorar a skill e o kit

Etapa 9 do caminho. Cada projeto deve deixar o próximo mais fácil. O risco é o contrário: a skill virar a cara do último site. Estas regras cuidam dos dois lados.

## O que entra

Perguntar, para cada anotação da seção "Para a skill" do `docs/ESTADO.md`:

1. **Serve a outros sites?** Regra de um projeto fica no `CLAUDE.md` dele.
2. **Custou caro ou deu retrabalho?** O que saiu fácil não precisa de registro.
3. **Já existe?** Comparar com o que está na skill e fundir: só entra o que a versão nova faz a mais. Preferência que já é regra não se repete.

| O que é | Onde entra | Como |
|---|---|---|
| Ferramenta | `assets/kit/tools/` ou `assets/estudo/` | Sem nome de projeto, sem caminho fixo, com o uso no cabeçalho |
| Mecânica de site (rolagem, dialog, lista) | `assets/kit/src/` | Sem aparência de marca: só o bastante para funcionar |
| Detector | `olhar.mjs`, usado em `testa-tudo` e `testa-estados` | Com um caso em `testa-detectores.mjs` que pega o defeito de propósito |
| Técnica que quebrou | `references/padroes-de-marca.md` | O sintoma, a causa, como conferir |
| Gesto ou efeito | `references/padrao-visual.md`, como receita | A técnica, sem o desenho |
| Preferência do usuário para todo site | `SKILL.md` e `padroes-de-marca.md` | Com as palavras dele quando ajudar |
| Algo que deu errado no fluxo de trabalho | "Erros que já aconteceram", no `SKILL.md` | A tentação e o que fazer |

## O que nunca entra

**Cara de projeto.** A skill é genérica: serve para qualquer marca e qualquer tipo de site.

- No kit, nada de cor, fonte, gesto, frase, setor ou conteúdo de marca. Ele vem em cinza de propósito, e o que é da marca vem marcado com `[[...]]`.
- Nome de cliente só como caso que explica uma técnica, nunca como padrão. "Caso que gerou a regra" está certo; "use oval como na GSL" está errado.
- Número só com o motivo. Um breakpoint que corrigiu um componente não vira lei.
- Nada que limite o tipo de site. Se uma regra só vale para loja, ela diz "em loja".

Depois de mexer, procurar resíduos: `grep -rniE "<nome do cliente>|<produto dele>|<fonte dele>" assets/kit assets/estudo`.

## Conferir antes de dar por pronto

Mudou o kit:

```
node assets/novo-site.mjs <pasta-temporária> --nome "Marca Teste" --loja
cd <pasta-temporária>
npm run testa:detectores && npm run build
npm run dev                  # em segundo plano
npm run testa && npm run testa:estados && npm run testa:fluxos
```

Olhar as capturas, conferir que nenhum `{{MARCADOR}}` sobrou além do modelo do vhost, e apagar a pasta. Mudou o vhost: `node tools/gera-vhost.mjs` e testar num nginx real (uma imagem `nginx:alpine` serve), com `CONFERE_PUBLICO=1 node tools/confere-publicado.mjs http://127.0.0.1:<porta>`.

Mudou o `SKILL.md` ou o fluxo: testar com um agente novo, de contexto limpo, dando uma situação e pedindo o plano, sem dizer o que se espera. Ver o que ele faz antes e depois da mudança, sempre com ao menos um tipo de site diferente do último projeto.

Manter o `SKILL.md` curto: o que é detalhe vai para `references/`. Antes de mudar muito, guardar uma cópia: esta pasta não tem controle de versão. A pasta real é `~/.agents/skills/criar-sites`; `~/.claude/skills/criar-sites` é um link para ela, e mexer em uma é mexer na outra. Para levar a outra máquina ou pessoa, copiar a pasta inteira.
