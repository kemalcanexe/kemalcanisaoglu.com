/**
 * Builds the SVG body of a Cherry-profile keycap seen from the front and slightly above:
 * a skirt that is wider at the bottom than the top, a dished top surface, a lit left wall,
 * a shaded right wall and a matte PBT grain. Rendered at build time, no runtime cost.
 */
const hex = (x: string) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};

/** Rounded trapezoid: top edge x1..x2 at y1, bottom edge bx1..bx2 at y2. */
const trap = (x1: number, x2: number, y1: number, y2: number, bx1: number, bx2: number, r: number) => {
  const k = (d: number) => (d * r) / (y2 - y1);
  const f = (n: number) => n.toFixed(2);
  return `M${f(x1 + r)},${f(y1)} L${f(x2 - r)},${f(y1)} Q${f(x2)},${f(y1)} ${f(x2 + k(bx2 - x2))},${f(y1 + r)} ` +
    `L${f(bx2 - k(bx2 - x2))},${f(y2 - r)} Q${f(bx2)},${f(y2)} ${f(bx2 - r)},${f(y2)} L${f(bx1 + r)},${f(y2)} ` +
    `Q${f(bx1)},${f(y2)} ${f(bx1 + k(x1 - bx1))},${f(y2 - r)} L${f(x1 - k(x1 - bx1))},${f(y1 + r)} Q${f(x1)},${f(y1)} ${f(x1 + r)},${f(y1)} Z`;
};

export interface Keycap { svg: string; top: { l: number; r: number; t: number; b: number } }

export function keycap(id: string, W: number, H: number, face: string, edge: string, wide = false): Keycap {
  const r = Math.min(W, H) * 0.1;
  const sx = wide ? 0.022 : 0.045; // skirt inset at the bottom
  const tx = wide ? 0.05 : 0.1;    // skirt inset at the top (taper)
  const T = { x1: W * (wide ? 0.07 : 0.17), x2: W * (wide ? 0.93 : 0.83), y1: H * 0.07, y2: H * 0.7 };
  const tr = Math.min(W, H) * 0.085;
  const skirt = trap(W * tx, W * (1 - tx), H * 0.03, H * 0.98, W * sx, W * (1 - sx), r);
  const top = trap(T.x1, T.x2, T.y1, T.y2, T.x1 - W * 0.012, T.x2 + W * 0.012, tr);
  const g = `kc-${id}`;
  const svg = `<svg class="key-body" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs>` +
    `<linearGradient id="${g}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(face, '#ffffff', 0.18)}"/><stop offset=".1" stop-color="${face}"/><stop offset=".55" stop-color="${mix(face, edge, 0.55)}"/><stop offset="1" stop-color="${mix(edge, '#000000', 0.35)}"/></linearGradient>` +
    `<linearGradient id="${g}h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".13" stop-color="#fff" stop-opacity="0"/><stop offset=".84" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>` +
    `<linearGradient id="${g}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(face, '#ffffff', 0.16)}"/><stop offset=".45" stop-color="${mix(face, '#000000', 0.05)}"/><stop offset="1" stop-color="${mix(face, '#ffffff', 0.06)}"/></linearGradient>` +
    `<radialGradient id="${g}r" cx=".28" cy=".18" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="${g}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>` +
    `<filter id="${g}n" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="${id.length}"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `</defs>` +
    `<path d="${skirt}" fill="url(#${g}v)"/><path d="${skirt}" fill="url(#${g}h)"/>` +
    `<path d="${top}" fill="url(#${g}t)"/><path d="${top}" fill="url(#${g}r)"/><path d="${top}" fill="#fff" filter="url(#${g}n)"/>` +
    `<path d="${top}" fill="none" stroke="url(#${g}s)" stroke-width="${Math.max(1.2, W * 0.008).toFixed(2)}"/>` +
    `</svg>`;
  return { svg, top: { l: (T.x1 / W) * 100, r: (1 - T.x2 / W) * 100, t: (T.y1 / H) * 100, b: (1 - T.y2 / H) * 100 } };
}
