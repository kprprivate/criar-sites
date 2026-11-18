// Sonda de referências: abre, mede e filma sites no Chrome sem interface, via DevTools Protocol, sem dependências (Node 22+).
//   node sonda.mjs <sites.json> <pasta-saida> [--mode triage|deep|filme|fotos] [--only a,b] [--conc 3]
// sites.json: [{ "slug": "x", "url": "https://...", "pages": { "pdp": "https://...", "lista": "https://..." }, "portao": "Enter", "esperaPortao": 4200, "esperaExtra": 2000 }]
// triage: quadros da abertura (a-0 a a-4, os primeiros 2,3 s), rolagem em quadros (d-00 em diante), medições e celular (rápido, para filtrar).
// deep:   tudo do triage + vídeo (rolagem e hover), quadros do hover em câmera lenta e leitura do CSS antes e depois, páginas extras e celular.
// filme:  só uma rolagem limpa de ~15 s, no computador e no celular (clip-*.mp4), para o dossiê. Precisa de ffmpeg.
// fotos:  só as páginas indicadas em "pages", para comparar o tratamento das fotos.
// Em cada pasta sai relatorio.json (status, técnica medida, fontes, cores, seções, curva da rolagem) e as capturas.
// Filmar pesa: cada quadro vira arquivo antes do mp4. Confira o disco, e rode de 2 a 3 ao mesmo tempo.
// Não disfarça o navegador e não passa por verificação de robô: site bloqueado fica marcado, e o usuário decide. Banner de cookie: tenta recusar; senão esconde por CSS, sem aceitar.
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const args = process.argv.slice(2);
const listPath = args[0];
const outRoot = resolve(args[1] || "probe");
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const MODE = flag("mode", "triage");
const ONLY = flag("only", "") ? flag("only", "").split(",") : null;
const CONC = Number(flag("conc", "3"));
const CHROME = [process.env.CHROME_BIN, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((c) => c && existsSync(c));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.handlers = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { res, timer } = this.pending.get(msg.id);
        clearTimeout(timer);
        this.pending.delete(msg.id);
        res(msg.error ? null : msg.result);
      } else if (msg.method && this.handlers.has(msg.method)) {
        for (const fn of this.handlers.get(msg.method)) fn(msg.params);
      }
    });
  }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res, { once: true });
      ws.addEventListener("error", rej, { once: true });
    });
    return new CDP(ws);
  }
  send(method, params = {}, timeout = 25000) {
    return new Promise((res) => {
      const n = ++this.id;
      const timer = setTimeout(() => {
        this.pending.delete(n);
        res(null);
      }, timeout);
      this.pending.set(n, { res, timer });
      try {
        this.ws.send(JSON.stringify({ id: n, method, params }));
      } catch {
        clearTimeout(timer);
        res(null);
      }
    });
  }
  on(method, fn) {
    if (!this.handlers.has(method)) this.handlers.set(method, []);
    this.handlers.get(method).push(fn);
  }
  off(method) {
    this.handlers.delete(method);
  }
  async eval(expression, timeout = 15000) {
    const r = await this.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, timeout);
    return r?.result?.value;
  }
  close() {
    try {
      this.ws.close();
    } catch {}
  }
}

let contadorPerfil = 0;
async function launch(w, h) {
  const profile = join(tmpdir(), `sonda-${process.pid}-${++contadorPerfil}`);
  // porta 0: o Chrome escolhe uma livre e grava em DevToolsActivePort, sem colisão entre janelas paralelas
  const proc = spawn(
    CHROME,
    ["--headless=new", "--mute-audio", "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0",
      `--window-size=${w},${h}`, `--user-data-dir=${profile}`, "about:blank"],
    { stdio: "ignore" },
  );
  let wsUrl;
  for (let i = 0; i < 150 && !wsUrl; i++) {
    try {
      const port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0].trim();
      const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      wsUrl = tabs.find((t) => t.type === "page")?.webSocketDebuggerUrl;
    } catch {}
    if (!wsUrl) await sleep(200);
  }
  if (!wsUrl) {
    proc.kill();
    throw new Error("Chrome não abriu a porta de depuração");
  }
  const cdp = await CDP.connect(wsUrl);
  return {
    cdp,
    stop: async () => {
      cdp.close();
      proc.kill();
      await sleep(400);
      try {
        rmSync(profile, { recursive: true, force: true });
      } catch {}
    },
  };
}

const HIDE_CONSENT_CSS = `#onetrust-consent-sdk,#CybotCookiebotDialog,#CybotCookiebotDialogBodyUnderlay,.cc-window,.cc-banner,#usercentrics-root,#didomi-host,#truste-consent-track,#cookie-law-info-bar,.osano-cm-window,#hs-eu-cookie-confirmation,#qc-cmp2-container,.cky-consent-container,#shopify-pc__banner,.shopify-pc__banner,.iubenda-cs-container,#iubenda-cs-banner,#CookieConsent,#cookieConsent,.cookie-banner,.cookie-consent,#cookie-banner,#cookies-banner,[id*="cookie-notice" i],[class*="cookie-notice" i],[class*="CookieBanner" i],[class*="cookie-bar" i]{display:none!important}`;

