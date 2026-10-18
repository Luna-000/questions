#!/usr/bin/env python3
"""商品台帳 Markdown から、番号・説明・写真の PDF を作る。"""

import re
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle,
    HRFlowable,
    KeepTogether,
)

ROOT = Path(__file__).resolve().parent
MD = ROOT / "products.md"
OUT = ROOT / "catalog.pdf"
FONT_PATH = "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc"
INK = HexColor("#f6f1e6")
RULE = HexColor("#e4d0ae")
FRAME = HexColor("#f0e2c8")
GLAZE = HexColor("#12357f")
GLAZE_DEEP = HexColor("#0c2868")
TILE_A = HexColor("#1b4ea8")
TILE_B = HexColor("#245db8")
BAR = HexColor("#184496")
GOLD = HexColor("#c6a36e")


def lantern(canvas, cx, cy, s, fill):
    k = s * 0.55
    path = canvas.beginPath()
    path.moveTo(cx, cy + s)
    path.curveTo(cx + s * 0.7, cy + s, cx + k * 1.05, cy + s * 0.55, cx + k, cy + k)
    path.curveTo(cx + s * 0.55, cy + k * 1.05, cx + s, cy + s * 0.7, cx + s, cy)
    path.curveTo(cx + s, cy - s * 0.7, cx + s * 0.55, cy - k * 1.05, cx + k, cy - k)
    path.curveTo(cx + k * 1.05, cy - s * 0.55, cx + s * 0.7, cy - s, cx, cy - s)
    path.curveTo(cx - s * 0.7, cy - s, cx - k * 1.05, cy - s * 0.55, cx - k, cy - k)
    path.curveTo(cx - s * 0.55, cy - k * 1.05, cx - s, cy - s * 0.7, cx - s, cy)
    path.curveTo(cx - s, cy + s * 0.7, cx - s * 0.55, cy + k * 1.05, cx - k, cy + k)
    path.curveTo(cx - k * 1.05, cy + s * 0.55, cx - s * 0.7, cy + s, cx, cy + s)
    canvas.setFillColor(fill)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.7)
    canvas.drawPath(path, fill=1, stroke=1)


def paint_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(GLAZE)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    canvas.setFillColor(Color(0.10, 0.22, 0.48, alpha=0.35))
    canvas.rect(0, 0, w, h * 0.22, fill=1, stroke=0)
    canvas.rect(0, h * 0.78, w, h * 0.22, fill=1, stroke=0)

    pitch = 32 * mm
    bar_w = 9 * mm
    x = -pitch * 0.15
    col = 0
    while x < w + pitch:
        if col % 3 == 2:
            canvas.setFillColor(BAR)
            canvas.rect(x, 0, bar_w, h, fill=1, stroke=0)
            canvas.setStrokeColor(GOLD)
            canvas.setLineWidth(0.45)
            canvas.line(x, 0, x, h)
            canvas.line(x + bar_w, 0, x + bar_w, h)
            y = 0
            while y < h:
                canvas.line(x, y, x + bar_w, y)
                y += pitch * 0.42
            x += bar_w + 4 * mm
        else:
            y = pitch * 0.42
            row = 0
            while y < h + pitch:
                lantern(canvas, x + pitch * 0.48, y, pitch * 0.42, TILE_A if (row + col) % 2 == 0 else TILE_B)
                y += pitch
                row += 1
            x += pitch
        col += 1

    inset = 7.2 * mm
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(1.1)
    canvas.rect(inset, inset, w - 2 * inset, h - 2 * inset, stroke=1, fill=0)
    canvas.setStrokeColor(GLAZE_DEEP)
    canvas.setLineWidth(0.4)
    inner = 8.6 * mm
    canvas.rect(inner, inner, w - 2 * inner, h - 2 * inner, stroke=1, fill=0)
    canvas.restoreState()


def load_sections(text: str):
    chunks = re.split(r"\n## ", text)
    products = []
    for chunk in chunks[1:]:
        title, _, body = chunk.partition("\n")
        title = title.strip()
        if title in ("画像", "一覧"):
            continue
        if not re.match(r"★?\d{2} ", title):
            continue
        star = title.startswith("★")
        number = title[1:3] if star else title[:2]
        name = title.split(" ", 1)[1]
        desc = ""
        notes = []
        images = []
        decided = False
        for line in body.splitlines():
            line = line.strip()
            if not line:
                continue
            if line.startswith("**商品説明**"):
                desc = line.removeprefix("**商品説明**").strip()
                continue
            if line.startswith("- 画像:"):
                images = re.findall(r"\d{2}", line)
                continue
            if line.startswith("- あげる相手"):
                decided = True
                continue
            if line.startswith("- "):
                notes.append(line[2:].strip())
                continue
            notes.append(line)
        products.append(
            {
                "number": number,
                "star": star or decided,
                "name": name,
                "desc": desc,
                "notes": notes,
                "images": images,
            }
        )
    return products


