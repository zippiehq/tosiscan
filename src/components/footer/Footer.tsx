import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  linkedInIcon,
  twitterIcon,
  telegramIcon,
  githubIcon,
  youtubeIcon,
} from "../../assets";

export default function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="top-content">
          <div className="logo-and-links">
            <div className="logo">
              <LogoWhiteBg />
            </div>
            <p className="text">
              Block explorer for Datachain, a new blockchain built for the next
              generation of apps, games, and digital assets.
            </p>
            <div className="links">
              <a style={{ cursor: "default" }}>Zippie</a>
              <a style={{ cursor: "default" }}>Products</a>
              <a style={{ cursor: "default" }}>Pricing</a>
              <a style={{ cursor: "default" }}>Blog</a>
              <a style={{ cursor: "default" }}>Help</a>
              <a style={{ cursor: "default" }}>Privacy</a>
            </div>
          </div>
          <div className="app-store-actions">
            <h4>Stay up to date</h4>
            <div className="email-capture">
              <input type="text" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div className="social-icons">
            <p className="copyrights">Copyrighted by Zippie 2022</p>
            <div className="icons">
              <img src={twitterIcon} alt="Twitter Icon" />
              <img src={youtubeIcon} alt="linkedin Icon" />
              <img src={linkedInIcon} alt="linkedin Icon" />
              <img src={telegramIcon} alt="telegran Icon" />
              <img src={githubIcon} alt="Github Icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
