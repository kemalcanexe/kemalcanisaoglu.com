import { inject, track } from '@vercel/analytics';
import { KEYS, IMG_W, IMG_H } from '../data/keys';

inject({ mode: import.meta.env.PROD ? 'production' : 'development' });

/* ───────── environment ───────── */
const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = mqReduce.matches;
mqReduce.addEventListener?.('change', (e) => (reduced = e.matches));
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
const lowPower = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2 || !!nav.connection?.saveData;
const lang = document.documentElement.lang === 'tr' ? 'tr' : 'en';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const consoleEl = $('[data-console]');
const tiltEl = $('[data-tilt]');
const sheenEl = $('[data-sheen]');
const glowEl = $('[data-glow]');
const keysNav = $('.keys');
const live = $('[data-live]');
const keyEls = $$<HTMLElement>('.key');

interface ScreenData {
  idle: { title: string; desc: string };
  keys: Record<string, { title: string; desc: string }>;
  status: { typing: string; ready: string };
  term: { help: string; unknown: string; whoami: string; hire: string };
}
const data: ScreenData = JSON.parse($('[data-screen-json]')?.textContent || '{}');

/* ───────── screen typing ───────── */
const titleEl = $('[data-title]')!;
const typedEl = $('[data-typed]')!;
const descEl = $('[data-desc]')!;
const statusEl = $('[data-status]')!;

const screen = {
  target: data.idle.title,
  token: 0,
  timer: 0 as number | ReturnType<typeof setTimeout>,
  type(title: string, desc: string, opts: { delay?: number; speed?: number; force?: boolean } = {}) {
    descEl.textContent = desc;
    if (title === this.target && !opts.force) return; // ignore redundant requests
    this.target = title;
    const tok = ++this.token;
    clearTimeout(this.timer);
    titleEl.textContent = title;
    if (reduced) {
      typedEl.textContent = title;
      statusEl.textContent = data.status.ready;
      return;
    }
    const speed = opts.speed ?? 70;
    statusEl.textContent = data.status.typing;
    typedEl.textContent = '';
    let i = 0;
    const chars = Array.from(title);
    const step = () => {
      if (tok !== this.token) return; // a newer request owns the screen
      i++;
      typedEl.textContent = chars.slice(0, i).join('');
      if (i < chars.length) this.timer = setTimeout(step, speed);
      else statusEl.textContent = data.status.ready;
    };
    this.timer = setTimeout(step, opts.delay ?? 0);
  },
  idle(opts: { delay?: number; speed?: number; force?: boolean } = {}) {
    this.type(data.idle.title, data.idle.desc, opts);
  },
};

let restoreTimer: ReturnType<typeof setTimeout> | undefined;
const scheduleRestore = () => {
  clearTimeout(restoreTimer);
  restoreTimer = setTimeout(() => {
    if (openDlg) return;
    if (keysNav?.contains(document.activeElement)) return;
    if (document.activeElement?.matches('[data-term-input]')) return;
    screen.idle();
  }, 350);
};
const showKey = (id: string) => {
  clearTimeout(restoreTimer);
  const k = data.keys[id];
  if (k) screen.type(k.title, k.desc);
};

