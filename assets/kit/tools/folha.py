# Junta capturas numa folha só, com o nome de cada uma, para olhar muitas de uma vez.
#   python -I tools/folha.py <pasta> <largura da janela, ex.: 360> <saida.jpg> [colunas] [largura do quadro] [prefixos: home,sobre]
# Passar nos testes não dispensa olhar: foi numa folha assim que apareceu o defeito que todos os testes deixavam passar.
import os
import sys

from PIL import Image, ImageDraw

pasta, sufixo, saida = sys.argv[1], sys.argv[2], sys.argv[3]
colunas = int(sys.argv[4]) if len(sys.argv) > 4 else 8
quadro = int(sys.argv[5]) if len(sys.argv) > 5 else 200
arquivos = sorted(f for f in os.listdir(pasta) if f.endswith(f"-{sufixo}.jpg"))
if len(sys.argv) > 6:
    filtro = sys.argv[6].split(",")
    arquivos = [f for f in arquivos if any(f.startswith(x) for x in filtro)]
if not arquivos:
    sys.exit(f"Nenhuma captura terminada em -{sufixo}.jpg em {pasta}")
imgs = []
for f in arquivos:
    im = Image.open(os.path.join(pasta, f)).convert("RGB")
    imgs.append((f.rsplit("-", 1)[0], im.resize((quadro, round(im.height * quadro / im.width)), Image.LANCZOS)))
alto = max(i.height for _, i in imgs) + 18
linhas = (len(imgs) + colunas - 1) // colunas
folha = Image.new("RGB", (colunas * (quadro + 8), linhas * (alto + 8)), (120, 120, 120))
d = ImageDraw.Draw(folha)
for k, (nome, im) in enumerate(imgs):
    x, y = (k % colunas) * (quadro + 8) + 4, (k // colunas) * (alto + 8) + 4
    d.text((x + 2, y + 2), nome, fill=(255, 255, 0))
    folha.paste(im, (x, y + 18))
folha.save(saida, quality=80)
print(len(imgs), "capturas", folha.size, saida)
