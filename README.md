# Wortschatz

Yet another attempt to build my German vocabulary.

A German word is shown, a green line sweeps across, and the English meaning fades
in a moment later — the gap is the point: it is the window in which you guess.

## Tech Stack

- **Vue 3** with TSX (no SFCs)
- **Vite 8**
- **TypeScript 6**
- **Pinia 3** — state management, persisted to localStorage
- **Vue Router 5**
- **TailwindCSS 4**
- **Vitest 4** — unit testing
- **Firebase Hosting**

Fully offline: the word list is bundled at build time and a service worker caches
the app shell.

## Commands

```bash
# Development
npm run dev           # start dev server

# Build & Preview
npm run build         # production build
npm run preview       # preview production build locally

# Quality
npm run typecheck     # TypeScript type check
npm run test          # run tests in watch mode
npm run test:run      # run tests once

# Icons
npm run generate:icons  # regenerate PWA icons from public/icons/icon.png

# Deploy
npm run firebase:deploy  # build and deploy to Firebase
```

## Navigation

- `‹` / `›` buttons, `←` / `→` arrow keys, or a horizontal swipe
- The number box in the header jumps straight to a word
- The deck wraps around at both ends, and the app resumes where you left off

## Adding Words

Edit `src/data/words.json` — each entry is `{ "germanWord": "...", "englishWord": "..." }`.

## Layout

```
src/
  data/words.json     # the word list, bundled at build time
  domain/deck.ts      # pure index arithmetic — no Vue, no storage
  stores/deck.ts      # where you are in the deck (persisted)
  composables/        # deck, theme, swipe, install prompt
  components/         # header, word card, reveal bar, footer, install banner
  views/Home.tsx
```
