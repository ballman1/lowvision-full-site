import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// To enable static prerendering, run:
//   npm install -D vite-plugin-prerender
// Then uncomment the block below.
//
// import prerender from 'vite-plugin-prerender';
// const PRERENDER_ROUTES = [
//   '/',
//   '/start-here',
//   '/start-here/what-is-low-vision',
//   '/start-here/next-steps',
//   '/resources',
//   '/faq',
//   '/rehab-training',
//   '/rehab-training/functional-vision-assessment',
//   '/rehab-training/adl-training',
//   '/rehab-training/orientation-mobility',
//   '/rehab-training/visual-skills-training',
//   '/rehab-training/assistive-tech-instruction',
//   '/devices-technology',
//   '/devices-technology/optical-devices',
//   '/devices-technology/electronic-digital-aids',
//   '/devices-technology/software-apps',
//   '/coverage-funding',
//   '/coverage-funding/medicare',
//   '/coverage-funding/va-veterans',
//   '/financial-support',
//   '/financial-support/ssdi',
//   '/financial-support/ssi',
//   '/about/mission',
//   '/about/how-we-review-resources',
//   '/about/contact',
// ];

export default defineConfig({
  plugins: [
    react(),
    // prerender({ staticDir: 'dist', routes: PRERENDER_ROUTES }),  // ← uncomment after npm install
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
