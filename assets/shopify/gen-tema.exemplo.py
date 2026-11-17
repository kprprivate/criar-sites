# EXEMPLO (site da Bevi, out/2026; ver references/shopify-por-script.md). Adaptar:
# - os marcadores de corte do index.html (o <main>, o <head>, o <h1> do produto, o formulário do avise-me);
# - a leitura dos handles do catálogo (aqui, src/js/catalogo.js) e o produto que pode não existir (o kit);
# - os nomes (bevi.js, bevi.css, window.BEVI) e as configurações da loja (frete grátis).
"""Gera o tema Shopify da Bevi em ./theme a partir do site (mesmo HTML, CSS e JS). Pipeline da Rucá: tema fixo, sem
seções editáveis (decisão do usuário, 25/10/2026); na Shopify, a Bevi mexe em produto, preço, estoque e nas
configurações da loja (frete grátis).

    npm run tema                              # gera ./theme (fora do git)
    shopify theme check --path theme          # validação (0 erros)
    shopify theme push --path theme --unpublished --store bevi-launch-experience-ytav6.myshopify.com   # só com acesso e OK

O que ele faz:
- roda o build do Vite do tema (vite.tema.config.js): assets/bevi.js e assets/bevi.css, nomes fixos
- copia public/ achatado para assets/ (img/cans/x.webp vira img-cans-x.webp). No HTML, o caminho vira
  {{ 'img-cans-x.webp' | asset_url }} (também dentro de srcset); no CSS, url("img-cans-x.webp"), na mesma pasta; no JS,
  todo caminho passa por asset() (src/js/loja.js)
- layout/theme.liquid: o head e tudo o que a home tem fora do <main> (avisos, header, menus, sacola, sprite, footer),
  com window.BEVI (arquivos, catálogo real pelos handles do catalogo.js, carrinho da visita, frete grátis)
- templates .liquid (não JSON, como na Rucá: a Shopify não embrulha nada em <div> e a última seção continua colada
  no footer que sobe): home, produto, coleções (a vitrine), página, contato, sacola, busca, blog, artigo e 404
- do tema no ar (../beviProteinNew-gen/live-theme, `shopify theme pull`, quando houver acesso): os app embeds do
  settings_data.json, as traduções e arquivos que só existem lá
"""
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "theme"
PUBLIC = ROOT / "public"
LIVE = ROOT.parent / "beviProteinNew-gen" / "live-theme"


def ler(nome):
    return (ROOT / nome).read_text(encoding="utf-8")


def escrever(rel, texto):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(texto, encoding="utf-8", newline="\n")


def entre(texto, inicio, fim, com_inicio=True):
    i = texto.index(inicio)
    j = texto.index(fim, i + len(inicio))
    return texto[i if com_inicio else i + len(inicio) : j]


# ───────────────────────── catálogo: os handles e os nomes vêm do catalogo.js (fonte única) ─────────────────────────
catalogo = ler("src/js/catalogo.js")
SABORES = []
for bloco in re.findall(r"\{\s*chave: \"(?:hibisco|mate|verde)\".*?\n  \}", catalogo, re.S):
    campo = lambda nome: re.search(nome + r': "([^"]+)"', bloco).group(1)
    SABORES.append({"chave": campo("chave"), "nome": campo("nome"), "par": campo("par"), "handle": campo("handle"), "pack": campo("handlePack")})
assert len(SABORES) == 3, "os três sabores não foram achados no catalogo.js"
KIT = re.search(r'kit: true,.*?handle: "([^"]+)"', catalogo, re.S).group(1)
HANDLES = [s["handle"] for s in SABORES] + [s["pack"] for s in SABORES] + [KIT]