/* ───────── sound ───────── */
let actx: AudioContext | null = null;
let soundOn = false;
try { soundOn = localStorage.getItem('kc-sound') === '1'; } catch {}
const soundBtn = $<HTMLButtonElement>('[data-sound]');
const syncSoundBtn = () => {
  if (!soundBtn) return;
  soundBtn.setAttribute('aria-pressed', String(soundOn));
  soundBtn.title = soundOn ? soundBtn.dataset.on! : soundBtn.dataset.off!;
};
syncSoundBtn();
const click = (heavy = false) => {
  if (!soundOn) return;
  try {
    actx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const t = actx.currentTime;
    // clack: filtered noise burst
    const len = Math.floor(actx.sampleRate * 0.03);
    const buf = actx.createBuffer(1, len, actx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = actx.createBufferSource();
    src.buffer = buf;
    const bp = actx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = heavy ? 1800 : 2600 + Math.random() * 600; bp.Q.value = 1.4;
    const g = actx.createGain(); g.gain.value = 0.55;
    src.connect(bp).connect(g).connect(actx.destination);
    src.start(t);
    // thock: short low sine
    const o = actx.createOscillator();
    const og = actx.createGain();
    o.frequency.setValueAtTime(heavy ? 120 : 165, t);
    o.frequency.exponentialRampToValueAtTime(60, t + 0.05);
    og.gain.setValueAtTime(0.22, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(og).connect(actx.destination);
    o.start(t); o.stop(t + 0.07);
  } catch {}
};
soundBtn?.addEventListener('click', () => {
  soundOn = !soundOn;
  try { localStorage.setItem('kc-sound', soundOn ? '1' : '0'); } catch {}
  syncSoundBtn();
  click();
});

/* ───────── haptics ───────── */
const hapticSwitch = $<HTMLLabelElement>('[data-haptic]');
const buzz = () => {
  if (typeof nav.vibrate === 'function') { try { nav.vibrate(9); } catch {} return; }
  // iOS 18+: toggling a native switch produces a light tap
  if (!finePointer && hapticSwitch) hapticSwitch.click();
};

/* ───────── dialogs ───────── */
let openDlg: HTMLDialogElement | null = null;
let opener: HTMLElement | null = null;

let pushed = false; // true while the open dialog owns a history entry we added
const openDialog = (id: string, from?: HTMLElement | null, fromHistory = false) => {
  const d = document.getElementById(`d-${id}`) as HTMLDialogElement | null;
  if (!d) return;
  if (openDlg && openDlg !== d) openDlg.close();
  opener = from ?? (document.activeElement as HTMLElement | null);
  d.classList.remove('closing');
  d.style.transform = '';
  d.showModal();
  openDlg = d;
  d.querySelector<HTMLElement>('.sheet-body')?.scrollTo(0, 0);
  try {
    if (fromHistory) pushed = false;
    else if (pushed) history.replaceState({ dlg: id }, '', `#${id}`);
    else { history.pushState({ dlg: id }, '', `#${id}`); pushed = true; }
  } catch {}
  track('open_section', { section: id, lang });
};

const closeDialog = (d: HTMLDialogElement) => {
  if (!d.open || d.classList.contains('closing')) return;
  if (reduced) { d.close(); return; }
  d.classList.add('closing');
  let done = false;
  const finish = () => { if (done) return; done = true; d.classList.remove('closing'); d.style.transform = ''; d.close(); };
  d.addEventListener('animationend', finish, { once: true });
  setTimeout(finish, 320);
};

$$<HTMLDialogElement>('dialog[data-dialog]').forEach((d) => {
  d.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(d); });
  d.addEventListener('click', (e) => { if (e.target === d) closeDialog(d); });
  d.querySelector('[data-close]')?.addEventListener('click', () => closeDialog(d));
  d.addEventListener('close', () => {
    if (openDlg === d) openDlg = null;
    try {
      if (pushed) { pushed = false; history.back(); }
      else if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    } catch {}
    const o = opener; opener = null;
    if (o && document.contains(o)) o.focus({ preventScroll: true });
    scheduleRestore();
  });

  // swipe down to dismiss (bottom sheet on phones)
  const handles = [d.querySelector('[data-grip]'), d.querySelector('.sheet-head')].filter(Boolean) as HTMLElement[];
  let startY = 0, dy = 0, t0 = 0, dragging = false;
  handles.forEach((h) => {
    h.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' || (e.target as Element).closest('[data-close]')) return;
      if (!matchMedia('(max-width: 760px)').matches) return;
      dragging = true; startY = e.clientY; dy = 0; t0 = performance.now();
      d.classList.add('dragging');
      h.setPointerCapture(e.pointerId);
    });
    h.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      d.style.transform = `translate3d(0, ${dy}px, 0)`;
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      d.classList.remove('dragging');
      const v = dy / Math.max(1, performance.now() - t0);
      d.style.transition = 'transform 0.22s cubic-bezier(.2,.9,.25,1)';
      if (dy > 110 || v > 0.6) {
        d.style.transform = 'translate3d(0, 100%, 0)';
        setTimeout(() => { d.style.transition = ''; d.close(); d.style.transform = ''; }, 220);
      } else {
        d.style.transform = '';
        setTimeout(() => { d.style.transition = ''; }, 240);
      }
    };
    h.addEventListener('pointerup', end);
    h.addEventListener('pointercancel', end);
  });
});

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-open]');
  if (!el || !el.dataset.open) return;
  const me = e as MouseEvent;
  if (el.tagName === 'A' && (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey || me.button !== 0)) return; // let new-tab clicks through
  e.preventDefault();
  openDialog(el.dataset.open, el);
});

