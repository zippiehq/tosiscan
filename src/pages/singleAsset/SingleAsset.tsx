import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import { Box } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import {AddressIcon, check, downloadIcon, facebookLogoGrey, lohkoAvatar, verifiedTick} from '../../assets'
import { info } from '../../assets'

import Hero from '../../components/header/Hero'
import Footer from '../../components/footer/Footer'

import { useDatachainOutput } from "../../hooks/useDatachainOutput"
import { useVerificationTimestamps } from "../../hooks/useTimeStamps";

const AssetDetails = () => {
  const { assetContract, assetTokenId, assetSerial } = useParams()
  const { assets, isLoading: fetchingAsset } = useDatachainOutput()
  const { timestamps, isLoading } = useVerificationTimestamps()

  const [metaData, setMetadata] = useState({
    name: 'Lohko Gold',
  })

  const lastVerified = Math.max(...timestamps)

  const navigate = useNavigate()

   const asset = assetSerial ? assets.find(( asset) => {
    if (asset.serial === assetSerial) {
      return true;
    }
  }) : assets.find(( asset) => {
     if (asset.location?.contract === assetContract &&
       asset.location?.tokenId === assetTokenId) {
       return true;
     }
   });

  const datasetName = 'Lohko Gold'

  return (
    <Box className="asset-tab-overiew" sx={{
      display:'flex',
      flexDirection:'column',
      maxWidth: '1300px',
      margin: '0 auto',
      marginBottom: '32px',
      width: '100%',
    }}>
      <div style={{ paddingBottom: '160px'}}>
        <div className="asset-details">
          <div className="dataset-header" style={{ padding: 0 }}>
            <div className="title" style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
              <h2 style={{ margin: '0 0 8px', fontFamily: 'Inter', fontSize: '24px', fontWeight: 600, lineHeight: 1.33, color: '#101828' }}>Asset details</h2>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: '0 24px 0 0', fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.5, color: '#667085' }}>
                  From <span style={{ fontWeight: 500, color: '#1d2939' }}>{datasetName}</span> dataset
                </p>

                <a onClick={ () => {navigate(`/asset/0x80bf3a23`)} } style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: "#07939C", textDecoration: 'none', cursor: 'pointer' }}>
                  View dataset

                  <ArrowForwardIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="asset-overview">
          <div className="column-one">
            <div className="general-info" style={{ marginTop: 0, padding: '24px' }}>
              <h3>Overview</h3>
              <table>
                <tbody>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Serial No.</td>
                  <td style={{ cursor: 'default' }}>
                    {asset?.serial}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Asset</td>
                  <td style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}>
                    <img src={asset?.imageUrl} className="avatar" width='40px' height='40px' style={{ marginRight: "12px",}} alt='.' />

                    {asset?.product}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Last verified</td>
                  <td style={{ cursor: 'default' }}>
                    { !isLoading ?
                      moment(
                        moment
                          .unix(lastVerified).utc()
                          .format("DD MMM YYYY HH:mm:ss [UTC]")
                      ).fromNow() : "loading..."}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Status</td>
                  <td style={{ cursor: 'default' }}>
                    {asset?.status === 'ok' ? (
                      <img src={check} alt="." />
                    ) : (
                      <img src={info} alt="." />
                    )}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Blockchain</td>
                  <td style={{ cursor: 'default' }}>
                    { asset?.location ? asset?.location.name : 'Zippienet' }
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Contract</td>
                  <td style={{ cursor: asset?.location ? 'pointer' : 'default', }}>
                    {asset?.location ?
                      <a
                        href={`https://opensea.io/assets/ethereum/${asset?.location.contract}/${asset?.location.tokenId}`}
                        style={{ color: "#07939C", textDecoration: "none", }}
                        target="_blank"
                      >
                        {asset?.location.contract}
                      </a> :
                      <a style={{ color: '#101828', textDecoration: "none", }}>
                        0xa40e46adC47781094892c4d6538D7d6f34e4187f
                      </a>
                    }
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Owner Address</td>
                  <td style={{ cursor: 'default' }}>
                    { asset?.location ? asset?.location.ownerAccount : asset?.ownerAccount }
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Dataset</td>
                  <td onClick={ () => {navigate(`/asset/0x80bf3a23`)} } style={{ color: '#07939C', cursor: 'pointer' }}>
                    {metaData.name}
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
          </div>
        </div>
      </div>
    </Box>
  )
}

export default function() {
  return (
    <>
      <Hero />
      <AssetDetails />
      <Footer />
    </>
  )
}