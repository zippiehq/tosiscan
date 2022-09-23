import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import "./Footer.css";
import TwitterIcon from "../../assets/TwitterIcon";
import YoutubeIcon from "../../assets/YoutubeIcon";
import LinkedInIcon from "../../assets/LinkedInIcon";
import TelegramIcon from "../../assets/TelegramIcon";
import GithubIcon from "../../assets/GithubIcon";

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
              <Link to="/zippie">Zippie</Link>
              <Link to="/productsß">Products</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/help">Help</Link>
              <Link to="/privacy">Privacy</Link>
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
              <TwitterIcon />
              <YoutubeIcon />
              <LinkedInIcon />
              <TelegramIcon />
              <GithubIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
