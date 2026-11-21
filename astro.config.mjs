import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kemalcanisaoglu.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } },
    }),
  ],
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  prefetch: false,
});
