import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

export default function Contact() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Onur - Contact</title>
          <meta name="description" content="Generated by create next app" />
        </Head>
        <p className={styles.description}>Contact</p>
      </div>
    </Layout>
  );
}