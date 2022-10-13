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
              <Link className="link" to="/assets">
                Digital Assets
              </Link>
              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <Link className="link" to="/verifications">
              File Verifications
            </Link>
          </li>
          <li>
            <div>
              <Link className="link" to="/publishers">
                Publishers
              </Link>
              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <Link className="link" to="/become-a-publisher">
              Become a publisher
            </Link>
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
