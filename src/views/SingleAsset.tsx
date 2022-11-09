import React from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import moment from 'moment'

import {
  Box,
  Container,
  Typography,
  Link,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/system'

import CircularProgress from '@mui/material/CircularProgress'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useDataSetContext } from '../hooks/useDataset'

import Verifications from '../components/Verifications'
import Issuer from '../components/Issuer'

const EthLocation = {
  Ethereum: 'https://opensea.io/assets/ethereum',
  ethereum: 'https://opensea.io/assets/ethereum',
  'Ethereum Goerli': 'https://testnets.opensea.io/assets/goerli',
}

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

const TableNameCell = styled(TableCell)(({ theme }) => ({
  width: '266px',
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.grey['600'],
  borderBottom: 'none',
  borderTopLeftRadius: '4px',
  borderBottomLeftRadius: '4px',
}))

const TableValueCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.grey['900'],
  borderBottom: 'none',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
}))

const SingleAsset = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  const lastVerified = selectedDataSet?.lastVerified

  const assets = selectedDataSet?.assets || []
  const asset = assetSerial
    ? assets.find((asset) => asset.assetNumber === assetSerial)
    : assets.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const { getDataSetById } = useDataSetContext()

  const datasetDetails = getDataSetById(id)
  const datasetName = datasetDetails?.dataset || 'Lohko Gold'
  const location = asset?.locations[0]

  const tokenId = location?.tokenId
  const hovermessage = 'Verified successfully'

  // @ts-ignore
  const openSearUrl = `${EthLocation[location?.name]}/${location?.contract}/${tokenId}`
  // @ts-ignore
  const Verification = Verifications[datasetName] || null

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
          <Box
            mb={4.25}
            p={3}
            sx={{
              width: '100%',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'grey.200',
              borderRadius: '10px',
            }}
          >
            <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
              Overview
            </Typography>

            <TableContainer>
              <Table>
                <TableBody>
                  {asset?.assetNumber && (
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableNameCell>Serial No.</TableNameCell>
                      <TableValueCell>{asset?.assetNumber}</TableValueCell>
                    </TableRow>
                  )}

                  <TableRow>
                    <TableNameCell>Asset</TableNameCell>
                    <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={asset?.imageUrl} width="40" height="40" style={{ marginRight: '12px' }} alt="." />
                      {asset?.assetName}
                    </TableValueCell>
                  </TableRow>

                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableNameCell>Last verified</TableNameCell>
                    <TableValueCell>
                      {!isLoading && lastVerified
                        ? moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()
                        : 'loading...'}
                    </TableValueCell>
                  </TableRow>

                  <TableRow>
                    <TableNameCell>Status</TableNameCell>
                    <TableValueCell>
                      <Tooltip title={asset?.status === 'ok' ? hovermessage : asset?.failedReason} placement="top">
                        <img src={asset?.status === 'ok' ? IconCheck : IconInfo} width="24px" height="24p" alt="." />
                      </Tooltip>
                    </TableValueCell>
                  </TableRow>

                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableNameCell>Blockchain</TableNameCell>
                    <TableValueCell>{location ? location.name : 'Zippienet'}</TableValueCell>
                  </TableRow>

                  <TableRow>
                    <TableNameCell>Contract</TableNameCell>
                    <TableValueCell>
                      {/* @ts-ignore */}
                      {location && location.contract && EthLocation[location.name] ? (
                        <Link
                          href={openSearUrl}
                          target="_blank"
                          rel="noreferrer"
                          sx={{ color: 'primary.600', textDecoration: 'none' }}
                        >
                          {location.contract}
                        </Link>
                      ) : (
                        <Typography>{location?.contract || '0xa40e46adC47781094892c4d6538D7d6f34e4187f'}</Typography>
                      )}
                    </TableValueCell>
                  </TableRow>

                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableNameCell>Owner Address</TableNameCell>
                    <TableValueCell>{location?.ownerAccount}</TableValueCell>
                  </TableRow>

                  <TableRow>
                    <TableNameCell>Dataset</TableNameCell>
                    <TableValueCell>
                      <Link
                        component={RouterLink}
                        to={`/dataset/${id}`}
                        sx={{ color: 'primary.600', textDecoration: 'none' }}
                      >
                        {datasetName}
                      </Link>
                    </TableValueCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="h2" color="grey.900" sx={{ fontSize: '20px', lineHeight: 1.5 }}>
              Supporting verification
            </Typography>

            <Verification />
          </Box>
        </Box>

        <Box sx={{ maxWidth: { xl: '378px' } }}>
          <Issuer />
        </Box>
      </Box>
    </ContentContainer>
  )
}

export default () => <SingleAsset />
