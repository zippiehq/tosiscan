import { useContext, useEffect, useState } from "react";
import { get } from "../../adapters/axios";
import { LohkoImage, verifiedTick } from "../../assets";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { DatasetContext } from "../../context/DatasetContext";
import image from "../../assets/Lohko.svg"
import axios from "axios";


export default function VerificationList() {
  const [loading, setLoading] = useState(false);
  const { value } = useContext(SearchContext);
  const { dataset, setDataset } = useContext(DatasetContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("db.json")
        console.log({ response });

        if (response && response.data) {
          setDataset(response.data.verifications)
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [setDataset]);

  // useEffect(() => {
  //   const algoliasearch = require("algoliasearch");

  //   const client = algoliasearch(
  //     "MQ99WPDDH2",
  //     "55103168da08e82164a86c1c885b537f"
  //   );
  //   const index = client.initIndex("zippie");

  //   function filterData() {
  //     index
  //       .search(value)
  //       .then(({ hits }) => {
  //         setDataset(hits)
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }

  //   setTimeout(filterData, 500);

  // }, [value, setDataset]);

  return (
    <div className="verification-list">
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Type</th>
            <th>Asset Class</th>
            <th>Last verified</th>
            <th>Publisher</th>
            <th>Issuer/s</th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td>
                loading....
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {dataset.map((row, index) => (
              <tr key={index} onClick={() => { navigate(`/asset/${row.id}`) }}>
                <td>
                  <div className="flex">
                    <img className="avatar" src={image} alt="lohko" />
                    <div className="dataset">
                      <div className="name">{row.dataset}</div>
                      <div className="address">{row.contract}</div>
                    </div>
                  </div>
                </td>
                <td>{row.type}</td>
                <td>{row.assetClass}</td>
                <td>{row.lastVerified}</td>
                <td>
                  <div className="flex">
                    <div>{row.publisher}</div>
                    <img src={verifiedTick} alt="verification tick" />
                  </div>
                </td>
                <td>
                  <div className="flex">
                    <div>{row.issuers}</div>
                    <img src={verifiedTick} alt="verification tick" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        <tfoot></tfoot>
      </table>
    </div>
  );
}
