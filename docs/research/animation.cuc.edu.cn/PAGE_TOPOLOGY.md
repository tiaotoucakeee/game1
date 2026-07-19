# Page Topology — animation.cuc.edu.cn (zh.html)

Target: https://animation.cuc.edu.cn/_upload/tpl/02/7a/634/template634/zh.html

## Section Order (top → bottom)

| # | Name | Type | Interaction |
|---|------|------|-------------|
| 1 | Navigation | Fixed overlay | Click-driven (burger menu ≤991px) |
| 2 | Hero Video | Flow | Static video autoplay; scroll anchor arrow |
| 3 | Welcome (#welcome) | Flow | Static; CTA link |
| 4 | Majors | Flow | Static cards with hover links |
| 5 | News | Flow | Click-driven Swiper carousel |
| 6 | Bilibili + Social | Grid | Static embed + external links |
| 7 | Footer | Flow | Static contact links |

## Layout Notes

- Fixed nav z-index 1000, white background
- Hero padding-top 60px (nav clearance), video height 80vh desktop / 320px mobile
- Welcome section red (#da2128) with decorative logo watermark at 20% opacity
- Major grid: 3 columns desktop, 1 column ≤991px
- News: flex row with left title column + swiper right
- Footer: dark (#343a40) two-column grid
