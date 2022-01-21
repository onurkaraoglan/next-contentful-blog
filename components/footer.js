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
              <Link href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <Linkedin className="icon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://github.com/onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <Github className="icon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://medium.com/@onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                >
                  <Medium className="icon" />
                </a>
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://twitter.com/onurkaraoglan">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="icon" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <ul className="link">
            <li className="linkli">
              <Link href="/">
                <a className="link-footer">Home</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/about">
                <a className="link-footer">About</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/contact">
                <a className="link-footer">Contact</a>
              </Link>
            </li>
            <li className="linkli">
              <Link href="/blog">
                <a className="link-footer">Blog</a>
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
