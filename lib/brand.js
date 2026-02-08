// lib/brand.js
export const DEFAULT_BRAND =
    process.env.NEXT_PUBLIC_DEFAULT_BRAND || 'DKS Center';

export function normalizeBrand(input) {
    if (!input) return DEFAULT_BRAND;
    const s = String(input).trim();

    // normalize ชื่อให้ตรงตามที่ใช้ใน GTM/GA4/Pixel
    const map = {
        'dks': 'DKS Center',
        'dks center': 'DKS Center',
        'ac': 'AC Academys',
        'ac academys': 'AC Academys',
        'ac academy': 'AC Academys',
    };

    const key = s.toLowerCase();
    return map[key] || s;
}
