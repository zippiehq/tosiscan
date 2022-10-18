import LogoWhiteBg from "../../assets/LogoWhiteBg";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./Footer.css";
import {
  linkedInIcon,
  twitterIcon,
  telegramIcon,
  githubIcon,
  youtubeIcon,
} from "../../assets";

export default function Footer() {
  const onExternalLinkClick = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <footer>
      <div className="content">
        <div className="top-content">
          <div className="logo-and-links">
            <div className="logo">
              <LogoWhiteBg />
            </div>
            <p className="text">Explore the world’s greenest blockchain.</p>
            <div className="links">
              <a style={{ cursor: "default" }}>Zippie</a>
              <a style={{ cursor: "default" }}>Products</a>
              <a style={{ cursor: "default" }}>Pricing</a>
              <a style={{ cursor: "default" }}>Blog</a>
              <a style={{ cursor: "default" }}>Help</a>
              <a style={{ cursor: "default" }}>Privacy</a>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div className="social-icons">
            <p className="copyrights">Copyrighted by TOSI Foundation 2022</p>
            <div className="icons">
              <IconButton
                onClick={() =>
                  onExternalLinkClick("https://twitter.com/tosichain")
                }
              >
                <img src={twitterIcon} alt="Twitter Icon" />
              </IconButton>
              <IconButton
                onClick={() =>
                  onExternalLinkClick(
                    "https://www.youtube.com/channel/UCMdL-559OXnd95KocIRJsVA"
                  )
                }
              >
                <img src={youtubeIcon} alt="youtube Icon" />
              </IconButton>{" "}
              <IconButton
                onClick={() =>
                  onExternalLinkClick(
                    "https://www.linkedin.com/company/tosichain.com"
                  )
                }
              >
                <img src={linkedInIcon} alt="linkedin Icon" />
              </IconButton>
              {/* <img src={telegramIcon} alt="telegran Icon" /> */}
              {/* <img src={githubIcon} alt="Github Icon" /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
