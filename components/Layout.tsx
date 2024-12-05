
import Footer from "./Footer";
import Head from "next/head";
import Navigation from "./Navigation";

function Layout({ children }) {
  if (typeof window !== "undefined") {
    document.documentElement.lang = "en";
  }
  return (
    <div>
      <Head>
        <title>Onur Karaoğlan</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow"></meta>
        <meta
          name="description"
          content="Onur Karaoğlan - Full Stack Developer - Blog"
        ></meta>
        <meta
          name="keywords"
          content="Onur, Karaoğlan, Onur Karaoğlan, Software, Full-Stack, Engineer, Developer, Blog"
        ></meta>
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        ></meta>
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