const DISMISS = `(() => {
  const acoes = [];
  const txt = (el) => (el.innerText || el.getAttribute('aria-label') || el.value || '').replace(/\\s+/g,' ').trim();
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none' && +s.opacity>0.05; };
  const recusa = /^(reject|reject all|reject all cookies|reject & enter|reject and enter|decline|decline all|decline cookies|refuse|refuse all|deny|deny all|only necessary|necessary only|necessary cookies only|use necessary cookies only|only required|required only|continue without accepting|continue without consent|recusar|rejeitar|rejeitar todos|recusar todos|recusar cookies|apenas necess[aá]rios|somente necess[aá]rios|tout refuser|refuser|continuar sem aceitar|accept only essential|accept essential|only essential|essential only|strictly necessary only|disagree|i decline|no thanks|não, obrigado)/i;
  const fundo = (sel, raiz = document) => { const s = [...raiz.querySelectorAll(sel)]; for (const e of raiz.querySelectorAll('*')) if (e.shadowRoot) s.push(...fundo(sel, e.shadowRoot)); return s; };
  const botoes = fundo('button,a[role=button],[role=button],input[type=button],a,span[role=link]').filter(vis);
  const r = botoes.find((e) => recusa.test(txt(e)) && txt(e).length < 45);
  if (r) { acoes.push('recusou: ' + txt(r)); try { r.click(); } catch {} }
  if (!document.getElementById('sonda-consent')) { const st = document.createElement('style'); st.id = 'sonda-consent'; st.textContent = ${JSON.stringify(HIDE_CONSENT_CSS)}; document.documentElement.appendChild(st); }
  const fecha = [...document.querySelectorAll('[aria-label*="close" i],[aria-label*="fechar" i],[aria-label*="dismiss" i],[class*="close" i],[data-dismiss],[data-close]')].filter(vis).filter((el) => {
    const q = el.getBoundingClientRect();
    return q.width < 90 && q.height < 90 && el.closest('[role=dialog],[aria-modal=true],[class*=modal i],[class*=popup i],[class*=newsletter i],[id*=modal i],[id*=popup i],[class*=klaviyo i],[class*=needsclick i]');
  });
  for (const f of fecha.slice(0,2)) { acoes.push('fechou modal'); try { f.click(); } catch {} }
  // pelo texto: painel fixo de cookie ou de newsletter some sem aceitar nada
  let escondeu = false;
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (s.position !== 'fixed' || s.display === 'none') continue;
    const q = el.getBoundingClientRect(); if (q.width < 120 || q.height < 40) continue;
    const t = el.innerText || '';
    if (t.length > 2500) continue;
    const ehCookie = /cookies?\\b|your privacy|consent|privacidade/i.test(t) && t.length > 30;
    const ehNews = !!el.querySelector('input[type=email],input[name*=email i],input[placeholder*=email i]') && t.length < 1500;
    const ehIframe = [...el.querySelectorAll('iframe')].some((f) => /popup|newsletter|privacy|attentive|klaviyo/i.test((f.title||'') + (f.id||'') + (f.src||'')));
    if (ehCookie || ehNews || ehIframe) { el.style.setProperty('display','none','important'); escondeu = true; acoes.push(ehCookie ? 'escondeu cookie' : 'escondeu newsletter'); }
  }
  if (escondeu) {
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      if (s.position !== 'fixed') continue;
      const q = el.getBoundingClientRect();
      if (q.width >= innerWidth * 0.9 && q.height >= innerHeight * 0.9 && !(el.innerText||'').trim() && !el.querySelector('img,video,canvas')) el.style.setProperty('display','none','important');
    }
    for (const el of [document.documentElement, document.body]) if (getComputedStyle(el).overflowY === 'hidden') el.style.setProperty('overflow','auto','important');
  }
  return acoes;
})()`;

