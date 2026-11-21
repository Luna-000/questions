#!/usr/bin/env python3
"""Self-cafe cloud-monitor layout studies.

Renders PNG (the look), vector PDF, and PPTX (editable in Canva).
Sample copy and prices are placeholders.
"""

from __future__ import annotations

import html
import subprocess
import sys
from pathlib import Path

from lxml import etree
from PIL import Image, ImageDraw, ImageFont
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Pt
from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT / "fonts"
HTML_DIR = ROOT / "html"
PNG_DIR = ROOT / "png"
PDF_DIR = ROOT / "pdf"
PPTX_DIR = ROOT / "pptx"

# px -> PowerPoint point. Slide aspect matches the monitor.
SCALE = 0.5

PAPER = "#F3EEE6"
PAPER_DEEP = "#E4DCD0"
INK = "#1A1714"
NIGHT = "#12110F"
CREAM = "#F6F2EB"
STONE = "#665E56"
STONE_SOFT = "#8A8178"
BRASS = "#8A6B3D"
LINE = "#D2C8BB"
PHOTO = "#D3C9BD"
CREAM_INK = "#E7E1D6"
MUTED = "#B7AA9C"

W_P, H_P = 1080, 1920
W_L, H_L = 1920, 1080


def T(x, y, w, h, text, font, size, color, align="left", weight=400, tracking=0, lh=1.15, valign="top"):
    return ("T", x, y, w, h, text, font, size, color, align, weight, tracking, lh, valign)


def R(x, y, w, h, fill, stroke=None, sw=1):
    return ("R", x, y, w, h, fill, stroke, sw)


def photo(x, y, w, h):
    ink = INK
    inset = 28 if min(w, h) > 240 else 16
    arm = 18 if min(w, h) > 240 else 12
    items = [R(x, y, w, h, PHOTO)]
    corners = [
        (x + inset, y + inset, 1, 1),
        (x + w - inset, y + inset, -1, 1),
        (x + inset, y + h - inset, 1, -1),
        (x + w - inset, y + h - inset, -1, -1),
    ]
    for cx, cy, sx, sy in corners:
        items.append(R(cx if sx > 0 else cx - arm, cy, arm, 1.5, ink))
        items.append(R(cx if sx > 0 else cx - 1.5, cy if sy > 0 else cy - arm, 1.5, arm, ink))
    label = "PHOTO" if min(w, h) > 180 else ""
    sub = "写真" if min(w, h) > 180 else "写真"
    if label:
        items.append(T(x, y + h / 2 - 34, w, 28, label, "latin", 16, STONE, "center", 500, 0.46, 1, "middle"))
    items.append(T(x, y + h / 2 + (2 if label else -10), w, 26, sub, "sans", 15, STONE, "center", 500, 0.22, 1, "middle"))
    return ("G", "写真", items)


def qr(x, y, size, color):
    items = [
        R(x, y, size, size, None, color, 1.25),
        T(x, y, size, size, "QR", "latin", 15, color, "center", 500, 0.28, 1, "middle"),
    ]
    return ("G", "QR", items)


def flatten(items):
    out = []
    groups = []
    for item in items:
        if item[0] == "G":
            _, name, children = item
            start = len(out)
            out.extend(children)
            groups.append((name, start, len(out)))
        else:
            out.append(item)
    return out, groups


# ---------------------------------------------------------------------------
# Layouts. Coordinates are monitor pixels. Copy is a stand-in.
# ---------------------------------------------------------------------------

def page_01():
    """余白のポスター — subscription, no photo."""
    x = 88
    return [
        R(0, 0, W_P, H_P, PAPER),
        T(x, 108, 700, 40, "SELF CAFE", "latin", 24, BRASS, "left", 500, 0.36),
        R(x, 168, 48, 1.5, BRASS),
        T(x, 1120, 900, 250, "毎日、\nこの席で", "mincho", 104, INK, "left", 500, 0, 1.12),
        T(x, 1408, 700, 44, "月額メンバー", "sans", 28, STONE, "left", 500, 0.08),
        T(x, 1548, 80, 48, "¥", "sans", 32, STONE, "left", 400, 0, 1, "middle"),
        T(132, 1504, 520, 110, "4,800", "sans", 92, INK, "left", 400, -0.02),
        T(560, 1568, 360, 40, "月額・税込", "sans", 22, STONE, "left", 400, 0.04, 1, "middle"),
        T(x, 1708, 900, 44, "毎日一杯    ·    席の優先    ·    10%引き", "sans", 24, INK, "left", 500, 0.02),
    ]


def page_02():
    """写真に重ねる — subscription."""
    items = [
        R(0, 0, W_P, H_P, PAPER),
        photo(0, 0, W_P, 1140),
        R(0, 1140, W_P, 780, PAPER),
        T(80, 1208, 700, 36, "MEMBERSHIP", "latin", 20, BRASS, "left", 500, 0.38),
        T(80, 1268, 760, 100, "毎日、この席で", "mincho", 64, INK, "left", 500),
        T(80, 1392, 500, 40, "月額メンバー", "sans", 24, STONE, "left", 500, 0.06),
        T(80, 1488, 70, 40, "¥", "sans", 28, STONE, "left", 400, 0, 1, "middle"),
        T(128, 1456, 460, 100, "4,800", "sans", 76, INK, "left", 400),
        qr(860, 1464, 140, INK),
        R(80, 1604, 720, 1, LINE),
        T(80, 1640, 900, 40, "ドリップが毎日一杯", "sans", 26, INK, "left", 500),
        T(80, 1696, 900, 40, "混雑時は優先して着席", "sans", 26, INK, "left", 500),
        T(80, 1752, 900, 40, "持ち帰りは 10% 引き", "sans", 26, INK, "left", 500),
    ]
    return items


