import React from 'react'

import { Box, Link, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'

import TwitterIcon from '@mui/icons-material/Twitter'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import { ReactComponent as LogoLohko } from '../assets/images/logo-lohko.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

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
  const assets = selectedDataSet?.assets

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
        <LogoLohko style={{ width: '56"', height: '56' }} />

        <Box ml={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mr={1}
              sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
            >
              Lohko Pte Ltd
            </Typography>
            <IconVerifiedTick style={{ width: '14px', height: '14px' }} />
          </Box>

          <Typography variant="body2" color="grey.500">
            Publisher since May 2022
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
        Whether it’s gold, silver, art, or other assets, Lohko digitalises tangible assets and gives investors full
        control.
      </Typography>

      <Box mb={2.75} sx={{ display: 'flex' }}>
        <TwitterIcon style={{ fill: '#98a2b3' }} />
        <CustomLink href="https://twitter.com/lohkowallet" target="_blank" rel="noreferrer nofollow" ml={0.5}>
          @LohkoWallet
        </CustomLink>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomLink href="https://app.lohkoinvest.com" target="_blank" rel="noreferrer nofollow">
          app.lohkoinvest.com
        </CustomLink>

        <Box>
          <Typography variant="body1" color="grey.500" sx={{ lineHeight: 1.5 }}>
            View in
            <CustomLink href="https://opensea.io/collection/lohkonft" target="_blank" rel="noreferrer nofollor">
              &nbsp;OpenSea
            </CustomLink>
          </Typography>
        </Box>
      </Box>
    </SectionWrapper>
  )
}

export default () => <Issuer />
