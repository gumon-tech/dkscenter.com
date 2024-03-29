import React from "react";
import Head from "next/head";
import Navbar from "/components/navbar";
import Footer from "/components/footer";
import CourseDetail from "/components/courseDetail";
import courses from "/datas/courses.json";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CourseSchedule = ({ courseData ,scheduleData  }) => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;

  const { asPath , query } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  const domain = origin;
  console.log('query',query)
  console.log('courseData',courseData)
  console.log('scheduleData',scheduleData)



  return (
    <>
      <h1>CourseSchedule</h1>
      <h2>scheduleKey: {scheduleData.scheduleKey}</h2>
      <h2>title: {scheduleData.title}</h2>
    </>
  );
};

export const getStaticPaths = () => {
  const courseDatas =  Object.values(courses)
  const paths = [];
  for (const courseData of courseDatas) {
    const courseLocaleDatas =  Object.values(courseData)
    for (const courseLocaleData of courseLocaleDatas) {
      for (const publicSchedule of courseLocaleData.publicSchedule) {
        if(publicSchedule.isActive === true && publicSchedule.scheduleKey){
          paths.push({
            params: { 
              courseKey: courseLocaleData.key, 
              scheduleKey: publicSchedule.scheduleKey,
              locale: courseLocaleData.locale || "en"
            },
          });
        }
      }
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
  const scheduleKey = ctx?.params?.scheduleKey;
  const courseLocaleData = courseData[locale]; 
  const scheduleData = courseLocaleData?.publicSchedule?.find((schedule) => schedule.scheduleKey == scheduleKey);
  const props = {
    ...(await serverSideTranslations(locale, ns)),
    courseData: courseLocaleData,
    scheduleData: scheduleData
  };
  return props;
}

export default CourseSchedule;
