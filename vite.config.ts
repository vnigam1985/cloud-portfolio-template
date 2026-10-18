import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import config from './src/portfolio.config.ts';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export default defineConfig({
  // GitHub Pages serves from /<repo-name>/. The deploy workflow sets BASE_PATH for you.
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-meta',
      transformIndexHtml: (html) =>
        html
          .replaceAll('%SITE_TITLE%', escape(config.site.title))
          .replaceAll('%SITE_DESCRIPTION%', escape(config.site.description)),
    },
  ],
});
