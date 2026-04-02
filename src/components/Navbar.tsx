import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const nav = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    nav?.current?.classList.toggle("active");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        nav?.current?.classList.add("navbar-scroll");
      } else {
        nav?.current?.classList.remove("navbar-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav ref={nav}>
      <div className="box navbar">
        <Link to={"/"} className="logo">
          Yousef<span>.</span>
          <span>-</span>
        </Link>
        <ul className="links">
          <Link to={"/"} className="logo logo2">
            Yousef<span>.</span>
            <span>-</span>
          </Link>
          <li>
            <a href="#home">
              <span>01</span>// Home{" "}
            </a>
          </li>
          <li>
            <a href="#expertise">
              <span>02</span>// Expertise{" "}
            </a>
          </li>
          <li>
            <a href="#work">
              <span>03</span>// Projects{" "}
            </a>
          </li>
          <li>
            <a href="#experience">
              <span>04</span>// Experience{" "}
            </a>
          </li>
          <li>
            <a href="#contact">
              <span>05</span>// Contact{" "}
            </a>
          </li>
        </ul>
        <div className="menu">
          <span className="span"></span>
          <button onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
