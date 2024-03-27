import React from "react";
import Head from "next/head";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import CourseList from "../../../components/courseList";
import { useTranslation } from "next-i18next";
import { makeStaticProps } from "/lib/getStatic";
import { getStaticPaths } from "/lib/getStatic";

const getStaticProps = makeStaticProps(["home"]);
export { getStaticPaths, getStaticProps };

const Course = () => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;
  return (
    <>
      <Head>
        <title>{t("head-title")}</title>
        <meta name="description" content={t("head-content")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar i18next={i18next} />
      <CourseList breadcrumb={true} i18next={i18next} />
      <Footer i18next={i18next} />
    </>
  );
};

export default Course;
