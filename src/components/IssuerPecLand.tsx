import React from 'react'

import { Box, Link, Stack, Typography, List, ListItem } from '@mui/material'
import { styled } from '@mui/system'

import TwitterIcon from '@mui/icons-material/Twitter'
import LanguageIcon from '@mui/icons-material/Language'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import { ReactComponent as IconDiscord } from '../assets/images/icon-discord.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { SectionWrapper, CustomLink } from './SingleAssetStyles'

const IssuerPecLand = () => {
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
        Issuer
      </Typography>

      <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <img src="https://via.placeholder.com/48x48" width="56" height="56" alt="." style={{ borderRadius: '50%' }} />

        <Box ml={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mr={1}
              sx={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.56 }}
            >
              PECLand
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
        PECland is a web3 platform for people to enjoy social games.
      </Typography>

      <Box mb={1.25} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="grey.900" mr={0.5} sx={{ fontWeight: 500 }}>
          Connnect with PECLand
        </Typography>
        <IconVerifiedTick />
      </Box>

      <Box mb={2.75} sx={{ display: 'flex' }}>
        <List sx={{ display: 'flex', padding: 0 }}>
          <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center', marginRight: 1.5 }}>
            <TwitterIcon style={{ fill: '#98a2b3' }} />
            <CustomLink href="https://twitter.com/peclandofficial" target="_blank" rel="noreferrer nofollow" ml={0.5}>
              @PEClandOfficial
            </CustomLink>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
            <IconDiscord style={{ fill: '#98a2b3' }} />
            <CustomLink href="https://discord.com/invite/j8UuWFAMtQ" target="_blank" rel="noreferrer nofollow" ml={0.5}>
              PECland
            </CustomLink>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageIcon style={{ fill: '#98a2b3' }} />
        <CustomLink href="https://pecland.xyz/" target="_blank" rel="noreferrer nofollow" ml={0.5}>
          https://pecland.xyz/
        </CustomLink>
      </Box>
    </SectionWrapper>
  )
}

export default () => <IssuerPecLand />
