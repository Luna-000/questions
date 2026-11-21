"""Flat cafe illustrations for the monitor layouts.

Shapes are bold enough to read from across the room. Text stays outside
the drawing so Canva can edit the words.
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


def qr(x, y, size, color):
    return (
        "G",
        "QR",
        [
            R(x, y, size, size, None, color, 1.25),
            T(x, y, size, size, "QR", "latin", 15, color, "center", 500, 0.28, 1, "middle"),
        ],
    )

CERAMIC = "#F7F3EC"
COFFEE = "#3C2A22"
CREMA = "#6B4632"
TERR = "#D26A45"
LEAF = "#2C6B4F"
LEAF2 = "#7EAA8C"
WOOD = "#C6A36A"
WOOD_DARK = "#6E5138"
SKY = "#C5D5D0"
SUN = "#E7B15A"
SKIN = "#F0C9A8"
SKIN_SHADOW = "#E2B594"
NAVY = "#243044"
BLUSH = "#E7A48C"


def S(x, y, w, h, viewbox, inner):
    return ("S", x, y, w, h, viewbox, inner)


def _cup_body(ceramic, coffee, crema, x, y, s=1.0):
    """A cup in local coordinates. s scales the 200-wide drawing."""
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <path d="M46 18 C28 8 18 -18 34 -42" fill="none" stroke="{BRASS}" stroke-width="7" stroke-linecap="round"/>
      <path d="M86 10 C70 -8 96 -28 78 -52" fill="none" stroke="{BRASS}" stroke-width="7" stroke-linecap="round"/>
      <path d="M126 16 C146 0 128 -24 148 -46" fill="none" stroke="{BRASS}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="96" cy="168" rx="78" ry="16" fill="{PAPER_DEEP}"/>
      <ellipse cx="96" cy="160" rx="70" ry="12" fill="{CERAMIC}" stroke="{INK}" stroke-width="5"/>
      <path d="M36 36 C28 110 40 150 62 164 L130 164 C152 150 164 110 156 36 Z" fill="{ceramic}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="96" cy="40" rx="58" ry="16" fill="{coffee}" stroke="{INK}" stroke-width="5"/>
      <ellipse cx="86" cy="36" rx="30" ry="8" fill="{crema}"/>
      <ellipse cx="74" cy="34" rx="10" ry="4" fill="{WOOD}"/>
      <path d="M156 62 C204 62 208 132 156 136" fill="none" stroke="{INK}" stroke-width="14" stroke-linecap="round"/>
      <path d="M156 62 C192 68 196 126 156 136" fill="none" stroke="{ceramic}" stroke-width="6" stroke-linecap="round"/>
    </g>
    """


def cup_scene(disc=PAPER_DEEP, ceramic=CERAMIC):
    inner = f"""
    <circle cx="200" cy="280" r="188" fill="{disc}"/>
    {_cup_body(ceramic, COFFEE, CREMA, 78, 150, 1.35)}
    """
    return "0 0 400 560", inner


def plant(x, y, s=1.0):
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <path d="M46 70 L34 118 L86 118 L74 70 Z" fill="{WOOD_DARK}"/>
      <rect x="28" y="112" width="64" height="16" rx="4" fill="{WOOD}"/>
      <ellipse cx="40" cy="70" rx="26" ry="40" fill="{LEAF}" transform="rotate(-28 40 70)"/>
      <ellipse cx="78" cy="64" rx="26" ry="42" fill="{LEAF2}" transform="rotate(24 78 64)"/>
      <ellipse cx="60" cy="48" rx="22" ry="46" fill="{LEAF}"/>
      <rect x="56" y="78" width="8" height="36" rx="3" fill="{WOOD_DARK}"/>
    </g>
    """


def chair(x, y, s=1.0, wood=WOOD_DARK):
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <rect x="34" y="18" width="16" height="150" rx="8" fill="{wood}"/>
      <rect x="110" y="18" width="16" height="150" rx="8" fill="{wood}"/>
      <rect x="28" y="18" width="104" height="18" rx="8" fill="{wood}"/>
      <rect x="42" y="52" width="76" height="10" rx="4" fill="{WOOD}"/>
      <rect x="42" y="78" width="76" height="10" rx="4" fill="{WOOD}"/>
      <rect x="22" y="118" width="116" height="18" rx="6" fill="{WOOD}"/>
      <rect x="36" y="136" width="12" height="48" rx="4" fill="{wood}"/>
      <rect x="112" y="136" width="12" height="48" rx="4" fill="{wood}"/>
    </g>
    """


