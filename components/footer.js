import Link from "/components/link";
import Image from "next/image";
import React from "react";
import Container from "./container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareYoutube,
  faLine,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

// import { useTranslation } from "next-i18next";
// import { makeStaticProps } from "/lib/getStatic";
// import { getStaticPaths } from "/lib/getStatic";

// const getStaticProps = makeStaticProps(["home"]);
// export { getStaticPaths, getStaticProps };

export default function Footer() {
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Course", path: "/course" },
    { title: "Schedule", path: "/schedule" },
  ];
  const legal = [
    { title: "About Us", path: "/about-us" },
    { title: "Privacy", path: "/privacy" },
  ];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div>
              {" "}
              <Link
                href="/"
                className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
              >
                <Image
                  src="/img/logo.png"
                  alt="DKS"
                  width="200"
                  height="32"
                  className="w-20"
                />
              </Link>
            </div>

            <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              DKS - Connecting digital communities and tech enthusiasts. We
              facilitate collaboration, host joint events, and continuously
              update knowledge through community exchanges.
            </div>
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0">
              {legal.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <div>Follow us</div>

            <div className="flex mt-5 space-x-5 text-gray-400 dark:text-gray-500">
              <a
                target="_blank"
                href="https://www.facebook.com/digitalknowledgesharing"
              >
                <FontAwesomeIcon icon={faFacebook} width={30} height={30} />
              </a>
              <a target="_blank" href="https://lin.ee/fnl0CuL">
                <FontAwesomeIcon icon={faLine} width={30} height={30} />
              </a>
              <a target="_blank" href="https://www.youtube.com/@dkscenter">
                <FontAwesomeIcon
                  icon={faSquareYoutube}
                  width={30}
                  height={30}
                />
              </a>
              <a target="_blank" href="mailto:sales@dkscenter.com">
                <FontAwesomeIcon icon={faEnvelope} width={30} height={30} />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by{" "}
          <a href="https://gumon.io/" target="_blank" rel="noopener">
            Gumon.io
          </a>
        </div>
      </Container>
    </div>
  );
}
