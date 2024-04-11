import React, { useState } from "react";
import Head from "next/head";
import Navbar from "/components/navbar";
import Footer from "/components/footer";
import CourseDetail from "/components/courseDetail";
import courses from "/datas/courses.json";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "/components/container";
import Modal from "/components/modal";
import TicketTable from "/components/TicketTable";
import TicketSales from "/components/TicketSales";
import TicketSaleModalManage from "/components/ticketSaleModal/ticketSaleModalManage";

const CourseSchedule = ({ courseData, scheduleData }) => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;
  const router = useRouter();
  const { asPath, query } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${asPath}`;
  const domain = origin;
  // console.log("query", query);
  // console.log("courseData", courseData);
  // console.log("scheduleData", scheduleData);

  const [modalOpen, setModalOpen] = useState(false);
  const [scheduleKey, setScheduleKey] = useState(scheduleData.scheduleKey);
  const { code } = router.query;



  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <>
        <Head>
          <title>
            {`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`}
          </title>
          <meta
            name="description"
            content={`${courseData.title} | ${courseData.overview}`}
          />
          <link rel="icon" href="/favicon.ico" />

          {/* Open Graph Protocol */}
          <meta
            property="og:title"
            content={`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`}
          />
          <meta
            property="og:description"
            content={`${courseData.title} | ${courseData.overview}`}
          />
          <meta property="og:image" content={domain + courseData.imageUrl} />
          <meta property="og:url" content={URL} />

          {/* Twitter Card */}
          <meta
            name="twitter:title"
            content={`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`}
          />
          <meta
            name="twitter:description"
            content={`${courseData.title} | ${courseData.overview}`}
          />
          <meta name="twitter:image" content={domain + courseData.imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Navbar i18next={i18next} />
        <Container>
          <h1>CourseSchedule</h1>
          <h2>scheduleKey: {scheduleData.scheduleKey}</h2>
          <h2>title: {scheduleData.title}</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Open Modal
          </button>
          {/* </div> */}
        </Container>
        <Footer i18next={i18next} />
      </>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={t("ticket-modal-title") + " " + courseData.title}
      >
        <TicketSaleModalManage
          courseKey={courseData.key}
          scheduleKey={scheduleKey}
          discountCodeURL={code}
          i18next={i18next}
        />
      </Modal>
    </>
  );
};

export const getStaticPaths = () => {
  const courseDatas = Object.values(courses);
  const paths = [];
  for (const courseData of courseDatas) {
    const courseLocaleDatas = Object.values(courseData);
    for (const courseLocaleData of courseLocaleDatas) {
      for (const publicSchedule of courseLocaleData.publicSchedule) {
        if (publicSchedule.isActive === true && publicSchedule.scheduleKey) {
          paths.push({
            params: {
              courseKey: courseLocaleData.key,
              scheduleKey: publicSchedule.scheduleKey,
              locale: courseLocaleData.locale || "en",
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
  const scheduleData = courseLocaleData?.publicSchedule?.find(
    (schedule) => schedule.scheduleKey == scheduleKey
  );
  const props = {
    ...(await serverSideTranslations(locale, ns)),
    courseData: courseLocaleData,
    scheduleData: scheduleData,
  };
  return props;
}

export default CourseSchedule;
