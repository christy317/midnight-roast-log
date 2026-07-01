# Roast

A personal roast pork batch logger — built for my partner who's going through his experimental 'phase'. This dashboard helps him track every detail, score every batch, and chase the perfect crackling.

![Roast preview](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e028ca0-fffa-4bd0-8670-0058a2593746/id-preview-5facce0a--fc28dbc2-ee07-4bdb-9bcc-a9508e6aa5d8.lovable.app-1777580618697.png)

## What it does

- Log each batch with a name, date, notes, and an optional photo
- Score four dimensions out of 10: **Skin**, **Glaze**, **Fat-to-Meat ratio**, and **Overall**
- Mark batches as **variations** of earlier attempts — trace your recipe lineage
- Track the **best batch** across your ledger

## Design

**Midnight Canteen** — a dark, warm aesthetic inspired by late-night, Asian hawker-style eateries:
- Near-black background with warm undertone
- Burnt amber-orange accents
- Bebas Neue display headings, DM Mono body text
- Custom SVG score dials with glowing amber arcs
- Weighty, tactile range sliders

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- shadcn/ui components
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and start logging batches.

## Live demo

Try it at [midnight-roast-log.lovable.app](https://midnight-roast-log.lovable.app)

## About

This is a personal project built with Lovable — both a useful tool for my partner's roast experiments and a way to learn React and design in practice.

## Data

Everything is stored in your browser's `localStorage` under the key `roast.batches.v1`. Export or back up your data by copying the value from your browser's dev tools if needed.

## License

MIT
