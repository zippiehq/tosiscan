import { useParams } from 'react-router-dom'

import { Box, Table, TableBody, TableRow, TableCell, TableContainer, Typography, Link } from '@mui/material'
import { styled } from '@mui/system'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useDataSetContext } from '../hooks/useDataset'
import { formatTimeStamp } from '../utils/timestapFormater'

import Verifications from './Verifications'
import Issuer from './Issuer'

const OverviewTabHeaderLohko = () => (
  <Typography>
    Lohko Gold bars are numbered and stored in a secure vault and owners have a legal right to claim them anytime.
  </Typography>
)
const OverviewTabHeaderCarbon = () => (
  <Box>
    <Typography variant="body1" color="grey.600" mb={2} sx={{ lineHeight: 1.5 }}>
      Lohko carbon credit futures are issued from a high-quality tropical reforestation project that prioritizes
      original forest growth, biodiversity, and community livelihood.
    </Typography>

    <Typography variant="body1" color="grey.600" sx={{ lineHeight: 1.5 }}>
      Each future gives right to 1 carbon credit (1 ton carbon) from the
      <Link
        href="https://app.lohkoinvest.com/products/carbon_credit_futures"
        target="_blank"
        rel="noreferrer nofollow"
        sx={{ fontWeight: 500, color: 'primary.600', textDecoration: 'none' }}
      >
        &nbsp;Nguru Project
      </Link>
      .
    </Typography>
  </Box>
)

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

