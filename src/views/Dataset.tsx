import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import { Box, Typography, Breadcrumbs, Container } from '@mui/material'
import { styled } from '@mui/system'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { ReactComponent as IconHome } from '../assets/images/icon-home.svg'

import Tabs from '../components/Tabs'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useDataSetContext } from '../hooks/useDataset'
import { customTheme } from '../theme'

const ContentContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1280px',
  },
  [theme.breakpoints.up('xs')]: {
    paddingRight: theme.spacing(2.5),
    paddingLeft: theme.spacing(2.5),
  },
  margin: '0 auto',
}))

const Badge = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(0.25),
  paddingRight: theme.spacing(1.25),
  paddingBottom: theme.spacing(0.25),
  paddingLeft: theme.spacing(1.25),
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: 1.43,
  borderRadius: '16px',

  '&.primary': {
    color: theme.palette.primary['700'],
    backgroundColor: theme.palette.primary['50'],
  },

  '&.error': {
    color: theme.palette.error['700'],
    backgroundColor: theme.palette.error['50'],
  },

  '&.warning': {
    color: theme.palette.warning['700'],
    backgroundColor: theme.palette.warning['50'],
  },
}))

const Dataset = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDataSetById } = useDataSetContext()
  const { isLoading, selectedDataSet } = useDataSetAssetsContext()
  const asset = getDataSetById(id)

  const lastVerified = selectedDataSet?.lastVerified
  const status = selectedDataSet?.verifications ? selectedDataSet?.verifications[0].status : null
  const statusMessage = 'There is a problem with this dataset'

  const messageColor = status === 'warning' ? customTheme.palette.warning[700] : customTheme.palette.error[700]
  const messageBackgroundColor = status === 'warning' ? customTheme.palette.warning[50] : customTheme.palette.error[50]

  const breadcrumbs = [
    <Typography
      display="flex"
      alignItems="center"
      key="1"
      onClick={() => navigate('/')}
      sx={[
        { cursor: 'pointer', '& path': { stroke: '#737373' } },
        { '&:hover path': { stroke: '#424242' } },
        { '&:focus-within path': { stroke: '#737373' } },
        { '&-separator': { color: 'red' } },
      ]}
    >
      <IconHome />
    </Typography>,

    <Typography
      key="3"
      sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, lineHeight: 1.43, color: '#07939c' }}
    >
      {asset ? asset.dataset : 'Lohko Gold'}
    </Typography>,
  ]

  return (
    <ContentContainer>
      <Box mt={4}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" fill="" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>

        <Box mt={4} mb={6.25} sx={{ display: 'flex' }}>
          <img src={asset?.image} width="64px" height="64px" alt="." />

          <Box ml={2.5}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h2"
                mb={1.25}
                sx={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.19, color: '#101828' }}
              >
                {asset?.dataset}
              </Typography>

              {asset?.dataset === 'Carbon Credit Futures' ? (
                <Badge className="warning" ml={1.25}>
                  DEMO
                </Badge>
              ) : (
                ''
              )}
            </Box>

            <Box sx={{ display: 'flex' }}>
              {asset?.dataset !== 'Lohko Gold' ? '' : <Badge className="primary">Asset backed</Badge>}

              {status && (
                <Badge sx={{ backgroundColor: messageBackgroundColor, color: messageColor }} ml={1.25}>
                  {statusMessage}
                </Badge>
              )}

              <Typography
                variant="body1"
                my={0}
                ml={1.25}
                sx={{ fontSize: '14px', fontStyle: 'italic', color: 'grey.400' }}
              >
                Last verified{' '}
                {isLoading || !lastVerified
                  ? 'loading...'
                  : moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Tabs />
    </ContentContainer>
  )
}

export default () => <Dataset />
