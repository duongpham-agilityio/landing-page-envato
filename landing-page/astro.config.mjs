import { defineConfig, sharpImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true,
    devImageService: 'sharp',
  }),
  integrations: [react(), tailwind(), mdx()],
  site: 'https://landing-page-envato.vercel.app',
  image: {
    domains: ['loremflickr', 'preview.colorlib'],
    service: sharpImageService(),
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '_astro/[name]-[hash][extname]',
        },
      },
    },
  },
});