def page_03():
    """価格を大きく — subscription, distance."""
    items = [
        R(0, 0, W_P, H_P, INK),
        T(0, 132, W_P, 40, "SELF CAFE", "latin", 22, BRASS, "center", 500, 0.4),
        R((W_P - 48) / 2, 196, 48, 1.5, BRASS),
        T(0, 690, W_P, 48, "¥", "sans", 32, BRASS, "center", 400),
        T(40, 748, W_P - 80, 190, "4,800", "sans", 168, CREAM, "center", 400, -0.03),
        T(0, 960, W_P, 40, "月額・税込", "sans", 24, MUTED, "center", 400, 0.12),
        T(80, 1060, W_P - 160, 70, "毎日、この席で", "mincho", 40, CREAM, "center", 500),
        R(0, 1580, W_P, 340, PAPER),
    ]
    labels = [("01", "毎日一杯"), ("02", "席の優先"), ("03", "10% 引き")]
    for i, (num, label) in enumerate(labels):
        cx = i * 360
        if i:
            items.append(R(cx, 1660, 1, 160, LINE))
        items.append(T(cx, 1668, 360, 36, num, "latin", 20, BRASS, "center", 500, 0.22))
        items.append(T(cx, 1724, 360, 48, label, "sans", 28, INK, "center", 500))
    return items


def page_04():
    """上下で見比べる."""
    items = [
        R(0, 0, W_P, 960, PAPER),
        R(0, 960, W_P, 960, INK),
        R(0, 959, W_P, 2, BRASS),
    ]
    blocks = [
        (200, BRASS, INK, STONE, INK, "PERSONAL", "いつもの一杯を、\n月額に", "4,800", "月額・税込", "毎日一杯  ·  席の優先"),
        (1160, BRASS, CREAM, MUTED, CREAM, "BUSINESS", "仕事の\n拠点に", "18,000", "月額・3席", "請求書払い  ·  来客も可"),
    ]
    for y, kick, title_c, unit_c, body_c, kick_t, title, amount, unit, benefit in blocks:
        items += [
            T(88, y, 800, 36, kick_t, "latin", 20, kick, "left", 500, 0.36),
            R(88, y + 52, 48, 1.5, kick),
            T(88, y + 88, 900, 200, title, "mincho", 68, title_c, "left", 500, 0, 1.18),
            T(88, y + 330, 64, 36, "¥", "sans", 26, unit_c, "left", 400, 0, 1, "middle"),
            T(140, y + 300, 560, 90, amount, "sans", 68, title_c, "left", 400),
            T(140, y + 392, 400, 36, unit, "sans", 22, unit_c, "left", 400),
            T(88, y + 470, 860, 40, benefit, "sans", 26, body_c, "left", 500),
        ]
    return items


def page_05():
    """会員カード."""
    items = [
        R(0, 0, W_P, H_P, PAPER_DEEP),
        R(84, 110, 912, 1700, PAPER),
        R(108, 134, 864, 1652, None, INK, 1),
        photo(156, 188, 768, 700),
        T(140, 940, 800, 36, "MEMBER", "latin", 20, BRASS, "center", 500, 0.42),
        T(140, 996, 800, 80, "月額メンバー", "mincho", 52, INK, "center", 500),
        R((W_P - 48) / 2, 1104, 48, 1.5, BRASS),
        T(140, 1148, 800, 36, "¥", "sans", 22, STONE, "center", 400),
        T(140, 1184, 800, 100, "4,800", "sans", 80, INK, "center", 400),
        T(140, 1296, 800, 36, "月額・税込", "sans", 20, STONE, "center", 400, 0.08),
        T(180, 1388, 720, 40, "ドリップが毎日一杯", "sans", 26, INK, "center", 500),
        T(180, 1444, 720, 40, "混雑時は優先して着席", "sans", 26, INK, "center", 500),
        T(180, 1500, 720, 40, "持ち帰りは 10% 引き", "sans", 26, INK, "center", 500),
        qr((W_P - 128) / 2, 1600, 128, INK),
    ]
    return items


def page_06():
    """左に写真."""
    items = [
        R(0, 0, W_P, H_P, PAPER),
        photo(0, 0, 420, H_P),
        T(500, 280, 500, 36, "MEMBERSHIP", "latin", 20, BRASS, "left", 500, 0.34),
        R(500, 340, 48, 1.5, BRASS),
        T(500, 400, 520, 220, "毎日、\nこの席で", "mincho", 76, INK, "left", 500, 0, 1.14),
        T(500, 660, 500, 40, "月額メンバー", "sans", 24, STONE, "left", 500, 0.06),
        R(500, 748, 280, 1, LINE),
        T(500, 792, 500, 44, "ドリップが毎日一杯", "sans", 26, INK, "left", 500),
        T(500, 856, 500, 44, "混雑時は優先して着席", "sans", 26, INK, "left", 500),
        T(500, 920, 500, 44, "持ち帰りは 10% 引き", "sans", 26, INK, "left", 500),
        T(500, 1288, 70, 40, "¥", "sans", 26, STONE, "left", 400, 0, 1, "middle"),
        T(548, 1244, 460, 110, "4,800", "sans", 84, INK, "left", 400),
        T(500, 1378, 400, 36, "月額・税込", "sans", 22, STONE, "left", 400),
        qr(500, 1488, 132, INK),
    ]
    return items