/* Back/forward and manual hash changes open or close the matching dialog */
window.addEventListener('popstate', () => {
  const id = location.hash.slice(1);
  if (id && document.getElementById(`d-${id}`)) {
    if (openDlg?.id !== `d-${id}`) openDialog(id, null, true);
  } else if (openDlg) {
    pushed = false;
    closeDialog(openDlg);
  }
});

/* ───────── keys ───────── */
const press = (el: HTMLElement) => {
  el.classList.add('is-down');
  setTimeout(() => el.classList.remove('is-down'), 110);
};

keyEls.forEach((el) => {
  const id = el.dataset.key!;
  el.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') showKey(id); });
  el.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') scheduleRestore(); });
  el.addEventListener('focus', () => showKey(id));
  el.addEventListener('blur', scheduleRestore);
  el.addEventListener('pointerdown', () => {
    lastInteract = Date.now();
    click(id === 'contact');
    buzz();
    showKey(id);
  });
  if (el.tagName === 'A') el.addEventListener('click', () => track('open_link', { section: id, lang }));
});

/* physical keyboard: 1–0 and Enter press the matching keycap */
document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.repeat || openDlg) return;
  const t = e.target as HTMLElement;
  if (t.closest('input, textarea, select, [contenteditable]')) return;
  let target: HTMLElement | undefined;
  if (e.key === 'Enter') {
    if (t !== document.body) return; // let focused controls handle Enter
    target = keyEls.find((k) => k.dataset.key === 'contact');
  } else {
    target = keyEls.find((k) => k.dataset.shortcut === e.key);
  }
  if (!target) return;
  e.preventDefault();
  lastInteract = Date.now();
  click(target.dataset.key === 'contact');
  showKey(target.dataset.key!);
  press(target);
  setTimeout(() => target!.click(), 90);
});

/* ───────── idle wave ───────── */
let lastInteract = 0;
const keysFocused = () => !!keysNav?.contains(document.activeElement);
const wave = () => {
  if (reduced || document.hidden || openDlg || keysFocused() || Date.now() - lastInteract < 2500 || !consoleVisible) return;
  keyEls.forEach((k) => k.classList.remove('wave'));
  void keysNav?.offsetWidth;
  keyEls.forEach((k) => k.classList.add('wave'));
  setTimeout(() => keyEls.forEach((k) => k.classList.remove('wave')), 1100 + keyEls.length * 85 + 50);
};
consoleEl?.addEventListener('pointermove', () => (lastInteract = Date.now()), { passive: true });

let consoleVisible = true;
if (consoleEl && 'IntersectionObserver' in window) {
  new IntersectionObserver(([en]) => { consoleVisible = en.isIntersecting; if (consoleVisible) kick(); }, { threshold: 0.05 }).observe(consoleEl);
}

/* ───────── mobile dock: appears once the hero has scrolled away ───────── */
const dockEl = document.querySelector<HTMLElement>('[data-dock]');
const heroEl = document.querySelector<HTMLElement>('.hero');
if (dockEl && heroEl) {
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => dockEl.classList.toggle('show', !en.isIntersecting), { threshold: 0 }).observe(heroEl);
  } else {
    dockEl.classList.add('show');
  }
}

/* ───────── tilt, light, proximity ───────── */
const centers = KEYS.map((k) => ({ x: k.cx / IMG_W, y: k.cy / IMG_H }));
const proxCache = new Array(keyEls.length).fill(0);
let mx = -1e4, my = -1e4, pointerActive = false;
let tx = 0, ty = 0, cx = 0, cy = 0; // target / current tilt (deg)
let gyro: { x: number; y: number } | null = null;
let raf = 0;

