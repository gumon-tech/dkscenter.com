import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SectionTitle from "../../components/sectionTitle";
import PrivacyContentEN from "./en";
import PrivacyContentTH from "./th";

const Privacy = () => {
  return (
    <>
      <Head>
        <title>
          Privacy Policy | DKS Center - Digital Knowledge Sharing Center
        </title>
        <meta
          name="description"
          content="DKS acts as a central hub bridging digital communities and technology enthusiasts, fostering collaboration and knowledge exchange. Our mission includes organizing seminars, knowledge-sharing activities, and collaborative events to constantly update our network with the latest insights."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SectionTitle
        pretitle="Gumon Technology Co., Ltd."
        title="Privacy Policy for Customer"
      >
        <PrivacyContentEN />
      </SectionTitle>
      <Footer />
    </>
  );
};

export default Privacy;
