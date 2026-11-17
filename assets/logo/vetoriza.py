# Redesenha um logo em curvas limpas a partir do maior PNG que existir. Sem traçado automático: poucos nós, retas exatas.
#   python -I vetoriza.py <logo.png> <saida.svg> [tolerância da curva: 1.6] [tolerância da reta: 1.1] [--altura 250] [--escuro]
# Método: contorno com precisão de subpixel, cantos pelo ângulo, retas onde o contorno é reto e Bézier de Schneider no resto.
# Usa o canal alfa; sem transparência, a forma é o que for escuro sobre claro (--escuro inverte: logo claro sobre fundo escuro).
# Sai também <saida>.confere.png: o desenho novo em vermelho sobre o original em cinza. Olhar antes de usar.
# Este é o primeiro passo. Depois vêm as decisões de desenho, feitas à mão sobre os nós: o que era quase reto fica reto,
# o que era quase paralelo fica paralelo, cantos viram o encontro exato das tangentes (references/padrao-visual.md).
import os
import re
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from skimage import measure

args = list(sys.argv[1:])
inverte = "--escuro" in args
if inverte:
    args.remove("--escuro")
ALTURA = 250.0
if "--altura" in args:
    i = args.index("--altura")
    ALTURA = float(args[i + 1])
    del args[i : i + 2]
if len(args) < 2:
    sys.exit("uso: vetoriza.py <logo.png> <saida.svg> [tol_curva] [tol_reta] [--altura 250] [--escuro]")
FONTE, SAIDA = args[0], args[1]
TOL_CURVA = float(args[2]) if len(args) > 2 else 1.6
TOL_RETA = float(args[3]) if len(args) > 3 else 1.1


def carrega():
    im = Image.open(FONTE).convert("RGBA")
    rgba = np.asarray(im, dtype=float) / 255
    if rgba[..., 3].min() < 0.95:
        a = rgba[..., 3]
    else:
        lum = rgba[..., :3].mean(axis=2)
        a = lum if inverte else 1 - lum
    ys, xs = np.where(a > 0.5)
    if not len(ys):
        sys.exit("Nenhuma forma encontrada: tente --escuro.")
    m = 12
    y0, y1, x0, x1 = max(0, ys.min() - m), ys.max() + m, max(0, xs.min() - m), xs.max() + m
    a = a[y0:y1, x0:x1]
    return ndi.gaussian_filter(a, 0.8), (x0, y0)


def reamostra(p, passo=1.0):
    d = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
    n = int(d[-1] / passo)
    t = np.linspace(0, d[-1], n, endpoint=False)
    return np.c_[np.interp(t, d, p[:, 0]), np.interp(t, d, p[:, 1])]


def cantos(p, janela=7, limite=26):
    n = len(p)
    u = p - p[(np.arange(n) - janela) % n]
    v = p[(np.arange(n) + janela) % n] - p
    ang = np.degrees(np.abs(np.arctan2(u[:, 0] * v[:, 1] - u[:, 1] * v[:, 0], (u * v).sum(1))))
    picos = []
    for i in np.argsort(-ang):
        if ang[i] < limite:
            break
        if all(min((i - j) % n, (j - i) % n) > janela * 1.6 for j in picos):
            picos.append(i)
    return sorted(picos)


# ---------- Ajuste de Bézier pelo método de Schneider ----------
def bez(c, t):
    t = np.asarray(t)[..., None]
    return (1 - t) ** 3 * c[0] + 3 * (1 - t) ** 2 * t * c[1] + 3 * (1 - t) * t**2 * c[2] + t**3 * c[3]


def bez1(c, t):
    t = np.asarray(t)[..., None]
    return 3 * (1 - t) ** 2 * (c[1] - c[0]) + 6 * (1 - t) * t * (c[2] - c[1]) + 3 * t**2 * (c[3] - c[2])


def bez2(c, t):
    t = np.asarray(t)[..., None]
    return 6 * (1 - t) * (c[2] - 2 * c[1] + c[0]) + 6 * t * (c[3] - 2 * c[2] + c[1])


def gera(p, u, t1, t2):
    b0, b1, b2, b3 = (1 - u) ** 3, 3 * u * (1 - u) ** 2, 3 * u**2 * (1 - u), u**3
    A1, A2 = t1[None] * b1[:, None], t2[None] * b2[:, None]
    C = np.array([[(A1 * A1).sum(), (A1 * A2).sum()], [(A1 * A2).sum(), (A2 * A2).sum()]])
    tmp = p - (p[0][None] * (b0 + b1)[:, None] + p[-1][None] * (b2 + b3)[:, None])
    X = np.array([(A1 * tmp).sum(), (A2 * tmp).sum()])
    seg = np.hypot(*(p[-1] - p[0]))
    al1, al2 = np.linalg.solve(C, X) if abs(np.linalg.det(C)) > 1e-9 else (0, 0)
    if al1 < 1e-6 * seg or al2 < 1e-6 * seg:
        al1 = al2 = seg / 3
    return np.array([p[0], p[0] + t1 * al1, p[-1] + t2 * al2, p[-1]])