const MEDIR = `(() => {
  const res = {};
  res.titulo = document.title; res.url = location.href;
  res.lang = document.documentElement.lang;
  res.altura = document.documentElement.scrollHeight;
  res.larguraBarra = innerWidth - document.documentElement.clientWidth;
  const h = getComputedStyle(document.documentElement); res.scrollbarCss = h.scrollbarWidth;
  res.classesHtml = document.documentElement.className.toString().slice(0,200);
  const urls = [...document.scripts].map((s) => s.src).concat(performance.getEntriesByType('resource').map((e) => e.name)).join(' ').toLowerCase();
  const tem = (re) => re.test(urls);
  const q = (s) => !!document.querySelector(s);
  res.tec = {
    lenis: !!window.lenis || !!window.Lenis || /lenis/.test(document.documentElement.className) || tem(/lenis/),
    locomotive: q('[data-scroll-container],.has-scroll-smooth') || tem(/locomotive/),
    gsap: !!window.gsap || tem(/gsap|scrolltrigger/),
    three: !!window.THREE || tem(/three(\\.min)?\\.js/),
    canvas: document.querySelectorAll('canvas').length,
    video: document.querySelectorAll('video').length,
    lottie: !!window.lottie || q('lottie-player,dotlottie-player') || tem(/lottie/),
    rive: tem(/rive/), barba: !!window.barba || tem(/barba/), swup: !!window.swup || tem(/swup/),
    swiper: !!window.Swiper || q('.swiper,.swiper-container'), framer: q('[data-framer-appear-id],[data-framer-name]') || tem(/framer/),
    shopify: !!window.Shopify || tem(/cdn\\.shopify|\\/cdn\\/shop/), next: !!window.__NEXT_DATA__ || q('#__next') || tem(/_next\\//), nuxt: !!window.__NUXT__ || tem(/_nuxt\\//),
    webflow: !!document.documentElement.dataset.wfPage, wordpress: tem(/wp-content/), sfcc: tem(/demandware/), magento: tem(/mage\\/|magento/), salesforce: tem(/demandware|sfcc/),
    akamai: tem(/akam/),
  };
  res.fontes = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g,'') + ' ' + f.weight))].slice(0,14);
  const fam = (sel) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el); return { ff: s.fontFamily.slice(0,70), fs: s.fontSize, fw: s.fontWeight, ls: s.letterSpacing, tt: s.textTransform, lh: s.lineHeight, cor: s.color, texto: (el.innerText||'').replace(/\\s+/g,' ').trim().slice(0,70) }; };
  res.tipo = { h1: fam('h1'), h2: fam('h2'), p: fam('main p, p'), nav: fam('header a, nav a'), botao: fam('button') };
  const body = getComputedStyle(document.body); res.fundoBody = body.backgroundColor; res.corBody = body.color;
  const areas = new Map();
  for (const el of document.querySelectorAll('body, body *')) {
    const s = getComputedStyle(el); const c = s.backgroundColor;
    if (c === 'rgba(0, 0, 0, 0)' || c === 'transparent') continue;
    const r = el.getBoundingClientRect(); const a = r.width * r.height; if (a < 2000) continue;
    areas.set(c, (areas.get(c)||0) + a);
    if (areas.size > 400) break;
  }
  res.coresFundo = [...areas.entries()].sort((a,b) => b[1]-a[1]).slice(0,7).map(([c]) => c);
  const header = document.querySelector('header') || document.querySelector('nav');
  if (header) { const s = getComputedStyle(header); const r = header.getBoundingClientRect(); res.header = { pos: s.position, altura: Math.round(r.height), fundo: s.backgroundColor, tr: s.transition.slice(0,80) }; }
  const links = (root) => [...new Set([...(root ? root.querySelectorAll('a,button') : [])].map((a) => (a.innerText||a.getAttribute('aria-label')||'').replace(/\\s+/g,' ').trim()).filter((t) => t && t.length < 34))].slice(0,40);
  res.nav = links(document.querySelector('header') || document.querySelector('nav'));
  res.rodape = links(document.querySelector('footer')).slice(0,36);
  res.linksUnidade = [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /\\/(products?|product|p|item|items|lot|lots|watches?|watch|cars?|inventory|stock|vehicles?|listing|listings|shop)\\/[^/?#]{3,}/i.test(h)))].slice(0,12);
  res.secoes = [...document.querySelectorAll('main h1, main h2, section h1, section h2, h2')].map((h) => (h.innerText||'').replace(/\\s+/g,' ').trim()).filter(Boolean).slice(0,24);
  res.selecao = (() => { try { return getComputedStyle(document.body,'::selection').backgroundColor; } catch { return null; } })();
  res.cursor = body.cursor;
  return res;
})()`;

const ACHAR_CTAS = `(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width>=36&&r.height>=16&&r.height<=130&&r.width<=620&&s.visibility!=='hidden'&&s.display!=='none'&&+s.opacity>0.1; };
  const lista = []; const vistos = new Set(); let n = 0;
  for (const el of document.querySelectorAll('a,button,[role=button]')) {
    const text = (el.innerText||el.getAttribute('aria-label')||'').replace(/\\s+/g,' ').trim();
    if (!text || text.length>40 || text.length<2) continue;
    if (!vis(el)) continue;
    const s = getComputedStyle(el), b = getComputedStyle(el,'::before'), a = getComputedStyle(el,'::after');
    const temFundo = s.backgroundColor!=='rgba(0, 0, 0, 0)'||s.backgroundImage!=='none';
    const temBorda = parseFloat(s.borderTopWidth)>0&&s.borderTopStyle!=='none'&&parseFloat(s.borderBottomWidth)>0;
    const temPseudo = (b.content!=='none'&&b.content!=='normal')||(a.content!=='none'&&a.content!=='normal');
    const temTrans = s.transitionDuration.split(',').some((d) => parseFloat(d)>0);
    const r = el.getBoundingClientRect();
    const naHeader = !!el.closest('header,nav');
    const chave = [s.backgroundColor,s.borderRadius,s.fontFamily.slice(0,20),s.fontSize,s.textTransform,temPseudo,el.children.length>0,naHeader].join('|');
    const pontos = (temFundo?4:0)+(temBorda?3:0)+(temPseudo?2:0)+(temTrans?1:0)+(el.children.length>0?1:0)+(naHeader?-2:0)+(r.height>=34?1:0);
    if (vistos.has(chave)) continue; vistos.add(chave);
    el.setAttribute('data-sonda', String(n));
    lista.push({ n, text, pontos, tag: el.tagName.toLowerCase(), naHeader });
    n++;
    if (n > 60) break;
  }
  return lista.sort((a,b) => b.pontos-a.pontos).slice(0,7);
})()`;