const effectsOn = () => !reduced && !lowPower;

const frame = () => {
  raf = 0;
  if (!consoleEl || !tiltEl) return;
  const r = consoleEl.getBoundingClientRect();
  let lightX = 0.5, lightY = 0.35, lit = false;

  if (pointerActive && finePointer) {
    if (glowEl) glowEl.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    const nx = (mx - (r.left + r.width / 2)) / (r.width / 2);
    const ny = (my - (r.top + r.height / 2)) / (r.height / 2);
    const near = Math.abs(nx) < 1.35 && Math.abs(ny) < 1.5;
    tx = near ? clamp(nx, -1, 1) * 5 : 0;
    ty = near ? clamp(ny, -1, 1) * -4 : 0;
    lightX = (mx - r.left) / r.width; lightY = (my - r.top) / r.height;
    lit = near;

    // proximity lift + LEDs
    const R = r.width * 0.15;
    keyEls.forEach((el, i) => {
      const kx = r.left + centers[i].x * r.width;
      const ky = r.top + centers[i].y * r.height;
      const d = Math.hypot(mx - kx, my - ky);
      const p = Math.round(clamp(1 - d / R, 0, 1) * 50) / 50;
      if (p !== proxCache[i]) { proxCache[i] = p; el.style.setProperty('--prox', String(p)); }
    });
  } else if (gyro) {
    tx = gyro.x * 6; ty = gyro.y * -5;
    lightX = 0.5 + gyro.x * 0.45; lightY = 0.4 + gyro.y * 0.4;
    lit = true;
  } else {
    tx = 0; ty = 0;
  }

  cx += (tx - cx) * 0.1;
  cy += (ty - cy) * 0.1;
  tiltEl.style.transform = `rotateX(${cy.toFixed(3)}deg) rotateY(${cx.toFixed(3)}deg)`;
  consoleEl.classList.toggle('lit', lit);
  if (sheenEl) sheenEl.style.transform = `translate3d(${(lightX * r.width).toFixed(1)}px, ${(lightY * r.height).toFixed(1)}px, 0)`;

  const settled = Math.abs(tx - cx) < 0.01 && Math.abs(ty - cy) < 0.01;
  if (!settled || gyro) kick();
};
function kick() {
  if (!raf && effectsOn() && consoleVisible && !document.hidden) raf = requestAnimationFrame(frame);
}

if (finePointer && effectsOn()) {
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
    mx = e.clientX; my = e.clientY; pointerActive = true;
    glowEl?.classList.add('on');
    kick();
  }, { passive: true });
  document.addEventListener('pointerleave', () => {
    pointerActive = false;
    glowEl?.classList.remove('on');
    keyEls.forEach((el, i) => { proxCache[i] = 0; el.style.setProperty('--prox', '0'); });
    kick();
  });
}

/* gyroscope on phones and tablets */
if (!finePointer && effectsOn() && 'DeviceOrientationEvent' in window) {
  let base: number | null = null;
  const onOrient = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    base ??= e.beta;
    base += (e.beta - base) * 0.01; // slowly re-centre on how the phone is held
    gyro = { x: clamp(e.gamma / 25, -1, 1), y: clamp((e.beta - base) / 20, -1, 1) };
    kick();
  };
  const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> };
  if (typeof DOE.requestPermission === 'function') {
    const ask = () => {
      DOE.requestPermission!().then((s) => { if (s === 'granted') window.addEventListener('deviceorientation', onOrient); }).catch(() => {});
    };
    consoleEl?.addEventListener('click', ask, { once: true });
  } else {
    window.addEventListener('deviceorientation', onOrient);
  }
}

document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });

