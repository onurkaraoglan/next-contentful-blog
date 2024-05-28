import Link from "next/link";
import styles from "@blog/styles/Home.module.css";
import { Linkedin, Medium, Twitter, Github } from "react-bootstrap-icons";

export default function Contact() {
  return (
      <div className={styles.container}>
        <p className={styles.title}>Contact</p>
        <p className={styles.contenttitle}>Want to get in touch?</p>
        <p className={styles.description}>
          Find me on linkedin, github, medium or twitter.
        </p>
        <div className="icons">
          <ul className="footerul">
            <li className="footerli">
              <Link
                href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
              >
                <Linkedin className="bigicon" />
              </Link>
            </li>
            <li className="footerli">
              <Link
                href="https://github.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github"
              >
                <Github className="bigicon" />
              </Link>
            </li>
            <li className="footerli">
              <Link
                href="https://medium.com/@onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="medium"
              >
                <Medium className="bigicon" />
              </Link>
            </li>
            <li className="footerli">
              <Link
                href="https://twitter.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter"
              >
                <Twitter className="bigicon" />
              </Link>
            </li>
          </ul>
        </div>
        <p className={styles.description}>
          Or email me at okaraoglan91@gmail.com
        </p>
      </div>
  );
}
