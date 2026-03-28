// lib/brand.js
export const DEFAULT_BRAND =
  process.env.NEXT_PUBLIC_DEFAULT_BRAND || 'DKS Center';

export function normalizeBrand(input) {
  const rawValue =
    typeof input === 'object' && input !== null ? input?.name : input;

  if (!rawValue) return DEFAULT_BRAND;
  const s = String(rawValue).trim();

  // normalize ชื่อให้ตรงตามที่ใช้ใน GTM/GA4/Pixel
  const map = {
    dks: 'DKS Center',
    'dks center': 'DKS Center',
    ac: 'AC Academys',
    'ac academys': 'AC Academys',
    'ac academy': 'AC Academys',
  };

  const key = s.toLowerCase();
  return map[key] || s;
}
