import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkComponent = ({ children, skipLocaleHandling, ...rest }) => {
  const { query, asPath, pathname } = useRouter();
  const locale = rest.locale || query.locale || '';

  let href = rest.href || asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href ? `/${locale}${href}` : pathname.replace('[locale]', locale);
  }

  return (
    <>
      <Link {...rest} href={href}>
        {children}
      </Link>
    </>
  );
};

export default LinkComponent;
