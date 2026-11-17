#!/bin/sh
# Instala a skill criar-sites no Mac ou Linux, sem Git e sem Node.
# Uso:
#   curl -fsSL https://raw.githubusercontent.com/kprprivate/criar-sites/main/install.sh | sh
# Baixa o repositorio do GitHub e copia para as pastas de skills do Claude Code e do Codex.
# Se a skill ja existir, ela e substituida pela versao nova (serve tambem para atualizar).
set -eu

repo="kprprivate/criar-sites"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

echo "Baixando github.com/$repo ..."
curl -fsSL "https://github.com/$repo/archive/refs/heads/main.tar.gz" | tar -xz -C "$tmp"
src="$tmp/criar-sites-main"
[ -f "$src/SKILL.md" ] || { echo "SKILL.md nao encontrado no download." >&2; exit 1; }

# .agents primeiro: o Codex le dali, e o Claude Code pode ser um link para la.
for base in .agents .claude; do
  dest="$HOME/$base/skills/criar-sites"
  if [ -L "$dest" ]; then
    echo "Mantido: $dest e um link para outra pasta (ja atualizada)."
    continue
  fi
  mkdir -p "$HOME/$base/skills"
  rm -rf "$dest"
  cp -R "$src" "$dest"
  echo "Instalado em $dest"
done

echo
echo "Pronto. Abra uma sessao nova do agente e use /criar-sites."
