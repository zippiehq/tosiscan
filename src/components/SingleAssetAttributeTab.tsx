import React from 'react'

import { Box, Typography, Table, TableBody, TableRow, TableContainer } from '@mui/material'
import { SectionWrapper, CustomLink } from './DetailsTab'
import { TableNameCell, TableValueCell } from './TableStyles'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

const SingleAssetAttributeTab = () => {
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()

  return (
    <SectionWrapper>
      <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Attributes
      </Typography>

      <TableContainer>
        <Table>
          <TableBody>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Project name</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Project type</TableNameCell>
              <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>-</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Project description</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Project location</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification status</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Certification standards</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification project type</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Certification methodology</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification crediting period</TableNameCell>
              <TableValueCell>-</TableValueCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SectionWrapper>
  )
}

export default () => <SingleAssetAttributeTab />