const RETRATO = (n) => `(() => {
  const el = document.querySelector('[data-sonda="${n}"]'); if (!el) return null;
  const pega = (cs) => ({ bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0,70), cor: cs.color, borda: cs.borderTopWidth+' '+cs.borderTopStyle+' '+cs.borderTopColor, raio: cs.borderRadius, clip: cs.clipPath, tf: cs.transform, op: cs.opacity, sombra: cs.boxShadow.slice(0,60), larg: cs.width, alt: cs.height, conteudo: cs.content, tr: cs.transition.slice(0,120), pos: cs.position, ff: cs.fontFamily.slice(0,40), fs: cs.fontSize, fw: cs.fontWeight, ls: cs.letterSpacing, tt: cs.textTransform, pad: cs.padding });
  const filhos = [...el.querySelectorAll('*')].slice(0,8).map((c) => { const s = getComputedStyle(c); return { tag: c.tagName.toLowerCase(), cls: (c.className.baseVal ?? c.className).toString().slice(0,40), tf: s.transform, op: s.opacity, bg: s.backgroundColor, cor: s.color, clip: s.clipPath, tr: s.transition.slice(0,80) }; });
  return { self: pega(getComputedStyle(el)), antes: pega(getComputedStyle(el,'::before')), depois: pega(getComputedStyle(el,'::after')), filhos, html: el.outerHTML.slice(0,500), cls: (el.className.baseVal ?? el.className).toString().slice(0,90) };
})()`;

function diff(a, b, prefix = "") {
  const out = {};
  if (!a || !b) return out;
  for (const k of Object.keys(a)) {
    if (k === "html" || k === "tr") continue;
    if (typeof a[k] === "object" && a[k] !== null) Object.assign(out, diff(a[k], b[k], `${prefix}${k}.`));
    else if (a[k] !== b[k]) out[`${prefix}${k}`] = [a[k], b[k]];
  }
  return out;
}

async function shot(cdp, file, clip, q = 72) {
  const r = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: q, ...(clip ? { clip } : {}) }, 30000);
  if (r?.data) writeFileSync(file, Buffer.from(r.data, "base64"));
  return !!r?.data;
}

async function preparar(cdp, { width, height, mobile }) {
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Network.enable");
  await cdp.send("Animation.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width, height, deviceScaleFactor: mobile ? 2 : 1, mobile: !!mobile, screenWidth: width, screenHeight: height,
    screenOrientation: mobile ? { type: "portraitPrimary", angle: 0 } : { type: "landscapePrimary", angle: 0 },
  });
  if (mobile) {
    await cdp.send("Emulation.setUserAgentOverride", {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    });
    await cdp.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  }
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
  await cdp.send("Emulation.setFocusEmulationEnabled", { enabled: true });
}

async function abrir(cdp, url) {
  let status = null;
  let primeira = true;
  cdp.off("Network.responseReceived");
  cdp.on("Network.responseReceived", (p) => {
    if (p.type === "Document" && primeira) {
      primeira = false;
      status = p.response.status;
    }
  });
  const carregou = new Promise((res) => {
    cdp.off("Page.loadEventFired");
    cdp.on("Page.loadEventFired", res);
    setTimeout(res, 28000);
  });
  await cdp.send("Page.navigate", { url }, 40000);
  await carregou;
  return () => status;
}

function iniciarFilme(cdp, dir, maxW = 1280) {
  mkdirSync(dir, { recursive: true });
  const quadros = [];
  cdp.off("Page.screencastFrame");
  cdp.on("Page.screencastFrame", (p) => {
    const f = join(dir, `${String(quadros.length).padStart(5, "0")}.jpg`);
    // erro de disco não derruba a sonda: perde o quadro e segue
    try {
      writeFileSync(f, Buffer.from(p.data, "base64"));
      quadros.push({ f, t: p.metadata.timestamp });
    } catch {}
    cdp.send("Page.screencastFrameAck", { sessionId: p.sessionId });
  });
  cdp.send("Page.startScreencast", { format: "jpeg", quality: 60, maxWidth: maxW, maxHeight: 900, everyNthFrame: 2 });
  return async () => {
    await cdp.send("Page.stopScreencast");
    await sleep(200);
    cdp.off("Page.screencastFrame");
    return quadros;
  };
}

function montarVideo(quadros, saida, dir) {
  if (quadros.length < 5) return false;
  const linhas = [];
  quadros.forEach((q, i) => {
    const prox = quadros[i + 1];
    const dur = Math.min(1.6, Math.max(0.012, prox ? prox.t - q.t : 0.5));
    linhas.push(`file '${q.f.replace(/\\/g, "/")}'`, `duration ${dur.toFixed(3)}`);
  });
  linhas.push(`file '${quadros[quadros.length - 1].f.replace(/\\/g, "/")}'`);
  const lista = join(dir, "lista.txt");
  writeFileSync(lista, linhas.join("\n"));
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lista,
    "-vf", "scale='min(1100,iw)':-2,fps=24", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "31", "-preset", "veryfast",
    "-movflags", "+faststart", "-an", saida], { encoding: "utf8" });
  if (r.status !== 0) console.error("ffmpeg:", r.stderr?.slice(0, 300));
  return r.status === 0;
}

