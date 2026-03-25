/* eslint-disable react/prop-types */
import React from 'react';

function cx(...classNames) {
  return classNames.filter(Boolean).join(' ');
}

export default function Heading({
  as: Component = 'h2',
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  const alignment =
    align === 'center'
      ? 'mx-auto text-center items-center'
      : 'text-left items-start';

  return (
    <div className={cx('flex max-w-3xl flex-col gap-3', alignment, className)}>
      {eyebrow ? (
        <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <Component className="text-3xl font-semibold tracking-[-0.04em] text-text sm:text-4xl lg:text-5xl">
          {title}
        </Component>
      ) : null}
      {description ? (
        <p className="text-base leading-8 text-muted sm:text-lg lg:text-[1.15rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
