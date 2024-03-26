import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import "../css/styles.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <GoogleTagManager gtmId="G-WCTB63H0GG" />
    </>
  );
}

export default appWithTranslation(MyApp);
