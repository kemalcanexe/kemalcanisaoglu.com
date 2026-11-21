const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const S = __dirname; const icons = JSON.parse(fs.readFileSync(path.join(S, 'icons.json'), 'utf8'));
const OUT = process.argv[2] || path.join(S, 'out'); fs.mkdirSync(OUT, { recursive: true });
const only = process.argv[3] && process.argv[3] !== 'all' ? process.argv[3] : null;
const LANG = process.argv[4] || 'en';
// grade: -20% saturation, -10% brightness (matches the photo)
function grade(hex, sat = .8, val = .9) {
  let [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
  if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; }
  s *= sat; const L = l * val; const q = L < .5 ? L * (1 + s) : L + s - L * s, p = 2 * L - q;
  const f = t => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return '#' + [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}
const LABELS = { insider: 'Insider One', portakasa: 'Portakasa', icron: 'ICRON', ai: 'AI workflows', about: 'About', education: 'Education', leadership: 'Leadership', skills: 'Skills', cv: 'CV', linkedin: 'LinkedIn', contact: 'Let’s talk' };
const LABELS_TR = { insider: 'Insider One', portakasa: 'Portakasa', icron: 'ICRON', ai: 'YZ akışları', about: 'Hakkımda', education: 'Eğitim', leadership: 'Liderlik', skills: 'Yetkinlikler', cv: 'CV', linkedin: 'LinkedIn', contact: 'Konuşalım' };
const K = [
  ['insider', 'lg', '#FDE3CF', '#4a1b10'], ['portakasa', 'lg', '#EC6426', '#2a0d04'], ['icron', 'lg', '#F8A91F', '#2e1606'],
  ['ai', 'lg', '#2E573A', '#f3e6d6'], ['about', 'lg', '#72AC43', '#14260a'],
  ['education', 'sm', '#E4A5CA', '#34101f'], ['leadership', 'sm', '#66271B', '#fde3cf'], ['skills', 'sm', '#EC6426', '#2a0d04'],
  ['cv', 'sm', '#F8A91F', '#2e1606'], ['linkedin', 'sm', '#E4A5CA', '#34101f'], ['contact', 'bar', '#2b2b2b', '#eeeeee']];
const SIZE = { lg: { W: 23, D: 18, px: 640 }, sm: { W: 17.2, D: 18, px: 480 }, bar: { W: 62, D: 17.5, px: 1600 } };
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 800, height: 600 } });
  p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
  p.on('pageerror', e => console.log('PAGEERR', e.message));
  await p.addInitScript(P => { window.PARAMS = P; }, { fontUrl: 'brico.woff2', exposure: .95, envIntensity: .32, keyLight: 1.7, fillLight: .12, rimLight: .5, roughness: .62, bump: .012, sheen: .25, clearcoat: 0, spec: .35, fov: 22, elev: 60, dist: 160 });
  await p.goto('file://' + S + '/render.html'); await p.waitForFunction(() => window.ready, null, { timeout: 60000 });
  const meta = {};
  for (const [id, size, face, ink] of K) {
    if (only && id !== only) continue;
    const z = SIZE[size]; const wide = size === 'bar';
    const k = { W: z.W, D: z.D, h: 6.5, taperX: wide ? .6 : .7, taperF: .9, taperB: .5, rb: 1.2, rt: 2.2, dish: wide ? .45 : .75, px: z.px,
      face: grade(face), ink, icon: icons[id], topLabel: (LANG === 'tr' ? LABELS_TR : LABELS)[id], label: (LANG === 'tr' ? LABELS_TR : LABELS)[id], wide };
    const r = await p.evaluate(k => window.renderKey(k), k);
    fs.writeFileSync(path.join(OUT, id + '.png'), Buffer.from(r.url.split(',')[1], 'base64'));
    meta[id] = { w: r.w, h: r.h }; console.log(id, r.w, r.h);
  }
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta));
  await b.close();
})();
