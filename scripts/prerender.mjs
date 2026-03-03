/**
 * Static prerender script — runs after `vite build` and `vite build --ssr`.
 * Renders each route to a static index.html so search engines see full content.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const serverDir = resolve(root, 'dist-server');

// Routes to prerender — excludes /search (noIndex), /saved-plan and /intake/results (localStorage-dependent)
const ROUTES = [
  '/',
  '/start-here',
  '/start-here/what-is-low-vision',
  '/start-here/next-steps',
  '/resources',
  '/resources/service-types',
  '/resources/canada',
  '/rehab-training',
  '/rehab-training/functional-vision-assessment',
  '/rehab-training/adl-training',
  '/rehab-training/orientation-mobility',
  '/rehab-training/visual-skills-training',
  '/rehab-training/assistive-tech-instruction',
  '/rehab-training/home-modifications',
  '/rehab-training/tele-rehab-options',
  '/devices-technology',
  '/devices-technology/optical-devices',
  '/devices-technology/electronic-digital-aids',
  '/devices-technology/software-apps',
  '/devices-technology/daily-living-aids',
  '/devices-technology/glare-light-management',
  '/devices-technology/braille-literacy-tools',
  '/coverage-funding',
  '/coverage-funding/medicare',
  '/coverage-funding/medicaid',
  '/coverage-funding/medicaid-buy-in',
  '/coverage-funding/mltc',
  '/coverage-funding/canada-provincial-plans',
  '/coverage-funding/va-veterans',
  '/coverage-funding/private-insurance',
  '/coverage-funding/appeals-documentation',
  '/financial-support',
  '/financial-support/ssdi',
  '/financial-support/ssi',
  '/financial-support/tax-relief',
  '/financial-support/transportation',
  '/financial-support/blind-agencies-commissions',
  '/financial-support/emergency-help',
  '/community-support',
  '/community-support/emotional-support',
  '/community-support/education-services',
  '/community-support/employment-vocational',
  '/community-support/caregiver-family',
  '/community-support/guide-dog-services',
  '/community-support/youth-family-pathways',
  '/community-support/senior-support',
  '/professionals',
  '/professionals/diagnostic-resources',
  '/professionals/test-selection-recipes',
  '/professionals/follow-up-modification-protocols',
  '/professionals/referral-pathways',
  '/professionals/functional-outcomes-metrics',
  '/professionals/templates',
  '/professionals/coding-coverage-guide',
  '/professionals/training-library',
  '/professionals/research-evidence',
  '/about/mission',
  '/about/clinical-advisory-board',
  '/about/partners',
  '/about/how-we-review-resources',
  '/about/accessibility-statement',
  '/about/privacy',
  '/about/contact',
  '/faq',
  '/intake',
  '/intake/start',
];

async function main() {
  const template = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

  const serverEntry = resolve(serverDir, 'entry-server.js');
  const { render } = await import(serverEntry);

  let ok = 0;
  let skipped = 0;

  for (const route of ROUTES) {
    try {
      const { appHtml, helmetContext } = render(route);
      const { helmet } = helmetContext;

      const headHtml = helmet
        ? [helmet.priority, helmet.title, helmet.meta, helmet.link, helmet.script]
            .filter(Boolean)
            .map((h) => h.toString())
            .filter((s) => s.trim().length > 0)
            .join('\n    ')
        : '';

      const html = template
        .replace('<!--app-head-->', headHtml)
        .replace('<!--app-html-->', appHtml);

      const outDir =
        route === '/' ? distDir : resolve(distDir, route.slice(1));

      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, 'index.html'), html);
      console.log(`  ✓ ${route}`);
      ok++;
    } catch (err) {
      console.warn(`  ⚠ skipped ${route}: ${err.message}`);
      skipped++;
    }
  }

  // Remove the SSR bundle — only the client dist is deployed
  rmSync(serverDir, { recursive: true, force: true });

  console.log(`\nPrerender complete: ${ok} rendered, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
