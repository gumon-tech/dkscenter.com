export const GA_TRACKING_ID = 'G-WD6C8CCPC9';

export const pageview = (url) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, { page_path: url });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
