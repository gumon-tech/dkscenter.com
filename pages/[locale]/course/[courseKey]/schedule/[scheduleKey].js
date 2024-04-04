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


const CourseSchedule = ({ courseData, scheduleData }) => {
  const i18next = useTranslation("home");
  const { t, i18n } = i18next;

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const tickets = [
    {
      quantity: 20,
      available: 18,
      courseKey: "2024-007-modern-web-frontend-with-react",
      ticketId: "11156c00-417f-44b3-b659-95023795e314",
      reserved: 0,
      scheduleKey: "2024-1",
      salesEnd: "2024-04-01T10:00:00.000Z",
      order: 1,
      price: 6900,
      salesStart: "2024-03-28T18:05:51.305Z",
      name: "Early Bird",
    },
    {
      quantity: 20,
      available: 18,
      courseKey: "2024-007-modern-web-frontend-with-react",
      ticketId: "6b6e31ac-62b1-4173-8c06-ac934195ec26",
      reserved: 0,
      scheduleKey: "2024-1",
      salesEnd: "2024-05-18T10:00:00.000Z",
      order: 2,
      price: 7900,
      salesStart: "2024-04-01T10:00:00.000Z",
      name: "Standard",
    },
    {
      quantity: 20,
      available: 18,
      courseKey: "2024-007-modern-web-frontend-with-react",
      ticketId: "9407e262-19ba-4059-92af-3079461770cf",
      reserved: 0,
      scheduleKey: "2024-1",
      salesEnd: "2024-05-24T10:00:00.000Z",
      order: 3,
      price: 10000,
      salesStart: "2024-04-01T10:00:00.000Z",
      name: "Special",
    },
  ];

  return (
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
        <p>{JSON.stringify(scheduleData)}</p>
        {/* <div className="flex items-center justify-center h-screen"> */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Open Modal
        </button>
        <Modal isOpen={modalOpen} onClose={closeModal} title="Ticket">
          <TicketSales tickets={tickets}></TicketSales>
        </Modal>
        {/* </div> */}
      </Container>
      <Footer i18next={i18next} />
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
