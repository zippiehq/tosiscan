import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import {
  Box,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material'

import { facebookLogoGrey, verifiedTick, lohkoAvatar, downloadIcon, AddressIcon } from '../../assets'

import { ReactComponent as IconVerifiedTick } from '../../assets/VerifiedTick.svg'
import { useVerificationTimestamps } from '../../hooks/useTimeStamps'
import { useDataSetAssetsContext } from '../../hooks/useDatachainOutput'
import { useDataSetContext } from '../../hooks/useDataset'

export default function OverviewTab() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { timestamps, isLoading } = useVerificationTimestamps()
  const { isLoading: fetchingAsset, selectedDataSet } = useDataSetAssetsContext()
  const { getDataSetById } = useDataSetContext()
  const creationDate = Math.min(...timestamps)
  const lastVerified = Math.max(...timestamps)

  const navigate = useNavigate()
  const { id } = useParams()
  const dataSet = getDataSetById(id)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const assets = selectedDataSet?.assets
  const metaData = selectedDataSet?.metadata

  return (
    <div className="asset-overview">
      <div className="column-one">
        <div className="summary">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            Summary
          </Typography>

          {id === '0x80bf3a24' ? (
            <Box>
              <Typography variant="body2" mb={2} sx={{ fontSize: '16px', lineHeight: 1.5, color: '#475467' }}>
                Lohko carbon credit futures are issued from a high-quality tropical reforestation project that
                prioritizes original forest growth, biodiversity, and community livelihood.
              </Typography>

              <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#475467' }}>
                Each future gives right to 1 carbon credit (1 ton carbon) from the
                <a
                  href="https://app.lohkoinvest.com/products/carbon_credit_futures"
                  style={{ fontWeight: 500, color: '#07939c', textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  &nbsp;Nguru Project
                </a>
                .
              </Typography>
            </Box>
          ) : (
            <Typography>
              Lohko Gold bars are numbered and stored in a secure vault and owners have a legal right to claim them
              anytime.
            </Typography>
          )}
        </div>
        <div className="general-info">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            General information
          </Typography>

          <table>
            <tbody>
              <tr>
                <td>Data contract</td>
                <td>{metaData?.contract}</td>
              </tr>
              <tr>
                <td>Dataset name</td>
                <td>{metaData?.name}</td>
              </tr>
              <tr>
                <td>Asset description</td>
                <td>{metaData?.['asset-description']}</td>
              </tr>
              <tr>
                <td>Asset class</td>
                <td>{metaData?.['asset-class']}</td>
              </tr>
              <tr>
                <td>Main location</td>
                <td>{metaData?.['main-location']}</td>
              </tr>
              <tr>
                <td>Supported assets location</td>
                <td style={{ display: 'flex', flexDirection: 'column' }}>
                  {metaData?.['supported-locations'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td>Creation date</td>
                <td>
                  {isLoading ? 'loading...' : moment.unix(creationDate).utc().format('DD MMM YYYY HH:mm:ss [UTC]')}{' '}
                  {!isLoading
                    ? `(${moment(moment.unix(creationDate).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()})`
                    : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="verifications">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            Verifications
          </Typography>

          <table>
            <tbody>
              <tr>
                <td>Verification frequency</td>
                <td>Weekly</td>
              </tr>
              <tr>
                <td>Last successful verification</td>
                <td>
                  {isLoading ? 'loading...' : moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')}{' '}
                  {!isLoading
                    ? `(${moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()})`
                    : null}
                </td>
              </tr>
              <tr>
                <td>Last failed verification</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Availability score</td>
                <td>
                  <span
                    style={{
                      color: '#1B876A',
                      backgroundColor: '#F5FCFA',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    100%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="supporting-verifications">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            Supporting verification
          </Typography>

          {selectedDataSet?.dataSetId === '0x80bf3a24' ? (
            <Box mt={4} mb={6}>
              <Typography variant="body2" mb={2} sx={{ fontSize: '16px', lineHeight: 1.5, color: '#667085' }}>
                This dataset does not have additional verifications.
              </Typography>

              <Typography variant="body2" sx={{ fontSize: '16px', lineHeight: 1.5, color: '#667085' }}>
                Are you the owner of this dataset? <br />
                Increase your asset’s reliability by adding supporting verifications.
                <a
                  onClick={() => navigate('/coming-soon')}
                  style={{ fontWeight: 600, color: '#07939c', textDecoration: 'none', cursor: 'pointer' }}
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  &nbsp;Learn more
                </a>
              </Typography>
            </Box>
          ) : (
            <div className="content">
              <h4>Physical Custody</h4>
              <h2>BullionStar</h2>

              <h2>45 New Bridge Rd, Singapore 059398</h2>
              <div className="address">
                <img src={AddressIcon} alt="Address pin" />
                <p>45 New Bridge Rd, Singapore 059398</p>
              </div>
              <p>
                We have partnered with Singapore-based gold and silver trading company BullionStar to ensure a safe and
                secure investment process
              </p>

              <div className="download-document">
                <img src={downloadIcon} alt="Download Icon" />
                <p>Insurance Document</p>
              </div>

              <div className="verifier">
                <p>
                  Verified by
                  <a
                    href="https://www.bullionstar.com/"
                    target="_blank"
                    style={{ fontWeight: 500, color: '#07939c', textDecoration: 'none' }}
                    rel="noreferrer"
                  >
                    {' '}
                    BullionStar
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {selectedDataSet?.dataSetId === '0x80bf3a24' ? (
          <Box sx={{ marginBottom: '160px' }}>
            {/* <Typography variant='h3' mb={2} sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}>
              Verified files
            </Typography> */}

            {true ? (
              ''
            ) : (
              <Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
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
                      <TableRow sx={{ borderBottom: '1px solid #eaecf0', cursor: 'none' }}>
                        <TableCell
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingY: 2.5,
                            paddingX: 3,
                            borderBottom: 'none',
                          }}
                        >
                          <img src={dataSet?.image} width="40px" height="40px" alt="." />

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
            )}
          </Box>
        ) : (
          ''
        )}
      </div>

      <div className="column-two">
        <div className="metric-item">
          <div className="heading">
            <h5>Publisher staking</h5>
          </div>

          <div className="amount">
            <p>100,000</p>
            <span>TOSI</span>
          </div>
        </div>
        <div className="profile">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            Publisher / Issuer
          </Typography>

          <div className="issuer">
            <img src={lohkoAvatar} alt="Lohko Avatar" />
            <div className="details">
              <div className="name">
                <h4>Lohko Pte Ltd</h4>
                <img src={verifiedTick} alt="verified tick" />
              </div>
              <p>Publisher since May 2022</p>
            </div>
          </div>

          <div className="description">
            <div className="stats">
              <div className="dataset-stat">
                <span>1</span>
                <p>Datasets</p>
              </div>
              <div className="asset-stat">
                <span>{!fetchingAsset ? assets?.length : null}</span>
                <p>Verified assets</p>
              </div>
            </div>
            <p className="desc">
              Whether it’s gold, silver, art, or other assets, Lohko digitalises tangible assets and gives investors
              full control.
            </p>
          </div>
          <div className="socials">
            <div className="social-icon">
              <a
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
                target="_blank"
                href="https://twitter.com/lohkowallet"
                rel="noreferrer nofollow"
              >
                <img src={facebookLogoGrey} alt="Facebook Logo" />
                <span>@LohkoWallet</span>
              </a>
            </div>
          </div>

          <div style={{ justifyContent: 'space-between' }} className="flex">
            <div className="website">
              <a href="https://app.lohkoinvest.com/" target="_blank" rel="noreferrer nofollow">
                app.lohkoinvest.com
              </a>
            </div>
            <div className="website">
              <span style={{ color: '#475467' }}>View in</span>{' '}
              <a href="https://opensea.io/collection/lohkonft" target="_blank" rel="noreferrer nofollow">
                OpenSea
              </a>
            </div>
          </div>
        </div>

        <div className="disputes">
          <Typography
            component="h3"
            my={0}
            sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}
          >
            Dataset disputes
          </Typography>

          <table>
            <tbody>
              <tr>
                <td>All-time disputes</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Publisher success rate</td>
                <td style={{ padding: '0px' }}>
                  <span
                    style={{
                      color: '#1B876A',
                      backgroundColor: '#F5FCFA',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    100%
                  </span>
                </td>
              </tr>
              <tr>
                <td>Open disputes</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
