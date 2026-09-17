// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: cambiar por el dominio real antes de desplegar.
  // Lo necesitan el sitemap, el RSS y las URLs canónicas.
  site: 'https://tefi.dev',

  // build.format es 'directory': cada página se sirve como /ruta/index.html.
  // Con 'always' dev y build coinciden y los href llevan barra final en los tres
  // sitios: NAV_LINKS, tarjetas de proyecto y rss.xml.js.
  trailingSlash: 'always',

  integrations: [mdx(), sitemap()],

  // API de fuentes de Astro: descarga, hospeda y genera el fallback con
  // métricas ajustadas. Sin `weights` sólo bajaría el peso 400.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    // Manuscrita: sólo para la frase junto a la flecha del cierre. Sin
    // preload — es decorativa y puede llegar tarde sin romper nada.
    {
      provider: fontProviders.google(),
      name: 'Caveat',
      cssVariable: '--font-caveat',
      weights: ['500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
