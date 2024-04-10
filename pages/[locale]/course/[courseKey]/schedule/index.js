import React from "react";
import Head from "next/head";
import Navbar from "/components/navbar";
import Footer from "/components/footer";
import CourseDetail from "/components/courseDetail";
import courses from "/datas/courses.json";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CourseSchedule = ({ courseData }) => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  const domain = origin;
  const currentLanguage = i18n.language;
  const courseLocaleData = courseData[currentLanguage];

  return (
    <>
      <h1>CourseSchedule</h1>
    </>
  );
};

export const getStaticPaths = () => {
  const courseKeyList = Object.keys(courses);
  const paths = [];
  const locales = ["en", "th"];
  for (const courseKey of courseKeyList) {
    for (const locale of locales) {
      paths.push({
        params: { courseKey: courseKey, locale: locale },
      });
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = makeStaticProps(["home"]);

function makeStaticProps(ns = {}) {
  return async function getStaticProps(ctx) {
    const courseKey = ctx.params?.courseKey || "";
    const courseData = courses[courseKey];
    return {
      props: await getI18nProps(ctx, ns, courseData),
    };
  };
}

async function getI18nProps(ctx, ns = ["home"], courseData) {
  const locale = ctx?.params?.locale;
  const props = {
    ...(await serverSideTranslations(locale, ns)),
    courseData: courseData,
  };
  return props;
}

export default CourseSchedule;
