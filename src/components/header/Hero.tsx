import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import {
  caretDownWhite,
  leftVector,
  rightVector,
  searchIcon,
} from "../../assets";
import "./Hero.css";

function Hero() {
  const { setValue } = useContext(SearchContext);
  const [search, setSearch] = useState("");
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
        <div className="search-box">
          <img src={searchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Asset URL / Asset ID / Contract / Keyword"
            // value={value}
            onChange={(event) => {
              setSearch(event.target.value);
              setValue(event.target.value);
            }}
          />
          {/* 
          <select className="search-filter">
            <option value="all">All filters</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
