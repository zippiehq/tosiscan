import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Routes, Route, useLocation } from 'react-router-dom'
import moment from 'moment'

import { Box, Typography, Breadcrumbs, Container } from '@mui/material'
import { styled } from '@mui/system'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'
import { ReactComponent as IconHome } from '../assets/images/icon-home.svg'

import OverviewTab from '../components/OverviewTab'
import AssetTab from '../components/AssetTab'
import FilesView from '../components/FilesView'
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

const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(5.5),
  padding: theme.spacing(0.75),
  backgroundColor: theme.palette.grey['50'],
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['100'],
}))

const Tab = styled(TabUnstyled)(({ theme }) => ({
  paddingTop: theme.spacing(1.25),
  paddingRight: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(1.75),
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  lineHeight: 1.5,
  fontWeight: 500,
  color: theme.palette.grey['700'],
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',

  '&.Mui-selected': {
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  },
}))
const getDataSetOptions = (dataset: string) => {
  switch (dataset) {
    case 'Nguru Project Satellite Images':
      return {
        tabs: ['Overview', 'Files'],
        routePaths: ['', 'files', 'digital-assets'],
        routes: (
          <Routes>
            <Route path="/" element={<OverviewTab />} />
            <Route path="files" element={<FilesView />} />

            <Route path="digital-assets" element={<Box>files</Box>} />
          </Routes>
        ),
      }

    default:
      return {
        tabs: ['Overview', 'Assets'],
        routePaths: ['', 'assets'],
        routes: (
          <Routes>
            <Route path="/" element={<OverviewTab />} />

            <Route path="assets" element={<AssetTab />} />
          </Routes>
        ),
      }

      break
  }
}

const Dataset = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDataSetById } = useDataSetContext()
  const { isLoading, selectedDataSet } = useDataSetAssetsContext()
  const asset = getDataSetById(id)
  const [currentTab, setCurrentTab] = useState(0)
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

  const { tabs, routePaths, routes } = getDataSetOptions(asset?.dataset || '')
  const onTabChange = (value: number) => {
    setCurrentTab(value)
    navigate(routePaths[value])
  }
  const location = useLocation()
  useEffect(() => {
    const currentLocation = location.pathname.split(`${id}/` || '')[1]
    const currentPath = routePaths.indexOf(`${currentLocation}`) === -1 ? 0 : routePaths.indexOf(currentLocation)
    console.log(currentPath)

    setCurrentTab(currentPath)
  }, [location.pathname, routePaths])
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
      {/* @ts-ignore */}
      <TabsUnstyled value={currentTab} onChange={(e, value: number) => onTabChange(value)}>
        <TabsList>
          {tabs.map((tab) => (
            <Tab key={tab}>{tab}</Tab>
          ))}
        </TabsList>

        <Box display="flex" flexDirection="column">
          {routes}
        </Box>
      </TabsUnstyled>
    </ContentContainer>
  )
}

export default () => <Dataset />
