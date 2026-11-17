# Usa o recorte do Codex só como MOLDE: alinha com a foto original, refina a borda na foto real e compõe os PIXELS ORIGINAIS do produto sobre fundos novos.
# O produto final é a foto real. O gerador de imagem nunca entrega a superfície do produto, porque ele reinventa a textura.
# Entrada: <pasta>/originais/<nome>.jpg e <pasta>/recorte-<nome>.png (o produto sobre verde chapado). Saída: <pasta>/saida/<nome>-recorte.png, com transparência.
#   python -I composicao.py <pasta> <nome> [--preto]
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
from skimage import feature, measure, transform, segmentation

pasta, nome = sys.argv[1], sys.argv[2]
preto = "--preto" in sys.argv
os.makedirs(os.path.join(pasta, "saida"), exist_ok=True)
ori_im = Image.open(os.path.join(pasta, "originais", nome + ".jpg")).convert("RGB")
ai_im = Image.open(os.path.join(pasta, "recorte-" + nome + ".png")).convert("RGB")
ai = np.asarray(ai_im).astype(float) / 255

# 1. Molde pelo verde do Codex
g_dom = ai[..., 1] - np.maximum(ai[..., 0], ai[..., 2])
molde_ai = g_dom < .28
molde_ai = ndi.binary_opening(molde_ai, iterations=1)
rot, n = ndi.label(molde_ai)
if n > 1:
    tam = ndi.sum(molde_ai, rot, range(1, n + 1))
    molde_ai = np.isin(rot, 1 + np.where(tam > tam.max() * .02)[0])
# Fecha só furinhos: o vão entre o braço e o corpo é fundo de verdade e precisa continuar aberto
buracos, n_b = ndi.label(~molde_ai)
if n_b:
    tam_b = ndi.sum(~molde_ai, buracos, range(1, n_b + 1))
    pequenos = np.isin(buracos, 1 + np.where(tam_b < 900)[0])
    molde_ai = molde_ai | pequenos

# 2. Alinha a imagem do Codex com a foto original (transformação de semelhança, por pontos em comum)
L = 900
ori_p = ori_im.resize((L, round(ori_im.height * L / ori_im.width)), Image.LANCZOS)
cinza_o = np.asarray(ori_p.convert("L")).astype(float) / 255
LA = 760
esc_ai = LA / ai_im.width
ai_p = ai_im.resize((LA, round(ai_im.height * esc_ai)), Image.LANCZOS)
cinza_a = np.asarray(ai_p.convert("L")).astype(float) / 255
molde_a_p = np.asarray(Image.fromarray(molde_ai.astype("uint8") * 255).resize(ai_p.size)) > 127
cinza_a_m = cinza_a * molde_a_p

orb_o = feature.ORB(n_keypoints=3500, fast_threshold=.03, downscale=1.25, n_scales=9)
orb_a = feature.ORB(n_keypoints=3500, fast_threshold=.03, downscale=1.25, n_scales=9)
# Contraste local: é o que permite achar pontos em comum nos produtos escuros
from skimage import exposure

orb_o.detect_and_extract(exposure.equalize_adapthist(cinza_o, clip_limit=.03))
orb_a.detect_and_extract(exposure.equalize_adapthist(cinza_a, clip_limit=.03) * molde_a_p)
par = feature.match_descriptors(orb_a.descriptors, orb_o.descriptors, cross_check=True, max_ratio=.9)
src = orb_a.keypoints[par[:, 0]][:, ::-1]
dst = orb_o.keypoints[par[:, 1]][:, ::-1]
modelo, dentro = measure.ransac((src, dst), transform.SimilarityTransform, min_samples=3, residual_threshold=6, max_trials=6000, rng=7)
print(nome, "pares", len(par), "inliers", int(dentro.sum()), "escala", round(modelo.scale, 3), "desloc", np.round(modelo.translation, 1))

# Afinar: pequena busca em volta, medindo a coincidência entre a borda do molde e a foto
molde_warp = transform.warp(molde_a_p.astype(float), modelo.inverse, output_shape=cinza_o.shape, order=1) > .5


def nota(m):
    borda = m ^ ndi.binary_erosion(m, iterations=2)
    gx, gy = ndi.sobel(cinza_o, 1), ndi.sobel(cinza_o, 0)
    return float(np.hypot(gx, gy)[borda].mean())


melhor, melhor_n = modelo, nota(molde_warp)
for ds in (-.015, -.0075, 0, .0075, .015):
    for dx in (-6, -3, 0, 3, 6):
        for dy in (-6, -3, 0, 3, 6):
            t = transform.SimilarityTransform(scale=modelo.scale * (1 + ds), rotation=modelo.rotation, translation=(modelo.translation[0] + dx, modelo.translation[1] + dy))
            m = transform.warp(molde_a_p.astype(float), t.inverse, output_shape=cinza_o.shape, order=1) > .5
            v = nota(m)
            if v > melhor_n:
                melhor, melhor_n = t, v
