// Gera favicon-32.png e favicon-180.png (apple-touch-icon) do mesmo public/img/favicon.svg, no Chrome.
// Rodar depois de trocar o favicon pelo logo de verdade.
import { readFileSync, writeFileSync } from "node:fs";
import { abre } from "./olhar.mjs";

const svg = readFileSync("public/img/favicon.svg", "utf8");
for (const n of [32, 180]) {
  const j = await abre({ w: n, h: n, saida: ".capturas" });
  await j.ir(`data:text/html;charset=utf-8,${encodeURIComponent(`<!doctype html><style>html,body{margin:0}svg{display:block;width:${n}px;height:${n}px}</style>${svg}`)}`, { espera: 200 });
  const r = await j.cmd("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: n, height: n, scale: 1 }, captureBeyondViewport: true });
  writeFileSync(`public/img/favicon-${n}.png`, Buffer.from(r.data, "base64"));
  await j.fecha();
  console.log(`public/img/favicon-${n}.png`);
}