# ───────────────────────── caminhos dos arquivos de public/ ─────────────────────────
PASTAS = sorted(p.name for p in PUBLIC.iterdir() if p.is_dir())
SOLTOS = sorted(p.name for p in PUBLIC.iterdir() if p.is_file())
# a URL de um arquivo de public/ depois de aspas, parêntese, vírgula ou espaço (src, srcset, url(), poster, data-*)
_ALVO = r"((?:%s)/[^\"'()\s,]+|(?:%s))" % ("|".join(map(re.escape, PASTAS)), "|".join(map(re.escape, SOLTOS)))
HTML_RE = re.compile(r"(?<=[\"'(,\s])/" + _ALVO + r"(?=[\"')\s,])")
CSS_RE = re.compile(r"url\(([\"']?)/" + _ALVO + r"\1\)")


def achatado(caminho):
    return caminho.strip("/").replace("/", "-")


def assets_no_html(html):
    return HTML_RE.sub(lambda m: "{{ '" + achatado(m.group(1)) + "' | asset_url }}", html)


def assets_no_css(css):
    return CSS_RE.sub(lambda m: f'url("{achatado(m.group(2))}")', css)


# ───────────────────────── partes do HTML ─────────────────────────
home = ler("index.html")
produto_main = ler("paginas/produto.main.html")

cabeca = entre(home, "<head>", "</head>", com_inicio=False)
for padrao in [
    r'\s*<meta charset="utf-8" />',
    r'\s*<meta name="viewport"[^>]*/>',
    r"\s*<title>.*?</title>",
    r'\s*<meta name="description"[^>]*/>',
    r'\s*<script type="module" src="/src/main\.js"></script>',
]:
    cabeca, n = re.subn(padrao, "", cabeca, count=1, flags=re.S)
    assert n == 1, f"o head do index.html mudou: {padrao}"

ini_main = home.index('    <main id="conteudo"')
fim_main = home.index("    </main>", ini_main) + len("    </main>")
antes_main = entre(home, '<body id="topo" data-tem-hero>', '    <main id="conteudo"', com_inicio=False)
depois_main = home[fim_main : home.index("  </body>")]
main_home = home[ini_main:fim_main]

# links do layout (header, menus, footer): as âncoras da home valem na home; nas outras páginas viram /#âncora.
# Os botões "Comprar" levam à compra da própria página (na de produto, #comprar).
LOCAIS = {"conteudo", "comprar", "topo"}
COMPRAR = "{% if template.name == 'product' %}#comprar{% elsif template.name == 'index' %}#sabores{% else %}/#sabores{% endif %}"


def links_do_layout(trecho):
    for velho in [
        '<a class="cta header-actions__buy" href="#sabores">',
        '<a class="cta cta--grande rodape__cta" href="#sabores">',
    ]:
        trecho = trecho.replace(velho, velho.replace('href="#sabores"', f'href="{COMPRAR}"'))
    trecho = re.sub(r'(<a class="btn btn--adesivo btn--bloco[^"]*" href=")#sabores(")', lambda m: m.group(1) + COMPRAR + m.group(2), trecho)
    return re.sub(
        r'(<a\b[^>]*?\shref=")#([\w-]+)(")',
        lambda m: m.group(0) if m.group(2) in LOCAIS or "{%" in m.group(0) else m.group(1) + "{% unless template.name == 'index' %}/{% endunless %}#" + m.group(2) + m.group(3),
        trecho,
    )


antes_main = assets_no_html(links_do_layout(antes_main))
depois_main = assets_no_html(links_do_layout(depois_main))
assert COMPRAR in antes_main and COMPRAR in depois_main, "o botão Comprar do header ou do footer mudou"

