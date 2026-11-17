// O guia publicado usa os mesmos marca.css e marca.js do site. Eles vão para docs/guia/ antes de publicar: uma fonte só, em src/.
import { copyFileSync } from "node:fs";

copyFileSync("src/css/marca.css", "docs/guia/marca.css");
copyFileSync("src/js/marca.js", "docs/guia/marca.js");
console.log("docs/guia/marca.css e marca.js atualizados.");
