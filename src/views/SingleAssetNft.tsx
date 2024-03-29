import React, { useEffect } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'

import { Box, Typography, Stack, List, Button } from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  LinkDropdown,
  SectionWrapper,
  AssetPropertyWrapper,
  Badge,
  CustomLink,
  DatasetItem,
  ContentContainer,
} from '../components/SingleAssetStyles'

import LogoZippie from '../assets/images/logo-zippie.png'
import BgCreator from '../assets/images/bg-creator.svg'
import CreatorAvatar from '../assets/images/creator-avatar.png'
import LogoPecFriends from '../assets/images/logo-pecfriends.png'
import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'

import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'

import TabsSingleAssetNft from '../components/TabsSingleAssetNft'
import Publisher from '../components/Publisher'

const SingleAssetNft = () => {
  const { assetContract, assetTokenId } = useParams()
  const { isTLILoading, TLIDataSet, setTLIQuery } = useTrustlessIndexingContext()

  useEffect(() => setTLIQuery({ assetContract, assetTokenId }), [assetContract, assetTokenId, setTLIQuery])

  const token = TLIDataSet ? TLIDataSet.token : undefined
  const lenthToken = token?.id.length as number
  const tokenRef = lenthToken > 12 ? `${token?.id.slice(0, 6)}...${token?.id.slice(-4)}` : token?.id

  return (
    <ContentContainer>
      <Box mt={4} mb={5.25} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" color="grey.900" mb={1} sx={{ lineHeight: 1.33 }}>
            Asset Details
          </Typography>

          <Typography variant="body1" color="grey.500" mb={1} sx={{ lineHeight: 1.5 }}>
            From
            <span style={{ fontWeight: 500, color: '#344054' }}>&nbsp;Trustless Ethereum NFT Index&nbsp;</span>
            and
            <span style={{ fontWeight: 500, color: '#344054' }}>&nbsp;1 other dataset</span>
          </Typography>
        </Box>

        <LinkDropdown component={RouterLink} to="/coming-soon">
          View dataset
          <KeyboardArrowDownIcon style={{ width: '20px', height: '20px', marginLeft: '8px', fill: '#344054' }} />
        </LinkDropdown>
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
            <img
              src={TLIDataSet?.token.metadata.image}
              width="200"
              height="200"
              alt="."
              style={{ borderRadius: '10px' }}
            />

            <Box ml={3}>
              <Typography
                variant="h2"
                color="grey.900"
                mb={1.5}
                sx={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.19 }}
              >
                {TLIDataSet?.token.metadata.name}
              </Typography>

              <Box mb={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge className="primary">{TLIDataSet?.contract.type}</Badge>
                <Typography variant="body2" color="grey.400" ml={1}>
                  Last verified 20 mins ago
                </Typography>
              </Box>

              <Typography variant="body2" color="grey.500" mb={1.5}>
                By:
                <span style={{ color: '#1d2939' }}>
                  &nbsp;
                  {TLIDataSet
                    ? `${TLIDataSet.contract.owner?.slice(0, 6)}...${TLIDataSet.contract.owner?.slice(
                        TLIDataSet.contract.owner.length - 4,
                      )}`
                    : ''}
                </span>
              </Typography>

              <Typography variant="body2" color="grey.500" mb={1.5}>
                {TLIDataSet?.contract?.metadata?.description}
                {TLIDataSet?.contract?.metadata?.description && (
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
              <Typography>Ethereum</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Last verified</Typography>
              <Typography>An hour ago</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Token Ref.</Typography>
              <Typography>{tokenRef}</Typography>
            </AssetPropertyWrapper>

            <AssetPropertyWrapper>
              <Typography>Current owner</Typography>
              <Typography>
                {TLIDataSet && TLIDataSet.token.owner
                  ? `${TLIDataSet.token.owner.slice(0, 6)}...${TLIDataSet.token.owner.slice(
                      TLIDataSet.token.owner.length - 4,
                    )}`
                  : '-'}
              </Typography>
            </AssetPropertyWrapper>
          </Stack>
        </Box>
      </SectionWrapper>

      <Box sx={{ display: 'flex', marginBottom: '160px' }}>
        <Box mr={4.5} sx={{ width: { xl: '820px' } }}>
          <SectionWrapper
            sx={{
              display: 'flex',
              backgroundImage: `url(${BgCreator})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'right bottom',
            }}
          >
            <Box
              mr={1.75}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: '#f9ead1',
                borderRadius: '100%',
              }}
            >
              <ErrorOutlineIcon sx={{ width: '16px', height: '16px', fill: '#bf7828' }} />
            </Box>

            <Box width="483px" mr={0.5}>
              <Typography variant="h6" color="grey.900" mb={0.5} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
                Are you the creator of this asset?
              </Typography>

              <Typography variant="body2" color="grey.500" sx={{ lineHeight: 1.43 }}>
                Increase your asset’s reliability by verifying yourself as the issuer.
              </Typography>
            </Box>

            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
              <Button
                component={RouterLink}
                to="/coming-soon"
                variant="outlined"
                sx={{
                  marginRight: 1.5,
                  paddingY: 1.25,
                  paddingX: 2,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.43,
                  color: 'grey.700',
                  backgroundColor: 'white',
                }}
              >
                Learn more
              </Button>

              <Button
                component={RouterLink}
                to="/coming-soon"
                variant="contained"
                sx={{
                  marginRight: 1.5,
                  paddingY: 1.25,
                  paddingX: 2,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: 1.43,
                }}
              >
                Verify now
              </Button>
            </Stack>
          </SectionWrapper>

          <TabsSingleAssetNft />
        </Box>

        <Box sx={{ width: { xl: '384px' } }}>
          <SectionWrapper>
            <Typography
              variant="subtitle1"
              color="grey.900"
              mb={1.25}
              sx={{ fontSize: '18px', lineHeight: 1.56, fontWeight: 600 }}
            >
              Creator
            </Typography>

            <Box display="flex" alignItems="center" mb={3}>
              <img src={CreatorAvatar} width="56" height="56" alt="." style={{ marginRight: '20px' }} />

              <Box>
                <Typography
                  variant="subtitle1"
                  color="grey.900"
                  mb={0.25}
                  sx={{ fontSize: '18px', lineHeight: 1.56, fontWeight: 500 }}
                >
                  {TLIDataSet
                    ? `${TLIDataSet.contract.owner?.slice(0, 6)}...${TLIDataSet.contract.owner?.slice(
                        TLIDataSet.contract.owner.length - 4,
                      )}`
                    : ''}
                </Typography>

                <Typography variant="body2" color="grey.500" sx={{ lineHeight: 1.43 }}>
                  Unverified
                </Typography>
              </Box>
            </Box>

            <Box p={2.5} sx={{ backgroundColor: 'grey.50', borderRadius: '8px' }}>
              <Typography
                variant="subtitle1"
                color="grey.900"
                mb={0.5}
                sx={{ fontSize: '18px', lineHeight: 1.56, fontWeight: 500 }}
              >
                Know this creator?
              </Typography>

              <Typography variant="body2" color="grey.500" mb={2.5} sx={{ lineHeight: 1.43 }}>
                Help others find this creator and earn TOSI tokens by verifying or adding more information.
              </Typography>

              <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  component={RouterLink}
                  to="/coming-soon"
                  variant="contained"
                  sx={{
                    marginRight: 1.5,
                    paddingY: 1.25,
                    paddingX: 2,
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.43,
                  }}
                >
                  Add information
                </Button>

                <Button
                  component={RouterLink}
                  to="/coming-soon"
                  variant="text"
                  sx={{
                    paddingY: 1.25,
                    paddingX: 2,
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: 1.43,
                    color: 'primary.700',
                  }}
                >
                  I am the creator
                </Button>
              </Stack>
            </Box>
          </SectionWrapper>

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
                <img src={LogoZippie} width="48" height="48" alt="." style={{ borderRadius: '8px' }} />

                <Box ml={2}>
                  <Typography variant="body1" color="grey.900" mb={0.25} sx={{ fontWeight: 500 }}>
                    Trustless Ethereum NFT Index
                  </Typography>

                  <Typography variant="body1" color="grey.900" sx={{ display: 'flex', alignItems: 'center' }}>
                    Zippie
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

export default () => <SingleAssetNft />
