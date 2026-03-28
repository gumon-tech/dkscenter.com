const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkscenter.gumon.io';
const LOCALES = ['en', 'th'];
const DEFAULT_LOCALE = 'en';

function buildAbsoluteUrl(pathname = '') {
  return `${SITE_URL}${pathname}`;
}

function getSharedCourseEntries() {
  const sharedDirectory = path.join(
    process.cwd(),
    'content',
    'courses',
    'shared',
  );

  return fs
    .readdirSync(sharedDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => {
      const filePath = path.join(sharedDirectory, entry.name);
      const content = fs.readFileSync(filePath, 'utf8');
      const key = path.basename(entry.name, '.js');
      const isActive = /isActive:\s*true/.test(content);
      const lastUpdateMatch = content.match(/lastUpdate:\s*'([^']+)'/);

      return {
        key,
        isActive,
        lastUpdate: lastUpdateMatch?.[1] || null,
      };
    })
    .filter((entry) => entry.isActive)
    .sort((a, b) => a.key.localeCompare(b.key));
}

function buildAlternateLinks(pathname) {
  return [
    ...LOCALES.map(
      (locale) =>
        `    <xhtml:link rel="alternate" hreflang="${locale}" href="${buildAbsoluteUrl(`/${locale}${pathname}`)}" />`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildAbsoluteUrl(`/${DEFAULT_LOCALE}${pathname}`)}" />`,
  ].join('\n');
}

function buildUrlEntry({ pathname, locale, changefreq, priority, lastmod }) {
  const loc = buildAbsoluteUrl(`/${locale}${pathname}`);

  return `  <url>
    <loc>${loc}</loc>
${buildAlternateLinks(pathname)}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${lastmod ? `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
  </url>`;
}

function main() {
  const courseEntries = getSharedCourseEntries();
  const routes = [
    { pathname: '', changefreq: 'weekly', priority: '1.0' },
    { pathname: '/course', changefreq: 'weekly', priority: '0.9' },
    { pathname: '/schedule', changefreq: 'weekly', priority: '0.8' },
    { pathname: '/about-us', changefreq: 'monthly', priority: '0.6' },
    { pathname: '/privacy', changefreq: 'yearly', priority: '0.3' },
  ];

  const urlEntries = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
      urlEntries.push(
        buildUrlEntry({
          ...route,
          locale,
        }),
      );
    }

    for (const course of courseEntries) {
      urlEntries.push(
        buildUrlEntry({
          pathname: `/course/${course.key}`,
          locale,
          changefreq: 'weekly',
          priority: '0.8',
          lastmod: course.lastUpdate,
        }),
      );
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;
  const robots = `User-agent: *
Allow: /

Sitemap: ${buildAbsoluteUrl('/sitemap.xml')}
`;

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

  fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
  fs.writeFileSync(sitemapPath, `${sitemap}\n`);
  fs.writeFileSync(robotsPath, robots);

  console.log(`Generated sitemap at ${sitemapPath}`);
  console.log(`Generated robots.txt at ${robotsPath}`);
}

main();