# ───────────────────────── layout ─────────────────────────
# window.BEVI: o que o JS do site lê da loja (src/js/loja.js). Preço em centavos, como na API de carrinho.
BEVI = """
    {%- assign bevi_handles = '""" + ",".join(HANDLES) + """' | split: ',' -%}
    <script>
      // a loja para o JS do site (src/js/loja.js): arquivos no CDN, catálogo real pelo handle, carrinho e configurações
      window.BEVI = {
        shopify: true,
        assets: {{ 'bevi.js' | asset_url | split: 'bevi.js' | first | json }},
        produtos: {
          {%- for handle in bevi_handles -%}
            {%- assign p = all_products[handle] -%}
            {%- if p.id -%}
              {%- assign v = p.selected_or_first_available_variant -%}
              {{ handle | json }}: { variante: {{ v.id }}, centavos: {{ v.price }}, disponivel: {{ v.available | json }} },
            {%- endif -%}
          {%- endfor -%}
        },
        carrinho: {{ cart | json }},
        freteGratis: {% if settings.frete_gratis_ativo %}{{ settings.frete_gratis_valor | times: 100 | round }}{% else %}null{% endif %}
      };
    </script>"""

TITULO_HOME = re.search(r"<title>(.*?)</title>", home, re.S).group(1)
DESCRICAO_HOME = re.search(r'<meta name="description" content="([^"]*)" />', home).group(1)

LAYOUT = """<!doctype html>
<!-- GERADO por tools/gen-tema.py a partir do site (index.html, paginas/, src/). Não editar no editor de código da loja. -->
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {%- liquid
      if template.name == 'index'
        assign seo_titulo = '""" + TITULO_HOME + """'
      else
        assign seo_titulo = page_title | append: ' · Bevi Pro'
      endif
      assign seo_descricao = page_description | default: '""" + DESCRICAO_HOME + """'
    -%}
    <title>{{ seo_titulo }}</title>
    <meta name="description" content="{{ seo_descricao | escape }}" />
    <link rel="canonical" href="{{ canonical_url }}" />
    <meta property="og:site_name" content="{{ shop.name }}" />
    <meta property="og:type" content="{% if template.name == 'product' %}product{% else %}website{% endif %}" />
    <meta property="og:title" content="{{ seo_titulo | escape }}" />
    <meta property="og:description" content="{{ seo_descricao | escape }}" />
    <meta property="og:url" content="{{ canonical_url }}" />
    {%- if page_image -%}
      <meta property="og:image" content="https:{{ page_image | image_url: width: 1200 }}" />
    {%- else -%}
      <meta property="og:image" content="https:{{ 'img-produto-kit-degraus-1200.webp' | asset_url }}" />
    {%- endif %}
    <meta name="twitter:card" content="summary_large_image" />""" + assets_no_html(cabeca.rstrip()) + """
    {{ 'bevi.css' | asset_url | stylesheet_tag }}""" + BEVI + """
    {{ content_for_header }}
    <script type="module" src="{{ 'bevi.js' | asset_url }}"></script>
  </head>
  <body id="topo"{% if template.name == 'index' %} data-tem-hero{% endif %}>""" + antes_main.rstrip() + """

    {%- if request.page_type == 'policy' -%}
      <main id="conteudo" class="page loja loja--politica" tabindex="-1">{{ content_for_layout }}</main>
    {%- else -%}
      {{ content_for_layout }}
    {%- endif %}
""" + depois_main.rstrip() + """
  </body>
</html>
"""

# ───────────────────────── produto ─────────────────────────
produto = assets_no_html(produto_main)

