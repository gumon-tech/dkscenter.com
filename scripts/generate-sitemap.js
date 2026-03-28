/* scripts/generate-sitemap.js */
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkscenter.gumon.io';

function getDirectoryNames(directoryPath) {
    return fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

function getJavaScriptBaseNames(directoryPath) {
    return fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
        .map((entry) => path.basename(entry.name, '.js'))
        .filter((name) => name !== 'index');
}

function getCourseKeys() {
    const contentRoot = path.join(process.cwd(), 'content', 'courses');
    const legacyEntriesDirectory = path.join(contentRoot, 'entries');
    const sharedDirectory = path.join(contentRoot, 'shared');
    const localesDirectory = path.join(contentRoot, 'locales');

    if (fs.existsSync(legacyEntriesDirectory)) {
        return getDirectoryNames(legacyEntriesDirectory).sort();
    }

    if (fs.existsSync(sharedDirectory)) {
        return getJavaScriptBaseNames(sharedDirectory).sort();
    }

    if (fs.existsSync(localesDirectory)) {
        return getDirectoryNames(localesDirectory).sort();
    }

    throw new Error(
        `Unable to find course content directory. Checked: ${legacyEntriesDirectory}, ${sharedDirectory}, ${localesDirectory}`
    );
}

function url(loc) {
    return `
  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
}

async function main() {
    const courseKeys = getCourseKeys();
    const urls = [];

    // root language landing
    urls.push(url(`${SITE_URL}/en`));
    urls.push(url(`${SITE_URL}/th`));

    // list pages
    urls.push(url(`${SITE_URL}/en/course`));
    urls.push(url(`${SITE_URL}/th/course`));
    urls.push(url(`${SITE_URL}/en/schedule`));
    urls.push(url(`${SITE_URL}/th/schedule`));
    urls.push(url(`${SITE_URL}/en/about-us`));
    urls.push(url(`${SITE_URL}/th/about-us`));
    urls.push(url(`${SITE_URL}/en/privacy`));
    urls.push(url(`${SITE_URL}/th/privacy`));

    // course detail pages
    for (const key of courseKeys) {
        urls.push(url(`${SITE_URL}/en/course/${key}`));
        urls.push(url(`${SITE_URL}/th/course/${key}`));
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, sitemap.trim());
    console.log(`✅ sitemap generated: ${outPath}`);
}

main().catch((error) => {
    console.error('Failed to generate sitemap:', error);
    process.exit(1);
});
