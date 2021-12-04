import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function Navigation() {
  const { theme, setTheme } = useTheme("dark");
  const toggleTheme = theme === "light" ? "dark" : "light";
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleTheme = () => {
    const toggleLines = document.getElementsByClassName("line");
    for (let i = 0; i < toggleLines.length; i++) {
      if (toggleTheme === "light") {
        toggleLines.item(i).style.display = "block";
      } else {
        toggleLines.item(i).style.display = "none";
      }
    }
    const toggles = document.getElementsByClassName("toggle");
    for (let i = 0; i < toggles.length; i++) {
      if (toggleTheme === "light") {
        toggles.item(i).style.filter = "invert(100%)";
      } else {
        toggles.item(i).style.filter = "invert(0%)";
      }
    }
  };

  useEffect(() => {
    handleTheme();
  });

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <Link href="/">
            <a>
              <img src="/images/logo.png" width="45" height="50" alt="close" />
            </a>
          </Link>
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/about">
              <a> ABOUT </a>
            </Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/contact">
              <a> CONTACT </a>
            </Link>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <Link href="/blog">
              <a> BLOG </a>
            </Link>
          </li>
        </ul>
        <div>
          <label className="switch">
            <input
              type="checkbox"
              defaultChecked={toggleTheme === "light"}
              onClick={() => {
                setTheme(toggleTheme);
                handleTheme();
              }}
            />
            <span className="slider"></span>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
            <div className="line line4"></div>
          </label>
        </div>
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <img
            className="toggle hidden"
            src="/images/cross.png"
            width="40"
            height="40"
            alt="close"
          />
        ) : (
          <img
            className="toggle block"
            src="/images/menu.png"
            width="40"
            height="40"
            alt="menu"
          />
        )}
      </div>
    </div>
  );
}

export default Navigation;
