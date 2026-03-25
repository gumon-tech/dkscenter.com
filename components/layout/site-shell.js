/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';

export default function SiteShell({ i18next, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(36,88,255,0.12),transparent_38%),radial-gradient(circle_at_top_right,rgba(15,118,110,0.1),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[24rem] z-0 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(240,140,43,0.08),transparent_34%)]"
      />
      <Navbar i18next={i18next} />
      <main className="relative z-10">{children}</main>
      <Footer i18next={i18next} />
    </div>
  );
}