# nome certo já no HTML (busca e leitor de tela antes do JS): o sabor pelo handle (lata avulsa ou pack)
casos = "".join(
    f"\n    when '{s['handle']}', '{s['pack']}'\n      assign bevi_nome = '{s['nome']}'\n      assign bevi_par = 'com {s['par'].lower()}'\n      assign bevi_chave = '{s['chave']}'"
    for s in SABORES
)
NOME_LIQUID = """{%- liquid
  assign bevi_nome = product.title
  assign bevi_par = ''
  assign bevi_chave = 'mate'
  case product.handle""" + casos + """
    when '""" + KIT + """'
      assign bevi_nome = 'Kit Experimenta'
      assign bevi_par = ''
      assign bevi_chave = 'kit'
  endcase
-%}
"""
H1 = '<h1 class="compra__nome" id="produto-nome" data-p-nome><span class="compra__nome-sabor">Mate</span> <span class="compra__nome-par">com pêssego</span></h1>'
assert H1 in produto, "o <h1> da página de produto mudou"
produto = produto.replace(
    H1,
    '<h1 class="compra__nome" id="produto-nome" data-p-nome><span class="compra__nome-sabor">{{ bevi_nome }}</span>{% if bevi_par != blank %} <span class="compra__nome-par">{{ bevi_par }}</span>{% endif %}</h1>',
)
produto = produto.replace('<span data-p-nome-curto>Mate</span>', "<span data-p-nome-curto>{{ bevi_nome }}</span>", 1)
produto = produto.replace(
    '<section class="compra" id="comprar" aria-labelledby="produto-nome" data-flavor="mate" data-compra>',
    '<section class="compra" id="comprar" aria-labelledby="produto-nome" data-flavor="{{ bevi_chave }}" data-compra>',
    1,
)

# o kit só aparece quando existe como produto na loja (handle kit-experimenta)
KIT_ITEM = re.search(r"\n {16}<!-- Kit Experimenta:.*?\n {16}</li>", produto, re.S)
assert KIT_ITEM, "a opção do kit mudou"
produto = produto.replace(KIT_ITEM.group(0), "\n                {%- if all_products['" + KIT + "'].id -%}" + KIT_ITEM.group(0) + "\n                {%- endif -%}")
produto = produto.replace(
    '<p class="compra__rotulo" id="rotulo-sabor">Sabor ou kit</p>',
    "<p class=\"compra__rotulo\" id=\"rotulo-sabor\">{% if all_products['" + KIT + "'].id %}Sabor ou kit{% else %}Sabor{% endif %}</p>",
    1,
)

# AVISE-ME: o formulário de cliente da Shopify (tags avise-me e a do sabor, postas pelo produto.js no envio)
AVISE = re.search(r'<form class="avise" data-p-avise hidden>(.*?)</form>', produto, re.S)
assert AVISE, "o formulário do avise-me mudou"
miolo = AVISE.group(1).replace('name="email" type="email"', 'name="contact[email]" type="email"', 1)
assert 'name="contact[email]"' in miolo
produto = produto.replace(
    AVISE.group(0),
    "{%- form 'customer', id: 'avise', class: 'avise', data-p-avise: '', hidden: '' -%}"
    '\n              <input type="hidden" name="contact[tags]" value="avise-me" data-p-avise-tags />'
    "\n              {%- if form.posted_successfully? -%}<span hidden data-p-avise-postado></span>{%- endif -%}"
    "\n              {%- if form.errors -%}<div class=\"loja-aviso loja-aviso--erro\">{{ form.errors | default_errors }}</div>{%- endif -%}"
    + miolo
    + "{%- endform -%}",
)

PRODUTO_LD = """
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": {{ product.title | json }},
    "description": {{ product.description | strip_html | truncate: 300 | json }},
    {%- if product.featured_image %}
    "image": {{ product.featured_image | image_url: width: 1200 | prepend: 'https:' | json }},
    {%- endif %}
    "brand": { "@type": "Brand", "name": "Bevi Pro" },
    "sku": {{ product.selected_or_first_available_variant.sku | json }},
    "offers": {
      "@type": "Offer",
      "url": {{ canonical_url | json }},
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "price": {{ product.price | divided_by: 100.0 | json }},
      "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}"
    }
  }
</script>
"""

# ───────────────────────── coleções: a vitrine da home ─────────────────────────
VITRINE = re.search(r'\n      <section class="vitrine" id="sabores".*?\n      </section>', main_home, re.S)
assert VITRINE, "a vitrine mudou"
COLECAO = '    <main id="conteudo" class="page" tabindex="-1">' + assets_no_html(VITRINE.group(0)) + "\n    </main>\n"


