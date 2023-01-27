import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import { Box, Typography, Stack, List, Link } from '@mui/material'

import CircularProgress from '@mui/material/CircularProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import {
  LinkDropdown,
  SectionWrapper,
  AssetPropertyWrapper,
  Badge,
  CustomLink,
  DatasetItem,
  ContentContainer,
} from '../components/SingleAssetStyles'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'
import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import LogoVerra from '../assets/images/logo-verra-carbon-registry.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

import Issuer from '../components/Issuer'
import TabsSingleAsset from '../components/TabsSingleAsset'
import { formatTimeLeft } from '../utils/timestapFormater'

const SingleAsset = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()

  const lastVerified = selectedDataSet?.lastVerified as number
  const metaData = selectedDataSet?.metadata
  const assets = selectedDataSet?.assets || []
  const asset = assetSerial
    ? assets.find((asset) => asset.assetNumber === assetSerial)
    : assets.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const location = asset?.locations[0]

  const tokenId = location?.tokenId
  const lenthToken = tokenId?.length as number

  const tokenRef = lenthToken > 12 ? `${tokenId?.slice(0, 6)}...${tokenId?.slice(-4)}` : tokenId

  const datasetName = metaData?.name || 'Lohko Gold'

  return !asset ? (
    <ContentContainer sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </ContentContainer>
  ) : (
    <ContentContainer>
      <Box mt={5.5} mb={4}>
        <Typography variant="h6" color="grey.900" mb={1} sx={{ fontWeight: 600, lineHeight: 1.33 }}>
          Asset details
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body1" color="grey.500" mr={3}>
            From
            <span style={{ fontWeight: 500, color: '#1d2939' }}>&nbsp;{datasetName}&nbsp;</span>
            dataset
          </Typography>

          <LinkDropdown component={RouterLink} to={`/dataset/${id}`}>
            View dataset
            <ArrowForwardIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
          </LinkDropdown>
        </Box>
      </Box>

      <SectionWrapper mb={5.25}>
        <Typography
          variant="subtitle1"
          color="grey.900"
          mb={1.25}
          sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5 }}
        >
          Overview
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Box mr={3} sx={{ display: 'flex', width: '657px' }}>
            <img src={asset?.imageUrl} width="200" height="200" alt="." style={{ borderRadius: '10px' }} />

            <Box ml={3}>
              <Typography
                variant="h2"
                color="grey.900"
                mb={1.5}
                sx={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.19 }}
              >
                {datasetName}
              </Typography>

              <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge className="primary">{metaData?.['asset-type']}</Badge>
                <Typography variant="body2" color="grey.400" ml={1}>
                  Last verified {formatTimeLeft(lastVerified)}
                </Typography>
              </Box>

              <Typography variant="body2" color="grey.500" mb={1.5}>
                By:
                <span style={{ color: '#1d2939' }}>
                  &nbsp; {metaData?.publisher || '-'}
                  {metaData?.publisher && (
                    <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                  )}{' '}
                </span>
              </Typography>

              <Typography variant="body2" color="grey.500" mb={1.5}>
                {metaData?.['asset-description']}
                {metaData?.['asset-description'] && (
                  <CustomLink component={RouterLink} to="/coming-soon" sx={{ fontWeight: 500 }}>
                    &nbsp;Read more
                  </CustomLink>
                )}
              </Typography>
            </Box>
          </Box>

          <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', width: '520px' }}>
            <AssetPropertyWrapper>
              <Typography>Blockhain</Typography>
              <Typography>{asset.currentLocation}</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Last verified</Typography>
              <Typography>{formatTimeLeft(lastVerified)}</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Token Id.</Typography>
              <Typography>{tokenRef}</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Current owner</Typography>
              <Typography>
                {location?.ownerAccount
                  ? `${location?.ownerAccount.slice(0, 6)}...${location?.ownerAccount.slice(
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      location?.ownerAccount.length - 4,
                    )}`
                  : '-'}
              </Typography>
            </AssetPropertyWrapper>
          </Stack>
        </Box>
      </SectionWrapper>
      <Box sx={{ display: 'flex', marginBottom: '160px' }}>
        <Box mr={4.5} sx={{ width: { xl: '920px' } }}>
          <TabsSingleAsset />
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
                <img src={metaData?.image} width="48" height="48" alt="." style={{ borderRadius: '8px' }} />

                <Box ml={2}>
                  <Typography variant="body1" color="grey.900" mb={0.25} sx={{ fontWeight: 500 }}>
                    {metaData?.name}
                  </Typography>

                  <Typography variant="body1" color="grey.900" sx={{ display: 'flex', alignItems: 'center' }}>
                    {metaData?.publisher}
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

export default () => <SingleAsset />
