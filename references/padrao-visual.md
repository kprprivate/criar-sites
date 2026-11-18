# O que a marca já tem e o padrão visual

Etapas 3 e 4 do caminho. O ponto de partida é a prancha de identidade do dossiê (etapa 2), já vista pelo usuário: aqui ela vira regra, código e guia. A ordem é de cima para baixo: **o mundo do site, o arco da página, o objeto e, por último, as peças**. Saem daqui as decisões que todo o resto vai repetir: o esboço do mundo e o guia vivo aprovados, e os arquivos `marca.css` e `marca.js`. **Nada de seção antes disso;** com pressa, basta o padrão mínimo, e o guia completo vem depois (`SKILL.md`).

Serve para qualquer tipo de site. Em sistema ou painel, o padrão é mais contido: o mundo fica na moldura, na tipografia, na densidade e na resposta dos controles, sem efeito que atrapalhe a tarefa ([como](mundo-do-site.md#em-painel-sistema-e-site-de-conteúdo)).

## Sumário

- [1. Ver o que a marca já tem](#1-ver-o-que-a-marca-já-tem)
- [2. Logo em vetor](#2-logo-em-vetor)
- [3. Fotos](#3-fotos)
- [4. O mundo do site](#4-o-mundo-do-site)
- [5. A ideia geradora](#5-a-ideia-geradora)
- [6. Regras conferíveis](#6-regras-conferíveis)
- [7. Cor, letra e forma](#7-cor-letra-e-forma)
- [8. Os gestos](#8-os-gestos)
- [9. O que cada componente faz](#9-o-que-cada-componente-faz)
- [10. O guia vivo](#10-o-guia-vivo)
- [11. Receitas de técnica](#11-receitas-de-técnica)

## 1. Ver o que a marca já tem

Para cada item (manual, logo, cores, fontes, fotos, tom), decidir e registrar: **seguir, melhorar ou editar**, com o motivo. Identidade consolidada se preserva. O que o usuário já rejeitou fica escrito, para não voltar.

Referência indicada pelo cliente: estudar e traduzir o que ele quis dizer. Às vezes o pedido é só "cara de bonito", e a referência mostra o que isso significa para ele (fundo, espaço, tipo). A resposta vai no guia, como decisão.

## 2. Logo em vetor

Logo só em PNG fica ruim em hover, em tamanho grande e em animação. Dá para refazer sem contratar ninguém, quando o PNG é bom:

1. **Achar o maior arquivo:** site, CDN da loja, redes. Olhar os candidatos antes de escolher.
2. **Traçar com poucos nós:** `python -I <pasta-da-skill>/assets/logo/vetoriza.py logo.png logo.svg 3.2`. Contorno de subpixel, cantos por ângulo, retas onde é reto e Bézier no resto. Traçado automático comum deixa ondas e nós demais. Olhar `logo.svg.confere.png`: o desenho novo em vermelho sobre o original.
3. **Decidir o desenho, à mão, sobre os nós:** o que era quase reto fica reto, o que era quase paralelo fica paralelo, canto vira o encontro exato de duas tangentes, cortes ficam com folga constante. O PNG arredonda cantos; o vetor não pode herdar isso.
4. **Conferir sobreposto** e em tamanho grande. Pôr o desenho em `public/img/favicon.svg` e gerar os PNG com `node tools/favicon.mjs`.

Para o site, isso resolve. Para impressão ou gravação grande, vale pedir o original: dizer isso ao usuário.

## 3. Fotos

Reaproveitar o que existe: trocar fotos é caro. Antes de falar sobre elas, abrir e olhar várias.

- **Comparação para quem decide:** quando valer mudar o padrão (o fundo, por exemplo), testar em poucas, de quatro a seis, na grade real do site, e publicar as versões lado a lado. Não refazer o catálogo sem decisão. A escolha não trava o resto: o site segue com as fotos de hoje.
- **Sem tocar no arquivo:** muita coisa se resolve no CSS do cartão, como vinheta, recorte fixo ou posição por tipo de produto. A foto inteira fica para onde ela é prova, como a página do produto.
- **Recorte fiel com IA:** o gerador sozinho redesenha o produto (tecido, rótulo, textura), o que é inaceitável quando a foto é prova. Usar só como **molde**: pedir o produto sobre verde chapado (`assets/fotos/STYLE.exemplo.md`) e compor os pixels reais da foto com `assets/fotos/composicao.py`.
- Geração de cenas e séries: [direcao-criativa.md](direcao-criativa.md#gerar-imagens-com-o-codex-cli).

## 4. O mundo do site

A primeira decisão do padrão visual, e a que mais pesa: **que lugar é esta página**. Método, camadas, exemplos e erros: [mundo-do-site.md](mundo-do-site.md). Em resumo:

1. **A frase:** "esta página é ___", com um lugar ou objeto concreto que a marca já tem (produto, ofício, material, gesto de uso, documento, bancada).
2. **As camadas,** uma linha cada: onde acontece, de que é feito, como é iluminado, escala e câmera, o que a rolagem é, arco e rima, protagonista, imagem, voz. Três ou quatro fortes; as outras, neutras de propósito.
3. **O arco da página:** onde fica o momento forte, o que a abertura promete e como o fecho rima com ela. Entra na tabela de blocos (etapa 5).
4. **O objeto:** o protagonista que ocupa o palco, de preferência funcionando e em HTML ([regra 24](react-bits-templates.md#produto-e-prova)).
5. **O esboço,** em página inteira e tela cheia, no link local (`docs/guia/mundo.html`): a abertura, uma seção do meio e o fecho, sem componentes. Passar os [testes](mundo-do-site.md#testes) e mostrar. No modo acompanhado, esperar o "é este o lugar" antes de cor, letra e botão.

Um fundo animado colado numa página comum não é um mundo: é papel de parede. O mundo muda estrutura, moldura, material, luz, escala e o que a rolagem faz.

## 5. A ideia geradora

A frase que o mundo dá, dita como regra: uma ideia só, que explica muita coisa ao mesmo tempo. Ela sai de algo que só esta marca tem (produto, material, gesto de uso, forma do logo, frase, história, imaginário) e precisa aparecer primeiro na página inteira (moldura, material, luz, ritmo) e só depois nas peças.

Casos, para entender o tamanho da ideia, não para repetir: num site, a página é uma prancheta, e daí saem os trilhos, as alças de canto e a única imagem; em outro, um degrau de pixel vira o vão entre as seções, o ícone, o avatar e também o canto do botão. Em projetos anteriores desta skill a ideia nasceu na peça (um bloco com corte que se fecha, um botão de dois elementos, uma linha que contorna botões): rende quando a mesma ideia sobe para a página, e vira enfeite quando para no botão.

Testes:

- **Origem:** dá para dizer em uma frase de onde ela vem, com coisas que já são da marca?
- **Alcance:** ela gera a estrutura da página (moldura, vão entre seções, header), a luz ou o material, e o tratamento da imagem? Gerar só botão, link e um efeito é pouco: a ideia está na escala errada.
- **Recorte e botões neutros:** com logo e texto escondidos e os botões em cinza, a abertura e uma seção do meio ainda dizem de quem é o site ([como](qualidade.md#o-mundo-do-site))?
- **Troca de logo:** com outro nome, serviria para qualquer empresa? Então não é a ideia.
- **Exemplo do usuário:** forma ou efeito citado como exemplo é só exemplo. Medir nas referências se faz sentido antes de adotar.

## 6. Regras conferíveis

Adjetivo vira regra que se confere olhando a tela. "Premium", "acolhedor", "ousado" não orientam nada; "entre uma seção e outra, de 84 a 176 px" orienta. De quatro a seis regras, tiradas do mundo escolhido e do que se repetiu nas melhores do estudo: moldura e o que fica fixo, espaço, regra de foto, contraste de tamanho, paleta, ritmo do movimento, tom de voz. Pelo menos duas falam da página inteira, não de uma peça. Se uma tela quebra uma delas, sai do padrão.

## 7. Cor, letra e forma

Depois do mundo aprovado. Decidir e escrever em `src/css/marca.css`, que é a fonte única: tokens no `:root`, classes de tipo e componentes.

- **Cor:** quais, onde cada uma entra e o contraste medido. Quanta cor usar vem da marca: uma escola infantil pede muita, uma marca sóbria pode pedir uma só. Em marca de base neutra, o acento tem o papel escrito (o que ele marca) e é testado **como texto** nos dois temas: se não passa de 4,5:1, só entra como fundo.
- **Letra:** papéis (mostra, título, subtítulo, corpo, rótulo, número). Ver a fonte em tamanho real: fontes com eixo óptico podem borrar no máximo. A escolha sai de um estudo ([abaixo](#estudo-de-letra)). O tamanho do título é proporcional ao resto: quanto mais ornamento ou efeito na tela, menor o título. A ênfase dentro dele usa um recurso só (itálico, troca de família ou tom), não negrito ([medidas](react-bits-templates.md#letra-e-cor)).
- **Header:** é a peça que mais carrega o mundo, porque está em toda tela. A forma vem dele: uma aba da moldura, uma placa, um selo, um recorte. A barra de ponta a ponta é o padrão do kit, não uma decisão.
- **Forma:** raio, linha, cartão, vão entre seções, botão. A forma precisa de um motivo vindo do mundo. Uma unidade mínima (um degrau, um chanfro, uma linha) repetida em moldura, vão, ícone, marcador e fundo sustenta a ideia na página inteira; o botão a recebe por último e pode ser um retângulo simples ([a peça herda](mundo-do-site.md#a-peça-herda)).
- **Movimento:** uma curva e três durações (resposta de controle, entrada de bloco, laço), como tokens. Mola só para o que segue o ponteiro. Nenhum componente inventa a sua.

### Estudo de letra

A letra é a decisão que mais aparece e a que mais cai no genérico. Antes de fixar:

1. **Direções:** de três a quatro, cada uma saída da marca (a época, o ofício, a sinalização, a mão de um letrista) e não do gosto do momento.
2. **Candidatas:** de oito a doze, gratuitas (Google Fonts, Fontshare, Velvetyne, Collletttivo e fundições abertas) e pagas (fundições independentes e catálogos). Paga não é proibida: o usuário decide a licença.
3. **No contexto:** cada candidata renderizada com o título real, um rótulo em caixa alta, um botão, um número (preço, ano) e acentos do idioma. Paga entra pelo testador do site da fundição (captura) ou por arquivo de teste, que exige o aceite do usuário aos termos.
4. **Folha comparativa** publicada, com a recomendação, a licença e onde comprar. Enquanto a licença não sai, o protótipo usa a gratuita mais próxima e diz isso.

O que já pareceu genérico ao usuário: a primeira serifa gratuita "clássica" e a mesma família em todo projeto.

## 8. Os gestos

Poucos movimentos com nome, e mais nada: de dois a cinco. Antes de criar um efeito novo, a pergunta é: isso já não é um destes? Os gestos vêm **depois** do mundo e o servem. Não há gesto obrigatório de botão: com o mundo decidido, a resposta do botão pode ser uma troca de tom.

| Campo | O que dizer |
|---|---|
| Nome | Para a equipe falar dele |
| De onde vem | A camada do mundo que ele serve |
| Como é | O que acontece, em frase |
| Onde entra | Na página (rolagem, moldura, protagonista) ou em quais componentes |
| Limite | Duração, quantidade, onde nunca entra |
| No celular | A resposta ao toque |

Em ordem de peso, do que mais faz o site ser daquela marca ao que menos faz:

1. **O que a rolagem faz,** se o mundo pedir: revelar, montar, passar de cena. Um por página, com a versão empilhada escrita primeiro ([regra 17](react-bits-templates.md#rolagem)). "Só passa" é resposta válida.
2. **Como o protagonista se comporta:** o objeto que abre, a foto que troca, a demonstração que roda. É a seção-assinatura, quando houver: uma no site.
3. **Como o conteúdo chega:** a entrada dos blocos e, no máximo, uma animação de texto de abertura por página, com o texto completo disponível para leitor de tela.
4. **A resposta dos controles:** a mesma em todos os botões, links, abas e campos, com a mesma curva e o mesmo tempo. É a repetição que dá a sensação de marca, não a invenção: nos sites medidos, o hover do botão quase sempre só muda o tom.

Em painel ou ferramenta, só o quarto, discreto.

Todo gesto responde a mouse, foco de teclado e toque; com movimento reduzido, vira troca direta. Mouse só com `pointerType === "mouse"`. Nada fica preso depois do toque. Um preenchimento termina no estado completo. Tudo funciona parado se o JS falhar. Alvo de toque de 44 px e contraste AA não se negociam com a forma.

## 9. O que cada componente faz

A especificação dos próximos blocos: uma tabela com repouso, mouse ou foco, toque e tempo, para navegação (header, menu, busca, troca de página, voltar ao topo, rodapé) e para a ação principal do site (cartão, preço, formulário, contador, o que couber). Outra tabela com os estados: carregando, esperando resposta, erro de campo, sucesso, lista vazia, foco de teclado, movimento reduzido, toque, seleção de texto.

## 10. O guia vivo

Uma página em que dá para passar o mouse, usar o Tab e tocar, **aberta no link local** desde o primeiro rascunho: `http://127.0.0.1:<porta>/docs/guia/` (`npm run dev`; no servidor local ela lê o `marca.css` e o `marca.js` direto de `src/`, e muda junto com eles). O usuário acompanha o guia sendo feito, como acompanha o site. Dizer que o link só abre nesta máquina. O modelo já vem no projeto: `docs/guia/index.html` e `docs/guia/mundo.html`. Seções:

1. **O mundo:** a frase "esta página é ___", as camadas e o esboço em página inteira (`mundo.html`, em tela cheia: abertura, uma seção do meio e o fecho, ao vivo, sem componentes). É a primeira coisa que o usuário aprova.
2. **Suas perguntas:** o que decidi e por quê, respondendo ao que o usuário e o cliente perguntaram, com o que foi medido.
3. **Regras conferíveis.**
4. **A ideia:** de onde vem e onde aparece, na página e nas peças.
5. **Logo**, em vetor, sobre cada fundo.
6. **Cor. 7. Letra.**
8. **Botões:** todos, sobre cada superfície. **Peças pequenas:** links, abas, campos. Podem ser simples: dizer o que herdam do mundo.
9. **O cartão ou a unidade principal do site**, se houver. **Fotos**, com a comparação, se houver.
   **Formas e padrões, ícones, aplicações e voz**, vindos da prancha do dossiê, agora como regra.
10. **O protagonista e a animação de texto**, funcionando.
11. **Gestos** (seção 8) e **Cada detalhe** (seção 9).
12. **Referências escolhidas,** cada uma com um papel.
13. **Para decidir:** poucas perguntas, e a primeira é "este é o lugar da marca?".

Uma fonte só: o guia usa os mesmos `marca.css` e `marca.js` do site. Guardar o link local em `CLAUDE.md` e `docs/ESTADO.md`. Não publicar o guia como Artifact nem em endereço público por iniciativa própria: só quando o usuário pedir para mandar a alguém. Aí, `npm run guia` copia os dois arquivos para `docs/guia/` e a pasta vai como prévia ([publicar-previa.md](publicar-previa.md)), ou exportam-se imagens.

Decisão aprovada vira regra no `CLAUDE.md` do projeto, na seção Identidade, começando pelo mundo. A partir daí, o guia manda: propor mudança com o impacto dela.

## 11. Receitas de técnica

São técnicas testadas em produção. Servem à ideia da marca da vez; o desenho, o tempo e a forma mudam. Mais mecânicas, estudadas nos templates do React Bits Pro (campo que reage ao cursor, troca de foto pela borda de entrada, cena presa com repouso, moldura fixa, lista que acende por uma variável CSS): [react-bits-templates.md](react-bits-templates.md#receitas-de-mecânica).

**Contorno que corre pela borda.** SVG absoluto dentro do botão, com `<rect>` de `pathLength="1"`, `stroke-dasharray: 1 1.01` e `stroke-dashoffset` animado de 1 a 0 pela Web Animations API, com a duração proporcional ao que falta. Na saída, a linha segue até `-1` em vez de voltar: `-1` e `1` desenham a mesma coisa. Medir com `ResizeObserver`. Um segundo `rect` com `stroke-dasharray: .0001 2` e ponta redonda vira um ponto correndo na frente. No toque, corre ao apertar, em menos tempo. No foco, fica completo e parado.

**Logo que se escreve.** Uma linha central por letra, na ordem da escrita, desenhada à mão como pontos e suavizada (Catmull-Rom para Bézier). Cada letra ganha uma `<mask>` com essa linha, em traço largo o bastante para cobrir a letra (conferir o que sobra para fora), e o traço anima por `pathLength="1"`. Um fantasma do desenho em opacidade baixa fica por baixo. **Em repouso, nada de máscara:** ao terminar, remover a camada e mostrar o vetor limpo, porque máscara deixa filete em alguns tamanhos. Foi o que resolveu as "linhas de baixa qualidade" no hover do logo.

**Título que chega borrado.** Filtro SVG `feGaussianBlur` com `stdDeviation="X 0"` só na horizontal, um por linha, animado por `requestAnimationFrame`, com opacidade e `translateX` juntos. Antes do JS, o título fica escondido por CSS com uma `animation` de segurança que o mostra depois de uns 2,6 s, para nunca sumir se o JS falhar. Remover o filtro ao terminar. Vale para todo título que surge: marcar como pronto (o atributo que desliga a segurança) só depois de esconder as linhas e começar a animação; e, se a segurança já mostrou o título (fonte lenta), não animar de novo. Senão ele aparece e some, e o usuário vê "às vezes aparece, às vezes não".

**Seção conduzida pela rolagem.** Seção alta com miolo em `position: sticky`; o progresso (0 a 1) sai de `getBoundingClientRect`. Trilho em `translate3d`, traçado com `getPointAtLength` e `strokeDashoffset`. Física leve (mola com amortecimento) para o que balança na inércia. Pausar fora da tela com `IntersectionObserver`. O que acompanha a rolagem se suaviza pelo tempo (`v += (alvo − v) · (1 − e^(−dt/τ))`, τ de 80 a 120 ms), não por "x% por quadro", que muda com a taxa da tela. Em tela em pé, marcos em posições próprias (`data-marco-pe`), porque o traçado muda de proporção. Sem hover que mude o estado, e versão parada com movimento reduzido. Mais em [padroes-de-marca.md](padroes-de-marca.md#seção-conduzida-pela-rolagem).

**Abertura de primeira visita.** Um script curto no `<head>` decide antes de pintar, só na home, sem `sessionStorage` marcado e sem movimento reduzido, e põe uma classe no `<html>`. A abertura some sozinha em pouco mais de um segundo e **ao primeiro toque, tecla ou rolagem**. O CSS tem uma saída de segurança por `animation` (uns 4,5 s), para o JS falhar sem deixar a tela presa. Nos testes, marcar o `sessionStorage` em `ANTES`, em `tools/testes.config.mjs`.
