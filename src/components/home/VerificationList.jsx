import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { verifiedTick } from '../../assets'
import { DatasetContext } from '../../context/DatasetContext'

import { useVerificationTimestamps } from '../../hooks/useTimeStamps'

export default function VerificationList() {
  const [loading, setLoading] = useState(true)
  const { dataset } = useContext(DatasetContext)
  const { timestamps, isLoading } = useVerificationTimestamps()
  const navigate = useNavigate()

  const lastVerified = Math.max(...timestamps)

  useEffect(() => {
    if (dataset.length) {
      setLoading(false)
    }
  }, [dataset])
  const date = moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()
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
              <td>loading....</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {dataset.map((row) => (
              <tr
                key={row.id}
                className={row.available ? '' : 'disabled'}
                onClick={
                  row.available
                    ? () => {
                        navigate(`/asset/${row.id}`)
                      }
                    : null
                }
              >
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
                {/* eslint-disable-next-line no-nested-ternary */}
                <td>{row.assetClass !== 'Satellite image' ? 'N/A' : !isLoading ? date : 'loading...'}</td>
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
      </table>
    </div>
  )
}
