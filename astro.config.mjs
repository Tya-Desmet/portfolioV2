import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://tyadesmet.dev',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  build: {
    format: 'directory', // SEO-friendly URLs (chaque page dans son dossier)
    assets: '_astro', // Assets avec hash pour cache busting
    inlineStylesheets: 'auto', // Inline critical CSS automatiquement
  },
  vite: {
    build: {
      minify: 'esbuild', // Minification JS rapide
      cssMinify: 'lightningcss', // Minification CSS ultra-rapide
      rollupOptions: {
        output: {
          // Séparer vendor chunks pour meilleur caching
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    plugins: [
      visualizer({
        open: false, // Ne pas ouvrir automatiquement
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html'
      })
    ]
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // Sharp pour meilleure qualité
    },
  }
});
