"""Illustration studies. Each layout uses a different modern drawing language.

Text stays outside the drawing so it can be edited in Canva.
"""

PAPER = "#F3EEE6"
PAPER_DEEP = "#E4DCD0"
INK = "#1A1714"
NIGHT = "#12110F"
CREAM = "#F6F2EB"
STONE = "#665E56"
BRASS = "#8A6B3D"
MUTED = "#B7AA9C"
W_P, H_P = 1080, 1920
W_L, H_L = 1920, 1080


def T(x, y, w, h, text, font, size, color, align="left", weight=400, tracking=0, lh=1.15, valign="top"):
    return ("T", x, y, w, h, text, font, size, color, align, weight, tracking, lh, valign)


def R(x, y, w, h, fill, stroke=None, sw=1):
    return ("R", x, y, w, h, fill, stroke, sw)


def S(x, y, w, h, viewbox, inner):
    return ("S", x, y, w, h, viewbox, inner)


def qr(x, y, size, color):
    return (
        "G",
        "QR",
        [
            R(x, y, size, size, None, color, 1.25),
            T(x, y, size, size, "QR", "latin", 15, color, "center", 500, 0.28, 1, "middle"),
        ],
    )


def grad_cup(gid):
    """Soft volume. No outline."""
    return f"""
    <defs>
      <linearGradient id="{gid}b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FBF8F4"/>
        <stop offset="0.55" stop-color="#E7DDD2"/>
        <stop offset="1" stop-color="#C9BBAE"/>
      </linearGradient>
      <linearGradient id="{gid}c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6A4A38"/>
        <stop offset="1" stop-color="#241812"/>
      </linearGradient>
      <radialGradient id="{gid}d" cx="50%" cy="46%" r="52%">
        <stop offset="0" stop-color="#E6D9CC"/>
        <stop offset="1" stop-color="#E6D9CC" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="200" cy="300" r="176" fill="url(#{gid}d)"/>
    <ellipse cx="200" cy="430" rx="128" ry="18" fill="#DDD2C6"/>
    <ellipse cx="200" cy="422" rx="96" ry="9" fill="#F4EFE8"/>
    <path d="M112 196 C100 310 118 390 156 418 H244 C282 390 300 310 288 196 Z" fill="url(#{gid}b)"/>
    <path d="M286 236
             C346 236 362 268 362 312
             C362 356 342 386 286 386
             L286 362
             C322 360 334 340 334 312
             C334 284 322 264 286 260 Z" fill="#D9CFC4"/>
    <ellipse cx="200" cy="198" rx="88" ry="24" fill="url(#{gid}c)"/>
    <ellipse cx="178" cy="190" rx="36" ry="9" fill="#C6A36E" opacity="0.9"/>
    <path d="M150 150 C138 112 168 96 154 58" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    <path d="M200 142 C184 96 220 78 202 40" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
    <path d="M248 152 C266 114 236 92 256 56" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
    """


def line_figure():
    """Fashion contour. One weight, no face."""
    return """
    <g fill="none" stroke="#1A1714" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="210" cy="92" r="46"/>
      <path d="M196 136 C188 168 186 196 196 214"/>
      <path d="M168 176 C210 168 250 186 262 230 C274 274 236 300 196 292"/>
      <path d="M176 214 C130 236 108 286 132 318"/>
      <path d="M196 292 C176 360 160 450 176 548"/>
      <path d="M230 300 C268 360 300 450 268 548"/>
      <path d="M150 292 H292"/>
      <path d="M168 292 V430"/>
      <path d="M274 292 V430"/>
      <path d="M108 300 C108 346 164 350 166 308"/>
      <path d="M166 318 C192 316 194 346 166 348"/>
      <ellipse cx="137" cy="302" rx="30" ry="9"/>
    </g>
    <ellipse cx="128" cy="302" rx="14" ry="4" fill="#3C2A22"/>
    """


