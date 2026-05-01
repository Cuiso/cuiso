# Cuiso — portfolio

Portfolio personal (Next.js 16) con UI **skeuomórfica suave**: superficies elevadas, huecos inset y gradientes sutiles sobre gris. Tema claro/oscuro. Idiomas: **es** (por defecto), **en**.

## Scripts

- `pnpm dev` — servidor de desarrollo
- `pnpm build` / `pnpm start` — producción
- `pnpm lint` — ESLint
- `pnpm design:lint` — validar [`DESIGN.md`](./DESIGN.md) con `@google/design.md`

## Contenido

- **Textos / i18n:** [`messages/es.json`](./messages/es.json), [`messages/en.json`](./messages/en.json)
- **Datos estructurados:** [`src/data/`](./src/data)
- **Blog (MDX):** [`content/blog/`](./content/blog) — `locale: es` o `locale: en` en el front matter
- **CV:** sustituye [`public/cv.pdf`](./public/cv.pdf) por tu PDF real (ahora es un marcador de posición)

## Entorno

- `NEXT_PUBLIC_SITE_URL` — URL canónica para metadata (opcional en dev)

## Sistema de diseño

[DESIGN.md](./DESIGN.md) sigue el formato [Google DESIGN.md](https://github.com/google-labs-code/design.md) (tokens + narrativa).
