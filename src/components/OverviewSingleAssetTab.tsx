import React from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import moment from 'moment'

import { Box, Link, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/system'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

import { getVerificationComponent } from './Verifications'
import Issuer from './Issuer'

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

const OverviewSingleAssetTab = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  const lastVerified = selectedDataSet?.lastVerified
  const metaData = selectedDataSet?.metadata
  const assets = selectedDataSet?.assets || []
  const asset = assetSerial
    ? assets.find((asset) => asset.assetNumber === assetSerial)
    : assets.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const datasetName = metaData?.name
  const location = asset?.locations[0]

  const tokenId = location?.tokenId
  const hovermessage = 'Verified successfully'

  // @ts-ignore
  const Verification = getVerificationComponent(datasetName)

  return (
    <>
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
                  {asset?.locations[0].name}
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
                  {/* <Tooltip title={asset?.status === 'ok' ? hovermessage : asset?.failedReason} placement="top"> */}
                  <img src={IconCheck} width="24px" height="24p" alt="." />
                  {/* </Tooltip> */}
                </TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Quantity</TableNameCell>
                <TableValueCell>{asset?.attributes?.quantity}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Project</TableNameCell>
                <TableValueCell>{asset?.attributes?.resourceName}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Location</TableNameCell>
                <TableValueCell>{asset?.attributes?.country}</TableValueCell>
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
    </>
  )
}

export default () => <OverviewSingleAssetTab />
