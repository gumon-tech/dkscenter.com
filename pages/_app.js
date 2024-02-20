import { ThemeProvider } from "next-themes";
import "../css/tailwind.css";
import { GoogleTagManager } from "@next/third-parties/google";

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

export default MyApp;
