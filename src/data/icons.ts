/** 24×24 stroke icons, drawn for this site. */
const p = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;

export const ICONS: Record<string, string> = {
  // two plugs meeting: integrations
  insider: p('<path d="M8 3v4M12 3v4"/><path d="M6 7h8v3a4 4 0 0 1-8 0z"/><path d="M10 14v3a4 4 0 0 0 4 4h1"/><path d="M18 21v-4h-3"/>'),
  // orange slice
  portakasa: p('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.5"/><path d="M12 6.5v11M6.5 12h11M8.1 8.1l7.8 7.8M15.9 8.1l-7.8 7.8"/>'),
  // forecast line with a dashed future
  icron: p('<path d="M3 20h18"/><path d="M3 16l4-5 4 3 3-5"/><path d="M14 9l2-2" stroke-dasharray="1.5 2.5"/><path d="M17 6l4-3" stroke-dasharray="1.5 2.5"/>'),
  // spark
  ai: p('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'),
  about: p('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
  education: p('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/><path d="M22 9v5"/>'),
  leadership: p('<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>'),
  skills: p('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>'),
  cv: p('<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M12 10v7M9 14l3 3 3-3"/>'),
  linkedin: p('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'),
  contact: p('<path d="M20 5v7a3 3 0 0 1-3 3H5"/><path d="M9 11l-4 4 4 4"/>'),
  sound: p('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>'),
  mute: p('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/>'),
  close: p('<path d="M6 6l12 12M18 6L6 18"/>'),
  copy: p('<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>'),
  check: p('<path d="M4 12l5 5L20 6"/>'),
  mail: p('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  external: p('<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  download: p('<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 20h16"/>'),
};
