import Head from "next/head";
import Navbar from "/components/navbar";
import Footer from "/components/footer";
import SectionTitle from "/components/sectionTitle";
import PrivacyContentEN from "./en";
import PrivacyContentTH from "./th";

import { useTranslation } from "next-i18next";
import { makeStaticProps } from "/lib/getStatic";
import { getStaticPaths } from "/lib/getStatic";
import { useRouter } from "next/router";


const getStaticProps = makeStaticProps(["home"]);
export { getStaticPaths, getStaticProps };

const Privacy = () => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;
  const currentLanguage = i18n.language;

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  const domain = origin; 

  return (
    <>
      <Head>
        <title>{t("head-title")}</title>
        <meta name="description" content={t("head-content")} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Protocol */}
        <meta property="og:title" content={t("head-title")} />
        <meta property="og:description" content={t("head-content")} />
        <meta property="og:image" content={domain + "/img/main_img.jpg"} />
        <meta property="og:url" content={URL} />

        {/* Twitter Card */}
        <meta name="twitter:title" content={t("head-title")} />
        <meta name="twitter:description" content={t("head-content")} />
        <meta name="twitter:image" content={domain + "/img/main_img.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar i18next={i18next} />
      <SectionTitle pretitle={t("privacy-1")} title={t("privacy-2")}>
        {currentLanguage === "th" && <PrivacyContentTH />}
        {currentLanguage === "en" && <PrivacyContentEN />}
      </SectionTitle>
      <Footer i18next={i18next} />
    </>
  );
};

export default Privacy;
