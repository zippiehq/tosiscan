import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Tooltip,
} from '@mui/material'

import { buttonGroup, check, info, searchIcon } from '../../assets'
import image from '../../assets/Lohko.svg'

import { useDataSetAssetsContext, IFinalAsset } from '../../hooks/useDatachainOutput'
import { useDataSetContext } from '../../hooks/useDataset'

function AssetTable({ assets }: { assets: IFinalAsset[] }) {
  let uniqueItems: any = new Set(assets.map((asset: IFinalAsset) => asset.assetName))
  uniqueItems = Array.from(uniqueItems)
  return (
    <div style={{ width: '820px', marginTop: '16px' }}>
      <TableContainer>
        <Table sx={{ borderRadius: '6px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {uniqueItems.map((asset: any) => (
              <TableRow key={asset}>
                <TableCell>{asset}</TableCell>
                <TableCell>
                  {assets?.filter((item: any) => item.product === asset || item.assetName === asset).length}
                </TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function IndividualAssetTable({
  assets,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  assets: IFinalAsset[]
  page: number
  setPage: any
  rowsPerPage: any
  setRowsPerPage: any
}) {
  const navigate = useNavigate()

  const { id } = useParams()

  const { getDataSetById } = useDataSetContext()

  const asset = getDataSetById(id)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const hovermessage = 'Verified successfully'
  return (
    <div style={{ marginTop: '16px' }}>
      {asset?.id === '0x80bf3a24' ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Blockchain</TableCell>
                  <TableCell>Token ID</TableCell>
                  <TableCell>Owner Address</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IFinalAsset) => {
                  const location = row.locations[0]
                  const assetContract = location.contract
                  const { ownerAccount } = location

                  const assetTokenId = location.tokenId
                  const assetSerial = row.assetNumber

                  const onAssetClick = () => {
                    if (assetContract && assetTokenId) {
                      navigate(`/single-asset/${id}/${assetContract}/${assetTokenId}`)
                    } else {
                      navigate(`/single-asset/${id}/${assetSerial}`)
                    }
                  }
                  const message = row.status === 'ok' ? hovermessage : row.failedReason
                  return (
                    <TableRow sx={{ cursor: 'none' }} key={assetTokenId}>
                      <TableCell sx={{ cursor: 'text' }}>
                        <a
                          onClick={onAssetClick}
                          style={{
                            color: '#07939C',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {row.assetNumber}
                        </a>
                      </TableCell>

                      <TableCell
                        sx={{
                          cursor: 'text',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={row.imageUrl}
                          width="32px"
                          height="32px"
                          alt="lohko"
                          style={{ marginRight: '12px' }}
                        />
                        <Box>
                          <Typography>{row.assetName}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ cursor: 'default' }}>
                        <Tooltip title={message} placement="top">
                          <img src={row.status === 'ok' ? check : info} alt="check icon" />
                        </Tooltip>
                      </TableCell>

                      <TableCell sx={{ cursor: 'text', textTransform: 'capitalize' }}>{location.name}</TableCell>
                      <TableCell sx={{ cursor: 'text' }}>{assetTokenId}</TableCell>
                      <TableCell sx={{ cursor: 'text' }}>{ownerAccount}</TableCell>

                      <TableCell>
                        <a
                          onClick={onAssetClick}
                          style={{
                            color: '#07939C',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Details
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={assets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Asset</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Blockchain</TableCell>
                  <TableCell>Token ID</TableCell>
                  <TableCell>Owner Address</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IFinalAsset) => {
                  const location = row.locations[0]
                  const assetContract = location?.contract
                  const assetTokenId = location?.tokenId
                  const assetSerial = row.assetNumber

                  const onAssetClick = () => {
                    if (assetContract && assetTokenId) {
                      navigate(`/single-asset/${id}/${assetContract}/${assetTokenId}`)
                    } else {
                      navigate(`/single-asset/${id}/${assetSerial}`)
                    }
                  }
                  const message = row.status === 'ok' ? hovermessage : row.failedReason
                  return (
                    <TableRow sx={{ cursor: 'none' }} key={assetTokenId}>
                      <TableCell sx={{ cursor: 'text' }}>
                        <a
                          onClick={onAssetClick}
                          style={{
                            color: '#07939C',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {assetSerial}
                        </a>
                      </TableCell>
                      <TableCell
                        sx={{
                          cursor: 'text',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span>
                          <img
                            style={{
                              width: '32px',
                              height: '32px',
                              marginRight: '12px',
                            }}
                            className="avatar"
                            src={row.assetName.indexOf('TEST') > -1 ? image : row.imageUrl}
                            alt="lohko"
                          />
                        </span>
                        {row.assetName}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={message} placement="top">
                          <img src={row.status === 'ok' ? check : info} alt="check icon" />
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{ cursor: 'text', textTransform: 'capitalize' }}>
                        {location ? location.name : 'Zippienet'}
                      </TableCell>
                      <TableCell sx={{ cursor: 'text' }}>
                        {location.contract
                          ? `${location.contract}/${location.tokenId}`
                          : `${location.tokenId.substring(0, 4)}...${location.tokenId.substring(10, 30)}`}
                      </TableCell>
                      <TableCell sx={{ cursor: 'text' }}>{location.ownerAccount}</TableCell>
                      <TableCell>
                        <a
                          onClick={onAssetClick}
                          style={{
                            color: '#07939C',
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Details
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={assets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  )
}
export default function AssetTab() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  if (isLoading || !selectedDataSet) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div>
  }
  const { assets, dataSetId } = selectedDataSet

  return (
    <div className="asset-tab">
      <div className="asset-tab-overiew">
        <div className="col-1">
          <Typography
            component="h3"
            my={0}
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: 1.5,
              color: '#101828',
            }}
          >
            Assets
          </Typography>

          <AssetTable assets={assets} />
        </div>

        <div className="col-2">
          <div className="stats total-assets">
            <h5>Total assets</h5>
            <h4>{assets.length}</h4>
          </div>
          <div className="stats total-assets">
            <h5>Total change</h5>
            <h4>0</h4>
          </div>
          <div className="stats total-assets">
            <h5>Publisher staking</h5>
            <h4>
              100,000
              <span
                style={{
                  marginLeft: '6px',
                  fontSize: '20px',
                  lineHeight: '30px',
                }}
              >
                TOSI
              </span>
            </h4>
          </div>
        </div>
      </div>

      <div className="individual-assets">
        <div className="header">
          <div className="text">
            <Typography
              component="h3"
              my={0}
              sx={{
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.5,
                color: '#101828',
              }}
            >
              Individual assets
            </Typography>

            <p>
              Showing {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} out of {assets.length} individual assets
            </p>
          </div>

          {dataSetId === '0x80bf3a24' ? (
            ''
          ) : (
            <div className="search">
              <div className="search-box">
                <img className="search-icon" src={searchIcon} alt="Search Icon" />
                <input placeholder="Search assets..." />
              </div>

              <img src={buttonGroup} alt="search placeholder" style={{ marginLeft: '16px' }} />
            </div>
          )}
        </div>
        <IndividualAssetTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          assets={assets}
        />
      </div>
    </div>
  )
}
