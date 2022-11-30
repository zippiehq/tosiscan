import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell, Link } from '@mui/material'
import { styled } from '@mui/system'

import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'

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
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9fafb',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}))
const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const AttributeTab = () => {
  const { TLIDataSet } = useTrustlessIndexingContext()
  const attributes = TLIDataSet?.token.metadata.attributes as unknown as any[]
  const isValidUrl = (urlstring: any) => {
    const res = urlstring.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    )
    return res !== null
  }

  return (
    <SectionWrapper>
      <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Attributes
      </Typography>

      <TableContainer>
        <Table>
          <TableBody>
            {attributes.map((index: any) => (
              <StyledTableRow key={index}>
                <TableNameCell>{index.trait_type}</TableNameCell>
                {/* <TableValueCell>{isValidUrl(index.value) ? (<CustomLink to={`${index.value}`}>{index.value}</CustomLink>) : ({index.value})}</TableValueCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionWrapper>
  )
}
export default () => <AttributeTab />
