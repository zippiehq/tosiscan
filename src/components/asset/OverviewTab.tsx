import {
  facebookLogoGrey,
  verifiedTick,
  lohkoAvatar,
  downloadIcon,
  helpIcon,
} from "../../assets";
export default function OverviewTab() {
  return (
    <div className="asset-overview">
      <div className="column-one">
        <div className="summary">
          <h3>Summary</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="general-info">
          <h3>General Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Data contract</td>
                <td style={{ color: "#07939C" }}>
                  0x80bf3a234b751494f6688522af20bb834b3680b689764372
                </td>
              </tr>
              <tr>
                <td>Dataset name</td>
                <td>Lohko Gold</td>
              </tr>
              <tr>
                <td>Asset description</td>
                <td>Gold Bullion (g/oz/kg)</td>
              </tr>
              <tr>
                <td>Asset class</td>
                <td>Gold</td>
              </tr>
              <tr>
                <td>Main location</td>
                <td style={{ color: "#07939C" }}>Lohko Gold Datachain</td>
              </tr>
              <tr>
                <td>Supported assets location</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#07939C",
                  }}
                >
                  <span>Polygon</span>
                  <span>Arbitrum</span>
                  <span>Ethereum</span>
                  <span>ZippieNet</span>
                </td>
              </tr>
              <tr>
                <td>Creation date</td>
                <td>6 Mar 2022 10:12:45 UTC (1 day ago)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verifications">
          <h3>Verifications</h3>
          <table>
            <tbody>
              <tr>
                <td>Verification frequency</td>
                <td>Weekly</td>
              </tr>
              <tr>
                <td>Last verification</td>
                <td>6 Mar 2022 10:12:45 UTC (1 day ago)</td>
              </tr>
              <tr>
                <td>Availability score</td>
                <td>
                  <span
                    style={{
                      color: "#1B876A",
                      backgroundColor: "#F5FCFA",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    99%
                  </span>
                </td>
              </tr>
              <tr>
                <td>History match score</td>
                <td>
                  <span
                    style={{
                      color: "#1B876A",
                      backgroundColor: "#F5FCFA",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    100%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Signature match score</td>
                <td>
                  <span
                    style={{
                      color: "#1B876A",
                      backgroundColor: "#F5FCFA",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    99%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="supporting-verifications">
          <div className="flex">
            <h3>Supporting verification</h3>
            <img style={{ marginLeft: "8px" }} src={helpIcon} alt="help icon" />
          </div>

          <div className="content">
            <h4>Physical Custody</h4>
            <h2>45 New Bridge Rd, Singapore 059398</h2>
            <p>
              We have partnered with Singapore-based gold and silver trading
              company...
              <span>Read more</span>
            </p>

            <div className="download-document">
              <img src={downloadIcon} alt="Download Icon" />
              <p>Insurance Document</p>
            </div>

            <div className="verifier">
              <p>
                Verified by
                <span>BullionStar</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="column-two">
        <div className="metric-item">
          <div className="heading">
            <h5>Publisher staking</h5>
            <img src={helpIcon} alt="Help Icon" />
          </div>

          <div className="amount">
            <p>100,000</p>
            <span>TOSI</span>
          </div>
        </div>
        <div className="profile">
          <h3>Publisher / Issuer</h3>
          <div className="issuer">
            <img src={lohkoAvatar} alt="Lohko Avatar" />
            <div className="details">
              <div className="name">
                <h4>Lohko Wallet Pte Ltd</h4>
                <img src={verifiedTick} alt="verified tick" />
              </div>
              <p>Publisher since May 2022</p>
            </div>
          </div>

          <div className="description">
            <div className="stats">
              <div className="dataset-stat">
                <span>78</span>
                <p>Datasets</p>
              </div>
              <div className="asset-stat">
                <span>1,208</span>
                <p>Verified assets</p>
              </div>
            </div>
            <p className="desc">
              Whether it’s gold, silver, art, or other assets, Lohko digitalises
              tangible assets and gives investors full control.
            </p>
          </div>
          <div className="socials">
            <div className="social-icon">
              <img src={facebookLogoGrey} alt="Facebook Logo" />
              <span>@LohkoWallet</span>
            </div>
            <div className="social-icon">
              <img src={facebookLogoGrey} alt="Facebook Logo" />
              <span>@LohkoWallet</span>
            </div>
            <div className="social-icon">
              <img src={facebookLogoGrey} alt="Facebook Logo" />
              <span>@lohkonft</span>
            </div>
            <div className="social-icon">
              <img src={facebookLogoGrey} alt="Facebook Logo" />
              <span>@LohkoWallet</span>
            </div>
            <div className="social-icon">
              <img src={facebookLogoGrey} alt="Facebook Logo" />
              <span>@lohko-ltd</span>
            </div>
          </div>

          <div className="website">
            <a href="www.lohkowallet.com" target="_blank">
              www.lohkowallet.com
            </a>
          </div>
        </div>

        <div className="disputes">
          <h3>Disputes</h3>
          <table>
            <tbody>
              <tr>
                <td>All-time disputes</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Publisher success rate</td>
                <td style={{ padding: "0px" }}>
                  <span
                    style={{
                      color: "#1B876A",
                      backgroundColor: "#F5FCFA",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    100%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Open disputes</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Disputes in the past 7 days</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
