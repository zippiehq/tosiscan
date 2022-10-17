import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material/";

import './AssetSearchResult.css'

import Hero from '../../components/header/Hero'
import Footer from '../../components/footer/Footer'

import { useDatachainOutput } from '../../hooks/useDatachainOutput';

import { check } from '../../assets'
import { info } from '../../assets'

const AssetDetails = () => {
  const { assetContract, assetTokenId } = useParams()
  const { assets, isLoading } = useDatachainOutput()
  const navigate = useNavigate()

  const filtered = assets.filter(({location}) => {
    if (location?.contract === assetContract && location?.tokenId === assetTokenId) {
      return true
    }
  })

  if (isLoading) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div>
  }

  return filtered.length === 0 ? <div style={{ margin: '100px 50px', fontSize: '20px' }}>No data</div> : (
    <>
      <div className="asset-details">
        <div className="dataset-header">
          <div className="title">
            <h2 style={{ margin: 0 }}>Search Results</h2>
          </div>
        </div>
      </div>

      <div className="asset-tab">
        <div className="asset-tab-overiew" style={{ borderLeft: '1px solid #eeeef0', borderRight: '1px solid #eeeef0' }}>
          <div style={{ width: '100%', margin:'0 80px 60px 80px' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Blockchain</TableCell>
                    <TableCell>Contract</TableCell>
                    <TableCell>Token ID</TableCell>
                    <TableCell>Owner Address</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filtered.map((asset, i) =>
                    <TableRow>
                      <TableCell>
                        {asset.serial}
                      </TableCell>

                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <span>
                          <img src={asset.imageUrl} className="avatar" width='40px' height='40px' style={{ marginRight: "12px",}} alt='.' />
                        </span>

                        {asset.product}
                      </TableCell>

                      <TableCell>
                        { asset.status ? <img src={check} alt='.' /> : <img src={info} alt='.' /> }
                      </TableCell>

                      <TableCell>
                        {asset.location.name}
                      </TableCell>

                      <TableCell>
                        <a href={`https://opensea.io/assets/ethereum/${asset.location.contract}/${asset.location.tokenId}`} style={{ color: "#07939C", textDecoration: 'none'}}>
                          {asset.location.contract.substring(0, 10)}
                        </a>
                      </TableCell>

                      <TableCell>
                        {asset?.location.tokenId}
                      </TableCell>

                      <TableCell>
                        {asset.ownerAccount.substring(0, 10)}
                      </TableCell>

                      <TableCell>
                        <a onClick={ () => {navigate(`/asset/0x80bf3a23`)} } style={{ color: "#07939C", textDecoration: 'none', cursor: 'pointer' }}>
                          View Dataset
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  )
}


export default () =>  {
  return (
    <>
      <Hero />
      <AssetDetails />
      <Footer />
    </>
  )
}