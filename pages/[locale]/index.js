import Head from "next/head";
import Navbar from "../../components/navbar";
import SectionTitle from "../../components/sectionTitle";
import Video from "../../components/video";
import Footer from "../../components/footer";
import CourseList from "../../components/courseList";
import Link from "/components/link";
import { useTranslation } from "next-i18next";
import { makeStaticProps } from "/lib/getStatic";
import { getStaticPaths } from "/lib/getStatic";
import { useRouter } from "next/router";


const getStaticProps = makeStaticProps(["home"]);
export { getStaticPaths, getStaticProps };

const Home = () => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;

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
        <meta
          property="og:title"
          content={t("head-title")}
        />
        <meta
          property="og:description"
          content={t("head-content")}
        />
        <meta
          property="og:image"
          content={domain + "/img/main_img.jpg"}
        />
        <meta property="og:url" content={URL} />

        {/* Twitter Card */}
        <meta
          name="twitter:title"
          content={t("head-title")}
        />
        <meta
          name="twitter:description"
          content={t("head-content")}
        />
        <meta
          name="twitter:image"
          content={domain + "/img/main_img.jpg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar i18next={i18next} />
      <SectionTitle
        pretitle={t("sectionTitle-pretitle")}
        title={t("sectionTitle-title")}
      >
        {t("sectionTitle-detail1")}
        <p className="pt-8">
          <Link
            href="/course/2024-007-modern-web-frontend-with-react"
            className="mt-8 px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
          >
            {t("sectionTitle-detail2")}
          </Link>
        </p>
      </SectionTitle>
      <Video />
      <CourseList i18next={i18next} />
      <Footer i18next={i18next} />
    </>
  );
};

export default Home;