def iso_cup():
    return """
    <ellipse cx="120" cy="168" rx="78" ry="20" fill="#E4D9CC"/>
    <path d="M42 78 V158 A78 20 0 0 0 198 158 V78" fill="#F7F3EC"/>
    <path d="M42 78 V158 A78 20 0 0 0 120 178 V98 A78 20 0 0 1 42 78" fill="#E3D7CB"/>
    <ellipse cx="120" cy="78" rx="78" ry="22" fill="#3C2A22"/>
    <ellipse cx="108" cy="74" rx="34" ry="9" fill="#A68456"/>
    <path d="M196 96 C236 100 240 150 196 156 C214 150 218 112 196 104 Z" fill="#E3D7CB"/>
    """


def iso_chair():
    """Flat isometric chair. Seat, back and three legs share one projection."""
    return """
    <polygon points="128,18 146,28 146,120 128,110" fill="#6B5344"/>
    <polygon points="40,54 128,18 128,110 40,146" fill="#8A6A4A"/>
    <polygon points="32,206 48,214 48,158 32,150" fill="#5C4634"/>
    <polygon points="118,222 138,222 138,188 118,180" fill="#6B5344"/>
    <polygon points="204,206 220,214 220,158 204,150" fill="#8A6A4A"/>
    <polygon points="40,146 128,110 216,146 128,182" fill="#C6A36A"/>
    <polygon points="40,146 128,182 128,196 40,160" fill="#A88858"/>
    <polygon points="128,182 216,146 216,160 128,196" fill="#7A5C42"/>
    """


def iso_bag():
    return """
    <polygon points="48,78 168,58 196,196 28,214" fill="#D26A45"/>
    <polygon points="168,58 214,82 206,206 196,196" fill="#B55234"/>
    <polygon points="70,78 160,64 168,86 78,100" fill="#E7B59A"/>
    <path d="M96 78 C104 28 160 24 172 58" fill="none" stroke="#1A1714" stroke-width="5" stroke-linecap="round"/>
    """


def window_modern():
    return """
    <rect width="640" height="760" fill="#E6E1D8"/>
    <rect x="86" y="46" width="228" height="286" fill="#D5E2DE"/>
    <rect x="326" y="46" width="228" height="286" fill="#E7F0EC"/>
    <rect x="86" y="346" width="228" height="286" fill="#E7F0EC"/>
    <rect x="326" y="346" width="228" height="286" fill="#D5E2DE"/>
    <circle cx="188" cy="168" r="40" fill="#E2B15A"/>
    <circle cx="430" cy="150" r="26" fill="#245E48"/>
    <circle cx="456" cy="168" r="18" fill="#6E9A80"/>
    <rect x="424" y="172" width="6" height="48" fill="#245E48"/>
    <rect x="64" y="40" width="512" height="600" fill="none" stroke="#1A1714" stroke-width="6"/>
    <line x1="320" y1="40" x2="320" y2="640" stroke="#1A1714" stroke-width="3"/>
    <line x1="64" y1="340" x2="576" y2="340" stroke="#1A1714" stroke-width="3"/>
    <rect x="40" y="636" width="560" height="12" fill="#1A1714"/>
    <circle cx="158" cy="600" r="28" fill="#245E48"/>
    <circle cx="186" cy="614" r="20" fill="#7EAA8C"/>
    <rect x="168" y="628" width="8" height="20" fill="#5C4634"/>
    <rect x="400" y="586" width="96" height="50" fill="#F7F3EC"/>
    <ellipse cx="448" cy="586" rx="48" ry="13" fill="#3C2A22"/>
    <ellipse cx="436" cy="582" rx="18" ry="5" fill="#C6A36E"/>
    <ellipse cx="448" cy="640" rx="52" ry="10" fill="#DDD2C6"/>
    """


