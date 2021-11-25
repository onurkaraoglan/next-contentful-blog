import Link from "next/link";
import { Linkedin, Medium, Twitter, Github } from "react-bootstrap-icons";

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="footer">
      <div className="footerflex">
        <div className="icons">
          <ul className="footerul">
            <li className="footerli">
              <a
                href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="icon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://github.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="icon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://medium.com/@onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Medium className="icon" />
              </a>
            </li>
            <li className="footerli">
              <a
                href="https://twitter.com/onurkaraoglan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="icon" />
              </a>
            </li>
          </ul>
        </div>
        <div className="links">
          <ul className="link">
            <li className="linkli">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/blog">
                <a>Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
      <div>
        <p className="copyright">© Copyright {year}. Onur Karaoğlan</p>
      </div>
    </div>
  );
}
