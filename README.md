# yufeihuang.github.io

A retro pixel-art map of Vancouver, BC as a portfolio site. Click a landmark to open a window:

- **Stanley Park** → About Me
- **Downtown** → Résumé
- **Science World** → GitHub (live stats)
- **Granville Island** → Projects

## Dev

```bash
npm install
npm run dev
```

## Adding your headshot

Drop a photo at `public/headshot.jpg` — the About window uses it automatically (falls back to a pixel avatar if missing).

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages at
**https://yufeiihuang.github.io/yufeihuang/**.

One-time setup: in the repo Settings → Pages, set "Build and deployment" → Source to **GitHub Actions**.
