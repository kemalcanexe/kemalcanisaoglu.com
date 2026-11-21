const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const S = __dirname; const icons = JSON.parse(fs.readFileSync(path.join(S, 'icons.json'), 'utf8'));
const cam = JSON.parse(fs.readFileSync(path.join(S, 'camera.json'), 'utf8'));
const [OUT, ONLY, LANG = 'en', VARIANT = 'd', SS = '3'] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
function grade(hex, sat, val) {
  let [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
  if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; }
  s *= sat; const L = l * val; const q = L < .5 ? L * (1 + s) : L + s - L * s, p = 2 * L - q;
  const f = t => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return '#' + [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}
const LBL = {
  en: { insider: 'Insider One', portakasa: 'Portakasa', icron: 'ICRON', ai: 'AI workflows', about: 'About', education: 'Education', leadership: 'Leadership', skills: 'Skills', cv: 'CV', linkedin: 'LinkedIn', contact: 'Let’s talk' },
  tr: { insider: 'Insider One', portakasa: 'Portakasa', icron: 'ICRON', ai: 'YZ akışları', about: 'Hakkımda', education: 'Eğitim', leadership: 'Liderlik', skills: 'Yetkinlikler', cv: 'CV', linkedin: 'LinkedIn', contact: 'Konuşalım' } };
const MOBILE_SHORT = { en: { ai: 'AI', education: 'School', leadership: 'Lead', linkedin: 'LinkedIn', insider: 'Insider', portakasa: 'Portakasa' },
  tr: { ai: 'YZ', education: 'Eğitim', leadership: 'Liderlik', skills: 'Beceri', insider: 'Insider', portakasa: 'Portakasa', about: 'Hakkımda' } };
const K = [
  ['insider', 'P1', '#FDE3CF', '#4a1b10'], ['portakasa', 'P2', '#EC6426', '#2a0d04'], ['icron', 'P3', '#F8A91F', '#2e1606'],
  ['ai', 'P4', '#2E573A', '#efe2d0'], ['about', 'P5', '#72AC43', '#14260a'],
  ['education', 'S1', '#E4A5CA', '#34101f'], ['leadership', 'S2', '#66271B', '#f6dcc6'], ['skills', 'S3', '#EC6426', '#2a0d04'],
  ['cv', 'S4', '#F8A91F', '#2e1606'], ['linkedin', 'S5', '#E4A5CA', '#34101f'], ['contact', 'BAR', '#262626', '#e9e9e9']];
const PAD = { l: 16, r: 22, t: 34, b: 20 };
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 800, height: 600 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text()); });
  const ss = +SS;
  await p.addInitScript(P => { window.PARAMS = P; }, {
    exposure: 1.0, env: .22, light: { key: 7, rim: 3.2, fill: .5, shadowLight: .35 }, shadowOpacity: .55, floorY: -6.2,
    ao: .55, rough: .66, bump: .02, spec: .4, scale: ss,
    camera: { fov: cam.intrinsics.vfov_deg_threejs, width: 1536, height: 1024, matrixWorld: cam.camera.world_matrix_column_major },
  });
  await p.goto('file://' + S + '/scene.html'); await p.waitForFunction(() => window.ready, null, { timeout: 60000 });
  const meta = {};
  for (const [id, wid, face, ink] of K) {
    if (ONLY && ONLY !== 'all' && ONLY !== id) continue;
    const w = cam.wells[wid]; const cx = +w.center_x, cz = +w.center_z, ww = +w.width_x, wd = +w.depth_z;
    const bb = Array.isArray(w.bbox_px_xyxy) ? w.bbox_px_xyxy : JSON.parse(w.bbox_px_xyxy);
    const bbox = [Math.floor(bb[0] - PAD.l), Math.floor(bb[1] - PAD.t), Math.ceil(bb[2] - bb[0] + PAD.l + PAD.r), Math.ceil(bb[3] - bb[1] + PAD.t + PAD.b)];
    const wide = wid === 'BAR', mobile = VARIANT === 'm';
    let label = LBL[LANG][id];
    const k = { x: cx, z: cz, y0: -6.2, W: ww - 1.6, D: wd - 1.6, h: 9.4, tx: .55, tf: .9, tb: .45, rb: 1.4, rt: 2.6, fillet: 1.1, dish: wide ? .45 : .7,
      face: grade(face, .74, .8), ink, icon: icons[id], label, wide, mobile, bbox };
    const url = await p.evaluate(k => window.renderKey(k), k);
    const file = path.join(OUT, `${id}.png`); fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
    meta[id] = { bbox }; console.log(id, bbox.join(','));
  }
  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
  await b.close();
})();
