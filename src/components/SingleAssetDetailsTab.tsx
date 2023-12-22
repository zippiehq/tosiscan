import React from 'react'
import { Box, Typography, Table, TableBody, TableRow, TableContainer, Tooltip } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SectionWrapper } from './SingleAssetStyles'
import { TableNameCell, TableValueCell } from './TableStyles'
import { getOverviewComponent } from './DatasetOverview'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { formatDate, formatTimeLeft } from '../utils/timestapFormater'
import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

const SingleAssetDetailsTab = () => {
  const { assetContract, assetBatchId, assetTokenId, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()

  const metaData = selectedDataSet?.metadata
  const assets = selectedDataSet?.assets
  const lastVerified = selectedDataSet?.lastVerified as number
  const createdDate = selectedDataSet?.creationDate as number

  const assetTokenIdNumber = assetTokenId !== undefined ? parseInt(assetTokenId, 10) : null
  const asset = assets?.find((asset) => asset.tokenId === assetTokenIdNumber)

  const message = asset?.status === 'ok' ? 'Verified successfully' : asset?.failedReason || ''

  return (
    <>
      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Description
        </Typography>

        <Typography>{metaData?.['asset-description']}</Typography>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Asset details
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Serial No.</TableNameCell>
                <TableValueCell>{asset?.assetNumber}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Asset name</TableNameCell>
                <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={asset?.metadata.image}
                    width="40"
                    height="40"
                    style={{ marginRight: '12px', borderRadius: '4px' }}
                    alt="."
                  />
                  {asset?.metadata.name}
                </TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Asset Class.</TableNameCell>
                <TableValueCell>{metaData?.['asset-class']}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Last Verified</TableNameCell>
                <TableValueCell>{`${formatDate(lastVerified)} (${formatTimeLeft(lastVerified)})`}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Status</TableNameCell>
                <TableValueCell>
                  <Tooltip title={message} placement="top">
                    <img
                      src={selectedDataSet?.verifications[2].status === 'success' ? IconCheck : IconInfo}
                      width="24px"
                      height="24p"
                      alt="."
                    />
                  </Tooltip>
                </TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>BlockChain</TableNameCell>
                <TableValueCell>{asset?.metadata.chain}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Token ID</TableNameCell>
                <TableValueCell>{asset?.tokenId}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Token Standard</TableNameCell>
                <TableValueCell>-</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Owner Address</TableNameCell>
                <TableValueCell>{asset?.owner}</TableValueCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creator</TableNameCell>
                <TableValueCell>-</TableValueCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creation Date</TableNameCell>
                <TableValueCell>{`${formatDate(createdDate)} (${formatTimeLeft(createdDate)})`}</TableValueCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SectionWrapper>
    </>
  )
}

export default () => <SingleAssetDetailsTab />