def jpeg_bytes(path: Path, max_edge: int) -> BytesIO:
    im = PILImage.open(path).convert("RGB")
    im.thumbnail((max_edge, max_edge))
    buf = BytesIO()
    im.save(buf, format="JPEG", quality=82, optimize=True)
    buf.seek(0)
    return buf


def framed_image(path, box_w, box_h):
    pad = 1.1 * mm
    stroke = 1.8
    im = PILImage.open(path)
    w, h = im.size
    scale = min((box_w - 2 * pad - stroke) / w, (box_h - 2 * pad - stroke) / h)
    img = Image(jpeg_bytes(path, 1400), width=w * scale, height=h * scale)
    table = Table(
        [[img]],
        colWidths=[img.drawWidth + 2 * pad + stroke],
        rowHeights=[img.drawHeight + 2 * pad + stroke],
    )
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), stroke, FRAME),
                ("LEFTPADDING", (0, 0), (-1, -1), pad),
                ("RIGHTPADDING", (0, 0), (-1, -1), pad),
                ("TOPPADDING", (0, 0), (-1, -1), pad),
                ("BOTTOMPADDING", (0, 0), (-1, -1), pad),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )
    table.hAlign = "CENTER"
    return table


def image_row(paths, max_width, max_height):
    gap = 3.5 * mm
    n = len(paths)
    cell_w = (max_width - gap * (n - 1)) / n
    frames = [framed_image(path, cell_w, max_height) for path in paths]
    if n == 1:
        return frames[0]
    row = []
    cols = []
    for i, frame in enumerate(frames):
        row.append(frame)
        cols.append(cell_w)
        if i != n - 1:
            row.append("")
            cols.append(gap)
    table = Table([row], colWidths=cols, hAlign="CENTER")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def build():
    pdfmetrics.registerFont(TTFont("JP", FONT_PATH, subfontIndex=0))
    products = load_sections(MD.read_text())
    if len(products) != 21:
        raise SystemExit(f"expected 21 products, got {len(products)}")

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title="商品台帳",
        author="ギフトショップ",
    )
    width = A4[0] - 32 * mm
    title = ParagraphStyle("title", fontName="JP", fontSize=26, leading=34, textColor=INK, alignment=TA_LEFT, spaceAfter=6)
    note = ParagraphStyle("note", fontName="JP", fontSize=14, leading=22, textColor=INK, spaceAfter=8)
    idx = ParagraphStyle("idx", fontName="JP", fontSize=15, leading=22, textColor=INK)
    head = ParagraphStyle("head", fontName="JP", fontSize=20, leading=28, textColor=INK, spaceBefore=2, spaceAfter=4)
    body = ParagraphStyle("body", fontName="JP", fontSize=14, leading=22, textColor=INK, spaceAfter=4)

    story = []
    story.append(Paragraph("商品台帳", title))
    story.append(Paragraph("★は確定ですいちゃん用の商品。", note))
    for p in products:
        mark = "★" if p["star"] else "　"
        story.append(Paragraph(f"{mark}{p['number']}　{p['name']}", idx))
    story.append(Spacer(1, 6 * mm))

    frame_h = A4[1] - 28 * mm

    def packed(flowables):
        total = 0
        for flow in flowables:
            _, h = flow.wrap(width, frame_h)
            total += h + getattr(flow, "spaceBefore", 0) + getattr(flow, "spaceAfter", 0)
        return total

    for p in products:
        label = f"★{p['number']}" if p["star"] else p["number"]
        paths = [ROOT / "images" / f"{n}.jpg" for n in p["images"]]
        missing = [str(path) for path in paths if not path.exists()]
        if missing:
            raise SystemExit("missing images: " + ", ".join(missing))
        n = len(paths)
        text = [
            HRFlowable(width="100%", thickness=0.4, color=RULE, spaceBefore=2, spaceAfter=6),
            Paragraph(f"{label}　{p['name']}", head),
        ]
        text.append(Paragraph(p["desc"], body))
        room = frame_h - packed(text) - 4 * mm
        preferred = 95 * mm if n == 1 else 78 * mm if n == 2 else 62 * mm
        image_h = min(preferred, max(36 * mm, room))
        block = text + [image_row(paths, width, image_h)]
        if packed(block) > frame_h:
            raise SystemExit(f"{label} does not fit on one page")
        story.append(KeepTogether(block))

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(products)} products)")


if __name__ == "__main__":
    build()
