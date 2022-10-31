import { Link } from 'react-router-dom'
import LogoWhiteBg from '../../assets/LogoWhiteBg'
import { caretDownWhite, leftVector, rightVector } from '../../assets'
import './Hero.css'
import SearchBar from './Search'

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
              <Link className="link" to="/coming-soon">
                Digital Assets
              </Link>

              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <Link className="link" to="/coming-soon">
              File Verifications
            </Link>
          </li>
          <li>
            <div>
              <Link className="link" to="/coming-soon">
                Publishers
              </Link>

              <img src={caretDownWhite} alt="Caret down" />
            </div>
          </li>
          <li>
            <Link className="link" to="/coming-soon">
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
  )
}

export default Hero
