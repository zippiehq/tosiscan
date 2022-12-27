import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink, Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { Box, Container, Typography, Link, List, ListItem } from '@mui/material'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'
import { styled } from '@mui/system'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import LogoVerra from '../assets/images/logo-verra-carbon-registry.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import OverviewSingleAssetTab from '../components/OverviewSingleAssetTab'
import AttributesTab from '../components/AttributesTab'
import Issuer from '../components/Issuer'

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

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

const DatasetItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.grey['200'],

  '&:last-of-type': {
    borderBottom: 'none',
  },
}))

const getDataSetOptions = (dataset: string) => {
  switch (dataset) {
    default:
      return {
        tabs: ['Overview', 'Attributes'],
        routePaths: ['', 'attributes'],
        routes: (
          <Routes>
            <Route path="/" element={<OverviewSingleAssetTab />} />

            <Route path="attributes" element={<AttributesTab />} />
          </Routes>
        ),
      }
  }
}

const SingleAssetWithTabs = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const { assetSerial, id } = useParams()
  const navigate = useNavigate()
  const { selectedDataSet } = useDataSetAssetsContext()
  const metaData = selectedDataSet?.metadata

  const datasetName = metaData?.name || 'Lohko Gold'

  const { tabs, routePaths, routes } = getDataSetOptions(metaData?.name || '')

  const onTabChange = (value: number) => {
    setCurrentTab(value)
    navigate(routePaths[value])
  }

  const location = useLocation()

  useEffect(() => {
    const currentLocation = location.pathname.split(`${id}/${assetSerial}/` || '')[1]
    const currentPath = routePaths.indexOf(`${currentLocation}`) === -1 ? 0 : routePaths.indexOf(currentLocation)
    setCurrentTab(currentPath)
  }, [location.pathname, routePaths])

  return (
    <ContentContainer>
      <Box mt={5.5} mb={4}>
        <Typography variant="h6" color="grey.900" mb={1} sx={{ fontWeight: 600, lineHeight: 1.33 }}>
          Asset details
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" color="grey.500" mr={3}>
            From
            <span style={{ fontWeight: 500, color: '#1d2939' }}>&nbsp;{datasetName}&nbsp;</span>
            dataset
          </Typography>

          <Link
            component={RouterLink}
            to={`/dataset/${id}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 1.5,
              color: 'primary.600',
              textDecoration: 'none',
            }}
          >
            View dataset
            <ArrowForwardIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
          </Link>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', marginBottom: '160px' }}>
        <Box mr={3} sx={{ maxWidth: { xl: '820px' } }}>
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
        </Box>

        <Box sx={{ maxWidth: { xl: '378px' } }}>
          <Issuer />

          <SectionWrapper>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mb={1.25}
              sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
            >
              Dataset
            </Typography>

            <List
              sx={{
                padding: 0,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'grey.200',
                borderRadius: '8px',
              }}
            >
              <DatasetItem disablePadding>
                <img src={LogoVerra} width="48" height="48" alt="." style={{ borderRadius: '8px' }} />

                <Box ml={2}>
                  <Typography variant="body1" color="grey.900" mb={0.25} sx={{ fontWeight: 500 }}>
                    Verra Carbon Registry
                  </Typography>

                  <Typography variant="body1" color="grey.900" sx={{ display: 'flex', alignItems: 'center' }}>
                    Verra
                    <IconVerifiedTick style={{ marginLeft: '6px' }} />
                  </Typography>
                </Box>
              </DatasetItem>
            </List>
          </SectionWrapper>
        </Box>
      </Box>
    </ContentContainer>
  )
}

export default () => <SingleAssetWithTabs />
