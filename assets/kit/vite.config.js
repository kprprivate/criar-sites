import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { hoverSoComMouse } from "./tools/hover-so-com-mouse.js";
import { partesDaCasca } from "./tools/partes-da-casca.js";
import { rotas } from "./tools/rotas.js";

// Cada .html da raiz é uma página do site.
const paginas = Object.fromEntries(
  readdirSync(process.cwd())
    .filter((n) => n.endsWith(".html"))
    .map((n) => [n.replace(".html", ""), resolve(process.cwd(), n)]),
);

export default defineConfig({
  appType: "mpa",
  plugins: [rotas(), partesDaCasca()],
  server: { host: "127.0.0.1", port: {{PORTA}}, strictPort: true },
  preview: { host: "127.0.0.1", port: {{PORTA_PREVIEW}}, strictPort: true },
  css: { postcss: { plugins: [hoverSoComMouse()] } },
  build: { rollupOptions: { input: paginas } },
});