// Portão de entrada (ENTER, Start the experience): clica de verdade no texto indicado em site.portao e espera a abertura.
async function passarPortao(cdp, site, W, H) {
  if (!site.portao) return false;
  const achar = `(() => { const alvo = ${JSON.stringify(site.portao)}.toLowerCase(); const c = [...document.querySelectorAll('a,button,[role=button],div,span,p')].filter((e) => { const t = (e.innerText||'').replace(/\\s+/g,' ').trim().toLowerCase(); const r = e.getBoundingClientRect(); return t === alvo && r.width > 4 && r.height > 4; }).pop(); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; })()`;
  for (let i = 0; i < 12; i++) {
    const p = await cdp.eval(achar);
    if (p) {
      await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: p.x, y: p.y });
      await sleep(350);
      await cdp.send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 });
      await cdp.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 });
      await sleep(site.esperaPortao || 4200);
      return true;
    }
    await sleep(700);
  }
  return false;
}

// Rolagem de toque: gesto sintetizado; se a página não andar (headless parado), arrasto por eventos de toque e, por fim, rolagem direta.
async function rolarToque(cdp, W, H) {
  const dist = Math.round(H * 0.8);
  const y0 = await cdp.eval("scrollY");
  await cdp.send("Input.synthesizeScrollGesture", { x: W / 2, y: H * 0.72, yDistance: -dist, speed: 1000, gestureSourceType: "touch" }, 6000);
  await sleep(150);
  if ((await cdp.eval("scrollY")) !== y0) return;
  const x = W / 2;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y: H * 0.8 }] });
  for (let k = 1; k <= 10; k++) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: H * 0.8 - (k * H * 0.6) / 10 }] });
    await sleep(16);
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(200);
  if ((await cdp.eval("scrollY")) !== y0) return;
  await cdp.eval(`window.scrollBy({ top: ${dist}, behavior: 'instant' })`);
}

const BLOQUEIO = /access denied|just a moment|attention required|forbidden|are you (a )?human|verify you are human|request unsuccessful|pardon our interruption|403|bot detection|checking your browser/i;

