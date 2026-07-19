"""Generate 改革期 timeline PNG matching official CUC anima history style."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cuc-anima" / "images" / "about" / "gaigeqi-timeline.png"

WIDTH = 1573
HEIGHT = 900
COLOR_TITLE = (52, 58, 64, 255)      # #343a40
COLOR_YEAR = (183, 183, 183, 255)    # #b7b7b7
COLOR_DESC = (218, 33, 40, 255)      # #da2128

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\msyhbd.ttc",
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\simhei.ttf",
]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    paths = FONT_CANDIDATES if bold else FONT_CANDIDATES[1:]
    for path in paths:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for ch in text:
        trial = current + ch
        if font.getlength(trial) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = ch
    if current:
        lines.append(current)
    return lines


def draw_multiline(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    max_width: int,
    line_height: float = 1.75,
) -> int:
    x, y = xy
    lines = wrap_text(text, font, max_width)
    ascent, descent = font.getmetrics()
    step = int((ascent + descent) * line_height)
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += step
    return y


def main() -> None:
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    title_font = load_font(52, bold=True)
    year_font = load_font(96, bold=True)
    desc_font = load_font(26, bold=True)

    title = "改革期"
    title_w = title_font.getlength(title)
    draw.text(((WIDTH - title_w) / 2, 40), title, font=title_font, fill=COLOR_TITLE)

    draw.text((120, 260), "2030", font=year_font, fill=COLOR_YEAR)

    desc_2030 = (
        "· 开始打破以单一专业划分课程与资源的传统模式，"
        "形成动画创作、数字媒体艺术、智能交互技术、虚拟影像叙事、"
        "数字文创策划和传媒交互工程等培养方向。"
    )
    draw_multiline(draw, (720, 250), desc_2030, desc_font, COLOR_DESC, max_width=720)

    year_2032 = "2032"
    year_2032_w = year_font.getlength(year_2032)
    draw.text((WIDTH - 120 - year_2032_w, 600), year_2032, font=year_font, fill=COLOR_YEAR)

    desc_2032 = "· 启用的“Ani AI”智能教学与创作辅助系统"
    draw_multiline(draw, (120, 590), desc_2032, desc_font, COLOR_DESC, max_width=720)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG")
    print(f"Wrote {OUT} ({WIDTH}x{HEIGHT} RGBA)")


if __name__ == "__main__":
    main()
