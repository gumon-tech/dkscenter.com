/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../navbar';
import Footer from '../footer';

export default function SiteShell({ i18next, children }) {
  return (
    <>
      <Navbar i18next={i18next} />
      <main>{children}</main>
      <Footer i18next={i18next} />
    </>
  );
}
