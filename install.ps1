# Instala a skill criar-sites no Windows, sem Git e sem Node.
# Uso (PowerShell):
#   irm https://raw.githubusercontent.com/kprprivate/criar-sites/main/install.ps1 | iex
# Baixa o repositorio do GitHub e copia para as pastas de skills do Claude Code e do Codex.
# Se a skill ja existir, ela e substituida pela versao nova (serve tambem para atualizar).
$ErrorActionPreference = 'Stop'
$repo = 'kprprivate/criar-sites'
$tmp = Join-Path ([IO.Path]::GetTempPath()) ('criar-sites-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $zip = Join-Path $tmp 'skill.zip'
    Write-Host "Baixando github.com/$repo ..."
    Invoke-WebRequest "https://github.com/$repo/archive/refs/heads/main.zip" -OutFile $zip -UseBasicParsing
    Expand-Archive -Path $zip -DestinationPath $tmp -Force
    $src = Join-Path $tmp 'criar-sites-main'
    if (-not (Test-Path (Join-Path $src 'SKILL.md'))) { throw 'SKILL.md nao encontrado no download.' }

    # .agents primeiro: o Codex le dali, e o Claude Code pode ser um link para la.
    foreach ($base in @('.agents', '.claude')) {
        $skills = Join-Path $HOME "$base\skills"
        $dest = Join-Path $skills 'criar-sites'
        if (Test-Path $dest) {
            $item = Get-Item $dest -Force
            if ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) {
                Write-Host "Mantido: $dest e um link para outra pasta (ja atualizada)."
                continue
            }
            Remove-Item -Recurse -Force $dest
        }
        New-Item -ItemType Directory -Path $skills -Force | Out-Null
        Copy-Item -Recurse -Path $src -Destination $dest
        Write-Host "Instalado em $dest"
    }
    Write-Host ''
    Write-Host 'Pronto. Abra uma sessao nova do agente e use /criar-sites.'
}
finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
