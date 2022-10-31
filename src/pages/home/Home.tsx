import { useNavigate } from 'react-router-dom'
import { HomeImage } from '../../assets'
import VerificationList from '../../components/home/VerificationList'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-content">
      <div className="home-title">
        <h2 className="content-title">Latest verifications</h2>
      </div>
      <VerificationList />
      <div className="home-cta">
        <div className="cta-content">
          <h1>Climate and nature positive</h1>
          <p>
            Learn how each data verification on the TOSI chain will make the planet&apos;s forests and biodiversity
            grow.
          </p>
          <div className="flex">
            <button type="button" onClick={() => navigate('')}>
              Learn more
            </button>
            <button type="button" onClick={() => navigate('')}>
              Become a publisher
            </button>
          </div>
        </div>
        <img src={HomeImage} alt="Home" />
      </div>
    </div>
  )
}
