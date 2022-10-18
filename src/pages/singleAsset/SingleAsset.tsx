import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import Hero from '../../components/header/Hero'
import Footer from '../../components/footer/Footer'

import { check} from '../../assets'

const AssetDetails = () => {
  const navigate = useNavigate()

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
                    74707
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Asset</td>
                  <td style={{ display: 'flex', alignItems: 'center', cursor: 'default' }}>
                    <img src='https://static.bullionstar.com/files/gold-bars/pamp-gold-bar/2020/bar-gold-pamp-1oz-obverse-bullionstar-b.png' className="avatar" width='40px' height='40px' style={{ marginRight: "12px",}} alt='.' />

                    PAMP Gold Bar - 1 oz
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Last verified</td>
                  <td style={{ cursor: 'default' }}>
                    Tue Oct 18 2022 07:21:57 UTC
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Status</td>
                  <td style={{ cursor: 'default' }}>
                    <img src={check} alt='.' />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Blockchain</td>
                  <td style={{ cursor: 'default' }}>
                    ethereum
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Contract</td>
                  <td style={{ cursor: 'default' }}>
                    0xd3fdaeac03cd397b37f98375dfac9308c933afa8
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Owner Address</td>
                  <td style={{ cursor: 'default' }}>
                    0xc0A2f3b3990De10a22a00377df0F3e7503c3a14d
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '240px', cursor: 'default' }}>Dataset</td>
                  <td onClick={ () => {navigate(`/asset/0x80bf3a23`)} } style={{ color: '#07939C', cursor: 'pointer' }}>Lohko Gold</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Box>
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