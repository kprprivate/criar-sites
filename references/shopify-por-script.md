# Tema Shopify por script

O site é feito e aprovado localmente (Vite, com HTML, CSS e JS puros). Depois, um script gera o tema da loja Shopify (Online Store 2.0) a partir do mesmo código.

- **Rucá:** o método foi ao ar.
- **Bevi:** o tema foi gerado e testado fora da loja, numa loja simulada (out/2026).

Exemplos de código em [assets/shopify](../assets/shopify/):

- o gerador (`gen-tema.exemplo.py`);
- a ponte do JS com a loja (`loja.exemplo.js`);
- a loja simulada (`loja-simulada.exemplo.mjs`).

Eles vêm de um projeto real: adaptar handles, nomes e marcadores.

Para a conversão ser fácil, o site já nasce preparado: criar o projeto com `--loja`, para usar os mesmos endereços da loja desde o primeiro bloco (`/products/x`, `/collections/y`, `/pages/z`, `tools/rotas.js`), e tirar os dados reais com `node tools/loja-retrato.mjs https://loja.com.br`, anotando a data do retrato.

## Sumário

- [Decidir antes de converter](#decidir-antes-de-converter)
- [O gerador](#o-gerador)
- [A sacola na API de carrinho](#a-sacola-na-api-de-carrinho)
- [Formulários](#formulários)
- [Testar sem acesso à loja](#testar-sem-acesso-à-loja)
- [Na loja](#na-loja)

## Decidir antes de converter

### Editável ou fixo

Perguntar cedo, já nas primeiras perguntas do projeto, sem travar o estudo. A resposta muda a arquitetura.

| Opção | Como funciona | Custo |
|---|---|---|
| **Fixo** | Templates `.liquid` gerados do site, idênticos a ele. Texto e imagem mudam pelo código. Na loja, o cliente mexe em produto, preço, estoque e nas configurações do tema. | É o caminho mais rápido. |
| **Editável** | Cada seção vira uma seção da Shopify, com campos já preenchidos com o conteúdo do site. | Mais rodadas de trabalho. |

Na opção editável, a Shopify embrulha cada seção num `<div>`. Isso quebra peças que dependem de serem irmãs, como a última seção colada no footer que sobe. Resolver com `tag` e `class` no `{% schema %}` ou com `:has()`.

Conferir antes:

- o contrato (um item de "conteúdo editável pelo editor de temas" obriga a opção editável);
- o risco de alegações: texto regulatório que pode precisar mudar sem deploy.

Se o usuário escolher fixo apesar disso, registrar como risco aceito.

### Acesso à loja

- **Sem acesso ao admin:** dá para gerar o tema inteiro e testar a lógica na loja simulada. Os dados públicos (`/products.json`, `/collections.json`) não precisam de acesso.
- **Com acesso:**
  1. `shopify theme pull` do tema no ar: serve de backup e traz o que só existe lá (app embeds, traduções, scripts próprios, páginas especiais);
  2. push como tema não publicado;
  3. teste na prévia;
  4. publicação só com OK.

### Como a loja organiza o catálogo

Ler `/products.json` e `/cart.js`, que são públicos.

- **Exemplo:** cada tamanho é um produto com uma variante só. Os packs maiores são quantidades do pack menor.
- **Casamento:** o site casa com a loja pelo **handle**. O catálogo do site guarda os handles, e o gerador lê dali (fonte única).

## O gerador

### Build e arquivos

- **Build do Vite próprio para o tema:**
  - nomes fixos (`marca.js`, `marca.css`);
  - `base: "./"` e `cssCodeSplit: false`;
  - o mesmo PostCSS do site (por exemplo, o hover só com mouse num módulo compartilhado pelos dois builds).
- **`public/` achatado em `assets/`:**
  - `img/cans/x.webp` vira `img-cans-x.webp`, porque `assets/` não tem subpasta;
  - conferir colisão de nomes.

### Caminhos de arquivo

| Onde | O que vira |
|---|---|
| HTML | `{{ 'x' | asset_url }}`, também em **cada URL de um `srcset`**. A regex precisa aceitar vírgula e espaço antes do caminho, não só aspas. |
| CSS | `url("x")` relativo, na mesma pasta do CDN. |
| JS | Todo caminho passa por `asset()`, que usa a base do CDN posta pelo layout (`'marca.js' | asset_url | split: 'marca.js' | first`). Caminho escrito direto no JS quebra só na loja. |

### Layout e links

- **Layout:** o head e tudo o que a home tem fora do `<main>` (avisos, header, menus, sacola, sprite, footer), com `{{ content_for_header }}` e `{{ content_for_layout }}`.
- **Links do layout por página:**
  - fora da home, as âncoras da home viram `/#âncora`;
  - "Comprar" leva à compra da própria página;
  - rotas pelo objeto `routes`. Isso some com os avisos `HardcodedRoutes` e funciona com idioma ou mercado no endereço.

### Templates

- **Tema fixo:** templates `.liquid`, não JSON. Nada fica embrulhado em `<div>`.
- **Nome e cor certos já no HTML:** sabor ou produto pelo handle, com `case`/`when`. O JS redesenha depois, mas a busca e o leitor de tela já leem certo.
- **Produto que pode não existir na loja** (kit, edição limitada): esconder com `{% if all_products['x'].id %}`, em vez de deixar link para um 404.

### Dados para o JS

O layout põe tudo em `window.MARCA`:

- `assets`;
- `produtos`: `{ handle: { variante, centavos, disponivel } }`, por `all_products[handle]`, com até 20 handles por página;
- `carrinho`: `{{ cart | json }}`;
- configurações.

O preço vai em centavos, como na API. No site local, `window.MARCA` não existe e vale o retrato do catálogo.

### Páginas que só existem na loja

São as páginas de texto, políticas, contato, sacola (`/cart`), busca, 404, blog e artigo. Mesma linguagem do site: rótulo, título, texto e botões.

- **Coluna:** uma só para título e conteúdo.
- **Listas:** com marcador, porque o reset do site tira.
- **Coleção:** reaproveitar a vitrine da home.
- **Políticas:** não têm template. Quando `request.page_type == 'policy'`, envolver `content_for_layout` num `<main>` e estilizar `.shopify-policy__*`.

### Configurações e conferências

- **Configurações da loja** no `settings_schema.json` (por exemplo, o valor do frete grátis): com o valor de partida e um aviso de que precisa bater com a regra de frete da loja.
- **Do tema no ar, quando houver o pull:** app embeds (`blocks` do `settings_data.json`), traduções e scripts próprios.
- **No fim do script:**
  - conferir que nenhum caminho de `public/` sobrou e que todo `asset_url` citado existe;
  - manter a pasta `.shopify/` entre gerações.
- **Validação:** `shopify theme check --path theme` com **0 problemas** antes de qualquer push.

## A sacola na API de carrinho

- **Interface:** a mesma do site local. Na loja, a sacola chama `/cart/add.js`, `/cart/change.js` e `/cart.js`, a partir de `Shopify.routes.root`.
- **Tela otimista:** a sacola muda na hora, e a resposta da loja confirma ou corrige. Redesenhar só quando a loja mudou algo; redesenhar sempre recomeça as animações dos itens.
- **Fila:** uma chamada por vez, para cliques rápidos não embaralharem o carrinho.
- **Erro 422:** a `description` é a frase certa (falta de estoque). Mostrar na nota da sacola e anunciar ao leitor de tela.
- **Linha sem propriedades:** é uma linha por variante, então o `change.js` aceita o id da variante; não precisa da `key`.
- **Checkout:** esperar a fila esvaziar antes de ir para `/checkout`.
- **Começo e volta:**
  - começar pelo carrinho da visita (o JSON do Liquid), para o contador não piscar;
  - reler `/cart.js` no `pageshow` com `persisted` (volta pelo botão do navegador).
- **Total:** o da linha calculado pela loja (`final_line_price`). O catálogo serve de reserva enquanto a resposta não chega.

## Formulários

- **Avise-me e newsletter:** `{% form 'customer' %}`, com `contact[email]` e `contact[tags]`.
  - O JS põe a tag certa (por exemplo, a do sabor) no envio.
  - Envio nativo, sem fetch: a loja pode pedir verificação anti-robô, e o fetch não passa por ela.
  - Na volta, `form.posted_successfully?` põe uma marca dentro do formulário, e o JS mostra a confirmação.
- **Contato:** `{% form 'contact' %}`, com `{{ form.errors | default_errors }}`.

## Testar sem acesso à loja

### A loja simulada

Um servidor local que renderiza o `theme/` gerado com o **liquidjs** (dependência de desenvolvimento). Ele imita:

- **Filtros e tag:** os filtros `asset_url`, `stylesheet_tag`, `image_url` e `default_errors`, e a tag `form`.
- **Produtos:** os do retrato do catálogo do site.
- **Carrinho:** na memória, com `/cart.js`, `/cart/add.js` e `/cart/change.js`, incluindo o 422 de estoque.
- **Formulário:** `/contact`, que volta com `customer_posted=true`.
- **Checkout:** uma página que lista o carrinho.
- **Atalhos de teste:** esvaziar o carrinho, mudar o estoque, ver o estado.

### Cuidados

- **Versionar o `asset_url` pela data do arquivo e mandar a página sem cache.** Sem isso, a aba aberta mostra o tema antigo, e o usuário vê de novo o que já foi corrigido.
- **Detalhes do liquidjs:**
  - um template com ponto no nome (`page.contact`) precisa da extensão completa;
  - `form.posted_successfully?` e `when 'a', 'b'` funcionam.

### Roteiros

Rodar contra a loja simulada:

- carrinho: adicionar, "+", "−" e ir ao checkout;
- estoque baixo (422);
- tamanhos e variantes;
- avise-me;
- celular e movimento reduzido;
- cada página da loja em duas larguras;
- imagens quebradas e fontes carregadas.

Conferir o site local também, que precisa continuar igual.

### Limite

A loja simulada não é a Shopify. O Liquid e a API de verdade só se confirmam no tema não publicado. Dizer isso na entrega.

## Na loja

1. `shopify theme pull` antes de tudo.
2. Conferir handles, variantes e estoque reais. Configurar o que o tema pede, como o frete grátis.
3. `shopify theme push --unpublished` e testar na prévia (`?preview_theme_id=`):
   - carrinho, checkout e formulários;
   - vídeos e políticas;
   - os apps.
4. Publicar só com OK. Guardar o tema anterior como reserva.
5. Redirecionar as URLs antigas que deixam de existir e conferir o SEO dos produtos (título e descrição no admin).
