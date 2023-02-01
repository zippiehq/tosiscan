import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell, Link } from '@mui/material'
import { styled } from '@mui/system'

import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'
import { isValidUrl } from '../utils/helper'
import { TableNameCell, TableValueCell, CustomLink } from './TableStyles'

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  listStyleType: 'none',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}))

const AttributeTab = () => {
  const { TLIDataSet } = useTrustlessIndexingContext()
  const attributes = TLIDataSet?.token.metadata.attributes || []

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
                <TableValueCell>
                  {isValidUrl(item.value) ? (
                    <CustomLink href={item.value} target="_blank" rel="noreferrer" style={{ fontSize: '16px' }}>
                      {item.value}
                    </CustomLink>
                  ) : (
                    <li>{item.value}</li>
                  )}
                </TableValueCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionWrapper>
  )
}
export default () => <AttributeTab />