modelo = melhor
print(nome, "refino nota", round(melhor_n, 3), "escala", round(modelo.scale, 3))
molde = transform.warp(molde_a_p.astype(float), modelo.inverse, output_shape=cinza_o.shape, order=1) > .5

# 3. Refina a borda na foto real: passeio aleatório com sementes a partir do molde
if "--refina" in sys.argv:
    FOLGA = 3
    certo_dentro = ndi.binary_erosion(molde, iterations=FOLGA)
    certo_fora = ~ndi.binary_dilation(molde, iterations=FOLGA)
    sem = np.zeros(cinza_o.shape, int)
    sem[certo_dentro] = 1
    sem[certo_fora] = 2
    rgb_o = np.asarray(ori_p).astype(float) / 255
    yy, xx = np.where(molde)
    y0, y1, x0, x1 = max(0, yy.min() - 20), min(cinza_o.shape[0], yy.max() + 20), max(0, xx.min() - 20), min(cinza_o.shape[1], xx.max() + 20)
    prob = np.zeros(cinza_o.shape)
    prob[certo_dentro] = 1
    rec = segmentation.random_walker(rgb_o[y0:y1, x0:x1], sem[y0:y1, x0:x1], beta=60, mode="cg_j", channel_axis=-1, return_full_prob=True)
    prob[y0:y1, x0:x1] = rec[0]
    alfa_p = ndi.gaussian_filter((prob > .5).astype(float), 1.0)
else:
    # O contorno do Codex é limpo: usa direto, um pixel para dentro, com a borda suave
    m = ndi.binary_erosion(molde, iterations=1)
    alfa_p = ndi.gaussian_filter(m.astype(float), 1.1)

# 4. Volta para o tamanho final. O produto sai com pixels originais.
SAIDA_L = 1200
ori_f = ori_im.resize((SAIDA_L, round(ori_im.height * SAIDA_L / ori_im.width)), Image.LANCZOS)
alfa = Image.fromarray((alfa_p * 255).astype("uint8")).resize(ori_f.size, Image.BICUBIC)
peca = np.asarray(ori_f).astype(float) / 255
a = np.asarray(alfa).astype(float) / 255

if preto:
    # Só em produto preto (--preto): abre as sombras para os relevos aparecerem. Curva suave, sem mudar a cor.
    lum = peca.mean(axis=2, keepdims=True)
    ganho = 1 + 1.15 * np.exp(-lum / .16)
    peca = np.clip(peca * ganho + .018, 0, 1)

# Corta o que não é produto, em fração da altura (--topo 0.1)
if "--topo" in sys.argv:
    corte = float(sys.argv[sys.argv.index("--topo") + 1])
    a[: int(a.shape[0] * corte)] = 0

# Retoque manual: polígonos em coordenadas da imagem final (1200 px de largura), para o que sobrou do fundo (--tira)
if "--tira" in sys.argv:
    from PIL import ImageDraw

    mk = Image.new("L", (a.shape[1], a.shape[0]), 0)
    dr = ImageDraw.Draw(mk)
    for pol in sys.argv[sys.argv.index("--tira") + 1].split(";"):
        dr.polygon([tuple(map(float, p.split(","))) for p in pol.split()], fill=255)
    a = a * (1 - ndi.gaussian_filter(np.asarray(mk).astype(float) / 255, 1.0))

# Retoque manual ao contrário (--poe): devolve ao produto o que o molde cortou (polígonos na mesma escala), com os pixels da foto.
if "--poe" in sys.argv:
    from PIL import ImageDraw

    mk = Image.new("L", (a.shape[1], a.shape[0]), 0)
    dr = ImageDraw.Draw(mk)
    for pol in sys.argv[sys.argv.index("--poe") + 1].split(";"):
        dr.polygon([tuple(map(float, p.split(","))) for p in pol.split()], fill=255)
    a = np.maximum(a, ndi.gaussian_filter(np.asarray(mk).astype(float) / 255, 1.0))

# Só em produto sem cor (--neutro): tira a luz amarelada do ambiente. O produto não muda; muda a luz.
if "--neutro" in sys.argv:
    from skimage.color import lab2rgb, rgb2lab

    lab = rgb2lab(peca)
    amarelo = np.clip((lab[..., 2] - 3) / 10, 0, 1)
    k = 1 - .78 * amarelo
    lab[..., 1] *= k
    lab[..., 2] *= k
    peca = np.clip(lab2rgb(lab), 0, 1)

# Remove a contaminação do fundo na borda: leva a cor da borda para a do interior próximo
borda = (a > .02) & (a < .98)
interior = a >= .98
if interior.any():
    ind = ndi.distance_transform_edt(~interior, return_distances=False, return_indices=True)
    cor_int = peca[ind[0], ind[1]]
    mistura = np.where(borda[..., None], cor_int, peca)
    peca = mistura

rgba = np.dstack([peca, a])
Image.fromarray((rgba * 255).astype("uint8"), "RGBA").save(os.path.join(pasta, "saida", nome + "-recorte.png"))
print(nome, "ok", ori_f.size)
