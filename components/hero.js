import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/assistant1.jpg";

const Hero = (props) => {
  const i18next = props.i18next;
  const { t, i18n } = i18next;
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              {t("hero-1")}
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              {t("hero-2")}
            </p>
            {props.children}
          </div>
        </div>
        <div className="flex justify-center w-full lg:w-1/2">
          <Image
            src={heroImg}
            width="616"
            height="617"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </Container>
    </>
  );
};

export default Hero;
