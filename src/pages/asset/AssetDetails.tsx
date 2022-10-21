import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import {
  Box,
  Typography,
  Breadcrumbs,
} from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import './AssetDetails.css'

import Hero from '../../components/header/Hero'
import BasicTabs from '../../components/asset/Tabs'
import Footer from '../../components/footer/Footer'

import { ReactComponent as IconHome } from '../../assets/icon-home.svg'

import { DatasetContext } from '../../context/DatasetContext'
import { IDataset } from '../../interfaces/Dataset.interface'
import { useVerificationTimestamps } from '../../hooks/useTimeStamps'

const AssetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)
  const asset = dataset?.find((item) => item.id === id)

  const { timestamps, isLoading } = useVerificationTimestamps()
  const lastVerified = Math.max(...timestamps)

  const breadcrumbs = [
    <Typography
      display='flex'
      alignItems='center'
      key='1'
      onClick={() => navigate('/')}
      sx={[{ cursor: 'pointer', '& path': { stroke: '#737373' }},
        { '&:hover path': { stroke: '#424242' }}, { '&:focus-within path': { stroke: '#737373' }}, { '&-separator': { color: 'red' } } ]}
    >
      <IconHome />
    </Typography>,

    /*<Typography
      key='2'
      /!*onClick={() => navigate('')}*!/
      sx={[{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500,lineHeight: 1.43, color: '#737373', cursor: 'default' },
        { '&:hover': { color: '#667085' }}, { '&:focus-within': { color: '#737373' }} ]}
    >
      {asset ? asset.type : 'Digital Asset'}
    </Typography>,

    <Typography
      key='3'
      /!*onClick={() => navigate('')}*!/
      sx={[{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500,lineHeight: 1.43, color: '#737373', cursor: 'default' },
        { '&:hover': { color: '#667085' }}, { '&:focus-within': { color: '#737373' }} ]}
    >
      {asset ? asset.assetClass : 'Gold'}
    </Typography>,*/

    <Typography key='3' sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, lineHeight: 1.43, color: '#07939c' }}>
      {asset ? asset.dataset : 'Lohko Gold'}
    </Typography>,
  ];

  return (
    <>
      <div className='asset-details'>
        <div className='dataset-header'>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" fill="" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>

          <div className='title'>
            <img src={asset?.image} width='64px' height='64px' alt='.' />

            <Box className='details' ml={2.5}>
              <Box display='flex' alignItems='center'>
                <Typography variant='h2' mb={1.25} sx={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.19, color: '#101828' }}>
                  {asset?.dataset}
                </Typography>

                {asset?.id === '0x80bf3a24' ?
                  <Typography variant='body2' my={0} ml={1.25} py={0.25} px={1.25} sx={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.43, color: '#a96721', backgroundColor: '#fcf6ea', borderRadius: '16px'  }}>
                    DEMO
                  </Typography> : ''
                }
              </Box>

              <div className='badges'>
                {asset?.id === '0x80bf3a24' ? '' :
                  <Typography variant='body2' my={0} py={0.25} px={1.25} sx={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.43, color: '#07757c', backgroundColor: '#e9f5f5', borderRadius: '16px' }}>
                    Asset backed
                  </Typography>}

                {asset?.id === '0x80bf3a24' ? '' :
                  <Typography variant='body1' my={0} ml={1.25} py={0.25} px={1.25} sx={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.43, color: '#b73731', backgroundColor: '#fef1ef', borderRadius: '16px' }}>
                    There is a problem with this dataset
                  </Typography>
                }

                <Typography variant='body1' my={0} ml={1.25} sx={{ fontSize: '14px', fontStyle: 'italic', color: '#98a2b3' }}>
                  Last verified{' '}
                  {isLoading
                    ? 'loading...'
                    : moment(
                        moment
                          .unix(lastVerified)
                          .utc()
                          .format('DD MMM YYYY HH:mm:ss [UTC]')
                      ).fromNow()}
                </Typography>
              </div>
            </Box>
          </div>

          <div className='tabs-button'>
            <BasicTabs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function () {
  return (
    <>
      <Hero />
      <AssetDetails />
    </>
  )
}