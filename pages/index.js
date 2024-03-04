import Head from "next/head";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import Video from "../components/video";
import Footer from "../components/footer";
import CourseList from "../components/courseList";

const Home = () => {
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
      <SectionTitle
        pretitle="Upcoming Event"
        title="Fundamental Docker #1/2024"
      >
        The Fundamental Docker course teaches essential Docker basics, including
        Linux fundamentals, basic commands, VIM text editing, and core Docker
        operations such as container creation, management, and Docker Compose
        usage for orchestrating multiple services.
        <p className="pt-8">
          <a
            href="https://dkscenter.com/course/2024-001-fundamental-docker"
            target="_blank"
            className="mt-8 px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md"
          >
            Secure Your Spot Now!
          </a>
        </p>
      </SectionTitle>
      <Video />
      <CourseList />
      <Footer />
    </>
  );
};

export default Home;
