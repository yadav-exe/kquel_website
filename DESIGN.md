---
name: Nocturnal Sanctuary
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#c9c4d8'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#938ea1'
  outline-variant: '#484555'
  surface-tint: '#cabeff'
  primary: '#cabeff'
  on-primary: '#31009a'
  primary-container: '#947dff'
  on-primary-container: '#2a0088'
  inverse-primary: '#603ce2'
  secondary: '#c4c6ce'
  on-secondary: '#2d3037'
  secondary-container: '#464950'
  on-secondary-container: '#b6b8c0'
  tertiary: '#c6c5cf'
  on-tertiary: '#2f3037'
  tertiary-container: '#909099'
  on-tertiary-container: '#282930'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4816cb'
  secondary-fixed: '#e0e2ea'
  secondary-fixed-dim: '#c4c6ce'
  on-secondary-fixed: '#181c21'
  on-secondary-fixed-variant: '#44474d'
  tertiary-fixed: '#e3e1eb'
  tertiary-fixed-dim: '#c6c5cf'
  on-tertiary-fixed: '#1a1b22'
  on-tertiary-fixed-variant: '#46464e'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
---

## Brand & Style
The brand personality is anchored in the concept of a "Nocturnal Sanctuary"—a cinematic, high-end wellness experience that feels hushed, sensory, and exclusive. The target audience seeks a meditative escape, valuing tactile quality and digital silence.

The design style is a sophisticated blend of **Minimalism** and **High-Contrast Cinematic** aesthetics. It utilizes expansive black space to create a sense of infinite depth, punctuated by sharp metallic details and a singular "jewel-lit" accent. The atmosphere is evocative of a darkened spa at midnight, where light is used sparingly to guide the eye toward sensory focal points.

## Colors
The palette is dominated by **#0B0B0F**, a near-black charcoal that provides a deep, void-like backdrop. 

- **Violet Jewel (#7C5CFF):** Used exclusively for high-intent actions and focal points. It should appear as if glowing from within the darkness.
- **Silver Chrome (#C7C9D1):** Applied to hairlines, iconography, and subtle metadata to provide a cold, metallic contrast to the violet glow.
- **Surface Tiers:** Secondary surfaces (#16161C and #1E1F26) are used to define subtle structural containers without breaking the illusion of a continuous, dark environment.

## Typography
The typographic system relies on the tension between a high-contrast, elegant serif and a technical, clean grotesque.

- **Headlines:** Use **Playfair Display** (serving as a high-contrast serif alternative) for large, declarative statements. It should feel literary and authoritative.
- **Body & UI:** Use **Hanken Grotesk** for all functional text. Its neutral, sharp construction ensures legibility against the dark background.
- **Information Hierarchy:** Heavy use of wide-tracked, uppercase labels for metadata to reinforce the technical/professional spa aesthetic.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a curated, editorial feel. Large margins (80px+) are essential to evoke a sense of luxury and "unused space."

- **Horizontal Rhythm:** A 12-column grid with generous 24px gutters.
- **Vertical Rhythm:** Elements are separated by large blocks of whitespace (multiples of 64px) to allow the eye to rest.
- **Dividers:** Use 0.5px silver hairlines to separate content sections instead of solid backgrounds. Dividers should often span the full width of the container.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Light Emission** rather than traditional shadows.

- **Tiers:** Elements don't "float" with shadows; they sit on slightly lighter surfaces (#16161C).
- **The Glow:** The only "shadows" permitted are subtle, violet-tinted outer glows (e.g., `0px 0px 20px rgba(124, 92, 255, 0.3)`) used exclusively for active buttons or hovered states.
- **Chrome Accents:** Use 1px borders in #C7C9D1 at low opacity (15-20%) to define element edges with a "metallic" reflection.

## Shapes
The design system utilizes **Sharp** (0px) corners for all structural elements including buttons, cards, and input fields. This reinforces the architectural, precise nature of the brand. Subtle exceptions may be made for iconography, which should maintain a consistent stroke weight of 1px or 1.5px.

## Components
- **Buttons:** Primary buttons are sharp-edged, solid #7C5CFF with white text. Secondary buttons are outlined with 1px #C7C9D1 hairlines. Hover states trigger a soft violet glow.
- **Inputs:** Minimalist bottom-border-only fields in #C7C9D1. Labels use the `label-caps` typography style, positioned above the field.
- **Cards:** No background color by default; content is separated by 1px silver hairlines. If a container is required, use #16161C.
- **Lists:** High-density text with significant vertical padding (24px+) between items, separated by horizontal hairlines.
- **Progress Indicators:** Thin, 2px violet bars. No rounded caps; everything remains strictly rectangular.
- **Imagery:** Photography should be low-key, high-contrast, with deep shadows and focused highlights (Chiaroscuro style).