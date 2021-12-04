import Head from "next/head";
import Link from "next/link";
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
              <Link href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <Linkedin className="bigicon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://github.com/onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="github"
                >
                  <Github className="bigicon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://medium.com/@onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="medium"
                >
                  <Medium className="bigicon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://twitter.com/onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="twitter"
                >
                  <Twitter className="bigicon" />
                </a>
              </Link>
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
