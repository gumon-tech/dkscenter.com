/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';

export default function SiteShell({ i18next, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[38rem]"
        style={{ backgroundImage: 'var(--site-shell-glow-top)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[24rem] z-0 h-[28rem]"
        style={{ backgroundImage: 'var(--site-shell-glow-bottom)' }}
      />
      <Navbar i18next={i18next} />
      <main className="relative z-10">{children}</main>
      <Footer i18next={i18next} />
    </div>
  );
}
