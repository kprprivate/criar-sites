# Publicar a prévia num servidor

Etapa 8 do caminho, quando o pedido é subir o site num endereço de teste, em servidor próprio com nginx. Loja Shopify: [shopify-por-script.md](shopify-por-script.md). Outro destino (hospedagem estática, Cloudflare Pages, Vercel): usar a skill ou a documentação dele e aproveitar as seções "Antes de ter endereço público" e "Conferir".

Publicar só com pedido. O pedido cobre este site, não a configuração compartilhada do servidor.

## Sumário

- [Antes de ter endereço público](#antes-de-ter-endereço-público)
- [Ler o servidor, sem mexer](#ler-o-servidor-sem-mexer)
- [O vhost](#o-vhost)
- [Implantar](#implantar)
- [Conferir](#conferir)
- [O que já deu errado](#o-que-já-deu-errado)

## Antes de ter endereço público

O que era aceitável no site local pode virar afirmação falsa ou risco.

- **Fluxo simulado avisa na tela.** "Recebemos o seu pedido" sem nada enviado é mentira num link público. Um aviso discreto, no passo e na confirmação, dizendo que é simulação e o caminho real.
- **Contatos reais.** Botão de WhatsApp, telefone e agenda falam com a marca de verdade: dizer ao usuário antes de ele divulgar.
- **Fora do Google:** `X-Robots-Tag: noindex` já vem no vhost. Sem isso, uma prévia com o mesmo conteúdo compete com o site oficial.
- **Imagem do link compartilhado:** 1200×630, com endereço absoluto, em `src/casca/cabeca.html`. Conferir direito de uso.
- **Direitos e jurídico:** logos de terceiros, fotos, alegações. Reler as notas do projeto. O que estiver pendente vai no relatório, com destaque.
- **Provisórios:** `npm run pendencias` lista cada `[[...]]`, e `npm run pacote` para se houver algum. Resolver; se o usuário aceitar mostrar assim, `npm run build && node tools/pacote.mjs`. Pendência do cliente (direitos, regras) não trava a prévia: vai no relatório, com destaque.

## Ler o servidor, sem mexer

Servidor compartilhado é de outros sistemas também. Antes de escrever qualquer coisa, só leitura:

| Pergunta | Como ver | Por que importa |
|---|---|---|
| Quem responde o domínio? | `dig`, `curl -sI` | IP de proxy (Cloudflare) muda como o HTTPS funciona |
| Que modo de SSL a zona usa? | Painel ou API, só leitura, se houver acesso. Sem acesso: vizinho só com `listen 80` indica Flexible; com `listen 443 ssl`, Full. Depois do vhost, `curl -sI https://DOMINIO` confirma: 200 está certo; 521, 525 ou 526 indicam que a zona espera certificado | Flexible fala com a origem na 80; Full exige certificado no vhost |
| Tem catch-all? | `sudo nginx -T \| grep server_name` | `server_name ~.+` respondendo 301 para https gera loop em domínio novo |
| Quem vigia os logs? | `sudo fail2ban-client status`, `logpath` de cada jaula | Visita ao site não pode contar nas regras que protegem os outros |
| Quem pode falar com a origem? | `sudo ufw status` | Pode só aceitar os IPs do proxy: o teste direto na origem não funciona |
| O que o proxy mexe na página? | Comparar com o build depois de publicar | Email Obfuscation, minify, regras de cache |
| Status dos vizinhos | `curl -s -o /dev/null -w "%{http_code}"` em cada domínio | Anotar antes, para comparar depois |

**Configuração da zona, firewall, fail2ban e vhost de outros sites não se alteram.** O que for preciso se resolve no vhost deste site. Se não der, levar ao usuário a ação exata e o impacto nos outros.

## O vhost

```
node tools/gera-vhost.mjs previa.exemplo.com
```

Sai `deploy/previa.exemplo.com.conf`, a partir de `deploy/previa.modelo.conf` e de `tools/rotas.js`, com os motivos de cada regra em comentário. O modelo pressupõe proxy com a origem na porta 80 (Flexible). Em Full ou sem proxy, adaptar como o vizinho faz (`certbot`, por exemplo).

Regras que cada linha garante: `server_name` exato; log próprio; `noindex`; `no-transform` no HTML; `immutable` em `/assets/`; `no-store` no redirecionamento; 404 com a página do site; `absolute_redirect off`.

## Implantar

```
npm run pacote                          # testa pendências, build, .publica/site.tar.gz e o sha256
```

Enviar `.publica/site.tar.gz` ao servidor. A ferramenta de envio do agente pode só ler de dentro do projeto: é por isso que ele fica ali. Apagar `.publica/` depois.

No servidor, a primeira vez:

```
sudo mkdir -p /var/www/DOMINIO/releases && sudo chown -R "$USER": /var/www/DOMINIO
sudo cp /tmp/DOMINIO.conf /etc/nginx/sites-available/DOMINIO
sudo ln -s /etc/nginx/sites-available/DOMINIO /etc/nginx/sites-enabled/DOMINIO
```

A cada versão, troca de uma vez, sem recarregar o nginx:

```
R=$(date -u +%Y%m%dT%H%M%SZ); cd /var/www/DOMINIO
sha256sum /tmp/site.tar.gz              # igual ao que o pacote mostrou
mkdir "releases/$R" && tar -xzf /tmp/site.tar.gz -C "releases/$R" --no-same-owner
find "releases/$R" -type d -exec chmod 755 {} + ; find "releases/$R" -type f -exec chmod 644 {} +
ln -sfn "releases/$R" current.novo && mv -T current.novo current
rm /tmp/site.tar.gz
```

Vhost novo ou alterado: `sudo nginx -t` e, só se passar, `sudo systemctl reload nginx`. Nunca `restart`. Se `nginx -t` acusar aviso antigo de outro site, não mexer; dizer ao usuário.

**Voltar atrás:** `ln -sfn releases/<anterior> current.novo && mv -T current.novo current`. Guardar as três últimas versões.

## Conferir

No endereço real, com o `dist/` local igual ao publicado:

```
node tools/confere-publicado.mjs https://DOMINIO
SITE_BASE=https://DOMINIO npm run testa
SITE_BASE=https://DOMINIO npm run testa:estados
SITE_BASE=https://DOMINIO npm run testa:fluxos
```

`confere-publicado` compara cada arquivo byte a byte, com tipo, cache e `noindex`, testa cada endereço com e sem barra no fim, o 404, o http→https e os links internos.

Depois, no servidor e fora dele:

- `nginx -t` e nginx ativo.
- Log do site sem erro nem 5xx.
- Vizinhos com o mesmo status de antes.
- `fail2ban`: nenhum ban causado pelos testes, e seu IP fora da lista. Ban de scanner da internet não tem a ver com você, mas confira no log antes de dizer isso.
- Robôs do WhatsApp e do Facebook recebem a página e a imagem (`curl` com o User-Agent deles).

No relatório: o link, o que foi verificado, e o que não foi (celular de verdade, card real no WhatsApp). Avisar que link local e prévia são coisas diferentes: mudança só chega ao público depois de publicar de novo. Registrar o passo a passo no `CLAUDE.md` do projeto e o estado em `docs/ESTADO.md`.

## O que já deu errado

| Sintoma | Causa | Como resolver |
|---|---|---|
| Loop de redirecionamento no domínio novo | Catch-all do servidor respondendo 301 para https, com o proxy em Flexible | Vhost com `server_name` exato, na porta 80 |
| Erro continua depois de corrigir | O navegador guardou o 301 | `no-store` no redirecionamento. Testar em aba anônima |
| Rodapé com "[email protected]" e script a mais em toda página | Email Obfuscation da zona | `Cache-Control: no-transform` no HTML, sem mexer na zona |
| Conferência byte a byte falha só nos HTML | Proxy reescrevendo a página | Idem. É para isso que a comparação existe |
| Imagem trocada não muda | Browser Cache TTL da zona sobe o cache | Trocar o nome do arquivo |
| Testes derrubam ou banem o próprio acesso | fail2ban lendo o log geral, com limite por minuto | Log próprio no vhost. Não pedir `/.env` nem `wp-*` nos testes |
| `tar` falha com "Cannot connect to C:" no Windows | O tar lê `C:` como outra máquina | Caminho relativo, como faz `npm run pacote` |
| `Transition was aborted ... Viewport size changed` no console | A largura da página mudou: estouro real em algum estado | Tratar como pista de estouro, não como erro de transição |