def abstract_still():
    """Flat blocks on one baseline: pot, laptop, cup. No outline."""
    return """
    <ellipse cx="330" cy="358" rx="246" ry="12" fill="#E4D9CC"/>
    <path d="M78 268 H142 L130 340 H90 Z" fill="#E7E1D6"/>
    <ellipse cx="92" cy="214" rx="30" ry="46" fill="#245E48" transform="rotate(-16 92 214)"/>
    <ellipse cx="126" cy="206" rx="22" ry="36" fill="#6E9A80" transform="rotate(14 126 206)"/>
    <ellipse cx="110" cy="268" rx="32" ry="9" fill="#F7F3EC"/>
    <rect x="210" y="326" width="214" height="14" fill="#1A1714"/>
    <rect x="226" y="148" width="182" height="178" rx="4" fill="#243044"/>
    <rect x="240" y="162" width="154" height="136" fill="#D7E3DF"/>
    <rect x="256" y="190" width="68" height="6" fill="#F7F3EC"/>
    <rect x="256" y="208" width="104" height="5" fill="#7EAA8C"/>
    <path d="M468 228 C460 270 468 340 492 340 H538 C562 340 570 270 562 228 Z" fill="#F4EFE8"/>
    <ellipse cx="515" cy="228" rx="48" ry="14" fill="#3C2A22"/>
    <ellipse cx="500" cy="224" rx="16" ry="5" fill="#C6A36E"/>
    <path d="M560 248 C600 252 602 302 560 308 C580 302 582 258 560 254 Z" fill="#E4DCD0"/>
    """


def glyph_person(fill, seat, obj):
    """Profile of straight blocks. No face. The prop sits on the table."""
    return f"""
    <rect x="168" y="168" width="86" height="6" fill="{seat}"/>
    <rect x="176" y="174" width="5" height="52" fill="{seat}"/>
    <rect x="242" y="174" width="5" height="52" fill="{seat}"/>
    <rect x="242" y="84" width="5" height="90" fill="{seat}"/>
    <circle cx="204" cy="50" r="22" fill="{fill}"/>
    <rect x="198" y="70" width="12" height="16" fill="{fill}"/>
    <polygon points="178,88 228,84 234,152 184,158" fill="{fill}"/>
    <polygon points="108,152 234,146 238,164 104,170" fill="{fill}"/>
    <rect x="104" y="162" width="14" height="68" fill="{fill}"/>
    <rect x="18" y="140" width="158" height="6" fill="{seat}"/>
    <rect x="30" y="146" width="5" height="66" fill="{seat}"/>
    <rect x="78" y="146" width="5" height="66" fill="{seat}"/>
    {obj}
    """


def cup_obj():
    return """
    <path d="M34 140 L38 106 H66 L70 140 Z" fill="#FBF8F4"/>
    <ellipse cx="52" cy="106" rx="16" ry="5" fill="#3C2A22"/>
    <ellipse cx="48" cy="104" rx="6" ry="2" fill="#C6A36E"/>
    <path d="M70 116 H78 C88 116 88 134 78 134 H70 C78 132 80 120 70 120 Z" fill="#D2C6B8"/>
    """


def laptop_obj():
    return """
    <rect x="26" y="98" width="88" height="36" fill="#F7F3EC"/>
    <rect x="32" y="104" width="76" height="24" fill="#D5E2DE"/>
    <rect x="18" y="134" width="106" height="6" fill="#E7E1D6"/>
    """


