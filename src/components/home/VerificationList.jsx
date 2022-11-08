import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { verifiedTick } from '../../assets'
import { useDataSetContext } from '../../hooks/useDataset'
import { useDataSetAssetsContext } from '../../hooks/useDatachainOutput'

export default function VerificationList() {
  const [loading, setLoading] = useState(true)
  const { datasets } = useDataSetContext()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (datasets.length) {
      setLoading(false)
    }
  }, [datasets])
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
            {datasets.map((row) => {
              const lastVerified = isLoading ? 0 : datasetOutputs[row.id]?.lastVerified
              const date = moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()

              return (
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
                  <td>{row.assetClass === 'Satellite image' ? 'N/A' : !isLoading ? date : 'loading...'}</td>
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
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}
