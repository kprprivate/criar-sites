// Lista o que ainda é provisório: todo texto do kit a preencher vem marcado com [[assim]].
// Roda antes de empacotar. Com pendência, o pacote não sai: use `node tools/pacote.mjs` direto só se for de propósito.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PASTAS = [".", "src", "public"];
const FORA = /^(node_modules|dist|docs|deploy|tools|\.capturas|\.publica)$/;
const achados = [];

function olha(pasta, recursivo) {
  for (const n of readdirSync(pasta)) {
    const c = join(pasta, n);
    if (statSync(c).isDirectory()) {
      if (recursivo && !FORA.test(n)) olha(c, true);
      continue;
    }
    if (!/\.(html|css|js|json|svg)$/.test(n) || n === "package-lock.json") continue;
    readFileSync(c, "utf8").split("\n").forEach((linha, i) => {
      for (const m of linha.matchAll(/\[\[[^\]\n]{1,120}\]\]/g)) achados.push(`${c}:${i + 1}  ${m[0]}`);
    });
  }
}
PASTAS.forEach((p, i) => olha(p, i > 0));

if (achados.length) {
  console.log(achados.join("\n"));
  console.log(`\n${achados.length} pendências [[...]]. Resolver antes de publicar.`);
  process.exitCode = 1;
} else console.log("Nenhum texto provisório.");