# ───────────────────────── páginas que só existem na loja (estilo em src/css/loja.css) ─────────────────────────
def seta(rotulo, href, icone="i-arrow-right", extra=""):
    return (
        f'<a class="cta" href="{href}"{extra}><span class="cta__pill enche enche--hibisco enche--troca" data-label="{rotulo}">{rotulo}</span>'
        f'<span class="cta__seta selo" aria-hidden="true"><svg class="icon"><use href="#{icone}" /></svg></span></a>'
    )


def link_seta(rotulo, href):
    return f'<a class="link-seta" href="{href}">{rotulo}<svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg></a>'


def pagina(rotulo, titulo, corpo, apoio="", acoes=""):
    return (
        '    <main id="conteudo" class="page loja" tabindex="-1">\n'
        '      <header class="loja__topo">\n'
        f'        <p class="eyebrow">{rotulo}</p>\n'
        f'        <h1 class="loja__titulo">{titulo}</h1>\n'
        + (f'        <p class="loja__apoio">{apoio}</p>\n' if apoio else "")
        + (f'        <div class="loja__acoes">{acoes}</div>\n' if acoes else "")
        + "      </header>\n"
        + (f"      {corpo}\n" if corpo else "")
        + "    </main>\n"
    )


CONTATO_FORM = """<div class="loja-texto">{{ page.content }}</div>
      {%- form 'contact', class: 'loja-form' -%}
        {%- if form.posted_successfully? -%}<p class="loja-aviso" role="status">Mensagem enviada. A gente responde no seu e-mail.</p>{%- endif -%}
        {%- if form.errors -%}<div class="loja-aviso loja-aviso--erro">{{ form.errors | default_errors }}</div>{%- endif -%}
        <div class="loja-form__linha">
          <label class="loja-campo">Nome<input type="text" name="contact[name]" autocomplete="name" value="{{ form.name }}" /></label>
          <label class="loja-campo">E-mail<input type="email" name="contact[email]" autocomplete="email" inputmode="email" required value="{{ form.email }}" /></label>
        </div>
        <label class="loja-campo">Telefone (opcional)<input type="tel" name="contact[phone]" autocomplete="tel" inputmode="tel" value="{{ form.phone }}" /></label>
        <label class="loja-campo">Mensagem<textarea name="contact[body]" required>{{ form.body }}</textarea></label>
        <div class="loja__acoes"><button class="cta" type="submit"><span class="cta__pill enche enche--hibisco enche--troca" data-label="Enviar">Enviar</span><span class="cta__seta selo" aria-hidden="true"><svg class="icon"><use href="#i-arrow-right" /></svg></span></button></div>
      {%- endform -%}"""

BUSCA = """<form class="loja-busca" action="{{ routes.search_url }}" method="get" role="search">
        <label class="sr-only" for="busca-termos">Buscar</label>
        <input id="busca-termos" type="search" name="q" value="{{ search.terms | escape }}" placeholder="Sabor, ingrediente, pedido" />
        <button class="cta" type="submit"><span class="cta__pill enche enche--hibisco enche--troca" data-label="Buscar">Buscar</span></button>
      </form>
      {%- if search.performed -%}
        <ul class="loja-resultados">
          {%- for item in search.results -%}
            <li><a href="{{ item.url }}"><b>{{ item.title }}</b><span>{{ item.content | strip_html | truncate: 140 }}</span></a></li>
          {%- endfor -%}
        </ul>
      {%- endif -%}"""

BLOG = """<ul class="loja-resultados">
        {%- for article in blog.articles -%}
          <li><a href="{{ article.url }}"><time datetime="{{ article.published_at | date: '%Y-%m-%d' }}">{{ article.published_at | date: '%d/%m/%Y' }}</time><b>{{ article.title }}</b><span>{{ article.excerpt_or_content | strip_html | truncate: 160 }}</span></a></li>
        {%- endfor -%}
      </ul>"""