async function roda(site) {
  const out = join(outRoot, site.slug);
  mkdirSync(out, { recursive: true });
  const rel = { slug: site.slug, url: site.url, modo: MODE, data: new Date().toISOString(), acoes: [] };
  const log = (m) => console.log(`[${site.slug}] ${m}`);

  // ---------- modo filme: só uma rolagem limpa, de cerca de 15 s, sem testes no meio
  if (MODE === "filme") {
    for (const [dispo, W, H] of [["computador", 1440, 900], ["celular", 390, 844]]) {
      const { cdp, stop } = await launch(W, H);
      try {
        await preparar(cdp, { width: W, height: H, mobile: dispo === "celular" });
        // abre, resolve avisos e portão antes de filmar; a filmagem começa com a página já pronta
        await abrir(cdp, site.url);
        await sleep(2200);
        await cdp.eval(DISMISS);
        await sleep(1200);
        await cdp.eval(DISMISS);
        if (dispo === "computador" && site.portao) await passarPortao(cdp, site, W, H);
        if (dispo === "celular" && site.portao) {
          const p = await cdp.eval(`(() => { const alvo = ${JSON.stringify(site.portao)}.toLowerCase(); const c = [...document.querySelectorAll('a,button,[role=button],div,span,p')].filter((e) => { const t = (e.innerText||'').replace(/\\s+/g,' ').trim().toLowerCase(); const r = e.getBoundingClientRect(); return t === alvo && r.width > 4 && r.height > 4; }).pop(); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; })()`);
          if (p) {
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: p.x, y: p.y }] });
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            await sleep(site.esperaPortao || 4200);
          }
        }
        await sleep(1500);
        if (site.esperaExtra) await sleep(site.esperaExtra);
        await cdp.eval(DISMISS);
        const dir = join(out, `_clip-${dispo}`);
        const parar = iniciarFilme(cdp, dir, dispo === "celular" ? 390 : 1280);
        await sleep(1800);
        const t0 = Date.now();
        while (Date.now() - t0 < 14000) {
          if (dispo === "computador") {
            for (let k = 0; k < 6; k++) {
              await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 100 });
              await sleep(120);
            }
            await sleep(650);
          } else {
            await rolarToque(cdp, W, H);
            await sleep(1500);
          }
        }
        await sleep(600);
        const quadros = await parar();
        rel[`clip-${dispo}`] = { quadros: quadros.length, ok: montarVideo(quadros, join(out, `clip-${dispo}.mp4`), dir) };
        rmSync(dir, { recursive: true, force: true });
      } catch (e) {
        rel[`erro-${dispo}`] = String(e);
      } finally {
        await stop();
      }
    }
    writeFileSync(join(out, "relatorio-clip.json"), JSON.stringify(rel, null, 1));
    log(`clipes prontos ${JSON.stringify([rel["clip-computador"]?.quadros, rel["clip-celular"]?.quadros])}`);
    return rel;
  }

  // ---------- modo fotos: só as páginas indicadas, computador e celular, para comparar o tratamento das fotos
  if (MODE === "fotos") {
    for (const [dispo, W, H] of [["d", 1440, 900], ["m", 390, 844]]) {
      const { cdp, stop } = await launch(W, H);
      try {
        await preparar(cdp, { width: W, height: H, mobile: dispo === "m" });
        for (const [nome, url] of Object.entries(site.pages || {})) {
          const st = await abrir(cdp, url);
          await sleep(3200);
          await cdp.eval(DISMISS);
          await sleep(1000);
          await cdp.eval(DISMISS);
          await sleep(400);
          rel[`${nome}-${dispo}`] = { url, status: st(), titulo: await cdp.eval("document.title") };
          await shot(cdp, join(out, `f-${nome}-${dispo}0.jpg`), null, 74);
          for (let i = 1; i <= 2; i++) {
            if (dispo === "d") {
              for (let moved = 0; moved < 720; moved += 120) {
                await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 120 });
                await sleep(60);
              }
            } else await rolarToque(cdp, W, H);
            await sleep(1000);
            await cdp.eval(DISMISS);
            await shot(cdp, join(out, `f-${nome}-${dispo}${i}.jpg`), null, 74);
          }
        }
      } catch (e) {
        rel.erro = String(e);
      } finally {
        await stop();
      }
    }
    writeFileSync(join(out, "relatorio-fotos.json"), JSON.stringify(rel, null, 1));
    log("fotos prontas");
    return rel;
  }

  // ---------- computador
  {
    const W = 1440, H = 900;
    const { cdp, stop } = await launch(W, H);
    try {
      await preparar(cdp, { width: W, height: H });
      const dirFilme = join(out, "_filme");
      let pararFilme = null;
      if (MODE === "deep") pararFilme = iniciarFilme(cdp, dirFilme);
      const status = await abrir(cdp, site.url);
      // A abertura: cinco quadros dos primeiros segundos (a-0 a a-4), antes de qualquer espera. Carregador e animação de
      // entrada já acabaram quando o d-00 é tirado; sem estes quadros, o estudo não vê como o site abre.
      let gasto = 0;
      for (const [i, espera] of [0, 350, 450, 600, 900].entries()) {
        await sleep(espera);
        gasto += espera;
        await shot(cdp, join(out, `a-${i}.jpg`), null, 60).catch(() => {});
      }
      await sleep(Math.max(0, (MODE === "deep" ? 3200 : 2600) - gasto));
      rel.status = status();
      const a1 = await cdp.eval(DISMISS);
      if (a1?.length) rel.acoes.push(...a1);
      await sleep(1500);
      const a1b = await cdp.eval(DISMISS);
      if (a1b?.length) rel.acoes.push(...a1b);
      await sleep(a1b?.length ? 2200 : 400);
      if (site.esperaExtra) await sleep(site.esperaExtra);
      rel.portao = await passarPortao(cdp, site, W, H);
      rel.med = await cdp.eval(MEDIR, 20000);
      const titulo = rel.med?.titulo || "";
      rel.bloqueado = (rel.status && rel.status >= 400) || BLOQUEIO.test(titulo) || (rel.med?.altura ?? 0) < 300;
      await shot(cdp, join(out, "d-00.jpg"));
      log(`aberto status=${rel.status} titulo="${titulo.slice(0, 50)}" altura=${rel.med?.altura} bloqueado=${rel.bloqueado}`);

      if (!rel.bloqueado) {
        // curva da rolagem: um clique de roda e a posição ao longo do tempo
        await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: W / 2, y: H / 2 });
        await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 240 });
        const curva = [];
        const t0 = Date.now();
        for (let i = 0; i < 12; i++) {
          curva.push([Date.now() - t0, Math.round((await cdp.eval("scrollY")) ?? -1)]);
          await sleep(110);
        }
        rel.rolagem = { curva };
        const fim = curva[curva.length - 1][1];
        const assenta = curva.find(([, y]) => Math.abs(y - fim) <= 2);
        rel.rolagem.assentaMs = assenta ? assenta[0] : null;
        rel.rolagem.andou = fim;

        // mega menu: hover no primeiro item do header
        const menuXY = await cdp.eval(`(() => {
          const h = document.querySelector('header') || document.querySelector('nav'); if (!h) return null;
          const c = [...h.querySelectorAll('a,button')].filter((a) => { const r = a.getBoundingClientRect(); const t=(a.innerText||'').trim(); return t.length>1 && t.length<22 && r.width>10 && r.height>5 && r.top>=0 && r.top<160; });
          if (!c.length) return null; const r = c[Math.min(1,c.length-1)].getBoundingClientRect(); return { x: r.left+r.width/2, y: r.top+r.height/2, t: c[Math.min(1,c.length-1)].innerText.trim() };
        })()`);
        await cdp.eval("window.scrollTo(0,0)");
        await sleep(600);

        if (MODE === "deep") {
          // ---- hover dos botões (filme em tempo real e quadros em câmera lenta)
          const ctas = (await cdp.eval(ACHAR_CTAS)) || [];
          rel.ctas = [];
          for (const c of ctas.slice(0, 5)) {
            const pos = await cdp.eval(`(() => { const el = document.querySelector('[data-sonda="${c.n}"]'); if (!el) return null; el.scrollIntoView({ block:'center' }); return true; })()`);
            if (!pos) continue;
            await sleep(1100);
            const r = await cdp.eval(`(() => { const el = document.querySelector('[data-sonda="${c.n}"]'); const r = el.getBoundingClientRect(); const topo = document.elementFromPoint(r.left+r.width/2, r.top+r.height/2); return { x:r.left, y:r.top, w:r.width, h:r.height, livre: !!topo && (el===topo||el.contains(topo)||topo.contains(el)) }; })()`);
            if (!r || r.y < 0 || r.y > H - 10) continue;
            await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 4, y: H - 4 });
            await sleep(450);
            const antes = await cdp.eval(RETRATO(c.n));
            const clip = { x: Math.max(0, r.x - 28), y: Math.max(0, r.y - 22), width: Math.min(W, r.w + 56), height: Math.min(H, r.h + 44), scale: 1 };
            await shot(cdp, join(out, `h-${c.n}-0.jpg`), clip, 82);
            await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.2 });
            await cdp.eval("if (window.gsap) window.gsap.globalTimeline.timeScale(0.2)");
            await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x + r.w / 2, y: r.y + r.h / 2 });
            for (let k = 1; k <= 5; k++) {
              await sleep(k === 1 ? 180 : 330);
              await shot(cdp, join(out, `h-${c.n}-${k}.jpg`), clip, 82);
            }
            await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
            await cdp.eval("if (window.gsap) window.gsap.globalTimeline.timeScale(1)");
            await sleep(1000);
            const dep = await cdp.eval(RETRATO(c.n));
            await shot(cdp, join(out, `h-${c.n}-6.jpg`), clip, 82);
            rel.ctas.push({ ...c, livre: r.livre, caixa: r, antes, mudou: diff(antes, dep) });
            await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 4, y: H - 4 });
            await sleep(500);
          }
          await cdp.eval("window.scrollTo(0,0)");
          await sleep(700);
        }

        if (menuXY) {
          await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: menuXY.x, y: menuXY.y });
          await sleep(1100);
          await shot(cdp, join(out, "d-menu.jpg"));
          rel.menuHover = menuXY.t;
          await cdp.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: W / 2, y: H - 6 });
          await sleep(500);
        }

        // ---- rolagem com roda de verdade, em ritmo de leitura
        const passos = MODE === "deep" ? 12 : 7;
        const alturaTotal = rel.med?.altura || 0;
        const passoPx = alturaTotal > H * (passos + 1) ? Math.round((alturaTotal - H) / passos / 120) * 120 : Math.round(H * 0.84 / 120) * 120;
        for (let i = 1; i <= passos; i++) {
          const antes = await cdp.eval("scrollY");
          for (let moved = 0; moved < passoPx; moved += 120) {
            await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 120 });
            await sleep(70);
          }
          await sleep(MODE === "deep" ? 1150 : 900);
          const aN = await cdp.eval(DISMISS);
          if (aN?.length) {
            rel.acoes.push(...aN);
            await sleep(500);
          }
          const depois = await cdp.eval("scrollY");
          await shot(cdp, join(out, `d-${String(i).padStart(2, "0")}.jpg`));
          if (depois === antes && i > 2) break;
        }
        rel.fimDaRolagem = await cdp.eval("scrollY");
        rel.med2 = await cdp.eval(`({ secoes: [...document.querySelectorAll('h2')].map((h) => (h.innerText||'').replace(/\\s+/g,' ').trim()).filter(Boolean).slice(0,30), links: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href))].slice(0,400).filter((h) => /(\\/(products?|product|p|item|items|lot|lots|watches?|watch|cars?|inventory|stock|vehicles?|listing|listings|shop|collections?)\\/)/i.test(h)).slice(0,30) })`);
      }

      if (pararFilme) {
        const quadros = await pararFilme();
        rel.filme = { quadros: quadros.length, ok: montarVideo(quadros, join(out, "filme-computador.mp4"), dirFilme) };
        rmSync(dirFilme, { recursive: true, force: true });
      }

      // ---- páginas extras
      if (MODE === "deep" && site.pages) {
        rel.paginas = {};
        for (const [nome, url] of Object.entries(site.pages)) {
          const pst = await abrir(cdp, url);
          await sleep(3000);
          await cdp.eval(DISMISS);
          await sleep(700);
          const m = await cdp.eval(MEDIR, 20000);
          rel.paginas[nome] = { url, status: pst(), titulo: m?.titulo, secoes: m?.secoes, tipo: m?.tipo, header: m?.header };
          await shot(cdp, join(out, `p-${nome}-00.jpg`));
          for (let i = 1; i <= 3; i++) {
            for (let moved = 0; moved < 720; moved += 120) {
              await cdp.send("Input.dispatchMouseEvent", { type: "mouseWheel", x: W / 2, y: H / 2, deltaX: 0, deltaY: 120 });
              await sleep(60);
            }
            await sleep(900);
            await shot(cdp, join(out, `p-${nome}-0${i}.jpg`));
          }
        }
      }
    } catch (e) {
      rel.erro = String(e);
      log(`erro computador: ${e}`);
    } finally {
      await stop();
    }
  }

  // ---------- celular (emulado)
  if (!rel.bloqueado) {
    const W = 390, H = 844;
    const { cdp, stop } = await launch(W, H);
    try {
      await preparar(cdp, { width: W, height: H, mobile: true });
      const dirFilme = join(out, "_filmeM");
      let pararFilme = null;
      if (MODE === "deep") pararFilme = iniciarFilme(cdp, dirFilme, 390);
      await abrir(cdp, site.url);
      await sleep(3000);
      await cdp.eval(DISMISS);
      await sleep(1400);
      await cdp.eval(DISMISS);
      await sleep(900);
      if (site.esperaExtra) await sleep(site.esperaExtra);
      if (site.portao) {
        const p = await cdp.eval(`(() => { const alvo = ${JSON.stringify(site.portao)}.toLowerCase(); const c = [...document.querySelectorAll('a,button,[role=button],div,span,p')].filter((e) => { const t = (e.innerText||'').replace(/\\s+/g,' ').trim().toLowerCase(); const r = e.getBoundingClientRect(); return t === alvo && r.width > 4 && r.height > 4; }).pop(); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; })()`);
        if (p) {
          await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: p.x, y: p.y }] });
          await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
          await sleep(site.esperaPortao || 4200);
        }
      }
      await shot(cdp, join(out, "m-00.jpg"), null, 68);
      rel.celular = await cdp.eval(`({ overflow: document.documentElement.scrollWidth - innerWidth, altura: document.documentElement.scrollHeight, header: (() => { const h = document.querySelector('header')||document.querySelector('nav'); if (!h) return null; const s = getComputedStyle(h); const r = h.getBoundingClientRect(); return { pos: s.position, alt: Math.round(r.height) }; })() })`);
      const passos = MODE === "deep" ? 8 : 3;
      for (let i = 1; i <= passos; i++) {
        await rolarToque(cdp, W, H);
        await sleep(900);
        await cdp.eval(DISMISS);
        await shot(cdp, join(out, `m-${String(i).padStart(2, "0")}.jpg`), null, 68);
      }
      if (pararFilme) {
        const quadros = await pararFilme();
        rel.filmeCelular = { quadros: quadros.length, ok: montarVideo(quadros, join(out, "filme-celular.mp4"), dirFilme) };
        rmSync(dirFilme, { recursive: true, force: true });
      }
      if (MODE === "deep") {
        await cdp.eval("window.scrollTo(0,0)");
        await sleep(700);
        const m = await cdp.eval(`(() => {
          const c = [...document.querySelectorAll('button,a,[role=button]')].find((e) => { const t=((e.getAttribute('aria-label')||'')+' '+(e.className.baseVal ?? e.className)+' '+(e.innerText||'')).toLowerCase(); const r=e.getBoundingClientRect(); return /menu|burger|hamburger|nav-toggle|navigation/.test(t) && r.width>8 && r.top>=0 && r.top<130; });
          if (!c) return null; const r = c.getBoundingClientRect(); return { x:r.left+r.width/2, y:r.top+r.height/2 };
        })()`);
        if (m) {
          await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: m.x, y: m.y }] });
          await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
          await sleep(1200);
          await shot(cdp, join(out, "m-menu.jpg"), null, 68);
        }
        if (site.pages) {
          for (const [nome, url] of Object.entries(site.pages)) {
            await abrir(cdp, url);
            await sleep(2800);
            await cdp.eval(DISMISS);
            await sleep(600);
            await shot(cdp, join(out, `q-${nome}-00.jpg`), null, 68);
            for (let i = 1; i <= 2; i++) {
              await rolarToque(cdp, W, H);
              await sleep(800);
              await shot(cdp, join(out, `q-${nome}-0${i}.jpg`), null, 68);
            }
          }
        }
      }
    } catch (e) {
      rel.erroCelular = String(e);
      log(`erro celular: ${e}`);
    } finally {
      await stop();
    }
  }

  writeFileSync(join(out, "relatorio.json"), JSON.stringify(rel, null, 1));
  log(`pronto${rel.bloqueado ? " (BLOQUEADO)" : ""}`);
  return rel;
}

const sites = JSON.parse(readFileSync(listPath, "utf8")).filter((s) => !ONLY || ONLY.includes(s.slug));
const fila = [...sites];
const resumo = [];
async function trabalhador() {
  while (fila.length) {
    const s = fila.shift();
    const limite = new Promise((res) => setTimeout(() => res({ slug: s.slug, erro: "tempo esgotado" }), MODE === "deep" ? 720000 : 170000));
    try {
      resumo.push(await Promise.race([roda(s), limite]));
    } catch (e) {
      console.error(`[${s.slug}] falhou: ${e}`);
      resumo.push({ slug: s.slug, erro: String(e) });
    }
  }
}
await Promise.all(Array.from({ length: Math.min(CONC, sites.length) }, trabalhador));
console.log(JSON.stringify(resumo.map((r) => ({ slug: r.slug, status: r.status, bloqueado: r.bloqueado, erro: r.erro, titulo: r.med?.titulo?.slice(0, 40) }))));
process.exit(0);
