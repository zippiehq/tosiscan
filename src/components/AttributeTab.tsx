import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell, Link } from '@mui/material'
import { styled } from '@mui/system'

import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'
import { isValidUrl } from '../utils/helper'

const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  listStyleType: 'none',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}))
const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

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
                    <CustomLink href={item.value} target="_blank" rel="noreferrer">
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
