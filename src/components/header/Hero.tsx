import LeftVector from "../../assets/LeftVector";
import "./Hero.css";
import RightVector from "../../assets/RightVector";
import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import CaretDownWhite from "../../assets/CaretDownWhite";
import SearchIcon from "../../assets/SearchIcon";

function Hero() {
  return (
    <div className="Hero">
      <LeftVector />
      <RightVector />
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
              <CaretDownWhite />
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
              <CaretDownWhite />
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
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Asset URL / Asset ID / Contract / Keyword"
          />

          <select className="search-filter">
            <option value="all">All filters</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Hero;
