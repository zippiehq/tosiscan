import { HomeImage } from "../../assets";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/header/Hero";
import VerificationList from "../../components/home/VerificationList";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="home-content">
        <div className="home-title">
          <h2 className="content-title">Latest verifications</h2>
          <p className="content-summary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>
        <VerificationList />
        <div className="home-cta">
          <div className="cta-content">
            <h1>Climate and nature positive</h1>
            <p>
              Learn how each data verification on the TOSI chain will make the
              planet's forests and biodiversity grow.
            </p>
            <div className="flex">
              <button>Learn more</button>
              <button>Become a publisher</button>
            </div>
          </div>
          <img src={HomeImage} alt="Home" />
        </div>
      </div>
      <Footer />
    </>
  );
}
