import React from 'react'

import { Box, Link, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import { ReactComponent as LogoLohko } from '../assets/images/logo-lohko.svg'
import { ReactComponent as Globe } from '../assets/images/icon-globe.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useDataSetContext } from '../hooks/useDataset'

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
}))

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

const Issuer = () => {
  const { isLoading: fetchingAsset, selectedDataSet } = useDataSetAssetsContext()
  const { getDataSetById } = useDataSetContext()
  const { id } = useParams()
  const dataSet = getDataSetById(id)
  const assets = selectedDataSet?.assets
  const publisher = dataSet?.publisher
  return (
    <SectionWrapper>
      <Typography
        variant="subtitle1"
        color="grey.900"
        mb={1.25}
        sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
      >
        Publisher / Issuer
      </Typography>

      <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={publisher?.logo} alt="" style={{ width: '56"', height: '56' }} />
        <Box ml={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mr={1}
              sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
            >
              {dataSet?.issuers}
            </Typography>
            <IconVerifiedTick style={{ width: '14px', height: '14px' }} />
          </Box>

          <Typography variant="body2" color="grey.500">
            Publisher since {publisher?.publisherSince}
          </Typography>
        </Box>
      </Box>

      <Stack mb={2} sx={{ flexDirection: 'row' }}>
        <Box mr={2.25} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle1"
            color="grey.900"
            mr={1}
            sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
          >
            1
          </Typography>
          <Typography variant="body1" color="grey.500" sx={{ linHeight: 1.5 }}>
            Datasets
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="subtitle1"
            color="grey.900"
            mr={1}
            sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
          >
            {!fetchingAsset ? assets?.length : null}
          </Typography>
          <Typography variant="body1" color="grey.500" sx={{ linHeight: 1.5 }}>
            Verified assets
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body1" color="grey.600" mb={3.5} sx={{ fontSize: '15px', linHeight: 1.6 }}>
        {publisher?.description}
      </Typography>

      <Box mb={2.75} sx={{ display: 'flex', alignItems: 'center' }}>
        {publisher?.twitter && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TwitterIcon style={{ fill: '#98a2b3' }} />
            <CustomLink
              href={`https://twitter.com/${publisher?.twitter}`}
              target="_blank"
              rel="noreferrer nofollow"
              ml={0.5}
            >
              @{publisher?.twitter}
            </CustomLink>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {publisher?.web && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Globe style={{ width: '20px', height: '20px' }} />
            <CustomLink href={publisher?.web} target="_blank" rel="noreferrer nofollow" ml={0.5}>
              {publisher?.webName}
            </CustomLink>
          </Box>
        )}

        {publisher?.opensea && (
          <Box ml="auto">
            <Typography variant="body1" color="grey.500" sx={{ lineHeight: 1.5 }}>
              View in
              <CustomLink href={publisher?.opensea} target="_blank" rel="noreferrer nofollor">
                &nbsp;OpenSea
              </CustomLink>
            </Typography>
          </Box>
        )}
      </Box>
    </SectionWrapper>
  )
}

export default () => <Issuer />
