import Navigation from "./navigation";
import Footer from "./footer";
import Head from "next/head";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Onur Karaoğlan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
