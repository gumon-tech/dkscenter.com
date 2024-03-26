import Head from "next/head";
import Navbar from "../../components/navbar";
import SectionTitle from "../../components/sectionTitle";
import Video from "../../components/video";
import Footer from "../../components/footer";
import CourseList from "../../components/courseList";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { makeStaticProps } from "../../lib/getStatic";
import { getStaticPaths } from "../../lib/getStatic";


const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }

const Home = () => {
  const { t } = useTranslation('common');

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
      <h1>{t('welcome')}</h1>
      <SectionTitle
        pretitle="Upcoming Event"
        title="Modern Web Frontend with React #1/2024"
      >
        The Modern Web Frontend with React course is a learning experience focused on the basics of developing web applications using ReactJS, a JavaScript library used for building user interfaces. Participants will learn about the React structure, component creation, state management, API integration, and routing in web applications.
        <p className="pt-8">
          <Link
            href="/course/2024-007-modern-web-frontend-with-react"
            className="mt-8 px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
          >
            Secure Your Spot Now!
          </Link>
        </p>
      </SectionTitle>
      <Video />
      <CourseList />
      <Footer />
    </>
  );
};

export default Home;
