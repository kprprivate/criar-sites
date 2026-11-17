// Olhos do projeto: Chrome sem interface via DevTools Protocol, sem dependências (Node 22+). Importar nos roteiros de teste.
//   const j = await abre({ w: 1366, h: 700 }); await j.ir("/"); await j.rola(800); await j.foto("x"); await j.fecha();
// SITE_BASE muda o endereço testado. CHROME_BIN aponta outro navegador.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const BASE = process.env.SITE_BASE || "http://127.0.0.1:{{PORTA}}";
export const dorme = (ms) => new Promise((r) => setTimeout(r, ms));

// Sem o site no ar, os testes acusariam defeito onde não há: melhor dizer logo.
export async function siteNoAr() {
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(8000) });
  } catch {
    console.error(`O site não responde em ${BASE}. Rode npm run dev, ou use SITE_BASE.`);
    process.exit(2);
  }
}
let conta = 0;

function achaChrome() {
  const lista = [
    process.env.CHROME_BIN,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const achado = lista.find((c) => existsSync(c));
  if (!achado) throw new Error("Chrome não encontrado. Defina CHROME_BIN com o caminho do navegador.");
  return achado;
}

export async function abre({ w = 1366, h = 700, celular = false, reduz = false, saida = "." } = {}) {
  mkdirSync(saida, { recursive: true });
  conta += 1;
  const profile = join(tmpdir(), `olhar-${process.pid}-${conta}-${Date.now()}`);
  const proc = spawn(achaChrome(), ["--headless=new", "--remote-debugging-port=0", "--disable-gpu-vsync", `--user-data-dir=${profile}`, `--window-size=${w},${h}`, "about:blank"], { stdio: "ignore" });
  let ws;
  for (let i = 0; i < 150 && !ws; i++) {
    try {
      const port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0].trim();
      const t = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const u = t.find((x) => x.type === "page")?.webSocketDebuggerUrl;
      if (u) {
        ws = new WebSocket(u);
        await new Promise((r) => ws.addEventListener("open", r, { once: true }));
      }
    } catch {
      /* ainda subindo */
    }
    if (!ws) await dorme(200);
  }
  if (!ws) throw new Error("O Chrome não abriu a porta de depuração.");
  let id = 0;
  const pend = new Map();
  const erros = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) {
      pend.get(m.id)(m.result ?? m.error);
      pend.delete(m.id);
    } else if (m.method === "Runtime.exceptionThrown") {
      erros.push(m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text);
    } else if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
      erros.push(`${m.params.entry.text} ${m.params.entry.url || ""}`.slice(0, 220));
    } else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
      erros.push(m.params.args.map((a) => a.description || a.value).join(" ").slice(0, 300));
    }
  });
  const cmd = (method, params = {}) =>
    new Promise((r) => {
      const n = ++id;
      pend.set(n, r);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  const ev = async (expression) => {
    const r = await cmd("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r?.exceptionDetails) erros.push("ev: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r?.result?.value;
  };
  await cmd("Page.enable");
  await cmd("Runtime.enable");
  await cmd("Log.enable");
  await cmd("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: celular ? 2 : 1, mobile: celular });
  if (celular) await cmd("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await cmd("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduz ? "reduce" : "no-preference" }] });
  await cmd("Emulation.setFocusEmulationEnabled", { enabled: true });
  // Os pulos da página: cada mudança de lugar que a pessoa não causou, somada desde que a página abriu (o CLS do
  // navegador). Um bloco que chega do nada empurra o resto, e a página parece quebrada.
  await cmd("Page.addScriptToEvaluateOnNewDocument", { source: `window.__pulos = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput && e.sources.some((s) => s.node)) window.__pulos.push({ v: e.value, quem: e.sources.map((s) => (s.node && s.node.className && String(s.node.className).split(" ")[0]) || (s.node && s.node.nodeName) || "?").join("+") }); }).observe({ type: "layout-shift", buffered: true }); } catch (e) {}` });

  const j = {
    w, h, erros, cmd, ev,
    ir: async (url, { espera = 1500 } = {}) => {
      const carregou = new Promise((r) => {
        const f = (e) => {
          const m = JSON.parse(e.data);
          if (m.method === "Page.loadEventFired") {
            ws.removeEventListener("message", f);
            r();
          }
        };
        ws.addEventListener("message", f);
        setTimeout(r, 15000);
      });
      await cmd("Page.navigate", { url: /^[a-z]+:/i.test(url) ? url : BASE + url });
      await carregou;
      await dorme(espera);
    },
    foto: async (nome, { pagina = false } = {}) => {
      await cmd("Page.bringToFront");
      const p = pagina ? await cmd("Page.getLayoutMetrics") : null;
      const params = { format: "jpeg", quality: 84 };
      if (pagina) {
        params.captureBeyondViewport = true;
        params.clip = { x: 0, y: 0, width: w, height: p.cssContentSize.height, scale: 1 };
      }
      const r = await cmd("Page.captureScreenshot", params);
      if (r?.data) writeFileSync(join(saida, nome + ".jpg"), Buffer.from(r.data, "base64"));
    },
    // As bordas do conteúdo de cada seção do main (12/11): o menor left e o maior right entre os elementos visíveis com fundo,
    // borda, imagem ou texto. Seções que começam fora da linha das outras saltam aos olhos do cliente e passam por todos os
    // testes. A abertura de ponta a ponta ([data-heroi]) fica de fora.
    //   console.log(await j.bordas());   // ["categorias 101–1339", "fileira 101–1339", ...]
    bordas: async () => JSON.parse(await ev(`JSON.stringify([...document.querySelectorAll("main > :not(template)")].filter((s) => !s.matches("[data-heroi]") && s.offsetHeight).map((s) => {
      const visivel = (e) => { const b = e.getBoundingClientRect(); if (!b.width || !b.height) return false; const c = getComputedStyle(e); if (c.visibility === "hidden") return false; return e.matches("img, video, svg, input, button") || [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || !["rgba(0, 0, 0, 0)", getComputedStyle(document.body).backgroundColor].includes(c.backgroundColor) || parseFloat(c.borderTopWidth) > 0 || c.boxShadow !== "none"; };
      const els = [...s.querySelectorAll("*")].filter((e) => visivel(e) && !e.closest("[data-faixa-logos], [data-fileira-trilho] > :not(:first-child), svg *"));
      const L = Math.min(...els.map((e) => e.getBoundingClientRect().left));
      const R = Math.max(...els.map((e) => e.getBoundingClientRect().right).filter((x) => x <= innerWidth + 1));
      return (String(s.className).split(" ")[0] || s.tagName) + " " + Math.round(L) + "–" + Math.round(R);
    }))`)),
    // Um componente de perto (12/11): o elemento e uma folga em volta, ampliado (escala 2), em PNG. Para julgar um cartão,
    // um botão ou um formulário, nunca a página inteira reduzida, onde a peça fica pequena demais para parecer esquisita.
    //   await j.peca(".opcao--foto", "tipo-de-perto");   // devolve false se o seletor não achar nada
    peca: async (seletor, nome, { folga = 24, escala = 2, espera = 700 } = {}) => {
      const sel = JSON.stringify(seletor);
      const y = await ev(`(() => { const e = document.querySelector(${sel}); if (!e) return null; const b = e.getBoundingClientRect(); return Math.max(0, b.top + scrollY - innerHeight / 3); })()`);
      if (y === null || y === undefined) return false;
      await ev(`(() => { const l = window.GSL_LENIS || window.LENIS; if (l) l.scrollTo(${y}, { immediate: true, force: true }); else window.scrollTo(0, ${y}); })()`);
      await dorme(espera);
      const r = JSON.parse(await ev(`(() => { const b = document.querySelector(${sel}).getBoundingClientRect(); return JSON.stringify({ x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height }); })()`));
      const x = Math.max(0, r.x - folga);
      const top = Math.max(0, r.y - folga);
      const f = await cmd("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x, y: top, width: Math.min(r.w + folga * 2, w - x), height: r.h + folga * 2, scale: escala } });
      if (f?.data) writeFileSync(join(saida, nome + ".png"), Buffer.from(f.data, "base64"));
      return true;
    },
    // Rola sem o Lenis atrapalhar: para ele, vai e deixa pintar. O Chrome sem interface só pinta quando alguém pede um quadro.
    rola: async (y, { espera = 700 } = {}) => {
      await ev(`(() => { const l = window.LENIS; if (l) { l.scrollTo(${y}, { immediate: true, force: true }); } else { window.scrollTo(0, ${y}); } return window.scrollY; })()`);
      await dorme(espera);
      await cmd("Page.captureScreenshot", { format: "jpeg", quality: 10, clip: { x: 0, y: 0, width: 4, height: 4, scale: 1 } });
    },
    ate: async (seletor, { fim = false, folga = 0, espera = 700 } = {}) => {
      const y = await ev(`(() => { const el = document.querySelector(${JSON.stringify(seletor)}); if (!el) return null; const c = el.getBoundingClientRect(); return Math.round(c.top + window.scrollY + ${fim ? "c.height - innerHeight" : "0"} + ${folga}); })()`);
      if (y != null) await j.rola(y, { espera });
      return y;
    },
    mouse: (x, y) => cmd("Input.dispatchMouseEvent", { type: "mouseMoved", x, y }),
    clique: async (x, y) => {
      await cmd("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
      await cmd("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
      await cmd("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
    },
    cliqueEm: async (seletor) => {
      const c = await ev(`(() => { const el = document.querySelector(${JSON.stringify(seletor)}); if (!el) return null; el.scrollIntoView({ block: "center" }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
      if (!c) return false;
      await dorme(250);
      await j.clique(c.x, c.y);
      return true;
    },
    toque: async (x, y) => {
      await cmd("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
      await cmd("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    },
    tecla: async (key) => {
      const codigos = { Escape: 27, Enter: 13, Tab: 9, ArrowLeft: 37, ArrowRight: 39 };
      const extra = codigos[key] ? { windowsVirtualKeyCode: codigos[key], nativeVirtualKeyCode: codigos[key], code: key } : {};
      await cmd("Input.dispatchKeyEvent", { type: "rawKeyDown", key, ...extra });
      await cmd("Input.dispatchKeyEvent", { type: "keyUp", key, ...extra });
    },
    digita: async (texto) => {
      await cmd("Input.insertText", { text: texto });
    },
    // Compara com a largura real da janela. Em modo celular, o innerWidth cresce junto com o conteúdo: nunca medir contra ele.
    estouro: () => ev(`Math.max(document.documentElement.scrollWidth, window.innerWidth) - ${w}`),
    // Só mede no computador: na emulação de celular, o Chrome não anota layout-shift nenhum (sempre 0).
    // Quanto a página pulou desde que abriu: { total, maiores }. Acima de 0,05, algo chegou do nada e empurrou o resto
    // (muitas vezes o rodapé, que aparece primeiro e depois é empurrado).
    // Pulo de elemento que já saiu da página não conta (o navegador não diz quem foi): é o esqueleto sendo trocado pelo
    // conteúdo. O que incomoda é o que continua na tela e muda de lugar, como o rodapé empurrado.
    pulos: async () => JSON.parse(await ev(`JSON.stringify({ total: Math.round((window.__pulos || []).reduce((a, e) => a + e.v, 0) * 1000) / 1000, maiores: (window.__pulos || []).slice().sort((a, b) => b.v - a.v).slice(0, 2).map((e) => e.quem) })`)),
    // Com o JS desligado, os blocos que o JS enche e que chegam vazios no HTML: um container com data-* sem nada dentro,
    // à vista. Cada um precisa trazer o esqueleto (<!--espera:nome:n-->, src/casca). Quem é vazio de propósito leva
    // data-espera-nao. Volta a lista de nomes; vazia, está certo.
    vazios: async (url) => {
      await cmd("Emulation.setScriptExecutionDisabled", { value: true });
      await j.ir(url, { espera: 300 });
      const r = await ev(`[...document.querySelectorAll("main *")].filter((e) => { if (e.closest("template, [hidden], [data-espera-nao]") || e.children.length || e.textContent.trim()) return false; if (!["DIV", "SECTION", "UL", "OL", "NAV", "HEADER", "ARTICLE", "ASIDE", "DL"].includes(e.tagName)) return false; if (![...e.attributes].some((a) => a.name.startsWith("data-") && !["data-revela", "data-cai"].includes(a.name))) return false; return e.getBoundingClientRect().width > 0; }).map((e) => String(e.className).split(" ")[0] || [...e.attributes].find((a) => a.name.startsWith("data-")).name)`);
      await cmd("Emulation.setScriptExecutionDisabled", { value: false });
      return r || [];
    },
    // Quem passa da largura, descontando o que sangra de propósito (seletor).
    fora: (sangria = "") => ev(`[...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); if (!r.width || !r.height) return false; const s = getComputedStyle(e); if (s.visibility === "hidden" || s.position === "fixed") return false; if (e.closest(${JSON.stringify(["script, style, svg, [data-faixa], [data-lista-lado], [data-sangra]", sangria].filter(Boolean).join(", "))})) return false; return r.right > ${w} + 1 || r.left < -1; }).slice(0, 4).map((e) => (typeof e.className === "string" && e.className) || e.tagName).join(" ; ")`),
    // Texto sobre texto, na mesma camada. O que é fixo, sticky ou modal só se compara com o que está junto dele.
    encavalados: () => ev(`(() => {
      const camada = (e) => { for (let n = e; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === "fixed" || p === "sticky" || n.tagName === "DIALOG") return n; } return null; };
      const visivel = (e) => { for (let n = e; n && n !== document.documentElement; n = n.parentElement) { const s = getComputedStyle(n); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) return false; } return true; };
      // Só o que aparece: corta pelo que tiver rolagem ou recorte em volta, e fica com a faixa das letras, sem o vão da caixa de texto.
      const recorta = (e, r) => {
        const folga = r.height * 0.15;
        const c = { left: r.left, right: r.right, top: r.top + folga, bottom: r.bottom - folga, height: r.height - 2 * folga };
        for (let n = e; n && n !== document.documentElement; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (s.overflowX === "visible" && s.overflowY === "visible") continue;
          const b = n.getBoundingClientRect();
          c.left = Math.max(c.left, b.left); c.right = Math.min(c.right, b.right); c.top = Math.max(c.top, b.top); c.bottom = Math.min(c.bottom, b.bottom);
        }
        return c.right - c.left > 1 && c.bottom - c.top > 1 ? c : null;
      };
      const itens = [];
      const andar = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (andar.nextNode()) {
        const t = andar.currentNode;
        const e = t.parentElement;
        if (!t.textContent.trim() || !e || e.closest("script, style, option, svg, [data-faixa], [data-sem-medir], [aria-hidden='true']") || !visivel(e)) continue;
        if (e.closest("details:not([open])") && !e.closest("summary")) continue;
        const faixa = document.createRange();
        faixa.selectNodeContents(t);
        for (const r of faixa.getClientRects()) { const c = recorta(e, r); if (c) itens.push({ e, r: c, c: camada(e), t: t.textContent.trim().slice(0, 28) }); }
      }
      for (const s of document.querySelectorAll("select")) if (visivel(s)) { const c = recorta(s, s.getBoundingClientRect()); if (c) itens.push({ e: s, r: c, c: camada(s), t: "[lista] " + (s.selectedOptions[0]?.text || "") }); }
      const achados = new Set();
      for (let i = 0; i < itens.length; i += 1) for (let k = i + 1; k < itens.length; k += 1) {
        const a = itens[i], b = itens[k];
        if (a.e === b.e || a.c !== b.c || a.e.contains(b.e) || b.e.contains(a.e)) continue;
        const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
        const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
        if (w > 2 && h > 0.5) achados.add('"' + a.t + '" sobre "' + b.t + '"');
      }
      return [...achados].slice(0, 3).join(" ; ");
    })()`),
    // Botão fixo em cima de botão da página, na posição em que ela está.
    cobertos: () => ev(`(() => {
      const fixos = [...document.querySelectorAll(".flutuantes a, .flutuantes button")].filter((e) => { const s = getComputedStyle(e); return s.visibility !== "hidden" && +s.opacity > 0 && e.getBoundingClientRect().width > 0; }).map((e) => e.getBoundingClientRect());
      return [...document.querySelectorAll("main .bt, .barra-acao .bt")].filter((b) => { const r = b.getBoundingClientRect(); if (r.width < 2 || r.bottom < 0 || r.top > innerHeight || getComputedStyle(b).visibility === "hidden") return false; return fixos.some((f) => Math.min(f.right, r.right) - Math.max(f.left, r.left) > 2 && Math.min(f.bottom, r.bottom) - Math.max(f.top, r.top) > 2); }).slice(0, 3).map((b) => (b.textContent.trim() || b.getAttribute("aria-label") || b.className).slice(0, 30)).join(" ; ");
    })()`),
    // A ação principal está à vista sem rolar? Devolve quanto ela passa do pé da janela (0 = à vista), ou null se não existe.
    abaixoDaDobra: (seletor) => ev(`(() => { const e = document.querySelector(${JSON.stringify(seletor)}); if (!e) return null; return Math.max(0, Math.round(e.getBoundingClientRect().bottom - innerHeight)); })()`),
    fecha: async () => {
      ws.close();
      proc.kill();
      await dorme(300);
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {
        /* fica para o sistema limpar */
      }
    },
  };
  return j;
}