/* ───────── terminal ───────── */
const termForm = $<HTMLFormElement>('[data-term]');
const termInput = $<HTMLInputElement>('[data-term-input]');
$('[data-screen]')?.addEventListener('click', () => { if (finePointer) termInput?.focus(); });
termInput?.addEventListener('focus', () => clearTimeout(restoreTimer));
termInput?.addEventListener('blur', scheduleRestore);
termInput?.addEventListener('keydown', () => click());
termForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const raw = (termInput?.value || '').trim().toLowerCase();
  if (termInput) termInput.value = '';
  if (!raw) return;
  track('terminal', { cmd: raw.slice(0, 20), lang });
  const cmd = raw.replace(/^\.\/|^\//, '');
  const open = (id: string) => { showKey(id); setTimeout(() => openDialog(id, termInput), 450); };
  const sections = ['insider', 'portakasa', 'icron', 'ai', 'about', 'education', 'leadership', 'skills', 'contact'];
  if (sections.includes(cmd)) return open(cmd);
  switch (cmd) {
    case 'help': case 'ls': case '?':
      return screen.type('help', data.term.help, { force: true });
    case 'whoami':
      return screen.type('whoami', data.term.whoami, { force: true });
    case 'cv': case 'resume':
      showKey('cv'); window.open('/cv.pdf', '_blank', 'noopener'); return;
    case 'linkedin':
      showKey('linkedin'); window.open('https://www.linkedin.com/in/kemalcanisaoglu', '_blank', 'noopener'); return;
    case 'sound':
      soundBtn?.click(); return;
    case 'lang': case 'tr': case 'en':
      location.href = lang === 'en' ? '/tr/' : '/'; return;
    case 'clear': case 'exit':
      termInput?.blur(); return screen.idle({ force: true });
    case 'hire kemal': case 'sudo hire kemal': case 'hire':
      screen.type('sudo hire kemal', data.term.hire, { force: true });
      setTimeout(() => openDialog('contact', termInput), 1400);
      return;
    default:
      return screen.type(cmd.slice(0, 22), data.term.unknown, { force: true });
  }
});

/* ───────── copy email ───────── */
$$<HTMLButtonElement>('[data-copy]').forEach((b) => {
  const label = b.querySelector('[data-copy-label]');
  const original = label?.textContent || '';
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy!);
      if (label) label.textContent = b.dataset.copied!;
      if (live) live.textContent = b.dataset.copied!;
      track('copy_email', { lang });
      setTimeout(() => { if (label) label.textContent = original; }, 1800);
    } catch {
      location.href = `mailto:${b.dataset.copy}`;
    }
  });
});

/* ───────── header ───────── */
const top = $('.top');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { top?.classList.toggle('scrolled', scrollY > 8); ticking = false; });
}, { passive: true });

/* ───────── logo: mini screen that types and erases ───────── */
const markEl = $('[data-mark]');
if (markEl && !reduced) {
  const words = ['KCİ', 'kemal'];
  let w = 0;
  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const visible = () => new Promise<void>((r) => {
    if (!document.hidden) return r();
    document.addEventListener('visibilitychange', function f() { if (!document.hidden) { document.removeEventListener('visibilitychange', f); r(); } });
  });
  (async () => {
    await wait(2600);
    for (;;) {
      const cur = Array.from(words[w]);
      for (let i = cur.length; i >= 0; i--) { markEl.textContent = cur.slice(0, i).join(''); await wait(70); }
      await wait(380);
      w = (w + 1) % words.length;
      const next = Array.from(words[w]);
      for (let i = 1; i <= next.length; i++) { markEl.textContent = next.slice(0, i).join(''); await wait(120); }
      await wait(3200);
      await visible();
    }
  })();
}

/* ───────── boot ───────── */
let booted = false;
const boot = () => {
  if (booted) return;
  booted = true;
  consoleEl?.classList.add('ready');
  if (!reduced) {
    // brief cursor pause, then type the title one character at a time
    screen.target = '';
    typedEl.textContent = '';
    statusEl.textContent = data.status.typing;
    screen.type(data.idle.title, data.idle.desc, { delay: 350, speed: 110 });
    setTimeout(wave, 350 + data.idle.title.length * 110 + 500);
  }
  setInterval(wave, 7000);

  const hash = location.hash.slice(1);
  if (hash && document.getElementById(`d-${hash}`)) setTimeout(() => openDialog(hash, null, true), 300);
};
const img = consoleEl?.querySelector('img');
if (img && !img.complete) {
  img.addEventListener('load', boot, { once: true });
  img.addEventListener('error', boot, { once: true });
  setTimeout(boot, 2500);
} else boot();
