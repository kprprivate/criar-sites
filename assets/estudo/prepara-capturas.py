# Gera as imagens e os filmes do dossiê a partir do que a sonda capturou. Só pesa o que vai para a página.
#   python -I prepara-capturas.py <lista.json> <pasta-da-sonda> <pasta-saida>
# lista.json:
# {
#   "imagens": [{ "de": "slug/d-00.jpg", "nome": "slug-abertura", "largura": 1200, "recorte": [0, 0, 1, 0.8] }],
#   "faixas":  [{ "slug": "slug", "botao": 3, "nome": "h-slug-botao", "quadros": [0, 1, 2, 3, 6] }],
#   "filmes":  ["slug"]
# }
# "de" começando em caminho absoluto usa o arquivo direto (captura feita no Chrome real). "recorte" é opcional, em fração da imagem.
# "faixas" junta os quadros do hover em câmera lenta numa tira só. "filmes" copia clip-computador.mp4 e clip-celular.mp4.
import json
import os
import shutil
import sys

from PIL import Image

lista, P, S = json.load(open(sys.argv[1], encoding="utf-8")), sys.argv[2], sys.argv[3]
os.makedirs(os.path.join(S, "capturas"), exist_ok=True)
os.makedirs(os.path.join(S, "filmes"), exist_ok=True)
total = 0
falta = []


def sem_barra(im, de):
    # Captura de computador com a barra de rolagem do site (a sonda mede em relatorio.json): ela sai da imagem.
    if os.path.isabs(de) or im.width != 1440:
        return im
    rel = os.path.join(P, de.split("/")[0], "relatorio.json")
    barra = (json.load(open(rel, encoding="utf-8")).get("med") or {}).get("larguraBarra") or 0 if os.path.exists(rel) else 0
    return im.crop((0, 0, im.width - barra, im.height)) if barra else im


def salva(im, nome, q=74):
    d = os.path.join(S, "capturas", nome + ".webp")
    im.save(d, "WEBP", quality=q, method=5)
    return os.path.getsize(d)


for item in lista.get("imagens", []):
    de = item["de"]
    p = de if os.path.isabs(de) else os.path.join(P, de)
    if not os.path.exists(p):
        falta.append(de)
        continue
    im = sem_barra(Image.open(p).convert("RGB"), de)
    if item.get("recorte"):
        x0, y0, x1, y1 = item["recorte"]
        im = im.crop((int(im.width * x0), int(im.height * y0), int(im.width * x1), int(im.height * y1)))
    w = item.get("largura", 1000)
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    total += salva(im, item["nome"])

for f in lista.get("faixas", []):
    ims = [Image.open(c).convert("RGB") for c in (os.path.join(P, f["slug"], f'h-{f["botao"]}-{k}.jpg') for k in f["quadros"]) if os.path.exists(c)]
    if not ims:
        falta.append(f'{f["slug"]}-h{f["botao"]}')
        continue
    gap = 6
    faixa = Image.new("RGB", (sum(i.width for i in ims) + gap * (len(ims) - 1), ims[0].height), (120, 120, 120))
    x = 0
    for i in ims:
        faixa.paste(i, (x, 0))
        x += i.width + gap
    if faixa.width > 1100:
        faixa = faixa.resize((1100, round(faixa.height * 1100 / faixa.width)), Image.LANCZOS)
    total += salva(faixa, f["nome"], 82)

for slug in lista.get("filmes", []):
    for dispo in ("computador", "celular"):
        p = os.path.join(P, slug, f"clip-{dispo}.mp4")
        if os.path.exists(p):
            d = os.path.join(S, "filmes", f"{slug}-{dispo}.mp4")
            shutil.copyfile(p, d)
            total += os.path.getsize(d)
        else:
            falta.append(f"{slug}-clip-{dispo}")

print("total MB", round(total / 1024 / 1024, 1))
print("falta", falta)
