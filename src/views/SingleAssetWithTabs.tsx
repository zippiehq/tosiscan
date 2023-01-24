import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink, Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { Box, Typography, Link, List } from '@mui/material'
import TabsUnstyled from '@mui/base/TabsUnstyled'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  SectionWrapper,
  CustomLink,
  DatasetItem,
  Tab,
  TabsList,
  ContentContainer,
} from '../components/SingleAssetStyles'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import LogoVerra from '../assets/images/logo-verra-carbon-registry.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import OverviewSingleAssetTab from '../components/OverviewSingleAssetTab'
import AttributesTab from '../components/AttributesTab'
import Issuer from '../components/Issuer'

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
