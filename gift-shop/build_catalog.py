#!/usr/bin/env python3
"""商品台帳 Markdown から、番号・説明・写真の PDF を作る。"""

import random
import re
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib.colors import HexColor
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
INK = HexColor("#1f1a14")
MUTED = HexColor("#5c5146")
RULE = HexColor("#5c6c74")
STAR = HexColor("#8a3b32")
PAPER = HexColor("#8f9fa8")
SNOW = HexColor("#c5d0d6")
FRAME = HexColor("#2c353a")


def paint_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, w, h, fill=1, stroke=0)
    rng = random.Random(18)
    canvas.setFillColor(SNOW)
    for _ in range(70):
        canvas.circle(rng.uniform(0, w), rng.uniform(0, h), rng.uniform(0.35, 1.35), fill=1, stroke=0)
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
    title = ParagraphStyle("title", fontName="JP", fontSize=18, leading=24, textColor=INK, alignment=TA_LEFT, spaceAfter=4)
    note = ParagraphStyle("note", fontName="JP", fontSize=9, leading=13, textColor=MUTED, spaceAfter=8)
    idx = ParagraphStyle("idx", fontName="JP", fontSize=9, leading=13, textColor=INK)
    head = ParagraphStyle("head", fontName="JP", fontSize=14, leading=18, textColor=INK, spaceBefore=2, spaceAfter=2)
    body = ParagraphStyle("body", fontName="JP", fontSize=10.5, leading=16, textColor=INK, spaceAfter=4)
    small = ParagraphStyle("small", fontName="JP", fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=1)
    caption = ParagraphStyle("caption", fontName="JP", fontSize=8, leading=11, textColor=MUTED, spaceBefore=2, spaceAfter=6)

    story = []
    story.append(Paragraph("商品台帳", title))
    story.append(Paragraph("★は確定ですいちゃん用の商品。番号は 01 から。", note))
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
        if p["star"]:
            text.append(Paragraph("あげる相手が決まっている", ParagraphStyle("star", parent=small, textColor=STAR)))
        text.append(Paragraph(p["desc"], body))
        for line in p["notes"]:
            text.append(Paragraph(line, small))
        caption_p = Paragraph("画像 " + "、".join(p["images"]), caption)
        text_h = packed(text)
        cap_h = packed([caption_p])
        room = frame_h - text_h - cap_h - 4 * mm
        preferred = 95 * mm if n == 1 else 78 * mm if n == 2 else 62 * mm
        image_h = min(preferred, max(36 * mm, room))
        block = text + [image_row(paths, width, image_h), caption_p]
        if packed(block) > frame_h:
            raise SystemExit(f"{label} does not fit on one page")
        story.append(KeepTogether(block))

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(products)} products)")


if __name__ == "__main__":
    build()