def tote(x, y, s=1.0):
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <path d="M48 42 C48 18 112 18 112 42" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>
      <path d="M36 48 L28 150 L132 150 L124 48 Z" fill="{TERR}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M36 48 L124 48" fill="none" stroke="{INK}" stroke-width="6"/>
      {_cup_body(CERAMIC, COFFEE, CREMA, 28, 78, 0.42)}
    </g>
    """


def pastry(x, y, s=1.0):
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <ellipse cx="60" cy="78" rx="52" ry="14" fill="{CERAMIC}" stroke="{INK}" stroke-width="4"/>
      <ellipse cx="60" cy="58" rx="34" ry="26" fill="{WOOD}"/>
      <ellipse cx="60" cy="50" rx="22" ry="14" fill="{TERR}"/>
      <ellipse cx="50" cy="46" rx="6" ry="4" fill="{CERAMIC}"/>
    </g>
    """


def laptop(x, y, s=1.0):
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <path d="M28 28 L132 28 L140 96 L20 96 Z" fill="{NAVY}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
      <rect x="40" y="40" width="80" height="44" rx="3" fill="{SKY}"/>
      <rect x="48" y="48" width="28" height="6" rx="2" fill="{CERAMIC}"/>
      <rect x="48" y="60" width="46" height="4" rx="2" fill="{LEAF2}"/>
      <path d="M8 96 L152 96 L140 114 L20 114 Z" fill="{INK}"/>
      <rect x="70" y="100" width="20" height="4" rx="1" fill="{WOOD}"/>
    </g>
    """


def person(x, y, s=1.0, shirt=TERR, legs=NAVY, laptop_on=False):
    table_objects = laptop(18, 300, 0.72) if laptop_on else ""
    cup = "" if laptop_on else _cup_body(CERAMIC, COFFEE, CREMA, 8, 292, 0.55)
    return f"""
    <g transform="translate({x} {y}) scale({s})">
      <rect x="168" y="250" width="18" height="230" rx="8" fill="{WOOD_DARK}"/>
      <rect x="78" y="236" width="150" height="22" rx="10" fill="{WOOD_DARK}"/>
      <rect x="62" y="392" width="180" height="20" rx="8" fill="{WOOD}"/>
      <rect x="92" y="430" width="36" height="150" rx="16" fill="{legs}" transform="rotate(7 110 500)"/>
      <rect x="150" y="430" width="36" height="150" rx="16" fill="{NAVY}" transform="rotate(-6 168 500)"/>
      <ellipse cx="104" cy="586" rx="34" ry="13" fill="{INK}"/>
      <ellipse cx="196" cy="582" rx="34" ry="13" fill="{INK}"/>
      <rect x="78" y="268" width="150" height="150" rx="64" fill="{shirt}"/>
      <path d="M118 286 L150 330 L182 286" fill="{CERAMIC}"/>
      <rect x="132" y="236" width="30" height="40" rx="12" fill="{SKIN}"/>
      <circle cx="146" cy="176" r="58" fill="{SKIN}"/>
      <circle cx="92" cy="188" r="11" fill="{SKIN_SHADOW}"/>
      <path d="M92 168 C96 108 206 102 214 172 C196 132 112 128 92 168 Z" fill="{INK}"/>
      <path d="M90 160 C70 200 78 252 112 258 C96 214 84 184 90 160 Z" fill="{INK}"/>
      <path d="M120 118 C150 156 196 148 214 124 C186 108 146 108 120 118 Z" fill="{INK}"/>
      <circle cx="168" cy="184" r="5.5" fill="{INK}"/>
      <ellipse cx="184" cy="202" rx="11" ry="6" fill="{BLUSH}"/>
      <rect x="70" y="330" width="90" height="26" rx="13" fill="{shirt}" transform="rotate(16 115 343)"/>
      <circle cx="78" cy="362" r="15" fill="{SKIN}"/>
      <rect x="20" y="368" width="150" height="14" rx="4" fill="{WOOD}"/>
      <rect x="48" y="382" width="12" height="54" fill="{WOOD_DARK}"/>
      {cup}
      {table_objects}
    </g>
    """


def window_scene():
    inner = f"""
    <rect width="640" height="760" fill="{PAPER_DEEP}"/>
    <rect x="70" y="48" width="500" height="560" rx="6" fill="{INK}"/>
    <rect x="90" y="68" width="220" height="246" fill="{SKY}"/>
    <rect x="330" y="68" width="220" height="246" fill="#D5E3DE"/>
    <rect x="90" y="334" width="220" height="246" fill="#D5E3DE"/>
    <rect x="330" y="334" width="220" height="246" fill="{SKY}"/>
    <circle cx="176" cy="160" r="46" fill="{SUN}"/>
    <rect x="400" y="214" width="8" height="46" rx="2" fill="{WOOD_DARK}"/>
    <circle cx="392" cy="196" r="26" fill="{LEAF}"/>
    <circle cx="422" cy="210" r="20" fill="{LEAF2}"/>
    <rect x="36" y="608" width="568" height="26" rx="4" fill="{CERAMIC}" stroke="{INK}" stroke-width="6"/>
    {plant(70, 500, 1.15)}
    {_cup_body(CERAMIC, COFFEE, CREMA, 360, 470, 0.85)}
    """
    return "0 0 640 760", inner


def still_life():
    inner = f"""
    <ellipse cx="320" cy="390" rx="280" ry="36" fill="{PAPER_DEEP}"/>
    <rect x="40" y="300" width="560" height="28" rx="6" fill="{WOOD}"/>
    <rect x="90" y="328" width="16" height="70" fill="{WOOD_DARK}"/>
    <rect x="530" y="328" width="16" height="70" fill="{WOOD_DARK}"/>
    {plant(60, 120, 1.35)}
    {laptop(210, 150, 1.7)}
    {_cup_body(CERAMIC, COFFEE, CREMA, 430, 150, 0.95)}
    {pastry(300, 250, 1.1)}
    """
    return "0 0 640 460", inner


def counter_scene():
    inner = f"""
    <rect width="980" height="760" fill="{PAPER}"/>
    <rect x="0" y="0" width="980" height="470" fill="{PAPER_DEEP}"/>
    <circle cx="180" cy="70" r="34" fill="{SUN}"/>
    <rect x="492" y="0" width="8" height="150" fill="{INK}"/>
    <circle cx="496" cy="168" r="36" fill="{SUN}"/>
    <circle cx="496" cy="168" r="18" fill="{CERAMIC}"/>
    {plant(70, 250, 1.8)}
    <rect x="0" y="500" width="980" height="150" fill="{WOOD}"/>
    <rect x="0" y="500" width="980" height="18" fill="{WOOD_DARK}"/>
    <rect x="0" y="650" width="980" height="110" fill="{PAPER_DEEP}"/>
    {_cup_body(CERAMIC, COFFEE, CREMA, 250, 300, 1.15)}
    {_cup_body("#F3D2C6", COFFEE, CREMA, 470, 330, 0.95)}
    {_cup_body("#D7E4DE", COFFEE, "#8A6244", 680, 300, 1.2)}
    {pastry(400, 430, 1.3)}
    """
    return "0 0 980 760", inner


def page_19():
    box, drawing = cup_scene("#EADFD2", CERAMIC)
    return [
        R(0, 0, W_P, H_P, PAPER),
        S(90, 40, 900, 1120, box, drawing),
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
        R(0, 0, W_P, 1180, "#F6E7DC"),
        S(250, 40, 760, 1040, "0 0 280 640", person(0, 0, 1)),
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
        (300, _cup_body(CERAMIC, COFFEE, CREMA, 20, 10, 1.15), "0 0 260 230", "毎日一杯", "店内のドリップが、一日一杯"),
        (820, chair(10, 8, 1.15), "0 0 180 210", "席の優先", "混んでいる時間も、先に座れる"),
        (1340, tote(16, 0, 1.25), "0 0 200 210", "10% 引き", "持ち帰りは、いつでも一割"),
    ]
    items = [
        R(0, 0, W_P, H_P, PAPER),
        T(72, 64, 600, 32, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(72, 112, 700, 90, "三つの特典", "mincho", 60, INK, "left", 500),
        T(700, 120, 308, 80, "¥4,800", "sans", 36, INK, "right", 400),
    ]
    for y, drawing, box, title, desc in rows:
        items += [
            R(0, y, W_P, 500, PAPER if ((y // 500) % 2 == 0) else "#F7F1E8"),
            S(48, y + 70, 460, 360, box, drawing),
            T(540, y + 150, 480, 80, title, "mincho", 44, INK, "left", 500),
            T(540, y + 250, 480, 90, desc, "sans", 24, STONE, "left", 400, 0, 1.45),
        ]
    return items


def page_22():
    box, drawing = window_scene()
    return [
        R(0, 0, W_P, H_P, PAPER),
        S(40, 36, 1000, 1188, box, drawing),
        T(80, 1288, 500, 32, "MEMBERSHIP", "latin", 18, BRASS, "left", 500, 0.34),
        T(80, 1336, 920, 90, "窓辺の、いつもの席", "mincho", 52, INK, "left", 500),
        T(80, 1472, 60, 36, "¥", "sans", 22, STONE, "left", 400, 0, 1, "middle"),
        T(132, 1440, 480, 96, "4,800", "sans", 68, INK, "left", 400),
        T(80, 1564, 500, 36, "月額・税込", "sans", 22, STONE, "left", 400),
        T(80, 1660, 700, 40, "毎日一杯  ·  席の優先", "sans", 26, INK, "left", 500),
        qr(860, 1648, 128, INK),
    ]


def page_23():
    box, drawing = still_life()
    return [
        R(0, 0, W_P, H_P, PAPER),
        T(80, 80, 600, 32, "BUSINESS", "latin", 20, BRASS, "left", 500, 0.36),
        T(80, 136, 920, 160, "仕事の道具は、\nここに置いて", "mincho", 60, INK, "left", 500, 0, 1.16),
        S(40, 360, 1000, 720, box, drawing),
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
        R(0, 0, W_P, 960, "#F6E7DC"),
        R(0, 960, W_P, 960, NIGHT),
        R(0, 958, W_P, 4, BRASS),
        S(560, 40, 480, 620, "0 0 280 640", person(0, 0, 1, shirt=TERR)),
        T(56, 120, 480, 32, "PERSONAL", "latin", 18, BRASS, "left", 500, 0.3),
        T(56, 176, 500, 180, "一杯の\nメンバー", "mincho", 56, INK, "left", 500, 0, 1.12),
        T(56, 420, 480, 80, "4,800", "sans", 56, INK, "left", 400),
        T(56, 510, 420, 36, "月額・税込", "sans", 20, STONE, "left", 400),
        T(56, 620, 480, 80, "毎日一杯\n席の優先", "sans", 26, INK, "left", 500, 0, 1.35),
        S(40, 1020, 460, 600, "0 0 280 640", person(0, 0, 1, shirt=NAVY, laptop_on=True)),
        T(540, 1100, 480, 32, "BUSINESS", "latin", 18, BRASS, "left", 500, 0.3),
        T(540, 1156, 490, 180, "仕事の\n席", "mincho", 56, CREAM, "left", 500, 0, 1.12),
        T(540, 1400, 480, 80, "18,000", "sans", 52, CREAM, "left", 400),
        T(540, 1490, 460, 36, "月額・3席", "sans", 20, MUTED, "left", 400),
        T(540, 1580, 480, 90, "請求書払い\n来客も可", "sans", 26, CREAM, "left", 500, 0, 1.35),
    ]


def page_25():
    box, drawing = counter_scene()
    return [
        R(0, 0, W_L, H_L, PAPER),
        S(0, 80, 1120, 920, box, drawing),
        T(1180, 180, 680, 32, "MEMBERSHIP", "latin", 18, BRASS, "left", 500, 0.34),
        T(1180, 236, 680, 180, "カウンターの\nこちら側へ", "mincho", 56, INK, "left", 500, 0, 1.14),
        T(1180, 470, 60, 36, "¥", "sans", 22, STONE, "left", 400, 0, 1, "middle"),
        T(1236, 440, 460, 90, "4,800", "sans", 64, INK, "left", 400),
        T(1180, 548, 400, 32, "月額・税込", "sans", 18, STONE, "left", 400),
        T(1180, 640, 640, 40, "毎日一杯", "sans", 26, INK, "left", 500),
        T(1180, 696, 640, 40, "席の優先", "sans", 26, INK, "left", 500),
        T(1180, 752, 640, 40, "持ち帰り 10% 引き", "sans", 26, INK, "left", 500),
        qr(1700, 860, 140, INK),
    ]


def page_26():
    cols = [
        (0, PAPER, INK, STONE, "LIGHT", "ライト", "2,800", "月額", _cup_body(CERAMIC, COFFEE, CREMA, 30, 20, 1.35), "0 0 280 250"),
        (640, "#F6E7DC", INK, STONE, "STANDARD", "スタンダード", "4,800", "月額", f"{chair(20, 20, 1.05)}{_cup_body(CERAMIC, COFFEE, CREMA, 150, 40, 0.7)}", "0 0 320 230"),
        (1280, NIGHT, CREAM, MUTED, "BUSINESS", "ビジネス", "18,000", "月額・3席", f"{laptop(16, 36, 1.15)}{_cup_body(CERAMIC, COFFEE, CREMA, 180, 20, 0.72)}", "0 0 340 220"),
    ]
    items = []
    for x, fill, title_c, unit_c, kick, name, amount, unit, drawing, box in cols:
        items += [
            R(x, 0, 640, H_L, fill),
            T(x, 120, 640, 30, kick, "latin", 16, BRASS, "center", 500, 0.32),
            S(x + 70, 168, 500, 360, box, drawing),
            T(x + 40, 560, 560, 60, name, "mincho", 36, title_c, "center", 500),
            T(x + 40, 640, 560, 80, amount, "sans", 52, title_c, "center", 400),
            T(x, 740, 640, 30, unit, "sans", 18, unit_c, "center", 400),
        ]
    return items


def page_27():
    return [
        R(0, 0, W_L, H_L, NIGHT),
        S(40, 60, 980, 960, "0 0 280 640", person(0, 0, 1, shirt="#3E5C78", laptop_on=True)),
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
    cups = [
        (80, 220, CERAMIC),
        (560, 220, "#F3D2C6"),
        (80, 820, "#D7E4DE"),
        (560, 820, "#E7D7B8"),
    ]
    items = [
        R(0, 0, W_P, H_P, PAPER),
        T(80, 72, 700, 32, "SELF CAFE", "latin", 20, BRASS, "left", 500, 0.34),
        T(80, 116, 920, 80, "今日の一杯も、明日の一杯も", "mincho", 40, INK, "left", 500),
    ]
    for x, y, ceramic in cups:
        items.append(S(x, y, 440, 520, "0 0 240 250", _cup_body(ceramic, COFFEE, CREMA, 16, 8, 1.15)))
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
    dict(id="19", slug="19_カップのポスター", name="カップのポスター", use="サブスク", orient="縦", photo=False, illus=True, distance="一杯を大きく", w=W_P, h=H_P, build=page_19),
    dict(id="20", slug="20_席に座る人", name="席に座る人", use="サブスク", orient="縦", photo=False, illus=True, distance="人物", w=W_P, h=H_P, build=page_20),
    dict(id="21", slug="21_特典を絵で", name="特典を絵で", use="サブスク", orient="縦", photo=False, illus=True, distance="カップ・椅子・袋", w=W_P, h=H_P, build=page_21),
    dict(id="22", slug="22_窓辺の朝", name="窓辺の朝", use="サブスク", orient="縦", photo=False, illus=True, distance="窓の絵", w=W_P, h=H_P, build=page_22),
    dict(id="23", slug="23_仕事の静物", name="仕事の静物", use="ビジネス", orient="縦", photo=False, illus=True, distance="机の上", w=W_P, h=H_P, build=page_23),
    dict(id="24", slug="24_絵で見比べる", name="絵で見比べる", use="サブスク / ビジネス", orient="縦", photo=False, illus=True, distance="上下で二人", w=W_P, h=H_P, build=page_24),
    dict(id="25", slug="25_カウンター", name="カウンター", use="サブスク", orient="横", photo=False, illus=True, distance="並んだカップ", w=W_L, h=H_L, build=page_25),
    dict(id="26", slug="26_三つの絵", name="三つの絵", use="全部", orient="横", photo=False, illus=True, distance="絵で見比べ", w=W_L, h=H_L, build=page_26),
    dict(id="27", slug="27_席で働く", name="席で働く", use="ビジネス", orient="横", photo=False, illus=True, distance="人物", w=W_L, h=H_L, build=page_27),
    dict(id="28", slug="28_カップが並ぶ", name="カップが並ぶ", use="サブスク", orient="縦", photo=False, illus=True, distance="四つのカップ", w=W_P, h=H_P, build=page_28),
]
