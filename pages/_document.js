import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <GoogleAnalytics gaId="G-WCTB63H0GG" />
      </Html>
    );
  }
}

export default MyDocument;
