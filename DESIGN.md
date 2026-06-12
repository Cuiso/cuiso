---
name: Cuiso Portfolio
version: alpha
description: Minimal single-column developer portfolio — light, near-monochrome with a charcoal accent, Inter, soft-gray cards on a light canvas.
colors:
  primary: "#2B2F3A"
  surface: "#F6F7F8"
  surfaceCard: "#EEF0F3"
  ink: "#1F2430"
  muted: "#6B7280"
  hairline: "#E3E5EA"
  on-primary: "#FFFFFF"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 700
    lineHeight: "1.05"
  h1:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: "1.1"
  h2:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 700
    lineHeight: "1.2"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: "1.6"
  label-mono:
    fontFamily: SF Mono
    fontSize: 0.8125rem
    fontWeight: 500
    letterSpacing: "0em"
rounded:
  sm: 8px
  md: 16px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: 11px 20px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 11px 20px
  divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
  button-tertiary:
    backgroundColor: "{colors.surfaceCard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 11px 20px
  caption-muted:
    textColor: "{colors.muted}"
  page:
    backgroundColor: "{colors.surface}"
  card:
    backgroundColor: "{colors.surfaceCard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  chip:
    backgroundColor: "{colors.surfaceCard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
---

## Overview

Personal portfolio for **Cuiso** (Luis Angelo Rodriguez). The interface follows a **minimal, single-column "devfolio" layout**: a narrow centered column on a light cool-gray canvas, content presented as **typographic lists and soft-gray cards** with no chrome. Hierarchy comes from **scale, weight, and surface shifts — never elevation**. The palette is **near-monochrome**: charcoal ink and grays, with a single **charcoal** accent reserved for the primary action and dark pills. Light theme only.

## Colors

- **Primary / charcoal (#2B2F3A):** the only filled-action color — primary buttons, dark status/CTA pills, active chips. Used sparingly.
- **Ink (#1F2430):** headings and primary text.
- **Muted / ash (#6B7280):** secondary text, dates, descriptions, captions.
- **Surface (#F6F7F8):** page canvas.
- **Surface card (#EEF0F3):** soft-gray cards, chips, and icon buttons — borderless, slightly darker than the canvas for separation.
- **Hairline (#E3E5EA):** the only divider/border, used for thin rules (section/blog separators).

## Typography

- **Inter** for everything (display, headings, body) — bold (700) for the name and section headings, regular (400) for body.
- **SF Mono / system monospace** for small "guiño" labels only: the `cuiso` wordmark, the hero status pill, and meta/date lines.
- No serif, no decorative display face.

## Layout

- **Single centered column, `max-w-2xl` (~42rem)** for every section; horizontal padding `px-5`.
- Hero is **centered** (avatar → name → subtitle → status pill → social icons); all other sections are **left-aligned** with a bold heading and a stacked list.
- Vertical rhythm: section padding `py-12`; minimal sticky top bar (wordmark + locale + blog), no full nav.

## Elevation & Depth

- **Flat by design.** No drop shadows on cards, buttons, or pills. The single permitted shadow (`--shadow-product`) is reserved for imagery only.
- Separation comes from the **surface shift** (cards `#EEF0F3` on canvas `#F6F7F8`) and **hairline** rules — not from shadows.

## Shapes

- **rounded.full (9999px)** for every interactive pill: buttons, chips, badges, icon buttons.
- **rounded.md (16px)** for cards and tiles.
- **rounded.sm (8px)** for inputs and inline code.

## Components

- **Buttons (pills):** `primary` = charcoal fill + white text; `secondary` = 1px hairline outline + ink text; `tertiary` = soft-gray fill + ink text; `ghost` = ink text link. Defined in `src/components/ui/Button.tsx`.
- **Cards:** soft-gray fill, 16px radius, no border, no shadow, `p-6`. `src/components/ui/Card.tsx`.
- **Chips / badges:** soft-gray pills; active chip uses the charcoal fill. `Chip.tsx` / `Badge.tsx`.
- **Status pill:** dark charcoal pill with a status dot + monospace role text (hero).

## Do's and Don'ts

- **Do** keep the surface flat — separate with the gray card fill and hairlines, never shadows.
- **Do** keep blue out of the UI; the system is monochrome (charcoal + grays). Color only ever comes from third-party brand logos.
- **Do** reserve charcoal for the primary action and dark pills so each appearance carries weight.
- **Don't** widen the content past `max-w-2xl` or add a full navigation bar — the minimal single column is the signature.
- **Don't** reintroduce skeuomorphic chrome (top highlights, inset wells, layered shadows) or a dark theme.
