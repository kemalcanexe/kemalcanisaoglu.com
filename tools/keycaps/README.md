# Keycap renders

The console keycaps are pre-rendered images, not live 3D, so the page stays light.
`render.html` builds a Cherry-style cap in three.js (PBT material, dished top, soft key light from the
upper left, camera at 60° elevation to match the device photo) and `drive.cjs` renders every key with
Playwright into `src/assets/keys/{en,tr}/<id>.png`.

To re-render (e.g. after a label change):

```bash
cd tools/keycaps && npm init -y && npm i three@0.170.0 playwright
cp ../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2 brico.woff2
cp ../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-ext-wght-normal.woff2 brico-x.woff2
node drive.cjs ../../src/assets/keys/en all en
node drive.cjs ../../src/assets/keys/tr all tr
```

`drive.cjs` reads the icon SVGs from `icons.json`; regenerate it from `src/data/icons.ts` if icons change.
