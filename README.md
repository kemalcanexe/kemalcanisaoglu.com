# kemalcanisaoglu.com

Personal site of Kemal Can İsaoğlu: a portfolio console with an interactive mechanical keyboard and a typing terminal screen.

## Stack

- [Astro 5](https://astro.build) + TypeScript, static output (`/` English, `/tr/` Turkish)
- Device image optimised to AVIF/WebP at build time (`astro:assets`)
- Self-hosted fonts: Bricolage Grotesque (UI), Courier Prime (screen)
- Vercel Analytics (enable it in the Vercel project dashboard)

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + build to dist/
```

## Where things live

| What | File |
| --- | --- |
| All copy (EN + TR) | `src/i18n/content.ts` |
| Key positions, colours, shortcuts | `src/data/keys.ts` |
| Console markup | `src/components/Console.astro` |
| Section dialogs | `src/components/Dialogs.astro` |
| Interactions (typing, tilt, gyro, sound, terminal) | `src/scripts/main.ts` |
| Styles | `src/styles/global.css` |
| CV | `public/cv.pdf` |

Section deep links: `/#insider`, `/#portakasa`, `/tr/#icron`, etc.
