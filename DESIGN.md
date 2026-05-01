---
name: Cuiso Portfolio
version: alpha
description: Skeuomorphic-soft personal portfolio with blue, red, and green accents on gray surfaces.
colors:
  primary: "#2563EB"
  secondary: "#DC2626"
  tertiary: "#15803D"
  surface: "#E5E7EB"
  surfaceDark: "#1F2937"
  surfaceCard: "#F3F4F6"
  surfaceCardDark: "#374151"
  ink: "#0F172A"
  inkDark: "#F1F5F9"
  muted: "#64748B"
  mutedDark: "#94A3B8"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
typography:
  display:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: 800
    lineHeight: "1.1"
  h1:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: "1.2"
  h2:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: "1.25"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: "1.6"
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: 0.08em
rounded:
  sm: 8px
  md: 14px
  lg: 20px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    rounded: "{rounded.md}"
    padding: 12px
  button-success:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: 12px
  caption-muted:
    textColor: "{colors.muted}"
  caption-muted-dark:
    textColor: "{colors.mutedDark}"
  page-light:
    backgroundColor: "{colors.surface}"
  card-raised:
    backgroundColor: "{colors.surfaceCard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  panel-dark:
    backgroundColor: "{colors.surfaceDark}"
    textColor: "{colors.inkDark}"
    rounded: "{rounded.lg}"
  panel-dark-card:
    backgroundColor: "{colors.surfaceCardDark}"
    textColor: "{colors.inkDark}"
    rounded: "{rounded.lg}"
---

## Overview

Personal portfolio for **Cuiso** (Luis Angelo Rodriguez Parreño). The interface reads as **soft skeuomorphism on a neutral gray canvas**: elevated panels and buttons with subtle top highlights, inner shadows, and restrained gradients so elements feel tactile without looking dated.

## Colors

- **Primary (#2563EB):** main actions, primary CTAs, links emphasis.
- **Secondary (#DC2626):** secondary emphasis, badges, alternate CTAs.
- **Tertiary (#16A34A):** success states, positive highlights, accents in skill tags.
- **Surface (#E5E7EB) / Surface dark (#1F2937):** page background (light/dark).
- **Surface card (#F3F4F6) / Surface card dark (#374151):** raised cards slightly lighter/darker than the page for separation.
- **Ink / Muted:** body text and secondary text for each theme.

## Typography

- **Inter** for display, headings, and body (readable, modern).
- **JetBrains Mono** for label-caps (navigation pills, micro-labels, chip prefixes).

## Layout

- Single-page sections with anchor navigation; max content width **72rem** (`max-w-6xl` / `--breakpoint` aligned).
- Vertical rhythm uses `spacing` tokens between blocks; section vertical padding **5rem** (`py-20`).

## Elevation & Depth

- **Raised:** combined inset top highlight, inset bottom depth, light contact shadow, and soft drop shadow (see CSS variables `--shadow-raised`).
- **Pressed:** inverted for `active`/`aria-pressed` on interactive affordances.
- **Inset pits:** inputs and recessed wells use `--shadow-inset` on a surface slightly darker than the card.

## Shapes

- **rounded.sm** for compact controls; **rounded.md** for primary buttons; **rounded.lg** for cards; **rounded.full** for pills (nav, chips).

## Components

- **Buttons:** gradient top-to-bottom, 1px border slightly darker than fill, `button-*` tokens map to variants (primary, secondary, success).
- **Cards:** `card-raised` background, large radius, raised shadow; optional inner border for definition in dark mode.
- **Chips / badges:** shallow raised or inset pills; tertiary chip for “tooling” tags.

## Do's and Don'ts

- **Do** keep shadows layered but soft; prefer luminance shifts over heavy blur.
- **Do** ensure focus-visible rings remain visible on skeuomorphic surfaces (high contrast ring, not a faint glow).
- **Don’t** add skeuomorphic chrome to every element—flat typography areas on gray reduce noise.
- **Don’t** use pure black or pure white for large fills; stick to ink and surface tokens.
