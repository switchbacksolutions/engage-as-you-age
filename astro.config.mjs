import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import bookshop from '@bookshop/astro-bookshop';

export default defineConfig({
  site: 'https://engageasyouage.com',
  integrations: [mdx(), sitemap(), bookshop()],
  vite: {
    plugins: [tailwindcss()],
  },
});
