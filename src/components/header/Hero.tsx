import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import { caretDownWhite, leftVector, rightVector } from "../../assets";
import "./Hero.css";
import SearchBar from "./Search";

function Hero() {
  return (
    <div className="Hero">
      <img className="LeftVector" src={leftVector} alt="Right Vector" />
      <img className="RightVector" src={rightVector} alt="Right Vector" />
      <nav className="navbar">
        <Link to="/" className="logo">
          <LogoWhiteBg />
        </Link>
        <ul className="navlinks">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <div>
              <a className="link" style={{ cursor: "default" }}>
                Digital Assets
              </a>
              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <a className="link" style={{ cursor: "default" }}>
              File Verifications
            </a>
          </li>
          <li>
            <div>
              <a className="link" style={{ cursor: "default" }}>
                Publishers
              </a>
              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <a className="link" style={{ cursor: "default" }}>
              Become a publisher
            </a>
          </li>
        </ul>
      </nav>
      <div className="hero-content">
        <LogoWhiteBg width={236} height={69} />
        <p>Explore the world’s greenest blockchain</p>
        <SearchBar />
      </div>
    </div>
  );
}

export default Hero;
