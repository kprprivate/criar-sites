# Prepara imagens do site em AVIF e WebP, nas larguras que as páginas pedem. Originais ficam fora do site.
#   python -I tools/imagens.py <arquivo ou pasta de origem> <pasta de destino em public/img> [larguras: 640,1280] [--fundo #FFFFFF]
# Sai <nome>-<largura>.avif e .webp. Só reduz: nunca aumenta uma imagem. --fundo achata transparência sobre uma cor.
import os
import sys

from PIL import Image

args = [a for a in sys.argv[1:]]
fundo = None
if "--fundo" in args:
    i = args.index("--fundo")
    fundo = args[i + 1]
    del args[i : i + 2]
if len(args) < 2:
    sys.exit(__doc__ or "uso: imagens.py <origem> <destino> [larguras] [--fundo #RRGGBB]")
origem, destino = args[0], args[1]
larguras = [int(x) for x in args[2].split(",")] if len(args) > 2 else [640, 1280]
os.makedirs(destino, exist_ok=True)

arquivos = [origem] if os.path.isfile(origem) else [os.path.join(origem, n) for n in sorted(os.listdir(origem)) if n.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))]
for c in arquivos:
    nome = os.path.splitext(os.path.basename(c))[0]
    im = Image.open(c)
    if fundo:
        base = Image.new("RGBA", im.size, fundo)
        base.alpha_composite(im.convert("RGBA"))
        im = base.convert("RGB")
    elif im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA" if "transparency" in im.info else "RGB")
    for l in larguras:
        if l > im.width * 1.05:
            continue
        menor = im.resize((l, round(im.height * l / im.width)), Image.LANCZOS) if l < im.width else im
        saida = os.path.join(destino, f"{nome}-{l}")
        menor.save(saida + ".webp", "WEBP", quality=78, method=6)
        menor.save(saida + ".avif", "AVIF", quality=52, speed=5)
        print(os.path.basename(saida), menor.size, os.path.getsize(saida + ".avif") // 1024, "KB avif", os.path.getsize(saida + ".webp") // 1024, "KB webp")