def reparam(c, p, u):
    d, d1, d2 = bez(c, u) - p, bez1(c, u), bez2(c, u)
    num, den = (d * d1).sum(1), (d1 * d1).sum(1) + (d * d2).sum(1)
    return np.clip(u - np.where(np.abs(den) > 1e-9, num / den, 0), 0, 1)


def erro(c, p, u):
    d = np.hypot(*(bez(c, u) - p).T)
    i = int(np.argmax(d))
    return d[i], i


def tang(p, i, k=7, sentido=1):
    v = p[np.clip(i + sentido * k, 0, len(p) - 1)] - p[i]
    return v / (np.hypot(*v) + 1e-9)


def ajusta(p, t1, t2, tol):
    if len(p) < 3:
        s = np.hypot(*(p[-1] - p[0])) / 3
        return [np.array([p[0], p[0] + t1 * s, p[-1] + t2 * s, p[-1]])]
    d = np.r_[0, np.cumsum(np.hypot(*np.diff(p, axis=0).T))]
    u = d / d[-1]
    c = gera(p, u, t1, t2)
    e, i = erro(c, p, u)
    if e < tol:
        return [c]
    if e < tol * 6:
        for _ in range(16):
            u = reparam(c, p, u)
            c = gera(p, u, t1, t2)
            e, i = erro(c, p, u)
            if e < tol:
                return [c]
    i = int(np.clip(i, 3, len(p) - 4))
    k = min(8, i, len(p) - 1 - i)
    tc = p[i - k] - p[i + k]
    tc = tc / (np.hypot(*tc) + 1e-9)
    return ajusta(p[: i + 1], t1, tc, tol) + ajusta(p[i:], -tc, t2, tol)


def trecho_reto(q, tol):
    a, b = q[0], q[-1]
    L = np.hypot(*(b - a))
    if L < 8:
        return True
    n = np.array([-(b - a)[1], (b - a)[0]]) / L
    return np.abs((q - a) @ n).max() < tol


def vetoriza(alfa):
    saida = []
    for c in measure.find_contours(alfa, 0.5):
        if len(c) < 40:
            continue
        p = reamostra(c[:, ::-1], 1.0)
        ids = cantos(p) or [0]
        segs = []
        for k, i in enumerate(ids):
            j = ids[(k + 1) % len(ids)]
            q = p[np.arange(i, j + 1 if j > i else j + len(p) + 1) % len(p)]
            if trecho_reto(q, TOL_RETA):
                segs.append(("L", q[0], q[-1]))
            else:
                for b in ajusta(q, tang(q, 0), tang(q, len(q) - 1, sentido=-1), TOL_CURVA):
                    segs.append(("C", b))
        saida.append(segs)
    return saida


def fmt(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return s if s != "-0" else "0"


alfa, _ = carrega()
contornos = vetoriza(alfa)
esc = ALTURA / alfa.shape[0]
d = []
nos = 0
for segs in contornos:
    ini = segs[0][1] if segs[0][0] == "L" else segs[0][1][0]
    d.append(f"M{fmt(ini[0]*esc)} {fmt(ini[1]*esc)}")
    for s in segs:
        nos += 1
        if s[0] == "L":
            d.append(f"L{fmt(s[2][0]*esc)} {fmt(s[2][1]*esc)}")
        else:
            d.append("C" + " ".join(f"{fmt(x)} {fmt(y)}" for x, y in (s[1] * esc)[1:]))
    d.append("Z")
caminho = "".join(d)
w, h = alfa.shape[1] * esc, alfa.shape[0] * esc
open(SAIDA, "w", encoding="utf-8").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}"><path fill-rule="evenodd" d="{caminho}"/></svg>\n')
print(f"{len(contornos)} contornos, {nos} trechos, {len(caminho)} bytes: {SAIDA}")

# Conferência: o desenho novo, em vermelho, sobre o original.
ver = Image.fromarray((255 - alfa * 150).clip(0, 255).astype("uint8")).convert("RGB")
pen = ImageDraw.Draw(ver)
for segs in contornos:
    for s in segs:
        if s[0] == "L":
            pen.line([tuple(s[1]), tuple(s[2])], fill=(230, 0, 0), width=2)
        else:
            pen.line([tuple(x) for x in bez(s[1], np.linspace(0, 1, 24))], fill=(230, 0, 0), width=2)
    for s in segs:
        fim = s[2] if s[0] == "L" else s[1][3]
        pen.ellipse([fim[0] - 4, fim[1] - 4, fim[0] + 4, fim[1] + 4], outline=(0, 90, 255), width=2)
ver.save(SAIDA + ".confere.png")
