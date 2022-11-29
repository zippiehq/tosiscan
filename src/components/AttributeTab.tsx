import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell } from '@mui/material'
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

const AttributeTab = () => {
  const { assetContract, assetTokenId } = useParams()
  const { isTLILoading, TLIDataSet, setTLIQuery } = useTrustlessIndexingContext()

  return (
    <>
      {/* <SectionWrapper>
        <Typography>{}</Typography>
    //   </SectionWrapper> */}

      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Attributes
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[0].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[0].value}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[1].trait_type}</TableNameCell>
                <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>
                  {TLIDataSet?.token.attributes[1].value}
                </TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[2].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[2].value}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[3].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[3].value}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[4].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[4].value}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[5].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[5].value}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[6].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[6].value}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[7].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[7].value}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[8].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[8].value}</TableValueCell>
              </TableRow>
              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[9].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[9].value}</TableValueCell>
              </TableRow>
              {/* <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[10].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[10].value}</TableValueCell>
              </TableRow>
              <TableRow>
                <TableNameCell>{TLIDataSet?.token.attributes[11].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[11].value}</TableValueCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>{TLIDataSet?.token.attributes[12].trait_type}</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.attributes[12].value}</TableValueCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionWrapper>
    </>
  )
}
export default () => <AttributeTab />
