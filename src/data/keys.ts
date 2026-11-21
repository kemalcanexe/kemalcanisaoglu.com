import type { KeyId } from '../i18n/content';
import { LINKS } from '../i18n/content';

/** Reference image is 1536 × 1024. Centres and fitted base sizes in image px. */
export const IMG_W = 1536;
export const IMG_H = 1024;

export interface KeyDef {
  id: KeyId;
  cx: number; cy: number; w: number; h: number;
  face: string; edge: string; ink: string;
  size: 'lg' | 'sm' | 'bar';
  shortcut: string;
  href?: string;
  download?: boolean;
  external?: boolean;
}

const brown = '#40150E';
const cream = '#FDE3CF';

export const KEYS: KeyDef[] = [
  { id: 'insider',   cx: 379,  cy: 590, w: 156, h: 130, face: '#FDE3CF', edge: '#CAA58A', ink: '#66271B', size: 'lg', shortcut: '1' },
  { id: 'portakasa', cx: 580,  cy: 580, w: 156, h: 130, face: '#EC6426', edge: '#AD4017', ink: brown, size: 'lg', shortcut: '2' },
  { id: 'icron',     cx: 782,  cy: 570, w: 156, h: 130, face: '#F8A91F', edge: '#BC7512', ink: brown, size: 'lg', shortcut: '3' },
  { id: 'ai',        cx: 982,  cy: 559, w: 156, h: 130, face: '#2E573A', edge: '#193A23', ink: cream, size: 'lg', shortcut: '4' },
  { id: 'about',     cx: 1184, cy: 548, w: 156, h: 130, face: '#72AC43', edge: '#487A26', ink: '#1E330F', size: 'lg', shortcut: '5' },
  { id: 'education', cx: 355,  cy: 783, w: 98,  h: 108, face: '#E4A5CA', edge: '#B76F9B', ink: brown, size: 'sm', shortcut: '6' },
  { id: 'leadership',cx: 479,  cy: 776, w: 98,  h: 108, face: '#66271B', edge: '#40150E', ink: cream, size: 'sm', shortcut: '7' },
  { id: 'skills',    cx: 602,  cy: 770, w: 98,  h: 108, face: '#EC6426', edge: '#AD4017', ink: brown, size: 'sm', shortcut: '8' },
  { id: 'cv',        cx: 728,  cy: 763, w: 98,  h: 108, face: '#F8A91F', edge: '#BC7512', ink: brown, size: 'sm', shortcut: '9', href: LINKS.cv, download: true },
  { id: 'linkedin',  cx: 852,  cy: 756, w: 98,  h: 108, face: '#E4A5CA', edge: '#B76F9B', ink: brown, size: 'sm', shortcut: '0', href: LINKS.linkedin, external: true },
  { id: 'contact',   cx: 1135, cy: 745, w: 374, h: 112, face: '#252525', edge: '#101010', ink: '#FFFFFF', size: 'bar', shortcut: '↵' },
];

export const pct = (k: KeyDef) => ({
  left: ((k.cx - k.w / 2) / IMG_W) * 100,
  top: ((k.cy - k.h / 2) / IMG_H) * 100,
  width: (k.w / IMG_W) * 100,
  height: (k.h / IMG_H) * 100,
});
