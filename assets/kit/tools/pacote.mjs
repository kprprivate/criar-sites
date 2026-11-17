// Empacota o dist/ em .publica/site.tar.gz e mostra o sha256 para conferir no servidor. Apagar .publica/ depois de enviar.
// Caminho relativo de propósito: no Windows, o tar lê "C:/..." como endereço de outra máquina.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";

if (!existsSync("dist/index.html")) {
  console.error("Falta o build: rode npm run build.");
  process.exit(1);
}
mkdirSync(".publica", { recursive: true });
const r = spawnSync("tar", ["-czf", ".publica/site.tar.gz", "-C", "dist", "."], { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status || 1);
const pacote = readFileSync(".publica/site.tar.gz");
console.log(`.publica/site.tar.gz  ${(statSync(".publica/site.tar.gz").size / 1024 / 1024).toFixed(1)} MB`);
console.log(`sha256 ${createHash("sha256").update(pacote).digest("hex")}`);
