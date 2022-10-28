import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { verifiedTick } from "../../assets";
import { DatasetContext } from "../../context/DatasetContext";

import { useVerificationTimestamps } from "../../hooks/useTimeStamps";
import moment from "moment";

export default function VerificationList() {
  const [loading, setLoading] = useState(true);
  const { dataset } = useContext(DatasetContext)
  const { timestamps, isLoading } = useVerificationTimestamps()
  const navigate = useNavigate();

  const lastVerified = Math.max(...timestamps)

  useEffect(() => {
    if(dataset.length) {
      setLoading(false)
    } 
  }, [dataset]);

  return (
    <div className="verification-list">
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Type</th>
            <th>Asset Class</th>
            {/* <th>Asset Issued</th> */}
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
            {dataset.map((row) => (
              <tr key={row.id} className={row.available ? '' : 'disabled'} onClick={row.available ? () => { navigate(`/asset/${row.id}`) } : () => void {}}>
                <td>
                  <div className="flex">
                    <img className="avatar" src={row.image} alt="." />
                    <div className="dataset">
                      <div className="name">{row.dataset}</div>
                      <div className="address">{row.contract}</div>
                      <div className="status">{row.status}</div>
                    </div>
                  </div>
                </td>
                <td>{row.type}</td>
                <td>{row.assetClass}</td>
                {/* <td>{row.assetIssued}</td> */}
                <td>{row.assetClass !== "Gold" ? "N/A" : !isLoading ?
                  moment(
                    moment
                      .unix(lastVerified).utc()
                      .format("DD MMM YYYY HH:mm:ss [UTC]")
                  ).fromNow() : "loading..."}</td>
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
