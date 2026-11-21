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
    <polygon points="70,300 330,300 300,340 100,340" fill="url(#{gid}d)"/>
    <polygon points="72,430 328,430 300,456 100,456" fill="#DDD2C6"/>
    <polygon points="104,422 296,422 276,436 124,436" fill="#F4EFE8"/>
    <path d="M124 196 L158 418 H242 L276 196 Z" fill="url(#{gid}b)"/>
    <path d="M276 236 L348 250 L338 368 L276 354 L276 330 L314 336 L318 268 L276 260 Z" fill="#D9CFC4"/>
    <polygon points="108,176 292,176 276,216 124,216" fill="url(#{gid}c)"/>
    <polygon points="148,186 220,186 212,204 156,204" fill="#C6A36E" opacity="0.9"/>
    <path d="M156 148 L146 62" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="square" opacity="0.7"/>
    <path d="M200 140 L200 40" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="square" opacity="0.55"/>
    <path d="M244 148 L256 58" fill="none" stroke="#C6A36E" stroke-width="3" stroke-linecap="square" opacity="0.7"/>
    """


def line_figure():
    """Angular contour. One weight, no face, no circles."""
    return """
    <g fill="none" stroke="#1A1714" stroke-width="2.8" stroke-linecap="square" stroke-linejoin="miter">
      <polygon points="138,34 202,34 216,92 202,148 138,148 124,92"/>
      <path d="M152 148 L158 196"/>
      <path d="M188 148 L182 196"/>
      <path d="M92 208 L158 196 L182 196 L236 208"/>
      <path d="M92 208 L80 338"/>
      <path d="M236 208 L224 338"/>
      <path d="M80 338 L224 338"/>
      <path d="M214 214 L268 268"/>
      <path d="M268 268 L236 338"/>
      <path d="M112 338 L98 584"/>
      <path d="M188 338 L206 584"/>
      <path d="M16 342 H304"/>
      <path d="M74 342 V488"/>
      <path d="M250 342 V488"/>
      <path d="M8 300 L52 286"/>
      <path d="M8 300 L20 342"/>
      <path d="M52 286 L40 342"/>
      <path d="M20 342 L40 342"/>
      <path d="M52 300 L68 308 L62 338 L40 330"/>
    </g>
    <polygon points="16,306 42,296 38,312 18,318" fill="#3C2A22"/>
    <rect x="164" y="72" width="14" height="3" fill="#8A6B3D"/>
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
    return """
    <polygon points="70,150 150,118 230,150 150,182" fill="#C6A36A"/>
    <polygon points="78,148 78,62 104,50 104,136" fill="#5C4634"/>
    <polygon points="104,50 196,78 196,164 104,136" fill="#8A6A4A"/>
    <polygon points="86,78 168,104 168,112 86,86" fill="#C6A36A"/>
    <polygon points="86,104 168,130 168,138 86,112" fill="#C6A36A"/>
    <polygon points="78,148 64,210 80,214 94,152" fill="#5C4634"/>
    <polygon points="214,156 230,214 214,218 198,160" fill="#8A6A4A"/>
    """


def iso_bag():
    return """
    <polygon points="48,78 168,58 196,196 28,214" fill="#D26A45"/>
    <polygon points="168,58 214,82 206,206 196,196" fill="#B55234"/>
    <polygon points="70,78 160,64 168,86 78,100" fill="#E7B59A"/>
    <path d="M96 78 L108 34 H160 L176 58" fill="none" stroke="#1A1714" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter"/>
    """


def window_modern():
    return """
    <rect width="640" height="760" fill="#E6E1D8"/>
    <rect x="86" y="46" width="228" height="286" fill="#D5E2DE"/>
    <rect x="326" y="46" width="228" height="286" fill="#E7F0EC"/>
    <rect x="86" y="346" width="228" height="286" fill="#E7F0EC"/>
    <rect x="326" y="346" width="228" height="286" fill="#D5E2DE"/>
    <rect x="156" y="132" width="56" height="56" fill="#E2B15A"/>
    <polygon points="430,118 456,164 404,164" fill="#245E48"/>
    <polygon points="452,136 474,172 430,172" fill="#6E9A80"/>
    <rect x="424" y="164" width="6" height="56" fill="#245E48"/>
    <rect x="64" y="40" width="512" height="600" fill="none" stroke="#1A1714" stroke-width="6"/>
    <line x1="320" y1="40" x2="320" y2="640" stroke="#1A1714" stroke-width="3"/>
    <line x1="64" y1="340" x2="576" y2="340" stroke="#1A1714" stroke-width="3"/>
    <rect x="40" y="636" width="560" height="12" fill="#1A1714"/>
    <polygon points="168,568 200,618 136,618" fill="#245E48"/>
    <polygon points="198,586 226,630 170,630" fill="#7EAA8C"/>
    <rect x="180" y="618" width="8" height="22" fill="#5C4634"/>
    <polygon points="404,586 500,586 488,636 416,636" fill="#F7F3EC"/>
    <polygon points="404,572 500,572 500,596 404,596" fill="#3C2A22"/>
    <polygon points="428,578 468,578 464,590 432,590" fill="#C6A36E"/>
    <polygon points="396,636 508,636 496,650 408,650" fill="#DDD2C6"/>
    """


