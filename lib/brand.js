// /lib/brand.js
export const DEFAULT_BRAND =
    process.env.NEXT_PUBLIC_DEFAULT_BRAND || 'DKS Center';

export const normalizeBrand = (brand) => {
    const b = (brand || '').trim();
    return b ? b : DEFAULT_BRAND;
};