def counter_modern():
    """Three cylinders standing on a flat counter. The lamp is a cylinder."""
    specs = [
        (250, 228, 74, "#F7F3EC"),
        (490, 156, 56, "#E7B8A8"),
        (740, 200, 78, "#3E4A45"),
    ]
    cups = []
    for cx, h, r, body in specs:
        top = 612 - h
        ry = max(8, round(r * 0.26))
        cups.append(
            f'<path d="M{cx - r} {top} V612 A{r} {ry} 0 0 0 {cx + r} 612 V{top}" fill="{body}"/>'
            f'<ellipse cx="{cx}" cy="{top}" rx="{r}" ry="{ry}" fill="#241812"/>'
            f'<ellipse cx="{cx - round(r * 0.2)}" cy="{top - 2}" rx="{round(r * 0.36)}" ry="{max(3, round(r * 0.09))}" fill="#C6A36E"/>'
        )
    return f"""
    <rect width="1000" height="930" fill="#D5E2DE"/>
    <line x1="490" y1="0" x2="490" y2="72" stroke="#1A1714" stroke-width="2"/>
    <ellipse cx="490" cy="72" rx="36" ry="8" fill="#C6A36A"/>
    <path d="M454 72 V108 A36 10 0 0 0 526 108 V72" fill="#F3EEE6"/>
    <ellipse cx="490" cy="108" rx="36" ry="10" fill="#E4D9CC"/>
    {''.join(cups)}
    <rect x="0" y="600" width="1000" height="16" fill="#C6A36A"/>
    <rect x="0" y="616" width="1000" height="78" fill="#8A6A4A"/>
    """


def mark_cup():
    return """
    <circle cx="160" cy="150" r="92" fill="none" stroke="#1A1714" stroke-width="10"/>
    <circle cx="160" cy="150" r="48" fill="#3C2A22"/>
    <circle cx="148" cy="142" r="12" fill="#C6A36E"/>
    """


def mark_arch():
    return """
    <path d="M70 250 V120 A90 90 0 0 1 250 120 V250" fill="none" stroke="#1A1714" stroke-width="14" stroke-linejoin="round"/>
    <line x1="48" y1="250" x2="272" y2="250" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    """


def mark_screen():
    return """
    <rect x="48" y="48" width="220" height="150" fill="none" stroke="#E7E1D6" stroke-width="10"/>
    <line x1="36" y1="230" x2="280" y2="230" stroke="#E7E1D6" stroke-width="10"/>
    <line x1="158" y1="198" x2="158" y2="230" stroke="#E7E1D6" stroke-width="10"/>
    <rect x="78" y="80" width="90" height="8" fill="#C6A36A"/>
    """


def night_desk():
    """Isometric line drawing: chair, desk, laptop, cup. No figure."""
    return """
    <g fill="none" stroke="#E7E1D6" stroke-width="2.2" stroke-linejoin="miter" stroke-linecap="square">
      <polygon points="100,306 170,264 170,342 100,384"/>
      <polygon points="170,426 100,384 170,342 240,384"/>
      <line x1="100" y1="384" x2="100" y2="448"/>
      <line x1="170" y1="426" x2="170" y2="490"/>
      <line x1="240" y1="384" x2="240" y2="448"/>
      <line x1="170" y1="342" x2="170" y2="406"/>
      <polygon points="400,360 220,252 400,144 580,252"/>
      <polyline points="220,252 220,260 400,368 580,260 580,252"/>
      <line x1="400" y1="360" x2="400" y2="368"/>
      <line x1="220" y1="260" x2="220" y2="360"/>
      <line x1="400" y1="368" x2="400" y2="468"/>
      <line x1="580" y1="260" x2="580" y2="360"/>
    </g>
    <g fill="none" stroke="#C6A36A" stroke-width="2.2" stroke-linejoin="miter" stroke-linecap="square">
      <polygon points="425,284 364,248 429,209 490,246"/>
      <polygon points="364,248 429,209 429,145 364,184"/>
    </g>
    <g fill="none" stroke="#E7E1D6" stroke-width="2.2" stroke-linecap="square">
      <ellipse cx="318" cy="276" rx="15" ry="7"/>
      <ellipse cx="318" cy="244" rx="15" ry="7"/>
      <line x1="303" y1="244" x2="303" y2="276"/>
      <line x1="333" y1="244" x2="333" y2="276"/>
      <path d="M333 252 C346 254 346 270 333 272"/>
    </g>
    """