def abstract_still():
    return """
    <polygon points="70,252 590,252 550,286 110,286" fill="#E4D9CC"/>
    <polygon points="48,96 92,188 8,188" fill="#245E48"/>
    <polygon points="86,112 124,188 48,188" fill="#7EAA8C"/>
    <rect x="8" y="188" width="8" height="52" fill="#5C4634"/>
    <rect x="168" y="70" width="250" height="168" fill="#243044"/>
    <rect x="186" y="88" width="214" height="120" fill="#D5E2DE"/>
    <rect x="206" y="112" width="92" height="8" fill="#F7F3EC"/>
    <rect x="206" y="130" width="140" height="6" fill="#7EAA8C"/>
    <rect x="150" y="238" width="290" height="14" rx="2" fill="#1A1714"/>
    <polygon points="470,156 592,156 574,252 488,252" fill="#E7DDD2"/>
    <polygon points="470,142 592,142 592,170 470,170" fill="#3C2A22"/>
    <polygon points="498,150 550,150 544,164 504,164" fill="#C6A36E"/>
    <polygon points="112,214 160,214 160,252 112,252" fill="#D26A45"/>
    <polygon points="126,226 146,226 146,244 126,244" fill="#E2B15A"/>
    """


def glyph_person(fill, seat, obj):
    """Reduced geometric figure. Faceted, no face, no circles."""
    return f"""
    <rect x="140" y="96" width="20" height="32" fill="{fill}"/>
    <polygon points="150,16 188,44 188,84 150,112 112,84 112,44" fill="{fill}"/>
    <polygon points="116,122 184,122 170,176 130,176" fill="{fill}"/>
    <rect x="130" y="176" width="14" height="108" fill="{fill}"/>
    <rect x="156" y="176" width="14" height="108" fill="{fill}"/>
    <rect x="78" y="172" width="146" height="8" fill="{seat}"/>
    <rect x="96" y="180" width="8" height="46" fill="{seat}"/>
    <rect x="196" y="180" width="8" height="46" fill="{seat}"/>
    {obj}
    """


def cup_obj():
    return """
    <polygon points="24,116 80,116 72,156 32,156" fill="#F7F3EC"/>
    <polygon points="24,106 80,106 80,122 24,122" fill="#3C2A22"/>
    <polygon points="36,110 58,110 56,118 38,118" fill="#C6A36E"/>
    """


def laptop_obj():
    return """
    <rect x="18" y="112" width="70" height="46" rx="3" fill="#F4EFE8"/>
    <rect x="26" y="120" width="54" height="28" fill="#D5E2DE"/>
    <rect x="12" y="156" width="82" height="6" fill="#C6A36A"/>
    """


def counter_modern():
    cups = ""
    specs = [
        (230, 360, 150, 70, "#F7F3EC", "#3C2A22"),
        (430, 392, 118, 56, "#E7B8A8", "#3C2A22"),
        (620, 332, 168, 74, "#E7DDD2", "#2A211C"),
    ]
    for cx, top, h, r, body, drink in specs:
        cups += f"""
        <path d="M{cx-r} {top} V{top+h} A{r} {r*0.28:.0f} 0 0 0 {cx+r} {top+h} V{top}" fill="{body}"/>
        <ellipse cx="{cx}" cy="{top}" rx="{r}" ry="{r*0.28:.0f}" fill="{drink}"/>
        <ellipse cx="{cx-r*0.2:.0f}" cy="{top-2:.0f}" rx="{r*0.4:.0f}" ry="{r*0.1:.0f}" fill="#C6A36E" opacity="0.8"/>
        """
    return f"""
    <rect width="1000" height="760" fill="#E7E4DE"/>
    <rect width="1000" height="500" fill="#D7E3DF"/>
    <line x1="500" y1="36" x2="500" y2="150" stroke="#1A1714" stroke-width="2"/>
    <rect x="488" y="150" width="24" height="24" fill="none" stroke="#1A1714" stroke-width="2"/>
    <polygon points="150,300 196,372 104,372" fill="#245E48"/>
    <polygon points="190,318 228,390 152,390" fill="#7EAA8C"/>
    <rect x="168" y="372" width="10" height="140" fill="#5C4634"/>
    <polygon points="20,520 980,490 1000,560 0,590" fill="#C6A36A"/>
    <polygon points="0,560 1000,530 1000,590 0,620" fill="#8A6A4A"/>
    {cups}
    """


def mark_cup():
    return """
    <polygon points="64,72 256,72 226,230 94,230" fill="none" stroke="#1A1714" stroke-width="10" stroke-linejoin="miter"/>
    <path d="M256 114 H308 V188 H224" fill="none" stroke="#1A1714" stroke-width="10" stroke-linejoin="miter" stroke-linecap="square"/>
    <polygon points="108,98 212,98 204,128 116,128" fill="#3C2A22"/>
    <polygon points="140,106 176,106 172,118 144,118" fill="#C6A36E"/>
    """


