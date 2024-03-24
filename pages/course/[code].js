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
        <title>
          {`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`}
        </title>
        <meta
          name="description"
          content={`${courseData.title} | ${courseData.overview}`}
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Protocol */}
        <meta property="og:title" content={`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`} />
        <meta property="og:description" content={`${courseData.title} | ${courseData.overview}`} />
        <meta property="og:image" content={courseData.imageUrl} />
        {/* <meta property="og:url" content="URL ของเว็บไซต์" /> */}

        {/* Twitter Card */}
        <meta name="twitter:title" content={`${courseData.title} | DKS Center - Digital Knowledge Sharing Center`} />
        <meta name="twitter:description" content={`${courseData.title} | ${courseData.overview}`} />
        <meta name="twitter:image" content={courseData.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
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
