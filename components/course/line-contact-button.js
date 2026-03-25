/* eslint-disable react/prop-types */
import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { normalizeBrand } from '/lib/brand';
import { trackOutboundClick } from '/lib/gtm';
import {
  LINE_CONTACT_URL,
  linePrimaryButtonClass,
} from '/lib/courses/cta';

export const trackLineContactClick = (courseData, label = 'line_contact') => {
  const brandOwner = normalizeBrand(courseData?.brand);

  trackOutboundClick({
    brandOwner,
    linkUrl: LINE_CONTACT_URL,
    label,
  });
};

export default function LineContactButton({
  courseData,
  label,
  className = '',
  trackingLabel = 'line_contact',
  hideIcon = false,
}) {
  return (
    <a
      href={LINE_CONTACT_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackLineContactClick(courseData, trackingLabel)}
      className={`${linePrimaryButtonClass} ${className}`.trim()}
    >
      {!hideIcon && <ChatBubbleLeftRightIcon className="h-5 w-5" />}
      <span>{label}</span>
    </a>
  );
}
