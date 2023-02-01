import React from 'react'
import { useParams } from 'react-router-dom'

import { Box, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/system'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { TableNameCell, TableValueCell } from './TableStyles'

const AttributesTab = () => {
  const { assetContract, assetTokenId, assetSerial } = useParams()
  const { selectedDataSet } = useDataSetAssetsContext()
  const assets = selectedDataSet?.assets || []
  const asset = assetSerial
    ? assets.find((asset) => asset.assetNumber === assetSerial)
    : assets.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const attribute = asset?.attributes

  return (
    <Box
      mb={4.25}
      p={3}
      sx={{
        width: '820px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'grey.200',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Attributes
      </Typography>

      <TableContainer>
        <Table>
          <TableBody>
            {asset?.assetNumber && (
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Additional Certifications</TableNameCell>
                <TableValueCell>
                  {attribute.additionalCertifications ? attribute.additionalCertifications : '-'}
                </TableValueCell>
              </TableRow>
            )}

            <TableRow>
              <TableNameCell>Country</TableNameCell>
              <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>{attribute?.country}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Holding Identifier</TableNameCell>
              <TableValueCell>{attribute?.holdingIdentifier}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Instrument Type</TableNameCell>
              <TableValueCell>{attribute?.instrumentType}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Issuance Date</TableNameCell>
              <TableValueCell>{attribute?.issuanceDate}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Protocol</TableNameCell>
              <TableValueCell>{attribute?.protocol}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Protocol Category</TableNameCell>
              <TableValueCell>{attribute?.protocolCategory}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Quantity</TableNameCell>
              <TableValueCell>{attribute?.quantity}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Region</TableNameCell>
              <TableValueCell>{attribute?.region}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Reporting Period End</TableNameCell>
              <TableValueCell>{attribute?.reportingPeriodEnd}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Reporting Period Start</TableNameCell>
              <TableValueCell>{attribute?.reportingPeriodStart}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Resource identifier</TableNameCell>
              <TableValueCell>{attribute?.resourceIdentifier}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Resource name</TableNameCell>
              <TableValueCell>{attribute?.resourceName}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Retired Cancelled</TableNameCell>
              <TableValueCell>{attribute?.retiredCancelled === true ? 'true' : 'false'}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Serial Numbers</TableNameCell>
              <TableValueCell>{attribute?.serialNumbers}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Total vintage quantity</TableNameCell>
              <TableValueCell>{attribute?.totalVintageQuantity}</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Vintage End</TableNameCell>
              <TableValueCell>{attribute?.vintageEnd}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Vintage Start</TableNameCell>
              <TableValueCell>{attribute?.vintageStart}</TableValueCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default () => <AttributesTab />