def mark_arch():
    return """
    <path d="M108 36 V248" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    <path d="M108 36 H214" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    <path d="M214 36 V148" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    <path d="M52 148 H268" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    <path d="M78 148 V248" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    <path d="M236 148 V248" fill="none" stroke="#1A1714" stroke-width="14" stroke-linecap="square"/>
    """


def mark_screen():
    return """
    <rect x="48" y="48" width="220" height="150" fill="none" stroke="#E7E1D6" stroke-width="10"/>
    <line x1="36" y1="230" x2="280" y2="230" stroke="#E7E1D6" stroke-width="10"/>
    <line x1="158" y1="198" x2="158" y2="230" stroke="#E7E1D6" stroke-width="10"/>
    <rect x="78" y="80" width="90" height="8" fill="#C6A36A"/>
    """


def night_desk():
    return """
    <polygon points="100,520 320,492 540,520 320,548" fill="none" stroke="#3A342E" stroke-width="2"/>
    <polygon points="90,300 320,210 550,300 320,390" fill="none" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="90" y1="300" x2="90" y2="430" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="320" y1="390" x2="320" y2="520" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="550" y1="300" x2="550" y2="430" stroke="#E7E1D6" stroke-width="3"/>
    <polygon points="180,270 300,230 390,268 270,308" fill="none" stroke="#C6A36A" stroke-width="3"/>
    <polygon points="180,270 180,300 270,338 270,308" fill="none" stroke="#C6A36A" stroke-width="3"/>
    <polygon points="404,278 430,266 456,278 430,290" fill="none" stroke="#E7E1D6" stroke-width="3"/>
    <path d="M404 278 V316 L430 328 L456 316 V278" fill="none" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="430" y1="290" x2="430" y2="328" stroke="#E7E1D6" stroke-width="3"/>
    <polygon points="222,128 250,112 278,128 278,168 250,184 222,168" fill="none" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="250" y1="184" x2="250" y2="250" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="250" y1="210" x2="210" y2="250" stroke="#E7E1D6" stroke-width="3"/>
    <line x1="250" y1="210" x2="300" y2="248" stroke="#E7E1D6" stroke-width="3"/>
    <polygon points="150,250 230,230 250,300 160,320" fill="none" stroke="#E7E1D6" stroke-width="3"/>
    """


def line_cup():
    return """
    <g fill="none" stroke="#1A1714" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter">
      <path d="M90 40 L80 8"/>
      <path d="M125 44 L125 6"/>
      <path d="M160 40 L172 8"/>
      <polygon points="52,82 198,72 210,100 198,122 52,132 40,104"/>
      <path d="M40 104 L68 214 H182 L210 100"/>
      <path d="M68 214 H182"/>
      <path d="M210 122 L244 132 V180 L182 168"/>
      <polygon points="36,228 214,218 224,242 26,252"/>
    </g>
    <polygon points="72,96 168,90 178,114 62,120" fill="#3C2A22"/>
    """


def solid_cup():
    return """
    <polygon points="28,214 212,214 228,236 12,236" fill="#C9BBAE"/>
    <polygon points="48,72 192,72 166,210 74,210" fill="#1A1714"/>
    <polygon points="48,56 192,56 192,88 48,88" fill="#3C2A22"/>
    <polygon points="78,64 132,64 128,78 82,78" fill="#C6A36E"/>
    <polygon points="192,104 232,116 222,164 192,150" fill="#1A1714"/>
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
        S(40, 340, 1000, 740, "0 0 640 420", abstract_still()),
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
        S(560, 80, 460, 620, "0 0 240 320", glyph_person("#D26A45", "#1A1714", cup_obj())),
        T(56, 140, 480, 32, "PERSONAL", "latin", 18, BRASS, "left", 500, 0.3),
        T(56, 196, 500, 180, "一杯の\nメンバー", "mincho", 56, INK, "left", 500, 0, 1.12),
        T(56, 440, 480, 80, "4,800", "sans", 56, INK, "left", 400),
        T(56, 530, 420, 36, "月額・税込", "sans", 20, STONE, "left", 400),
        T(56, 640, 480, 80, "毎日一杯\n席の優先", "sans", 26, INK, "left", 500, 0, 1.35),
        S(48, 1080, 440, 600, "0 0 240 320", glyph_person("#E7E1D6", "#C6A36A", laptop_obj())),
        T(540, 1120, 480, 32, "BUSINESS", "latin", 18, BRASS, "left", 500, 0.3),
        T(540, 1176, 490, 180, "仕事の\n席", "mincho", 56, CREAM, "left", 500, 0, 1.12),
        T(540, 1420, 480, 80, "18,000", "sans", 52, CREAM, "left", 400),
        T(540, 1510, 460, 36, "月額・3席", "sans", 20, MUTED, "left", 400),
        T(540, 1600, 480, 90, "請求書払い\n来客も可", "sans", 26, CREAM, "left", 500, 0, 1.35),
    ]


def page_25():
    return [
        R(0, 0, W_L, H_L, PAPER),
        S(0, 40, 1140, 1000, "0 0 1000 760", counter_modern()),
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
        S(60, 80, 980, 900, "0 0 640 620", night_desk()),
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
