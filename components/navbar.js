import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Link from "/components/link";
import { useRouter } from "next/router";
import LanguageSwitchLink from "./LanguageSwitchLink";
import i18nextConfig from "../next-i18next.config";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function Navbar(props) {
  const router = useRouter();
  const i18next = props.i18next;
  const { t, i18n } = i18next;

  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;
  const navigation = [
    { title: "Home", path: "/" },
    { title: "Course", path: "/course" },
    { title: "Schedule", path: "/schedule" },
    { title: "About Us", path: "/about-us" },
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-8">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.png"
                        alt="DKS"
                        width="200"
                        height="32"
                        className="w-20"
                      />
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={menu.path}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu.title}
                </Link>
              </li>
            ))}

            <li className="mr-3 nav__item" key="LanguageSwitchLink">
              {i18nextConfig.i18n.locales.map((locale) => {
                if (locale === currentLocale) return null;
                return <LanguageSwitchLink locale={locale} key={locale} />;
              })}
            </li>
          </ul>

          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
}
