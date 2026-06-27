import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          blogDetails: path.resolve(__dirname, 'blog-details.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          event: path.resolve(__dirname, 'event.html'),
          eventDetails: path.resolve(__dirname, 'event-details.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          pricing: path.resolve(__dirname, 'pricing.html'),
          services: path.resolve(__dirname, 'services.html'),
          serviceDetails: path.resolve(__dirname, 'service-details.html'),
          team: path.resolve(__dirname, 'team.html'),
          testimonial: path.resolve(__dirname, 'testimonial.html'),
          error404: path.resolve(__dirname, '404.html'),
          headerShowcase: path.resolve(__dirname, 'header.html'),
          footerShowcase: path.resolve(__dirname, 'footer.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
