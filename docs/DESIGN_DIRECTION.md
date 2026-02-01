# Design Direction: The Digital Cathedral

**Aesthetic Goal:** Avant-Garde / Artistic / Textured / Collage
**Keywords:** Raw, Authentic, Tactile, Imperfect, Spirit-filled.

This design direction abandons the "clean tech" look entirely. It aims to feel like a handcrafted journal or an art gallery exhibit. It embraces imperfection, texture (noise/paper), and unexpected layouts to communicate that the church is a living, breathing, and authentic community, not a corporation.

## 1. Design Tokens

### Colors (OKLCH)

Shift from "Clean White" to "Warm Paper" & "Ink".

- **Background:** Warm Beige / Sand / Old Paper (e.g., OKLCH `0.96 0.02 95`).
- **Foreground:** Deep Ink / Charred Wood (not black).
- **Accents:** Muted Clay, Olive, or Deep Maroon.
- **Texture:** CSS noise overlays or paper grain images are essential.

### Typography

- **Headings (Serif):** Expressive & Editorial.
  - Large, maybe italicized variants for emphasis.
- **Body (Sans):** Clean geometric sans.
- **Accents (Mono):** **CRITICAL**. Use Monospace fonts for labels, dates, and metadata to give a "technical" or "typewriter" contrast to the organic serif.

### Spacing & Layout

- **The "Broken Grid":** Elements should not always align perfectly.
- **Overlaps:** Images overlapping text, text overlapping images.
- **Asymmetry:** 1 column vs 3 columns. Heavy left align vs heavy right align.

## 2. Component Directives

### Hero Section

- **Visuals:** **Collage Style**. Do not use a single hero image. Use 2-3 images (varying aspect ratios, maybe one rotated 2deg) layered over each other.
- **Typography:** Mixed bag. Serif for "Welcome", Mono for "Est. 1992".
- **Texture:** Torn paper edges (CSS `clip-path`) or "tape" visual elements.

### Navigation

- **Style:** "Brutalist" or "Floating".
- **Border:** Distinct, raw borders (1px or 2px solid).
- **Layout:** High contrast.

### Cards & Surfaces

- **Style:** "Scrapbook" cards.
- **Effect:** Slight rotation on hover (`rotate-1`).
- **Borders:** Raw borders, no shadow, or "hard" offset shadow (`box-shadow: 4px 4px 0px 0px black`).

## 3. General "Don'ts"

- **No** perfect rounded corners (unless acting as a contrast).
- **No** "corporate" stock photo grids.
- **No** "glassmorphism" (keep it raw/opaque).
