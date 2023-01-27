import React from 'react'
import { Box, Typography, Table, TableBody, TableRow, TableContainer, Tooltip, TableCell, Link } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SectionWrapper, CustomLink } from './DetailsTab'
import { TableNameCell, TableValueCell } from './TableStyles'
import { getOverviewComponent } from './DatasetOverview'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { formatDate, formatTimeLeft, formatTimeStamp } from '../utils/timestapFormater'
import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

const SingleAssetDetailsTab = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()

  const metaData = selectedDataSet?.metadata
  const assets = selectedDataSet?.assets
  const lastVerified = selectedDataSet?.lastVerified as number
  const createdDate = selectedDataSet?.creationDate as number

  const asset = assetSerial
    ? assets?.find((asset) => asset.assetNumber === assetSerial)
    : assets?.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const message = asset?.status === 'ok' ? 'Verified successfully' : asset?.failedReason || ''

  const location = asset?.locations[0]

  const tokenId = location?.tokenId

  const lenthToken = tokenId?.length as number

  const tokenRef = lenthToken > 12 ? `${tokenId?.slice(0, 6)}...${tokenId?.slice(-4)}` : tokenId
  // @ts-ignore
  const Description = getOverviewComponent(metaData?.name)
  return (
    <>
      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Description
        </Typography>

        <Typography>
          <Description />
        </Typography>
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
                    src={asset?.imageUrl}
                    width="40"
                    height="40"
                    style={{ marginRight: '12px', borderRadius: '4px' }}
                    alt="."
                  />
                  {asset?.assetName}
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
                    <img src={asset?.status === 'ok' ? IconCheck : IconInfo} width="24px" height="24p" alt="." />
                  </Tooltip>
                </TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>BlockChain</TableNameCell>
                <TableValueCell>{asset?.currentLocation}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Token ID</TableNameCell>
                <TableValueCell>{tokenRef}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Token Standard</TableNameCell>
                <TableValueCell>-</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Owner Address</TableNameCell>
                <TableValueCell>{location?.ownerAccount}</TableValueCell>
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