TEMPLATES = {
    "index.liquid": assets_no_html(main_home) + "\n",
    "product.liquid": NOME_LIQUID + produto.rstrip() + "\n" + PRODUTO_LD,
    "collection.liquid": COLECAO,
    "list-collections.liquid": COLECAO,
    "page.liquid": pagina("Bevi", "{{ page.title }}", '<div class="loja-texto">{{ page.content }}</div>'),
    "page.contact.liquid": pagina("Contato", "{{ page.title }}", CONTATO_FORM),
    "cart.liquid": pagina(
        "Sacola",
        "{% if cart.item_count > 0 %}Quase <em>lá.</em>{% else %}Sua sacola <em>está vazia.</em>{% endif %}",
        "",
        apoio="{% if cart.item_count > 0 %}Confira a sacola e finalize quando quiser.{% else %}Os três sabores estão a um clique.{% endif %}",
        acoes="{% if cart.item_count > 0 %}"
        + seta("Finalizar compra", "/checkout")
        + ' <a class="link-seta" href="#" data-sacola-abrir>Ver a sacola<svg class="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg></a>'
        + "{% else %}"
        + seta("Ver os sabores", "/#sabores")
        + "{% endif %}",
    ),
    "404.liquid": pagina(
        "Erro 404",
        "Essa página <em>não existe.</em>",
        "",
        apoio="Talvez ela tenha mudado de lugar. Os três sabores continuam aqui.",
        acoes=seta("Ver os sabores", "/#sabores") + " " + link_seta("Voltar para o início", "/"),
    ),
    "search.liquid": pagina(
        "Busca",
        "{% if search.performed %}{{ search.results_count }} {% if search.results_count == 1 %}resultado{% else %}resultados{% endif %}{% else %}O que você <em>procura?</em>{% endif %}",
        BUSCA,
    ),
    "blog.liquid": pagina("Blog", "{{ blog.title }}", BLOG),
    "article.liquid": pagina(
        "{{ blog.title }}",
        "{{ article.title }}",
        '<div class="loja-texto">{{ article.content }}</div>',
        apoio="{{ article.published_at | date: '%d/%m/%Y' }}",
    ),
}

# ───────────────────────── configurações da loja (editor de temas > Configurações do tema) ─────────────────────────
SCHEMA = [
    {
        "name": "theme_info",
        "theme_name": "Bevi Pro",
        "theme_version": "1.0.0",
        "theme_author": "Bevi Pro",
        "theme_documentation_url": "https://beviprotein.com.br",
        "theme_support_url": "https://beviprotein.com.br",
    },
    {
        "name": "Loja",
        "settings": [
            {"type": "checkbox", "id": "frete_gratis_ativo", "label": "Mostrar a barra de frete grátis na sacola", "default": True},
            {
                "type": "number",
                "id": "frete_gratis_valor",
                "label": "Valor mínimo do frete grátis (R$)",
                "info": "Provisório: R$ 149,90 até a Bevi passar a regra real. Tem de ser o mesmo valor da regra de frete da loja.",
                "default": 149.9,
            },
        ],
    },
]


# rotas da loja pelo objeto routes (valem também com idioma ou mercado no endereço, /en/...)
def rotas(texto):
    texto = texto.replace('href="/#', 'href="{{ routes.root_url }}#').replace("{% else %}/#sabores{% endif %}", "{% else %}{{ routes.root_url }}#sabores{% endif %}")
    for caminho, rota in [("/", "root_url"), ("/cart", "cart_url"), ("/account", "account_url"), ("/search", "search_url")]:
        texto = texto.replace(f'href="{caminho}"', f'href="{{{{ routes.{rota} }}}}"')
    return texto


