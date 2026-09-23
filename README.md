# firefly-web

Landing page untuk [Firefly](https://github.com/dickymuliafiqri/firefly): AI gateway OpenAI-wire-compatible, ditulis dalam Go murni.

Dibangun dengan **Astro** + **React Islands** + **Tailwind CSS** + **Bun**.

## Install dependencies

```bash
bun install
```

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `bun run dev` | Dev server Astro (`astro dev`) |
| `bun run build` | Build static ke `dist/` (`astro build`) |
| `bun run preview` | Preview hasil build (`astro preview`) |
| `bun run check` | Type-check file Astro/TS (`astro check`) |
| `bun run test` | Jalankan unit test (`vitest run`) |
| `bun run lint` | Lint source (`biome check src`) |
| `bun run format` | Format source (`biome format --write src`) |

## Struktur

```
src/
├── components/          # Komponen Astro + island React
│   ├── CtaSection.astro
│   ├── features/        # FeatureTabs (React island) + diagram SVG
│   ├── FirefliesCanvas.tsx
│   ├── Hero.astro
│   ├── Nav.astro
│   ├── ParallaxScript.astro
│   ├── ProvidersSection.astro
│   ├── Scenery.astro
│   ├── Sky.astro
│   ├── SupportersSection.astro
│   └── UndergroundFooter.astro
├── data/
│   ├── providers.ts     # Path SVG logo asli model provider
│   └── supporters.ts    # Data dummy sponsors, supporters, used-by
├── layouts/BaseLayout.astro
├── pages/index.astro    # Halaman tunggal
└── styles/global.css    # Tailwind + token tema
```

