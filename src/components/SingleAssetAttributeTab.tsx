import React from 'react'

import { Box, Typography, Table, TableBody, TableRow, TableContainer } from '@mui/material'
import { SectionWrapper, TableNameCell, TableValueCell, CustomLink } from './DetailsTab'

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
              <TableValueCell>Nguru Mountain Project</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Project type</TableNameCell>
              <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>Reforestation</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Project description</TableNameCell>
              <TableValueCell>{}</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Project location</TableNameCell>
              <TableValueCell>Nguru, Tanzania</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification status</TableNameCell>
              <TableValueCell>Certified</TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Certification standards</TableNameCell>
              <TableValueCell>Verra Carbon Standard</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification project type</TableNameCell>
              <TableValueCell>Agriculture Forestry and Other Land Use </TableValueCell>
            </TableRow>

            <TableRow>
              <TableNameCell>Certification methodology</TableNameCell>
              <TableValueCell>AR-ACM0003</TableValueCell>
            </TableRow>

            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableNameCell>Certification crediting period</TableNameCell>
              <TableValueCell>7 Years Twice Renewable</TableValueCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SectionWrapper>
  )
}

export default () => <SingleAssetAttributeTab />