def line_cup():
    return """
    <g fill="none" stroke="#1A1714" stroke-width="3" stroke-linecap="round">
      <path d="M70 86 C62 158 78 206 100 220 H150 C172 206 188 158 180 86"/>
      <ellipse cx="125" cy="86" rx="55" ry="16"/>
      <path d="M180 114 C214 118 218 172 180 178"/>
      <ellipse cx="125" cy="232" rx="72" ry="12"/>
      <path d="M96 70 C88 50 106 40 98 24"/>
      <path d="M125 66 C116 42 138 32 128 16"/>
      <path d="M154 70 C166 48 152 38 164 20"/>
    </g>
    <ellipse cx="116" cy="82" rx="22" ry="6" fill="#3C2A22"/>
    """


def solid_cup():
    return """
    <ellipse cx="120" cy="210" rx="86" ry="16" fill="#C9BBAE"/>
    <path d="M48 70 C40 150 56 196 84 210 H156 C184 196 200 150 192 70 Z" fill="#1A1714"/>
    <ellipse cx="120" cy="70" rx="72" ry="20" fill="#3C2A22"/>
    <path d="M192 100 C230 104 234 158 192 164 C214 156 216 114 192 108 Z" fill="#1A1714"/>
    """


def iso_mini():
    return """
    <ellipse cx="120" cy="196" rx="70" ry="16" fill="#E4D9CC"/>
    <path d="M50 84 V186 A70 16 0 0 0 190 186 V84" fill="#E7B8A8"/>
    <path d="M50 84 V186 A70 16 0 0 0 120 202 V100 A70 16 0 0 1 50 84" fill="#D7A090"/>
    <ellipse cx="120" cy="84" rx="70" ry="18" fill="#3C2A22"/>
    <ellipse cx="106" cy="80" rx="28" ry="7" fill="#C6A36E"/>
    """


def page_19():
    return [
        R(0, 0, W_P, H_P, PAPER),
        S(90, 40, 900, 1120, "0 0 400 560", grad_cup("a")),
        T(88, 1188, 700, 36, "MEMBERSHIP", "latin", 20, BRASS, "left", 500, 0.36),
        T(88, 1244, 900, 160, "毎朝の一杯を、\n席といっしょに", "mincho", 60, INK, "left", 500, 0, 1.16),
        T(88, 1460, 70, 40, "¥", "sans", 26, STONE, "left", 400, 0, 1, "middle"),
        T(140, 1424, 500, 100, "4,800", "sans", 76, INK, "left", 400),
        T(88, 1552, 400, 36, "月額・税込", "sans", 22, STONE, "left", 400),
        T(88, 1660, 860, 44, "毎日一杯", "sans", 28, INK, "left", 500),
        T(88, 1720, 860, 44, "席の優先", "sans", 28, INK, "left", 500),
        T(88, 1780, 860, 44, "持ち帰り 10% 引き", "sans", 28, INK, "left", 500),
    ]


def page_20():
    return [
        R(0, 0, W_P, H_P, PAPER),
        R(0, 0, W_P, 1180, "#E7E2DA"),
        S(180, 80, 720, 1000, "0 0 320 620", line_figure()),
        T(72, 1248, 500, 32, "MEMBERSHIP", "latin", 18, BRASS, "left", 500, 0.34),
        T(72, 1300, 760, 150, "この席で、\n一日が始まる", "mincho", 64, INK, "left", 500, 0, 1.14),
        T(72, 1508, 60, 36, "¥", "sans", 24, STONE, "left", 400, 0, 1, "middle"),
        T(124, 1476, 420, 96, "4,800", "sans", 72, INK, "left", 400),
        qr(860, 1496, 128, INK),
        T(72, 1628, 800, 40, "ドリップが毎日一杯", "sans", 26, INK, "left", 500),
        T(72, 1684, 800, 40, "混雑時は優先して着席", "sans", 26, INK, "left", 500),
        T(72, 1740, 800, 40, "持ち帰りは 10% 引き", "sans", 26, INK, "left", 500),
    ]