# ───────────────────────── montagem ─────────────────────────
def main():
    subprocess.run("npx vite build -c vite.tema.config.js", shell=True, cwd=ROOT, check=True)

    # a pasta .shopify (ligação com a loja, criada pelo CLI) sobrevive à regeração
    guarda = OUT / ".shopify"
    copia = ROOT / ".tmp" / "tema-shopify"
    if guarda.exists():
        shutil.rmtree(copia, ignore_errors=True)
        shutil.copytree(guarda, copia)
    shutil.rmtree(OUT, ignore_errors=True)
    (OUT / "assets").mkdir(parents=True)
    if copia.exists():
        shutil.copytree(copia, guarda)
        shutil.rmtree(copia, ignore_errors=True)

    # 1) JS e CSS do tema
    for arquivo in (ROOT / ".theme-build").iterdir():
        texto = arquivo.read_text(encoding="utf-8")
        if arquivo.suffix == ".css":
            texto = assets_no_css(texto)
            sobrou = re.findall(r"url\([\"']?/(?:%s)/" % "|".join(PASTAS), texto)
            assert not sobrou, f"caminho de public/ que não virou asset no CSS: {sobrou[:3]}"
        (OUT / "assets" / arquivo.name).write_text(texto, encoding="utf-8", newline="\n")

    # 2) public/ achatado
    for arquivo in PUBLIC.rglob("*"):
        if arquivo.is_file():
            shutil.copy2(arquivo, OUT / "assets" / achatado(arquivo.relative_to(PUBLIC).as_posix()))

    # 3) layout e templates
    escrever("layout/theme.liquid", rotas(LAYOUT))
    for nome, texto in TEMPLATES.items():
        escrever(f"templates/{nome}", rotas(texto))

    # 4) o tema no ar, quando houver o `shopify theme pull`: traduções, app embeds e o que só existe lá
    blocos = {}
    if LIVE.exists():
        for rel in ["locales/pt-BR.default.json", "assets/bevi-attribution.js"]:
            origem = LIVE / rel
            if origem.exists():
                (OUT / rel).parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(origem, OUT / rel)
        dados = LIVE / "config/settings_data.json"
        if dados.exists():
            bruto = re.sub(r"/\*.*?\*/", "", dados.read_text(encoding="utf-8"), flags=re.S)
            atual = json.loads(bruto).get("current", {})
            blocos = (atual.get("blocks") or {}) if isinstance(atual, dict) else {}
    if not (OUT / "locales/pt-BR.default.json").exists():
        escrever("locales/pt-BR.default.json", json.dumps({"geral": {"pular": "Pular para o conteúdo"}}, ensure_ascii=False, indent=2) + "\n")

    escrever("config/settings_schema.json", json.dumps(SCHEMA, ensure_ascii=False, indent=2) + "\n")
    padroes = {s["id"]: s["default"] for grupo in SCHEMA[1:] for s in grupo["settings"]}
    escrever("config/settings_data.json", json.dumps({"current": {**padroes, "blocks": blocos}}, ensure_ascii=False, indent=2) + "\n")

    # 5) conferências: nenhum caminho de public/ sobrou sem asset_url, e todo asset citado existe
    citados = set()
    for arquivo in OUT.rglob("*.liquid"):
        texto = arquivo.read_text(encoding="utf-8")
        sobra = re.findall(r"[\"'(,\s]/(?:%s)/[^\"'()\s,]+" % "|".join(PASTAS), texto)
        assert not sobra, f"{arquivo.name}: caminho de public/ sem asset_url: {sobra[:3]}"
        citados |= set(re.findall(r"\{\{ '([^']+)' \| asset_url", texto))
    faltando = sorted(nome for nome in citados if not (OUT / "assets" / nome).exists())
    assert not faltando, f"assets citados que não existem: {faltando}"
    print(f"tema gerado em {OUT} ({len(list((OUT / 'assets').iterdir()))} arquivos em assets/, {len(TEMPLATES)} templates)")


if __name__ == "__main__":
    main()
