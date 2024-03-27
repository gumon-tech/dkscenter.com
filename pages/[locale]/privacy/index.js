import Head from "next/head";
import Navbar from "/components/navbar";
import Footer from "/components/footer";
import SectionTitle from "/components/sectionTitle";
import PrivacyContentEN from "./en";
import PrivacyContentTH from "./th";

import { useTranslation } from "next-i18next";
import { makeStaticProps } from "/lib/getStatic";
import { getStaticPaths } from "/lib/getStatic";

const getStaticProps = makeStaticProps(["home"]);
export { getStaticPaths, getStaticProps };

const Privacy = () => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;
  return (
    <>
      <Head>
        <title>{t("head-title")}</title>
        <meta name="description" content={t("head-content")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar i18next={i18next} />
      <SectionTitle pretitle={t("privacy-1")} title={t("privacy-2")}>
        {currentLanguage === 'th' && (<PrivacyContentTH/>)}
        {currentLanguage === 'en' && (<PrivacyContentEN/>)}
      </SectionTitle>
      <Footer i18next={i18next} />
    </>
  );
};

export default Privacy;
