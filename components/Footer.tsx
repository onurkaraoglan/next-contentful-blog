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
              <Link href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Linkedin"
                >
                  <Linkedin className="icon" />
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://github.com/onurkaraoglan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Github"
                >
                  <Github className="icon" />
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://medium.com/@onurkaraoglan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Medium"
                >
                  <Medium className="icon" />
              </Link>
            </li>
            <li className="footerli">
              <Link href="https://twitter.com/onurkaraoglan"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="icon" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <ul className="link">
            <li className="linkli">
              <Link href="/"className="link-footer">Home
              </Link>
            </li>
            <li className="linkli">
              <Link href="/about"className="link-footer">About
              </Link>
            </li>
            <li className="linkli">
              <Link href="/contact"className="link-footer">Contact
              </Link>
            </li>
            <li className="linkli">
              <Link href="/blog"className="link-footer">Blog
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
