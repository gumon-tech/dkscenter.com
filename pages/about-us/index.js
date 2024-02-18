import React from "react";
import Head from "next/head";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Hero from "../../components/hero";
import { AtSymbolIcon } from "@heroicons/react/24/solid";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutUs = () => {
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
      <Hero>
        <>
          <p className="py-5 leading-normal text-gray-500  dark:text-gray-300">
            If you have any questions simply use the following contact details.
          </p>

          <Contact
            title={
              <a target="_blank" href="mailto:sales@dkscenter.com">
                sales@dkscenter.com
              </a>
            }
            icon={<AtSymbolIcon />}
          />
          <Contact
            title={
              <>
                <a
                  target="_blank"
                  href="https://www.facebook.com/digitalknowledgesharing"
                >
                  fb.com/digitalknowledgesharing
                </a>
              </>
            }
            icon={<FontAwesomeIcon icon={faFacebook} width={30} height={30} />}
          />
          <Contact
            title={
              <>
                <a target="_blank" href="https://lin.ee/fnl0CuL">
                  @digitalknowledge
                </a>
              </>
            }
            icon={<FontAwesomeIcon icon={faLine} width={30} height={30} />}
          />
        </>
      </Hero>
      <Footer />
    </>
  );
};

function Contact(props) {
  return (
    <>
      <div className="flex items-center mt-2 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11 ">
          {React.cloneElement(props.icon, {
            className: "w-7 h-7 text-indigo-50",
          })}
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
            {props.title}
          </h4>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
