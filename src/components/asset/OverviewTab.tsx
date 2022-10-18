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
import { useVerificationTimestamps } from "../../hooks/useTimeStamps";
import { useDatachainOutput } from "../../hooks/useDatachainOutput";
export default function OverviewTab() {
  const [metaData, setMetadata] = useState({
    "asset-class": "Gold",
    "asset-description": "Gold Bullion (g/oz/kg)",
    contract: "bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa",
    "main-location": "Lohko Gold Datachain",
    name: "Lohko Gold",
    "supported-locations": ["Ethereum", "Zippienet"],
  });

  const { timestamps, isLoading } = useVerificationTimestamps();

  const { assets, isLoading: fetchingAsset } = useDatachainOutput();

  const creationDate = Math.min(...timestamps);
  const lastVerified = Math.max(...timestamps);

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
            Lohko Gold bars are numbered and stored in a secure vault and owners
            have a legal right to claim them anytime.
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
                <td>{metaData["main-location"]}</td>
              </tr>
              <tr>
                <td>Supported assets location</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {metaData["supported-locations"].map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td>Creation date</td>
                <td>
                  {isLoading
                    ? "loading..."
                    : moment
                        .unix(creationDate)
                        .utc()
                        .format("DD MMM YYYY HH:mm:ss [UTC]")}{" "}
                  {!isLoading
                    ? "(" +
                      moment(
                        moment
                          .unix(creationDate)
                          .utc()
                          .format("DD MMM YYYY HH:mm:ss [UTC]")
                      ).fromNow() +
                      ")"
                    : null}
                </td>
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
                  {isLoading
                    ? "loading..."
                    : moment
                        .unix(lastVerified)
                        .utc()
                        .format("DD MMM YYYY HH:mm:ss [UTC]")}{" "}
                  {!isLoading
                    ? "(" +
                      moment(
                        moment
                          .unix(lastVerified)
                          .utc()
                          .format("DD MMM YYYY HH:mm:ss [UTC]")
                      ).fromNow() +
                      ")"
                    : null}
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
            {/*<img style={{ marginLeft: "8px" }} src={helpIcon} alt="help icon" />*/}
          </div>

          <div className="content">
            <h4>Physical Custody</h4>
            <h2>BullionStar</h2>

            <h2>45 New Bridge Rd, Singapore 059398</h2>
            <div className="address">
              <img src={AddressIcon} alt="Address pin" />
              <p>45 New Bridge Rd, Singapore 059398</p>
            </div>
            <p>
              We have partnered with Singapore-based gold and silver trading
              company BullionStar to ensure a safe and secure investment process
            </p>

            <div className="download-document">
              <img src={downloadIcon} alt="Download Icon" />
              <p>Insurance Document</p>
            </div>

            <div className="verifier">
              <p>
                Verified by
                <a href="https://www.bullionstar.com/" target="_blank" style={{ fontWeight: 500, color: '#07939c', textDecoration: 'none' }}> BullionStar</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="column-two">
        <div className="metric-item">
          <div className="heading">
            <h5>Publisher staking</h5>
            {/*<img src={helpIcon} alt="Help Icon" />*/}
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
                <h4>Lohko Pte Ltd</h4>
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
                <span>{!fetchingAsset ? assets.length : null}</span>
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
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                target="_blank"
                href="https://twitter.com/lohkowallet"
                rel="noreferrer"
              >
                <img src={facebookLogoGrey} alt="Facebook Logo" />
                <span>@LohkoWallet</span>
              </a>
            </div>
          </div>

          <div style={{ justifyContent: "space-between" }} className="flex">
            <div className="website">
              <a
                href="https://lohkowallet.com"
                target="_blank"
                rel="noreferrer"
              >
                www.lohkowallet.com
              </a>
            </div>
            <div className="website">
              <span style={{ color: "#475467" }}>View in</span>{" "}
              <a
                href="https://opensea.io/collection/lohkonft"
                target="_blank"
                rel="noreferrer"
              >
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
                <td>0</td>
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
