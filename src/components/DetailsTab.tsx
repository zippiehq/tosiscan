import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Typography, Table, TableBody, TableRow, TableContainer, TableCell, Link } from '@mui/material'
import { styled } from '@mui/system'
import moment from 'moment'
import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'
import IconLocationMark from '../assets/images/icon-location-mark.svg'
import IconDownload from '../assets/images/icon-download.svg'

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

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const DetailsTab = () => {
  const { assetContract, assetTokenId } = useParams()
  const { isTLILoading, TLIDataSet, setTLIQuery } = useTrustlessIndexingContext()

  useEffect(() => setTLIQuery({ assetContract, assetTokenId }), [assetContract, assetTokenId, setTLIQuery])
  const token = TLIDataSet ? TLIDataSet.token : undefined
  const dateValue = TLIDataSet?.token.mintTimestamp as number
  const dateTime = moment.unix(dateValue)
  const date = dateTime.format('DD MMM YYYY HH:mm:ss [UTC]')

  return (
    <>
      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Description
        </Typography>

        <Typography>{token?.metadata?.description}</Typography>
      </SectionWrapper>

      <SectionWrapper>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Asset details
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Contract Address</TableNameCell>
                <TableValueCell>
                  {TLIDataSet
                    ? `${TLIDataSet.contract.address?.slice(0, 6)}...${TLIDataSet.contract.address?.slice(
                        TLIDataSet.contract.address.length - 4,
                      )}`
                    : ''}
                </TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Asset name</TableNameCell>
                <TableValueCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={TLIDataSet?.token.metadata.image}
                    width="40"
                    height="40"
                    style={{ marginRight: '12px', borderRadius: '4px' }}
                    alt="."
                  />
                  {TLIDataSet?.token.metadata.name}
                </TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Token Ref.</TableNameCell>
                <TableValueCell>{TLIDataSet?.token.id}</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Token Standard</TableNameCell>
                <TableValueCell>{TLIDataSet?.contract.type}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Blockchain</TableNameCell>
                <TableValueCell>Ethereum</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Last updated</TableNameCell>
                <TableValueCell>Last week</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creator Earnings</TableNameCell>
                <TableValueCell>5%</TableValueCell>
              </TableRow>

              <TableRow>
                <TableNameCell>Minted</TableNameCell>
                <TableValueCell>{date}</TableValueCell>
              </TableRow>

              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableNameCell>Creator</TableNameCell>
                <TableValueCell>
                  {TLIDataSet
                    ? `${TLIDataSet.contract.owner?.slice(0, 6)}...${TLIDataSet.contract.owner?.slice(
                        TLIDataSet.contract.owner.length - 4,
                      )}`
                    : ''}
                </TableValueCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </SectionWrapper>

      {TLIDataSet?.token.metadata.attributes?.map((attribute: any) =>
        attribute.trait_type === 'Unique VCU Serial ID' ? (
          <>
            <Typography variant="h2" color="grey.900" sx={{ fontSize: '20px', lineHeight: 1.5 }}>
              Supporting verification
            </Typography>

            <SectionWrapper mt={2}>
              <Typography variant="body2" color="grey.500" mb={0.25} sx={{ lineHeight: 1.43 }}>
                Information verifier
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.900"
                mb={1}
                sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5 }}
              >
                Verra
              </Typography>

              <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={IconLocationMark} width="20" height="20" alt="Address pin" />
                <Typography variant="body2" color="grey.600" ml={1} sx={{ lineHeight: 1.43 }}>
                  1 Thomas Cir NW #1050 Washington D, United States of America
                </Typography>
              </Box>

              <Typography variant="body1" color="grey.600" mb={2.75} sx={{ lineHeight: 1.5 }}>
                Verra is a nonprofit organization that operates standards in environmental and social markets, including
                the world’s leading carbon crediting program, the Verified Carbon Standard (VCS) Program.
              </Typography>

              <Typography variant="body1" color="grey.600" sx={{ linHeight: 1.5 }}>
                Verified by
                <CustomLink
                  href="https://verra.org/"
                  target="_blank"
                  rel="noreferrer nofollow"
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    color: 'primary.600',
                    textDecoration: 'none',
                  }}
                >
                  &nbsp;Verra
                </CustomLink>
              </Typography>
            </SectionWrapper>
          </>
        ) : (
          ''
        ),
      )}
    </>
  )
}

export default () => <DetailsTab />
