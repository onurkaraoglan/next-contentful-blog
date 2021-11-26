import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { Linkedin, Medium, Twitter, Github } from "react-bootstrap-icons";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Onur - Contact</title>
        <meta
          name="description"
          content="Find me on linkedin, github, medium or twitter."
        />
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>Contact</p>
        <p className={styles.contenttitle}>Want to get in touch?</p>
        <p className={styles.description}>
          Find me on linkedin, github, medium or twitter.
        </p>
        <div className="icons">
          <ul className="footerul">
            <li className="footerli">
              <a
                href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="bigicon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://github.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="bigicon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://medium.com/@onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Medium className="bigicon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://twitter.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="bigicon" />
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.description}>
          Or email me at onur@onurkaraoglan.com
        </p>
      </div>
    </Layout>
  );
}
