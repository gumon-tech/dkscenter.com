import React from 'react';
import Link from '/components/link';

export default function Breadcrumb(props) {
  const homeLabel = props.homeLabel || 'Home';
  const items = Array.isArray(props.paths) ? props.paths : [];

  return (
    <nav className="flex justify-center md:justify-start" aria-label="Breadcrumb">
      <ol className="inline-flex w-full flex-wrap items-center justify-center gap-2 rounded-full border border-border/70 bg-surface-glass px-4 py-2 text-sm text-soft shadow-soft backdrop-blur-xl md:w-auto md:justify-start">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-soft hover:text-primary"
          >
            <svg
              className="me-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            {homeLabel}
          </Link>
        </li>
        {items.map((menu, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  className="mx-1 h-3 w-3 text-soft rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                {isLastItem ? (
                  <span
                    aria-current="page"
                    className="ms-1 font-medium text-text md:ms-2"
                  >
                    {menu.title}
                  </span>
                ) : (
                  <Link
                    href={menu.path}
                    className="ms-1 font-medium text-soft hover:text-primary md:ms-2"
                  >
                    {menu.title}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
