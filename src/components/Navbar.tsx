import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="box navbar">
        <Link to={'/'} className="logo">
          Yousef<span>.</span><span>-</span>
        </Link>
        <ul className="links">
          <li><a href="#home"><span>01</span>// Home </a></li>
          <li><a href="#expertise"><span>02</span>// Expertise </a></li>
          <li><a href="#work"><span>03</span>// Projects </a></li>
          <li><a href="#experience"><span>04</span>// Experience </a></li>
          <li><a href="#contact"><span>05</span>// Contact </a></li>
        </ul>
        <div className="menu">
          <span></span>
        </div>
      </div>
    </nav>
  )
}