def page_21():
    rows = [
        (300, iso_cup(), "0 0 250 210", "毎日一杯", "店内のドリップが、一日一杯"),
        (820, iso_chair(), "0 0 260 230", "席の優先", "混んでいる時間も、先に座れる"),
        (1340, iso_bag(), "0 0 240 230", "10% 引き", "持ち帰りは、いつでも一割"),
    ]
    items = [
        R(0, 0, W_P, H_P, PAPER),
        T(72, 64, 600, 32, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(72, 112, 700, 90, "三つの特典", "mincho", 60, INK, "left", 500),
        T(700, 120, 308, 80, "¥4,800", "sans", 36, INK, "right", 400),
    ]
    for y, drawing, box, title, desc in rows:
        items += [
            R(0, y, W_P, 500, PAPER if ((y // 500) % 2 == 0) else "#F4EFE8"),
            S(64, y + 80, 420, 340, box, drawing),
            T(540, y + 150, 480, 80, title, "mincho", 44, INK, "left", 500),
            T(540, y + 250, 480, 90, desc, "sans", 24, STONE, "left", 400, 0, 1.45),
        ]
    return items


def page_22():
    return [
        R(0, 0, W_P, H_P, PAPER),
        S(40, 36, 1000, 1188, "0 0 640 760", window_modern()),
        T(80, 1288, 500, 32, "MEMBERSHIP", "latin", 18, BRASS, "left", 500, 0.34),
        T(80, 1336, 920, 90, "窓辺の、いつもの席", "mincho", 52, INK, "left", 500),
        T(80, 1472, 60, 36, "¥", "sans", 22, STONE, "left", 400, 0, 1, "middle"),
        T(132, 1440, 480, 96, "4,800", "sans", 68, INK, "left", 400),
        T(80, 1564, 500, 36, "月額・税込", "sans", 22, STONE, "left", 400),
        T(80, 1660, 700, 40, "毎日一杯  ·  席の優先", "sans", 26, INK, "left", 500),
        qr(860, 1648, 128, INK),
    ]


def page_23():
    return [
        R(0, 0, W_P, H_P, PAPER),
        T(80, 80, 600, 32, "BUSINESS", "latin", 20, BRASS, "left", 500, 0.36),
        T(80, 136, 920, 160, "仕事の道具は、\nここに置いて", "mincho", 60, INK, "left", 500, 0, 1.16),
        S(40, 390, 1000, 656, "0 0 640 420", abstract_still()),
        R(0, 1120, W_P, 800, NIGHT),
        T(80, 1200, 700, 40, "ビジネスプラン", "sans", 24, MUTED, "left", 500, 0.06),
        T(80, 1288, 70, 40, "¥", "sans", 26, BRASS, "left", 400, 0, 1, "middle"),
        T(140, 1252, 560, 110, "18,000", "sans", 80, CREAM, "left", 400),
        T(80, 1388, 500, 36, "月額・3席・税込", "sans", 22, MUTED, "left", 400),
        T(80, 1500, 860, 48, "請求書払いに対応", "sans", 28, CREAM, "left", 500),
        T(80, 1568, 860, 48, "同時に 3 席まで", "sans", 28, CREAM, "left", 500),
        T(80, 1636, 860, 48, "来客の一杯も含む", "sans", 28, CREAM, "left", 500),
        qr(860, 1268, 132, CREAM),
    ]


def page_24():
    return [
        R(0, 0, W_P, 960, "#E7E2DA"),
        R(0, 960, W_P, 960, NIGHT),
        R(0, 958, W_P, 3, BRASS),
        S(548, 210, 500, 446, "0 0 280 250", glyph_person("#D26A45", "#1A1714", cup_obj())),
        T(56, 140, 480, 32, "PERSONAL", "latin", 18, BRASS, "left", 500, 0.3),
        T(56, 196, 500, 180, "一杯の\nメンバー", "mincho", 56, INK, "left", 500, 0, 1.12),
        T(56, 440, 480, 80, "4,800", "sans", 56, INK, "left", 400),
        T(56, 530, 420, 36, "月額・税込", "sans", 20, STONE, "left", 400),
        T(56, 640, 480, 80, "毎日一杯\n席の優先", "sans", 26, INK, "left", 500, 0, 1.35),
        S(36, 1188, 500, 446, "0 0 280 250", glyph_person("#E7E1D6", "#C6A36A", laptop_obj())),
        T(540, 1120, 480, 32, "BUSINESS", "latin", 18, BRASS, "left", 500, 0.3),
        T(540, 1176, 490, 180, "仕事の\n席", "mincho", 56, CREAM, "left", 500, 0, 1.12),
        T(540, 1420, 480, 80, "18,000", "sans", 52, CREAM, "left", 400),
        T(540, 1510, 460, 36, "月額・3席", "sans", 20, MUTED, "left", 400),
        T(540, 1600, 480, 90, "請求書払い\n来客も可", "sans", 26, CREAM, "left", 500, 0, 1.35),
    ]


def page_25():
    return [
        R(0, 0, W_L, H_L, PAPER),
        S(0, 0, 1161, 1080, "0 0 1000 930", counter_modern()),
        T(1200, 160, 660, 32, "MEMBERSHIP", "latin", 18, BRASS, "left", 500, 0.34),
        T(1200, 216, 660, 180, "カウンターの\nこちら側へ", "mincho", 52, INK, "left", 500, 0, 1.14),
        T(1200, 450, 56, 36, "¥", "sans", 22, STONE, "left", 400, 0, 1, "middle"),
        T(1252, 420, 440, 90, "4,800", "sans", 60, INK, "left", 400),
        T(1200, 528, 400, 32, "月額・税込", "sans", 18, STONE, "left", 400),
        T(1200, 620, 620, 40, "毎日一杯", "sans", 26, INK, "left", 500),
        T(1200, 676, 620, 40, "席の優先", "sans", 26, INK, "left", 500),
        T(1200, 732, 620, 40, "持ち帰り 10% 引き", "sans", 26, INK, "left", 500),
        qr(1700, 860, 140, INK),
    ]


def page_26():
    cols = [
        (0, PAPER, INK, STONE, "LIGHT", "ライト", "2,800", "月額", mark_cup(), "0 0 320 300"),
        (640, "#E7E2DA", INK, STONE, "STANDARD", "スタンダード", "4,800", "月額", mark_arch(), "0 0 320 300"),
        (1280, NIGHT, CREAM, MUTED, "BUSINESS", "ビジネス", "18,000", "月額・3席", mark_screen(), "0 0 320 280"),
    ]
    items = []
    for x, fill, title_c, unit_c, kick, name, amount, unit, drawing, box in cols:
        items += [
            R(x, 0, 640, H_L, fill),
            T(x, 100, 640, 30, kick, "latin", 16, BRASS, "center", 500, 0.32),
            S(x + 90, 180, 460, 360, box, drawing),
            T(x + 40, 580, 560, 60, name, "mincho", 36, title_c, "center", 500),
            T(x + 40, 660, 560, 80, amount, "sans", 52, title_c, "center", 400),
            T(x, 760, 640, 30, unit, "sans", 18, unit_c, "center", 400),
        ]
    return items


def page_27():
    return [
        R(0, 0, W_L, H_L, NIGHT),
        S(36, 160, 980, 778, "0 0 680 540", night_desk()),
        T(1080, 180, 760, 32, "BUSINESS", "latin", 18, BRASS, "left", 500, 0.34),
        T(1080, 236, 760, 180, "席で、仕事が\n進んでいく", "mincho", 56, CREAM, "left", 500, 0, 1.14),
        T(1080, 480, 60, 36, "¥", "sans", 22, BRASS, "left", 400, 0, 1, "middle"),
        T(1136, 448, 500, 96, "18,000", "sans", 68, CREAM, "left", 400),
        T(1080, 560, 460, 32, "月額・3席・税込", "sans", 18, MUTED, "left", 400),
        T(1080, 660, 700, 40, "請求書払い", "sans", 26, CREAM, "left", 500),
        T(1080, 716, 700, 40, "同時に 3 席", "sans", 26, CREAM, "left", 500),
        T(1080, 772, 700, 40, "来客の一杯も含む", "sans", 26, CREAM, "left", 500),
        qr(1688, 860, 140, CREAM),
    ]


def page_28():
    drawings = [
        (70, 240, "0 0 400 560", grad_cup("b")),
        (560, 260, "0 0 250 250", line_cup()),
        (70, 820, "0 0 240 250", solid_cup()),
        (560, 820, "0 0 240 250", iso_mini()),
    ]
    items = [
        R(0, 0, W_P, H_P, "#EFEBE4"),
        T(80, 72, 700, 32, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(80, 120, 920, 70, "四つの描き方、一つの席", "mincho", 40, INK, "left", 500),
    ]
    for x, y, box, drawing in drawings:
        items.append(S(x, y, 440, 500, box, drawing))
    items += [
        R(0, 1480, W_P, 440, NIGHT),
        T(80, 1548, 560, 50, "月額メンバー", "sans", 24, MUTED, "left", 500, 0.06),
        T(80, 1616, 70, 40, "¥", "sans", 26, BRASS, "left", 400, 0, 1, "middle"),
        T(140, 1584, 480, 100, "4,800", "sans", 72, CREAM, "left", 400),
        T(80, 1716, 500, 36, "月額・税込", "sans", 20, MUTED, "left", 400),
        qr(860, 1620, 140, CREAM),
    ]
    return items


ILLUSTRATION_PAGES = [
    dict(id="19", slug="19_カップのポスター", name="カップのポスター", use="サブスク", orient="縦", photo=False, illus=True, distance="グラデーション", w=W_P, h=H_P, build=page_19),
    dict(id="20", slug="20_席に座る人", name="席に座る人", use="サブスク", orient="縦", photo=False, illus=True, distance="線画", w=W_P, h=H_P, build=page_20),
    dict(id="21", slug="21_特典を絵で", name="特典を絵で", use="サブスク", orient="縦", photo=False, illus=True, distance="アイソメ", w=W_P, h=H_P, build=page_21),
    dict(id="22", slug="22_窓辺の朝", name="窓辺の朝", use="サブスク", orient="縦", photo=False, illus=True, distance="建築図", w=W_P, h=H_P, build=page_22),
    dict(id="23", slug="23_仕事の静物", name="仕事の静物", use="ビジネス", orient="縦", photo=False, illus=True, distance="色面", w=W_P, h=H_P, build=page_23),
    dict(id="24", slug="24_絵で見比べる", name="絵で見比べる", use="サブスク / ビジネス", orient="縦", photo=False, illus=True, distance="幾何学", w=W_P, h=H_P, build=page_24),
    dict(id="25", slug="25_カウンター", name="カウンター", use="サブスク", orient="横", photo=False, illus=True, distance="円柱", w=W_L, h=H_L, build=page_25),
    dict(id="26", slug="26_三つの絵", name="三つの絵", use="全部", orient="横", photo=False, illus=True, distance="記号", w=W_L, h=H_L, build=page_26),
    dict(id="27", slug="27_席で働く", name="席で働く", use="ビジネス", orient="横", photo=False, illus=True, distance="図面", w=W_L, h=H_L, build=page_27),
    dict(id="28", slug="28_カップが並ぶ", name="カップが並ぶ", use="サブスク", orient="縦", photo=False, illus=True, distance="四種の描き方", w=W_P, h=H_P, build=page_28),
]
