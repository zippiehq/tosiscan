import React from 'react'

import { Box, Typography, Table, TableBody, TableRow, TableContainer } from '@mui/material'
import { useParams } from 'react-router-dom'
import { SectionWrapper } from './SingleAssetStyles'
import { TableNameCell, TableValueCell, StyledTableRow } from './TableStyles'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

const SingleAssetAttributeTab = () => {
  const { assetContract, assetTokenId, assetSerial, id } = useParams()
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  const assets = selectedDataSet?.assets
  const asset = assetSerial
    ? assets?.find((asset) => asset.assetNumber === assetSerial)
    : assets?.find(
        (asset) =>
          asset.locations[0]?.contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          asset.locations[0]?.tokenId === assetTokenId,
      )

  const attributes = asset?.attributes || []

  return (
    <SectionWrapper>
      <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Attributes
      </Typography>

      <TableContainer>
        <Table>
          <TableBody>
            {attributes.map((item: any) => (
              <StyledTableRow key={item}>
                <TableNameCell>{item.trait_type}</TableNameCell>
                <TableValueCell>{item.value}</TableValueCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionWrapper>
  )
}

export default () => <SingleAssetAttributeTab />
