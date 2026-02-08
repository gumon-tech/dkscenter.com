// /lib/gtm.js
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const gtmEvent = (event, params = {}) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
};