def page_07():
    """三つの特典. Full-bleed bands, no photo."""
    items = [
        R(0, 0, W_P, 300, PAPER),
        T(72, 78, 520, 36, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(72, 132, 560, 80, "月額メンバー", "mincho", 44, INK, "left", 500),
        T(560, 78, 448, 36, "月額・税込", "sans", 18, STONE, "right", 400, 0.08),
        T(560, 112, 448, 100, "¥4,800", "sans", 52, INK, "right", 400),
        R(0, 300, W_P, 540, PAPER_DEEP),
        R(0, 840, W_P, 540, PAPER),
        R(0, 1380, W_P, 540, INK),
    ]
    bands = [
        (300, 540, "01", "ドリップが毎日一杯", INK, BRASS),
        (840, 540, "02", "混雑時は優先して着席", INK, BRASS),
        (1380, 540, "03", "持ち帰りは 10% 引き", CREAM, BRASS),
    ]
    for y, h, num, label, color, num_c in bands:
        items += [
            T(64, y, 210, h, num, "latin", 64, num_c, "left", 500, 0.02, 1, "middle"),
            T(300, y, 720, h, label, "sans", 40, color, "left", 500, 0, 1.2, "middle"),
        ]
    return items


def page_08():
    """余白の夜 — business, inset photo."""
    items = [
        R(0, 0, W_P, H_P, NIGHT),
        T(80, 160, 480, 36, "BUSINESS", "latin", 20, BRASS, "left", 500, 0.36),
        R(80, 216, 48, 1.5, BRASS),
        T(80, 260, 500, 240, "仕事の\n拠点に", "mincho", 80, CREAM, "left", 500, 0, 1.12),
        photo(600, 160, 400, 540),
        T(80, 860, 700, 44, "ビジネスプラン", "sans", 26, MUTED, "left", 500, 0.08),
        T(80, 980, 80, 48, "¥", "sans", 30, BRASS, "left", 400, 0, 1, "middle"),
        T(140, 940, 700, 120, "18,000", "sans", 96, CREAM, "left", 400),
        T(80, 1088, 500, 36, "月額・3席・税込", "sans", 22, MUTED, "left", 400),
        R(80, 1220, 48, 1.5, BRASS),
        T(80, 1280, 880, 48, "請求書払いに対応", "sans", 30, CREAM, "left", 500),
        T(80, 1352, 880, 48, "同時に 3 席まで", "sans", 30, CREAM, "left", 500),
        T(80, 1424, 880, 48, "来客の一杯も含む", "sans", 30, CREAM, "left", 500),
        T(80, 1760, 800, 36, "SELF CAFE", "latin", 18, MUTED, "left", 500, 0.32),
    ]
    return items


def page_09():
    """ビジネスの要点. No photo."""
    items = [
        R(0, 0, W_P, H_P, PAPER),
        T(80, 96, 700, 36, "BUSINESS", "latin", 20, BRASS, "left", 500, 0.36),
        T(80, 168, 920, 180, "静かな席を、\n法人で", "mincho", 72, INK, "left", 500, 0, 1.16),
        T(80, 390, 800, 40, "ビジネスプラン", "sans", 24, STONE, "left", 500, 0.08),
    ]
    rows = [
        (500, "請求書", "月末まとめて支払う"),
        (760, "3 席", "同時に使える"),
        (1020, "来客", "一杯までプランに含む"),
    ]
    for y, word, desc in rows:
        items += [
            R(80, y, 920, 1, LINE),
            T(80, y, 360, 220, word, "mincho", 48, INK, "left", 500, 0, 1.2, "middle"),
            T(460, y, 540, 220, desc, "sans", 26, STONE, "left", 400, 0, 1.4, "middle"),
        ]
    items += [
        R(80, 1280, 920, 1, LINE),
        T(80, 1380, 70, 40, "¥", "sans", 26, STONE, "left", 400, 0, 1, "middle"),
        T(136, 1336, 520, 110, "18,000", "sans", 80, INK, "left", 400),
        T(80, 1468, 500, 36, "月額・3席・税込", "sans", 22, STONE, "left", 400),
        qr(860, 1360, 140, INK),
    ]
    return items


def page_10():
    """左右で見比べる."""
    bg = "#E7E0D4"
    items = [R(0, 0, W_P, H_P, bg)]
    cards = [
        (40, PAPER, BRASS, INK, STONE, INK, "PERSONAL", "月額\nメンバー", "4,800", "月額・税込", ["毎日一杯", "席の優先", "10% 引き"]),
        (560, INK, BRASS, CREAM, MUTED, CREAM, "BUSINESS", "ビジネス\nプラン", "18,000", "月額・3席", ["請求書払い", "同時に3席", "来客も可"]),
    ]
    for x, fill, kick_c, title_c, unit_c, body_c, kick, title, amount, unit, benefits in cards:
        items.append(R(x, 40, 480, 1840, fill))
        items += [
            T(x + 40, 120, 400, 36, kick, "latin", 18, kick_c, "left", 500, 0.3),
            R(x + 40, 176, 40, 1.5, kick_c),
            T(x + 40, 240, 400, 200, title, "mincho", 56, title_c, "left", 500, 0, 1.16),
            T(x + 40, 520, 50, 32, "¥", "sans", 20, unit_c, "left", 400, 0, 1, "middle"),
            T(x + 40, 560, 400, 90, amount, "sans", 60, title_c, "left", 400),
            T(x + 40, 660, 400, 32, unit, "sans", 18, unit_c, "left", 400, 0.04),
            R(x + 40, 760, 160, 1, kick_c),
        ]
        for i, benefit in enumerate(benefits):
            items.append(T(x + 40, 880 + i * 108, 400, 80, benefit, "sans", 28, body_c, "left", 500, 0, 1.2, "middle"))
        items.append(qr(x + 40, 1560, 116, title_c))
        items.append(T(x + 176, 1576, 260, 84, "店頭の\nQR から", "sans", 18, unit_c, "left", 400, 0, 1.35, "middle"))
    return items


def page_11():
    """写真と文字を半分. Landscape subscription."""
    items = [
        R(0, 0, W_L, H_L, PAPER),
        photo(0, 0, 960, H_L),
        T(1048, 168, 760, 36, "MEMBERSHIP", "latin", 20, BRASS, "left", 500, 0.36),
        R(1048, 224, 48, 1.5, BRASS),
        T(1048, 268, 780, 200, "毎日、\nこの席で", "mincho", 72, INK, "left", 500, 0, 1.12),
        T(1048, 500, 500, 40, "月額メンバー", "sans", 22, STONE, "left", 500, 0.06),
        T(1048, 590, 60, 36, "¥", "sans", 24, STONE, "left", 400, 0, 1, "middle"),
        T(1104, 560, 500, 90, "4,800", "sans", 72, INK, "left", 400),
        T(1048, 668, 400, 32, "月額・税込", "sans", 20, STONE, "left", 400),
        T(1048, 760, 620, 36, "毎日一杯", "sans", 26, INK, "left", 500),
        T(1048, 812, 620, 36, "席の優先", "sans", 26, INK, "left", 500),
        T(1048, 864, 620, 36, "持ち帰り 10% 引き", "sans", 26, INK, "left", 500),
        qr(1688, 860, 148, INK),
    ]
    return items


def page_12():
    """三つのプラン. Landscape, distance."""
    cols = [
        (0, PAPER, INK, STONE, BRASS, "LIGHT", "ライト", "2,800", "月額・税込", "週に数回", "一杯から"),
        (640, INK, CREAM, MUTED, BRASS, "STANDARD", "スタンダード", "4,800", "月額・税込", "毎日一杯", "席の優先"),
        (1280, PAPER, INK, STONE, BRASS, "BUSINESS", "ビジネス", "18,000", "月額・3席", "請求書払い", "来客も可"),
    ]
    items = []
    for x, fill, title_c, unit_c, kick_c, kick, name, amount, unit, b1, b2 in cols:
        items += [
            R(x, 0, 640, H_L, fill),
            T(x, 88, 640, 36, kick, "latin", 18, kick_c, "center", 500, 0.36),
            T(x + 40, 150, 560, 70, name, "mincho", 40, title_c, "center", 500),
            T(x, 300, 640, 36, "¥", "sans", 20, unit_c, "center", 400),
            T(x + 30, 340, 580, 110, amount, "sans", 76, title_c, "center", 400),
            T(x, 460, 640, 32, unit, "sans", 18, unit_c, "center", 400, 0.08),
            R(x + 280, 540, 80, 1.5, kick_c),
            T(x + 40, 600, 560, 44, b1, "sans", 26, title_c, "center", 500),
            T(x + 40, 660, 560, 44, b2, "sans", 26, title_c, "center", 500),
            T(x, 960, 640, 36, "店頭の QR から", "sans", 18, unit_c, "center", 400, 0.08),
        ]
        if x:
            items.append(R(x, 0, 1, H_L, LINE if fill == PAPER else "#3A342C"))
    return items


def _oneline(night=False):
    bg = NIGHT if night else PAPER
    title_c = CREAM if night else INK
    body = CREAM if night else INK
    muted = MUTED if night else STONE
    kick = "BUSINESS" if night else "MEMBERSHIP"
    title = "仕事の拠点に" if night else "毎日、この席で"
    sub = "ビジネスプラン" if night else "月額メンバー"
    amount = "18,000" if night else "4,800"
    unit = "月額・3席" if night else "月額・税込"
    benefit = "請求書  ·  3席  ·  来客" if night else "毎日一杯  ·  席の優先  ·  10%引き"
    return [
        R(0, 0, W_L, H_L, bg),
        T(88, 300, 1100, 36, kick, "latin", 20, BRASS, "left", 500, 0.36),
        T(88, 360, 1180, 120, title, "mincho", 80, title_c, "left", 500),
        T(88, 500, 900, 40, sub, "sans", 24, muted, "left", 500, 0.06),
        T(88, 620, 1100, 40, benefit, "sans", 24, body, "left", 500),
        R(1288, 250, 1, 580, BRASS if night else LINE),
        T(1360, 330, 340, 32, "¥", "sans", 22, BRASS if night else STONE, "left", 400),
        T(1360, 368, 340, 110, amount, "sans", 80, title_c, "left", 400),
        T(1360, 490, 340, 36, unit, "sans", 20, muted, "left", 400),
        qr(1740, 368, 120, CREAM if night else INK),
    ]


def page_13():
    return _oneline(False)


def page_18():
    return _oneline(True)


def page_14():
    """写真のスリット — business landscape."""
    items = [
        R(0, 0, W_L, H_L, NIGHT),
        T(72, 150, 760, 36, "BUSINESS", "latin", 20, BRASS, "left", 500, 0.36),
        R(72, 206, 48, 1.5, BRASS),
        T(72, 250, 780, 120, "仕事の拠点に", "mincho", 64, CREAM, "left", 500),
        T(72, 400, 70, 36, "¥", "sans", 24, BRASS, "left", 400, 0, 1, "middle"),
        T(124, 372, 560, 100, "18,000", "sans", 72, CREAM, "left", 400),
        T(72, 490, 500, 36, "月額・3席・税込", "sans", 20, MUTED, "left", 400),
        T(72, 620, 760, 80, "来客も、いつもの席で。", "mincho", 32, CREAM_INK, "left", 500),
        photo(900, 0, 280, H_L),
    ]
    facts = [("01", "請求書払い"), ("02", "同時に 3 席"), ("03", "来客も対象")]
    for i, (num, label) in enumerate(facts):
        y = 186 + i * 250
        items += [
            T(1260, y, 580, 36, num, "latin", 18, BRASS, "left", 500, 0.22),
            T(1260, y + 48, 580, 70, label, "sans", 36, CREAM, "left", 500),
        ]
    return items


def page_15():
    """キャプションバー."""
    items = [
        R(0, 0, W_L, H_L, PAPER),
        photo(0, 0, W_L, 760),
        R(0, 760, W_L, 320, PAPER),
        T(64, 808, 700, 32, "MEMBERSHIP", "latin", 16, BRASS, "left", 500, 0.34),
        T(64, 852, 820, 70, "月額メンバー", "mincho", 44, INK, "left", 500),
        T(64, 940, 820, 36, "毎日一杯  ·  席の優先  ·  10%引き", "sans", 22, STONE, "left", 500),
        T(1040, 860, 50, 32, "¥", "sans", 20, STONE, "left", 400, 0, 1, "middle"),
        T(1088, 828, 420, 90, "4,800", "sans", 60, INK, "left", 400),
        T(1088, 928, 360, 32, "月額・税込", "sans", 18, STONE, "left", 400),
        qr(1700, 846, 140, INK),
    ]
    return items


def page_16():
    """紙面. Two offers, closer reading."""
    items = [
        R(0, 0, W_L, H_L, PAPER),
        T(64, 40, 700, 36, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(900, 40, 956, 36, "TWO WAYS IN", "latin", 20, STONE, "right", 500, 0.28),
        R(64, 96, 1792, 1, INK),
    ]
    cols = [
        (64, "MEMBERSHIP", "月額メンバー", "4,800", "月額・税込", "毎日一杯と、混雑時の優先席。"),
        (992, "BUSINESS", "ビジネスプラン", "18,000", "月額・3席", "請求書払い。来客の一杯も含む。"),
    ]
    for x, kick, title, amount, unit, sentence in cols:
        items += [
            photo(x, 128, 864, 400),
            T(x, 560, 700, 32, kick, "latin", 16, BRASS, "left", 500, 0.32),
            T(x, 604, 864, 64, title, "mincho", 40, INK, "left", 500),
            T(x, 690, 40, 28, "¥", "sans", 16, STONE, "left", 400, 0, 1, "middle"),
            T(x + 36, 676, 360, 56, amount, "sans", 36, INK, "left", 400),
            T(x + 280, 688, 300, 32, unit, "sans", 16, STONE, "left", 400, 0, 1, "middle"),
            T(x, 760, 864, 70, sentence, "sans", 24, STONE, "left", 400, 0, 1.5),
        ]
    return items


def page_17():
    """料金表."""
    items = [
        R(0, 0, W_P, H_P, PAPER),
        T(80, 96, 700, 36, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(80, 164, 920, 100, "プランと料金", "mincho", 64, INK, "left", 500),
        T(80, 280, 800, 40, "店頭の QR から登録できます", "sans", 22, STONE, "left", 400),
        R(80, 360, 920, 1.5, INK),
    ]
    rows = [
        (420, "ライト", "週に、数回の一杯", "2,800", "月額・税込"),
        (860, "スタンダード", "毎日一杯。席は優先", "4,800", "月額・税込"),
        (1300, "ビジネス", "3席まで。請求書払い", "18,000", "月額・3席"),
    ]
    for y, name, desc, amount, unit in rows:
        items += [
            T(80, y, 520, 80, name, "mincho", 48, INK, "left", 500, 0, 1, "middle"),
            T(80, y + 88, 560, 44, desc, "sans", 24, STONE, "left", 400),
            T(620, y, 380, 36, "¥", "sans", 18, STONE, "right", 400),
            T(620, y + 28, 380, 80, amount, "sans", 48, INK, "right", 400),
            T(620, y + 112, 380, 32, unit, "sans", 16, STONE, "right", 400),
            R(80, y + 200, 920, 1, LINE),
        ]
    items += [
        qr(80, 1728, 112, INK),
        T(220, 1756, 640, 56, "登録はこちらの QR", "sans", 24, INK, "left", 500, 0, 1, "middle"),
    ]
    return items


PAGES = [
    dict(id="01", slug="01_余白のポスター", name="余白のポスター", use="サブスク", orient="縦", photo=False, distance="遠くても読める", w=W_P, h=H_P, build=page_01),
    dict(id="02", slug="02_写真に重ねる", name="写真に重ねる", use="サブスク", orient="縦", photo=True, distance="写真が主役", w=W_P, h=H_P, build=page_02),
    dict(id="03", slug="03_価格を大きく", name="価格を大きく", use="サブスク", orient="縦", photo=False, distance="遠くても読める", w=W_P, h=H_P, build=page_03),
    dict(id="04", slug="04_上下で見比べる", name="上下で見比べる", use="サブスク / ビジネス", orient="縦", photo=False, distance="遠くても読める", w=W_P, h=H_P, build=page_04),
    dict(id="05", slug="05_会員カード", name="会員カード", use="サブスク", orient="縦", photo=True, distance="カウンター近く", w=W_P, h=H_P, build=page_05),
    dict(id="06", slug="06_左に写真", name="左に写真", use="サブスク", orient="縦", photo=True, distance="写真と料金", w=W_P, h=H_P, build=page_06),
    dict(id="07", slug="07_三つの特典", name="三つの特典", use="サブスク", orient="縦", photo=False, distance="遠くても読める", w=W_P, h=H_P, build=page_07),
    dict(id="08", slug="08_余白の夜", name="余白の夜", use="ビジネス", orient="縦", photo=True, distance="写真と余白", w=W_P, h=H_P, build=page_08),
    dict(id="09", slug="09_ビジネスの要点", name="ビジネスの要点", use="ビジネス", orient="縦", photo=False, distance="カウンター近く", w=W_P, h=H_P, build=page_09),
    dict(id="10", slug="10_左右で見比べる", name="左右で見比べる", use="サブスク / ビジネス", orient="縦", photo=False, distance="遠くても読める", w=W_P, h=H_P, build=page_10),
    dict(id="11", slug="11_写真と文字", name="写真と文字", use="サブスク", orient="横", photo=True, distance="壁かけモニタ", w=W_L, h=H_L, build=page_11),
    dict(id="12", slug="12_三つのプラン", name="三つのプラン", use="全部", orient="横", photo=False, distance="遠くても読める", w=W_L, h=H_L, build=page_12),
    dict(id="13", slug="13_一行", name="一行", use="サブスク", orient="横", photo=False, distance="遠くても読める", w=W_L, h=H_L, build=page_13),
    dict(id="14", slug="14_写真のスリット", name="写真のスリット", use="ビジネス", orient="横", photo=True, distance="壁かけモニタ", w=W_L, h=H_L, build=page_14),
    dict(id="15", slug="15_キャプション", name="キャプション", use="サブスク", orient="横", photo=True, distance="写真が主役", w=W_L, h=H_L, build=page_15),
    dict(id="16", slug="16_紙面", name="紙面", use="サブスク / ビジネス", orient="横", photo=True, distance="カウンター近く", w=W_L, h=H_L, build=page_16),
    dict(id="17", slug="17_料金表", name="料金表", use="全部", orient="縦", photo=False, distance="メニューとして", w=W_P, h=H_P, build=page_17),
    dict(id="18", slug="18_一行_ビジネス", name="一行（ビジネス）", use="ビジネス", orient="横", photo=False, distance="13番と同じ割付", w=W_L, h=H_L, build=page_18),
]


FONT_FACE = {
    ("latin", 300): ("Cormorant Garamond", "CormorantGaramond-Light.ttf"),
    ("latin", 400): ("Cormorant Garamond", "CormorantGaramond-Regular.ttf"),
    ("latin", 500): ("Cormorant Garamond", "CormorantGaramond-Medium.ttf"),
    ("latin", 600): ("Cormorant Garamond", "CormorantGaramond-SemiBold.ttf"),
    ("mincho", 400): ("Shippori Mincho", "ShipporiMincho-Regular.ttf"),
    ("mincho", 500): ("Shippori Mincho", "ShipporiMincho-Medium.ttf"),
    ("mincho", 600): ("Shippori Mincho", "ShipporiMincho-SemiBold.ttf"),
    ("sans", 300): ("Noto Sans JP", "NotoSansJP-Light.ttf"),
    ("sans", 400): ("Noto Sans JP", "NotoSansJP-Regular.ttf"),
    ("sans", 500): ("Noto Sans JP", "NotoSansJP-Medium.ttf"),
    ("sans", 700): ("Noto Sans JP", "NotoSansJP-Bold.ttf"),
}


def font_css():
    rules = []
    seen = set()
    for (family_key, weight), (css_name, filename) in FONT_FACE.items():
        face = f"{css_name} {weight}"
        if face in seen:
            continue
        seen.add(face)
        rules.append(
            f"""@font-face {{
  font-family: "{face}";
  src: url("../fonts/{filename}") format("truetype");
  font-weight: {weight};
  font-style: normal;
  font-display: block;
}}"""
        )
    return "\n".join(rules)


def css_family(font, weight):
    css_name, _ = FONT_FACE[(font, weight)]
    return f'"{css_name} {weight}"'


def render_html(page, items):
    w, h = page["w"], page["h"]
    chunks = [
        "<!DOCTYPE html><html lang='ja'><head><meta charset='utf-8'>",
        f"<title>{html.escape(page['name'])}</title><style>",
        font_css(),
        f"""
html, body {{ margin:0; padding:0; width:{w}px; height:{h}px; overflow:hidden; background:#000; }}
body {{ position:relative; }}
.t {{
  position:absolute; white-space:pre-wrap; font-feature-settings:"palt" 1;
  line-break:strict;
}}
.t > div {{ width:100%; }}
""",
        "</style></head><body>",
    ]
    align_css = {"left": ("flex-start", "left"), "center": ("center", "center"), "right": ("flex-end", "right")}
    valign_css = {"top": "flex-start", "middle": "center", "bottom": "flex-end"}
    for item in items:
        kind = item[0]
        if kind == "R":
            _, x, y, rw, rh, fill, stroke, sw = item
            bg = fill or "transparent"
            border = f"{sw}px solid {stroke}" if stroke else "0"
            chunks.append(
                f"<div style='position:absolute;left:{x}px;top:{y}px;width:{rw}px;height:{rh}px;background:{bg};border:{border};box-sizing:border-box'></div>"
            )
        elif kind == "T":
            _, x, y, tw, th, text, font, size, color, align, weight, tracking, lh, valign = item
            justify, text_align = align_css[align]
            v = valign_css[valign]
            chunks.append(
                "<div class='t' style='"
                f"left:{x}px;top:{y}px;width:{tw}px;height:{th}px;"
                f"display:flex;align-items:{v};justify-content:{justify};"
                "'>"
                f"<div style='font-family:{css_family(font, weight)};font-size:{size}px;font-weight:{weight};"
                f"color:{color};letter-spacing:{tracking}em;line-height:{lh};text-align:{text_align};'>"
                f"{html.escape(text)}</div></div>"
            )
    chunks.append("</body></html>")
    path = HTML_DIR / f"{page['id']}.html"
    path.write_text("".join(chunks), encoding="utf-8")
    return path


def hex_rgb(value):
    value = value.lstrip("#")
    return RGBColor(int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16))


def emu(px):
    return Emu(int(round(px * SCALE * 12700)))


def set_run_font(run, font_key, weight, size_px, color, tracking_em):
    css_name, _ = FONT_FACE[(font_key, weight)]
    size_pt = size_px * SCALE
    run.font.size = Pt(size_pt)
    run.font.bold = weight >= 600
    run.font.italic = False
    run.font.color.rgb = hex_rgb(color)
    run.font.name = css_name
    rPr = run._r.get_or_add_rPr()
    rPr.set("lang", "ja-JP")
    rPr.set("altLang", "en-US")
    if tracking_em:
        rPr.set("spc", str(int(round(tracking_em * size_pt * 100))))
    for tag in ("latin", "ea", "cs"):
        el = rPr.find(qn(f"a:{tag}"))
        if el is None:
            el = etree.SubElement(rPr, qn(f"a:{tag}"))
        el.set("typeface", css_name)


def _next_id(sp_tree):
    ids = [int(el.get("id")) for el in sp_tree.iter() if el.tag == qn("p:cNvPr") and el.get("id")]
    return max(ids, default=2) + 1


def add_textbox(slide, item):
    _, x, y, w, h, text, font, size, color, align, weight, tracking, lh, valign = item
    box = slide.shapes.add_textbox(emu(x), emu(y), emu(w), emu(max(h, size * 1.15)))
    tf = box.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    tf.margin_left = Emu(0)
    tf.margin_right = Emu(0)
    tf.margin_top = Emu(0)
    tf.margin_bottom = Emu(0)
    anchor = {"top": MSO_ANCHOR.TOP, "middle": MSO_ANCHOR.MIDDLE, "bottom": MSO_ANCHOR.BOTTOM}[valign]
    tf.paragraphs[0].alignment = {"left": PP_ALIGN.LEFT, "center": PP_ALIGN.CENTER, "right": PP_ALIGN.RIGHT}[align]
    # anchor lives on bodyPr
    bodyPr = tf._txBody.find(qn("a:bodyPr"))
    bodyPr.set("anchor", {"top": "t", "middle": "ctr", "bottom": "b"}[valign])
    lines = text.split("\n")
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = {"left": PP_ALIGN.LEFT, "center": PP_ALIGN.CENTER, "right": PP_ALIGN.RIGHT}[align]
        p.space_before = Pt(0)
        p.space_after = Pt(0)
        p.line_spacing = lh
        run = p.add_run()
        run.text = line
        set_run_font(run, font, weight, size, color, tracking)
    # name the shape with its text so Canva's layer list is usable
    label = text.replace("\n", " ")[:24]
    box._element.nvSpPr.cNvPr.set("name", label or "文字")
    return box


def add_rect(slide, item):
    _, x, y, w, h, fill, stroke, sw = item
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE.RECTANGLE
        emu(x),
        emu(y),
        emu(max(w, 1)),
        emu(max(h, 1)),
    )
    style = shape._element.find(qn("p:style"))
    if style is not None:
        shape._element.remove(style)
    if fill:
        shape.fill.solid()
        shape.fill.fore_color.rgb = hex_rgb(fill)
    else:
        shape.fill.background()
    if stroke:
        shape.line.color.rgb = hex_rgb(stroke)
        shape.line.width = Pt(max(sw * SCALE, 0.5))
    else:
        shape.line.fill.background()
    shape._element.nvSpPr.cNvPr.set("name", "面")
    # kill the default adjustment that sometimes shows a shadow via theme
    return shape


def group_shapes(slide, shapes, name):
    if len(shapes) < 2:
        if shapes:
            shapes[0]._element.nvSpPr.cNvPr.set("name", name)
        return
    sp_tree = slide.shapes._spTree
    els = [s._element for s in shapes]
    xs = [int(s.left) for s in shapes]
    ys = [int(s.top) for s in shapes]
    rs = [int(s.left + s.width) for s in shapes]
    bs = [int(s.top + s.height) for s in shapes]
    x, y, r, b = min(xs), min(ys), max(rs), max(bs)
    w, h = max(r - x, 1), max(b - y, 1)
    grp = etree.Element(qn("p:grpSp"))
    nv = etree.SubElement(grp, qn("p:nvGrpSpPr"))
    c = etree.SubElement(nv, qn("p:cNvPr"))
    c.set("id", str(_next_id(sp_tree)))
    c.set("name", name)
    etree.SubElement(nv, qn("p:cNvGrpSpPr"))
    etree.SubElement(nv, qn("p:nvPr"))
    pr = etree.SubElement(grp, qn("p:grpSpPr"))
    xfrm = etree.SubElement(pr, qn("a:xfrm"))
    off = etree.SubElement(xfrm, qn("a:off"))
    off.set("x", str(x))
    off.set("y", str(y))
    ext = etree.SubElement(xfrm, qn("a:ext"))
    ext.set("cx", str(w))
    ext.set("cy", str(h))
    ch_off = etree.SubElement(xfrm, qn("a:chOff"))
    ch_off.set("x", str(x))
    ch_off.set("y", str(y))
    ch_ext = etree.SubElement(xfrm, qn("a:chExt"))
    ch_ext.set("cx", str(w))
    ch_ext.set("cy", str(h))
    for el in els:
        sp_tree.remove(el)
        grp.append(el)
    sp_tree.append(grp)


def build_pptx(pages, dest: Path):
    if not pages:
        return
    prs = Presentation()
    prs.slide_width = emu(pages[0]["w"])
    prs.slide_height = emu(pages[0]["h"])
    blank = prs.slide_layouts[6]
    for page in pages:
        slide = prs.slides.add_slide(blank)
        raw = page["build"]()
        flat, groups = flatten(raw)
        shapes = []
        for item in flat:
            if item[0] == "R":
                shapes.append(add_rect(slide, item))
            elif item[0] == "T":
                shapes.append(add_textbox(slide, item))
        for name, start, end in groups:
            group_shapes(slide, shapes[start:end], name)
        notes = slide.notes_slide.notes_text_frame
        notes.text = f"{page['id']} {page['name']} / {page['use']} / {page['orient']} {page['w']}×{page['h']} / {page['distance']}"
    dest.parent.mkdir(parents=True, exist_ok=True)
    prs.save(dest)


def render_contact(pages):
    pad = 56
    gap = 36
    label_h = 88
    title_h = 188
    portrait = [p for p in pages if p["orient"] == "縦"]
    landscape = [p for p in pages if p["orient"] == "横"]
    cols_p, cols_l = 4, 3
    thumb_p_w = 280
    thumb_p_h = int(thumb_p_w * H_P / W_P)
    thumb_l_w = 460
    thumb_l_h = int(thumb_l_w * H_L / W_L)
    rows_p = (len(portrait) + cols_p - 1) // cols_p
    rows_l = (len(landscape) + cols_l - 1) // cols_l
    width = pad * 2 + max(
        cols_p * thumb_p_w + (cols_p - 1) * gap,
        cols_l * thumb_l_w + (cols_l - 1) * gap,
    )
    height = (
        title_h
        + 28
        + rows_p * (thumb_p_h + label_h + gap)
        + 48
        + rows_l * (thumb_l_h + label_h + gap)
        + pad
    )
    board = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(board)
    latin = ImageFont.truetype(str(FONT_DIR / "CormorantGaramond-Medium.ttf"), 28)
    mincho = ImageFont.truetype(str(FONT_DIR / "ShipporiMincho-Medium.ttf"), 40)
    sans = ImageFont.truetype(str(FONT_DIR / "NotoSansJP-Medium.ttf"), 18)
    sans_s = ImageFont.truetype(str(FONT_DIR / "NotoSansJP-Regular.ttf"), 15)
    draw.text((pad, 44), "SELF CAFE", font=latin, fill=BRASS)
    draw.text((pad, 84), "クラウドモニタ  レイアウト原案", font=mincho, fill=INK)
    draw.text((pad, 142), "文字と写真は仮です。Canvaで差し替えて使います。", font=sans, fill=STONE)

    def place(group, cols_n, tw, th, top):
        for i, page in enumerate(group):
            c = i % cols_n
            r = i // cols_n
            x = pad + c * (tw + gap)
            y = top + r * (th + label_h + gap)
            im = Image.open(PNG_DIR / f"{page['slug']}.png").convert("RGB")
            im = im.resize((tw, th), Image.Resampling.LANCZOS)
            board.paste(im, (x, y))
            draw.rectangle([x, y, x + tw - 1, y + th - 1], outline=LINE)
            photo = "写真枠あり" if page["photo"] else "写真なし"
            draw.text((x, y + th + 12), f"{page['id']}  {page['name']}", font=sans, fill=INK)
            draw.text((x, y + th + 38), f"{page['orient']}  {page['w']}×{page['h']}    {page['use']}", font=sans_s, fill=STONE)
            draw.text((x, y + th + 60), f"{page['distance']}    {photo}", font=sans_s, fill=STONE_SOFT)

    draw.text((pad, title_h - 8), "縦   1080×1920", font=sans, fill=BRASS)
    place(portrait, cols_p, thumb_p_w, thumb_p_h, title_h + 28)
    land_top = title_h + 28 + rows_p * (thumb_p_h + label_h + gap) + 8
    draw.text((pad, land_top), "横   1920×1080", font=sans, fill=BRASS)
    place(landscape, cols_l, thumb_l_w, thumb_l_h, land_top + 36)
    out = PNG_DIR / "00_一覧.png"
    board.save(out, "PNG", optimize=True)
    return out


def render_with_playwright(pages):
    from playwright.sync_api import sync_playwright

    HTML_DIR.mkdir(parents=True, exist_ok=True)
    PNG_DIR.mkdir(parents=True, exist_ok=True)
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    pdf_paths = {"縦": [], "横": []}
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        for page in pages:
            items, _ = flatten(page["build"]())
            html_path = render_html(page, items)
            w, h = page["w"], page["h"]
            browser_page = browser.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
            browser_page.goto(html_path.as_uri(), wait_until="load")
            browser_page.wait_for_function("() => document.fonts.status === 'loaded'")
            browser_page.wait_for_timeout(80)
            png = PNG_DIR / f"{page['slug']}.png"
            browser_page.screenshot(path=str(png), full_page=False, omit_background=False)
            pdf = PDF_DIR / f"{page['slug']}.pdf"
            browser_page.pdf(
                path=str(pdf),
                width=f"{w}px",
                height=f"{h}px",
                print_background=True,
                margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            )
            browser_page.close()
            pdf_paths[page["orient"]].append(pdf)
            print(f"rendered {page['id']} {png.name}")
        browser.close()
    for orient, paths in pdf_paths.items():
        writer = PdfWriter()
        for path in paths:
            reader = PdfReader(str(path))
            for pdf_page in reader.pages:
                writer.add_page(pdf_page)
        out = PDF_DIR / ("クラウドモニタ_縦.pdf" if orient == "縦" else "クラウドモニタ_横.pdf")
        with out.open("wb") as f:
            writer.write(f)
        box = PdfReader(str(out)).pages[0].mediabox
        print(f"pdf {out.name} page1 {float(box.width):.1f}x{float(box.height):.1f} pt")


def main():
    only = set(sys.argv[1:])
    pages = [p for p in PAGES if not only or p["id"] in only]
    # Fail fast if a weight is missing from a page.
    for page in pages:
        flat, _ = flatten(page["build"]())
        for item in flat:
            if item[0] == "T":
                FONT_FACE[(item[6], item[10])]
    if not only:
        render_with_playwright(PAGES)
        build_pptx([p for p in PAGES if p["orient"] == "縦"], PPTX_DIR / "クラウドモニタ_縦_Canva用.pptx")
        build_pptx([p for p in PAGES if p["orient"] == "横"], PPTX_DIR / "クラウドモニタ_横_Canva用.pptx")
        render_contact(PAGES)
    else:
        render_with_playwright(pages)
    print("done")


if __name__ == "__main__":
    main()
