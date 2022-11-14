import React from 'react'

import { Box, Link, Stack, Typography, List, ListItem } from '@mui/material'
import { styled } from '@mui/system'

import TwitterIcon from '@mui/icons-material/Twitter'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

import LogoZippie from '../assets/images/logo-zippie.png'
import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'

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

const Publisher = () => {
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
        Publisher
      </Typography>

      <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={LogoZippie} width="56" height="56" alt="." style={{ borderRadius: '50%' }} />

        <Box ml={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mr={1}
              sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
            >
              Zippie
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
        Zippie makes Web3 and blockchain beneficial and accessible for both users and developers while helping
        businesses move into Web3 easily and securely.
      </Typography>

      <Box mb={1.25} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="grey.900" mr={0.5} sx={{ fontWeight: 500 }}>
          Connnect with Zippie
        </Typography>
        <IconVerifiedTick />
      </Box>

      <Box mb={2.75} sx={{ display: 'flex' }}>
        <List sx={{ display: 'flex', padding: 0 }}>
          <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center', marginRight: 1.5 }}>
            <TwitterIcon style={{ fill: '#98a2b3' }} />
            <CustomLink href="https://twitter.com/zippiehq" target="_blank" rel="noreferrer nofollow" ml={0.5}>
              @zippiehq
            </CustomLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkedInIcon style={{ fill: '#98a2b3' }} />
            <CustomLink href="https://linkedin.com/company/zippie" target="_blank" rel="noreferrer nofollow" ml={0.5}>
              Zippie
            </CustomLink>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageIcon style={{ fill: '#98a2b3' }} />
        <CustomLink href="https://www.zippie.com/" target="_blank" rel="noreferrer nofollow" ml={0.5}>
          www.zippie.com
        </CustomLink>
      </Box>
    </SectionWrapper>
  )
}

export default () => <Publisher />
