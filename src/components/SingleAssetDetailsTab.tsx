import React from 'react'
import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell, Link } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SectionWrapper, TableNameCell, TableValueCell, CustomLink } from './DetailsTab'
import { getOverviewComponent } from './DatasetOverview'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { formatTimeStamp } from '../utils/timestapFormater'

const SingleAssetDetailsTab = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  console.log(selectedDataSet)
  const metaData = selectedDataSet?.metadata
  const assets = selectedDataSet?.assets
  const lastVerified = selectedDataSet?.lastVerified as number
  const createdDate = selectedDataSet?.creationDate as number
  console.log(assets)

  const asset = assetSerial
    ? assets?.find((asset) => asset.assetNumber === assetSerial)
    : assets?.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  //     const datasetName = metaData?.name || 'Lohko Gold'
  const location = asset?.locations[0]

  const tokenId = location?.tokenId
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
                <TableNameCell>#</TableNameCell>
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
                <TableValueCell>{formatTimeStamp(lastVerified)}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Status</TableNameCell>
                <TableValueCell>{asset?.status}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>BlockChain</TableNameCell>
                <TableValueCell>{asset?.currentLocation}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Token ID</TableNameCell>
                <TableValueCell>{tokenId}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Token Standard</TableNameCell>
                <TableValueCell>{}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Owner Address</TableNameCell>
                <TableValueCell>{location?.ownerAccount}</TableValueCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creator</TableNameCell>
                <TableValueCell>{}</TableValueCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creation Date</TableNameCell>
                <TableValueCell>{formatTimeStamp(createdDate)}</TableValueCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SectionWrapper>
    </>
  )
}

export default () => <SingleAssetDetailsTab />
