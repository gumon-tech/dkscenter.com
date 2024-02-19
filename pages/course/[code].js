import React from "react";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CourseDetail from "../../components/courseDetail";
import courses from "../../datas/courses.json";

const Course = ({ courseData }) => {
  return (
    <>
      <Head>
        <title>DKS Center - Digital Knowledge Sharing Center</title>
        <meta
          name="description"
          content="DKS acts as a central hub bridging digital communities and technology enthusiasts, fostering collaboration and knowledge exchange. Our mission includes organizing seminars, knowledge-sharing activities, and collaborative events to constantly update our network with the latest insights."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <CourseDetail courseData={courseData} />
      <Footer />
    </>
  );
};

export const getStaticPaths = () => {
  const courseKeyList = Object.keys(courses);
  const paths = courseKeyList.map((courseKey) => ({
    params: { code: courseKey },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = (context) => {
  const courseKey = context.params?.code || "";
  const courseData = courses[courseKey];
  return { props: { courseData } };
};

export default Course;
