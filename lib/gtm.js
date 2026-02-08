// lib/gtm.js
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const pushToDataLayer = (payload) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
};

/**
 * แนะนำ: ใช้ event_name แบบเดียวกันทุกที่
 * - page_view
 * - view_item
 * - select_content (คลิกเลือกกำหนดการ/ชื่อรอบ)
 * - begin_checkout (คลิกปุ่มลงทะเบียน)
 * - outbound_click (คลิกออกนอกโดเมน เช่น eventpop)
 */
export const trackPageView = ({ pagePath, pageType, locale, brandOwner }) => {
    pushToDataLayer({
        event: 'page_view',
        page_path: pagePath,
        page_type: pageType || 'page',
        locale: locale || 'en',
        brand_owner: brandOwner,
    });
};

export const trackViewItem = ({ brandOwner, item }) => {
    pushToDataLayer({
        event: 'view_item',
        page_type: 'course_detail',
        brand_owner: brandOwner,
        items: [item],
    });
};

export const trackSelectContent = ({ brandOwner, item, content }) => {
    pushToDataLayer({
        event: 'select_content',
        page_type: 'course_detail',
        brand_owner: brandOwner,
        content_type: content?.type || 'schedule',
        content_id: content?.id || '',
        content_name: content?.name || '',
        items: [item],
    });
};

export const trackBeginCheckout = ({ brandOwner, item, schedule, linkUrl }) => {
    pushToDataLayer({
        event: 'begin_checkout',
        page_type: 'course_detail',
        brand_owner: brandOwner,
        items: [
            {
                ...item,
                item_variant: schedule?.title || '',
            },
        ],
        schedule_title: schedule?.title || '',
        schedule_start: schedule?.eventStart || '',
        link_url: linkUrl || '',
    });
};

export const trackOutboundClick = ({ brandOwner, linkUrl, label }) => {
    pushToDataLayer({
        event: 'outbound_click',
        brand_owner: brandOwner,
        link_url: linkUrl,
        link_label: label || '',
    });
};