const OverviewTab = () => {
  const { isLoading, selectedDataSet } = useDataSetAssetsContext()
  const { getDataSetById } = useDataSetContext()

  const { id } = useParams()
  const dataSet = getDataSetById(id)

  const metaData = selectedDataSet?.metadata
  const creationDate = selectedDataSet?.creationDate
  const lastVerified = selectedDataSet?.lastVerified
  const datasetName = dataSet?.dataset || 'Lohko Gold'

  // @ts-ignore
  const Verification = Verifications[datasetName] || null
  const Headers = {
    'Lohko Gold': OverviewTabHeaderLohko,
    'Carbon Credit Futures': OverviewTabHeaderCarbon,
  }
  // @ts-ignore
  const Header = Headers[datasetName] || null
  return (
    <Box sx={{ display: 'flex', marginBottom: '160px' }}>
      <Box mr={5.25} sx={{ maxWidth: { xl: '820px' } }}>
        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Summary
          </Typography>
          <Header />
        </SectionWrapper>

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            General information
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Data contract</TableNameCell>
                  <TableValueCell>{metaData?.contract}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Dataset name</TableNameCell>
                  <TableValueCell>{metaData?.name}</TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Asset description</TableNameCell>
                  <TableValueCell>{metaData?.['asset-description']}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Asset class</TableNameCell>
                  <TableValueCell>{metaData?.['asset-class']}</TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Main location</TableNameCell>
                  <TableValueCell>{metaData?.['main-location']}</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Supported assets location</TableNameCell>
                  <TableValueCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    {metaData?.['supported-locations'].map((item) => (
                      <Typography key={item}>{item}</Typography>
                    ))}
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Creation date</TableNameCell>
                  <TableValueCell>
                    {isLoading || !creationDate ? 'loading...' : formatTimeStamp(creationDate)}
                  </TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Verifications
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Verification frequency</TableNameCell>
                  <TableValueCell>Weekly</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Last successful verification</TableNameCell>
                  <TableValueCell>
                    {isLoading || !lastVerified ? 'loading...' : formatTimeStamp(lastVerified)}
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Last failed verification</TableNameCell>
                  <TableValueCell>&mdash;</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Availability score</TableNameCell>
                  <TableValueCell>
                    <Typography
                      variant="body2"
                      py={0.5}
                      px={1.5}
                      color="#1B876A"
                      sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        backgroundColor: '#F5FCFA',
                        borderRadius: '16px',
                      }}
                    >
                      100%
                    </Typography>
                  </TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>

        <Box mt={6} sx={{ width: '100%' }}>
          <Typography variant="h2" color="grey.900" sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Supporting verification
          </Typography>

          <Verification />
        </Box>

        {/* {selectedDataSet?.dataSetId === '0x80bf3a24' ? (
          <Box>
            <Typography variant="h2" color="grey.900" mb={2} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
              Verified files
            </Typography>

            <Box>
              <TableContainer>
                <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                      <TableCell
                        sx={{
                          paddingY: 2.25,
                          paddingX: 3,
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: 1.43,
                          color: '#667085',
                        }}
                      >
                        Dataset
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                        Last verified
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                        Publisher
                      </TableCell>
                      <TableCell sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#667085' }}>
                        Issuer/s
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow sx={{ borderBottom: '1px solid #eaecf0' }}>
                      <TableCell
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          paddingY: 2.5,
                          paddingX: 3,
                          borderBottom: 'none',
                        }}
                      >
                        <img src={asset?.image} width="40px" height="40px" alt="." />

                        <Stack ml={2}>
                          <Typography
                            variant="h4"
                            sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, color: '#101828' }}
                          >
                            Nguru Project Satellite Images
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{ fontSize: '12px', fontWeight: 500, lineHeight: 1.5, color: '#07939c' }}
                          >
                            0x80bf3a23...89764372
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ fontSize: '14px', lineHeight: 1.43, color: '#667085', borderBottom: 'none' }}>
                        an hour ago
                      </TableCell>

                      <TableCell sx={{ borderBottom: 'none' }}>
                        <Stack
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            fontSize: '14px',
                            lineHeight: 1.43,
                            color: '101828',
                          }}
                        >
                          Airimpact
                          <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ borderBottom: 'none' }}>
                        <Stack
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            fontSize: '14px',
                            lineHeight: 1.43,
                            color: '101828',
                          }}
                        >
                          Airimpact
                          <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {page > 1 ? (
                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={1}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  backIconButtonProps={{}}
                  nextIconButtonProps={{}}
                  sx={{
                    position: 'relative',
                    margin: 0,
                    padding: 0,
                    border: '1px solid #eaecf0',
                    borderTop: 'none',

                    '& .MuiToolbar-root': {
                      margin: 0,
                      padding: 0,
                    },
                    '& .MuiTablePagination-displayedRows': {
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      margin: 0,
                      padding: 0,
                      transform: 'translate(-50%, -50%)',
                    },
                    '& .MuiTablePagination-actions': {
                      position: 'absolute',
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      margin: 0,
                      marginLeft: '0 !important',
                      padding: 0,
                    },
                    '& .MuiTablePagination-actions button': {
                      position: 'relative',
                      height: '36px',
                      padding: '8px 14px',
                      color: '#344054',
                      border: '1px solid rgba(16, 24, 40, 0.05)',
                      borderRadius: '100px',
                    },
                    '& .MuiTablePagination-actions button:first-of-type': {
                      left: '24px',
                      justifyContent: 'flex-start',
                      width: '114px',
                    },
                    '& .MuiTablePagination-actions button:last-child': {
                      right: '24px',
                      justifyContent: 'flex-end',
                      width: '88px',
                    },
                    '& .MuiTablePagination-actions button:first-of-type::before': {
                      position: 'absolute',
                      top: '50%',
                      left: '42px',
                      content: '"Previous"',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.43,
                      transform: 'translateY(-50%)',
                    },
                    '& .MuiTablePagination-actions button:last-child::after': {
                      position: 'absolute',
                      top: '50%',
                      right: '42px',
                      content: '"Next"',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: 1.43,
                      transform: 'translateY(-50%)',
                    },
                  }}
                />
              ) : (
                ''
              )}
            </Box>
          </Box>
        ) : (
          ''
        )} */}
      </Box>

      <Box sx={{ maxWidth: { xl: '378px' } }}>
        <SectionWrapper sx={{ paddingY: 2.5, paddingX: 2 }}>
          <Typography variant="body2" color="grey.600" mb={1}>
            Publisher staking
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              variant="body1"
              color="grey.900"
              mr={0.75}
              sx={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.27 }}
            >
              100,000
            </Typography>
            <Typography variant="body1" color="grey.900" sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5 }}>
              TOSI
            </Typography>
          </Box>
        </SectionWrapper>

        <Issuer />

        <SectionWrapper>
          <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
            Dataset disputes
          </Typography>

          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>All-time disputes</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>0</TableValueCell>
                </TableRow>

                <TableRow>
                  <TableNameCell>Publisher success rate</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      py={0.5}
                      px={1.5}
                      color="#1B876A"
                      sx={{
                        display: 'inline-block',
                        fontWeight: 500,
                        backgroundColor: '#F5FCFA',
                        borderRadius: '16px',
                      }}
                    >
                      100%
                    </Typography>
                  </TableValueCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableNameCell>Open disputes</TableNameCell>
                  <TableValueCell sx={{ textAlign: 'center' }}>0</TableValueCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SectionWrapper>
      </Box>
    </Box>
  )
}

export default () => <OverviewTab />
