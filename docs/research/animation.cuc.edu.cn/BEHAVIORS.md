# Behaviors — animation.cuc.edu.cn (zh.html)

## Scroll Sweep

- No header shrink on scroll
- No scroll-driven tab switching
- No Lenis / smooth scroll library detected
- Hero bottom arrow links to `#welcome` (native smooth scroll)

## Click Sweep

- **Burger menu (≤991px):** Opens full-height white overlay with 3-column link grid
- **Language ZH/EN:** External navigation
- **News arrows:** Swiper prev/next, disabled class `is-disabled` at bounds
- **News cards / major links / nav links:** External page navigation

## Hover Sweep

- **Nav links:** Blue underline bar (static visible on desktop)
- **Buttons (.btn):** Background fill expands left-to-right (0 → 100% width, #ddd or #a91117)
- **Hero scroll arrow:** bg rgba(0,0,0,0.4) → 0.6
- **News slider arrows:** same as hero arrow
- **Footer links:** color #fff → #b7b7b7
- **Major links:** text color → #da2128

## Responsive Breakpoints

| Width | Changes |
|-------|---------|
| ≤991px | Hide desktop nav list; show burger; major grid → 1 col |
| ≤767px | Hero 320px; menu single column; hide hero arrow |
| Swiper | 1 slide (0–767), 2 (767+), 3 (992+) |
