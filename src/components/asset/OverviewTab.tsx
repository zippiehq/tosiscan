import moment from "moment";
import { useEffect, useState } from "react";
import { get } from "../../adapters/axios";
import {
  facebookLogoGrey,
  verifiedTick,
  lohkoAvatar,
  downloadIcon,
  helpIcon,
  AddressIcon,
} from "../../assets";
import unzip from "../../utils/unzip";
export default function OverviewTab({
  latestTimeStamp,
}: {
  latestTimeStamp: number;
}) {
  const [metaData, setMetadata] = useState({
    "asset-class": "Gold",
    "asset-description": "Gold Bullion (g/oz/kg)",
    contract: "bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa",
    "main-location": "Lohko Gold Datachain",
    name: "Lohko Gold",
    "supported-locations": ["Ethereum", "Zippienet"],
  });

  useEffect(() => {
    // use query seal to get latest data
    async function fetchAssets() {
      const sealResponse = await get(
        "/tosi/api/v1/query-seal/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa",
        "json"
      );
      const { data } = await get(
        "/tosi/api/v0/ipfs/get/" + sealResponse.data.status + "/output.zip",
        "blob"
      );
      let res: any = await unzip(data, "metadata.json");

      setMetadata(res);
    }

    fetchAssets();
  }, []);

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
                <td>{metaData.contract}</td>
              </tr>
              <tr>
                <td>Dataset name</td>
                <td>{metaData.name}</td>
              </tr>
              <tr>
                <td>Asset description</td>
                <td>{metaData["asset-description"]}</td>
              </tr>
              <tr>
                <td>Asset class</td>
                <td>{metaData["asset-class"]}</td>
              </tr>
              <tr>
                <td>Main location</td>
                <td style={{ color: "#07939C" }}>
                  {metaData["main-location"]}
                </td>
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
                  {metaData["supported-locations"].map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
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
                <td>Last successful verification</td>
                <td>
                  {moment
                    .unix(latestTimeStamp)
                    .format("d MMM YYYY hh:mm:ss [UTC]")}{" "}
                  (
                  {moment(
                    moment
                      .unix(latestTimeStamp)
                      .format("d MMM YYYY hh:mm:ss [UTC]")
                  ).fromNow()}
                  )
                </td>
              </tr>
              <tr>
                <td>Last failed verification</td>
                <td>-</td>
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
                    100%
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
            <h2>BullionStar</h2>

            <div className="address">
              <img src={AddressIcon} alt="Address pin" />
              <p>45 New Bridge Rd, Singapore 059398</p>
            </div>
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
                <span>1</span>
                <p>Datasets</p>
              </div>
              <div className="asset-stat">
                <span>86</span>
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

          <div style={{ justifyContent: "space-between" }} className="flex">
            <div className="website">
              <a href="www.lohkowallet.com" target="_blank">
                www.lohkowallet.com
              </a>
            </div>
            <div className="website">
              <span style={{ color: "#475467" }}>View in</span>{" "}
              <a href="www.lohkowallet.com" target="_blank">
                OpenSea
              </a>
            </div>
          </div>
        </div>

        <div className="disputes">
          <h3>Dataset disputes</h3>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
