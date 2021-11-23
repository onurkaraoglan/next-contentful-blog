import Link from "next/link";

const Footer = () => (
  <div className="footer">
    <div>
      <ul className="footerul">
        <li className="footerli">
          <a
            href="https://www.linkedin.com/in/onurkaraoglan/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            ln
          </a>
        </li>
        <li className="footerli">
          <a
            href="https://github.com/onurkaraoglan"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
            {/* <Icon
              className="footericon"
              type="github"
              style={{ fontSize: "20px", color: "#6f6b6b" }}
              theme="filled"
            /> */}
          </a>
        </li>
        <li className="footerli">
          <a
            href="https://twitter.com/onurkaraoglan"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
            {/* <Icon
              className="footericon"
              type="twitter"
              style={{ fontSize: "20px", color: "#6f6b6b" }}
            /> */}
          </a>
        </li>
        <li className="footerli">
          <a
            href="https://medium.com/@onurkaraoglan"
            target="_blank"
            rel="noopener noreferrer"
          >
            medium
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
          <Link href="/snippet">
            <a>Code Snippets</a>
          </Link>
        </li>
        <li className="linkli">
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        <li className="linkli">
          <Link href="/recommendations">
            <a>Recommendations</a>
          </Link>
        </li>
        <li className="linkli">
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <p className="copyright">© Copyright 2019. Onur Karaoğlan</p>
    </div>
  </div>
);

export default Footer;
