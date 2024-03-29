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
import { styled } from '@mui/system'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'
import GoldBar from '../assets/images/gold-bar.jpg'
import Gray from '../assets/images/gold-bar.jpg'

import { useDataSetAssetsContext, IFinalAsset, DatachainOutputContextT } from '../hooks/useDatachainOutput'
import { TableHeadCell, CustomLink, TableBodyCellUnique } from './TableStyles'

const SectionWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  paddingTop: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(2),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

const AssetsDetails = ({ assets }: { assets: IFinalAsset[] }) => {
  const uniqueItems = Array.from(new Set(assets.map((asset) => asset.metadata.type)))

  return (
    <TableContainer>
      <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.50' }}>
            <TableHeadCell sx={{ width: '614px' }}>Item</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Change</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {uniqueItems.map((asset: any, index: any) => (
            <TableRow key={`${asset} + ${index + 1}`}>
              <TableBodyCellUnique sx={{ textAlign: 'left', fontSize: '16px', lineHeight: 1.5, color: 'grey.700' }}>
                {asset}
              </TableBodyCellUnique>
              <TableBodyCellUnique>{assets?.filter((item) => item.metadata.type === asset).length}</TableBodyCellUnique>
              <TableBodyCellUnique>0</TableBodyCellUnique>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const IndividualAssetTable = ({
  selectedDataSet,
  assets,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  selectedDataSet: DatachainOutputContextT
  assets: IFinalAsset[]
  page: number
  setPage: any
  rowsPerPage: any
  setRowsPerPage: any
}) => {
  const navigate = useNavigate()

  const { id } = useParams()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const hovermessage = 'Verified successfully'
  const pagination =
    assets.length > 10 ? (
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={assets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    ) : (
      ''
    )

  const isVerra = assets.find((asset) => asset['asset-type'] === 'Carbon Credits Batch')

  return isVerra ? (
    <Box>
      <>
        <TableContainer>
          <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: 'grey.50', borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
              >
                <TableHeadCell sx={{ width: '160px', paddingY: 1.5, paddingX: 3 }}>Serial No.</TableHeadCell>
                <TableHeadCell sx={{ width: '360px', paddingY: 1.5, paddingX: 3 }}>Asset</TableHeadCell>
                <TableHeadCell sx={{ width: '92px', paddingY: 1.5, paddingX: 3 }}>Quantity</TableHeadCell>
                <TableHeadCell sx={{ width: '450px', paddingY: 1.5, paddingX: 3 }}>Project</TableHeadCell>
                <TableHeadCell sx={{ width: '180px', paddingY: 1.5, paddingX: 3 }}>Location</TableHeadCell>
                <TableHeadCell sx={{ width: '90px', paddingY: 1.5, paddingX: 3 }}>Status</TableHeadCell>
                <TableHeadCell sx={{ width: '180px' }}> </TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IFinalAsset) => {
                const location = row.locations[0]
                const assetContract = location?.contract
                const assetTokenId = location?.tokenId
                const assetSerial = row.assetNumber
                const assetName = row.attributes.instrumentType

                const onAssetClick = () => navigate(`/single-asset-with-tabs/${id}/${assetSerial}`)

                const message = row.status === 'ok' ? hovermessage : row.failedReason
                const messageSerial = row.assetNumber ? row.assetNumber : ''

                return (
                  <TableRow
                    key={`${assetContract}/${assetTokenId}`}
                    sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
                  >
                    <TableCell sx={{ paddingY: 1.75, paddingX: 3, border: 'none', cursor: 'default' }}>
                      <Tooltip title={messageSerial} placement="top" arrow>
                        <Typography>
                          {row.assetNumber
                            ? `${row.assetNumber.slice(0, 5)}...${row.assetNumber.slice(row.assetNumber.length - 5)}`
                            : ''}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        paddingX: 3,
                        border: 'none',
                      }}
                    >
                      <Typography variant="body2" color="grey.900">
                        {assetName}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ paddingY: 1.75, paddingX: 4.5, border: 'none' }}>
                      {row.attributes?.quantity}
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, color: 'grey.600', border: 'none' }}>
                      {row.attributes?.resourceName}
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none' }}>{row.attributes?.country}</TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none', textAlign: 'center' }}>
                      <Tooltip title={message} placement="top">
                        <img src={IconCheck} alt="." />
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, textAlign: 'right', border: 'none' }}>
                      <CustomLink onClick={onAssetClick} sx={{ fontWeight: 500, cursor: 'pointer' }}>
                        Details
                      </CustomLink>
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
    </Box>
  ) : (
    <Box>
      <>
        <TableContainer>
          <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: 'grey.50', borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
              >
                <TableHeadCell sx={{ width: '125px', paddingY: 1.5, paddingX: 3 }}>Token Id.</TableHeadCell>
                <TableHeadCell sx={{ width: '367px', paddingY: 1.5, paddingX: 3 }}>Asset</TableHeadCell>
                <TableHeadCell sx={{ width: '92px', paddingY: 1.5, paddingX: 3 }}>Status</TableHeadCell>
                <TableHeadCell sx={{ width: '120px', paddingY: 1.5, paddingX: 3 }}>Blockchain</TableHeadCell>
                <TableHeadCell sx={{ width: '199px', paddingY: 1.5, paddingX: 3 }}>Token Ref.</TableHeadCell>
                <TableHeadCell sx={{ width: '199px', paddingY: 1.5, paddingX: 3 }}>Batch Id</TableHeadCell>
                <TableHeadCell sx={{ width: '196px', paddingY: 1.5, paddingX: 3 }}>Owner Address</TableHeadCell>
                <TableHeadCell sx={{ width: '146px' }}> </TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: IFinalAsset) => {
                const { metadata } = row

                const assetBatchId = row.batchId
                const assetTokenId = row.tokenId

                const onAssetClick = () => {
                  if (assetTokenId) {
                    navigate(`/single-asset/${id}/${assetTokenId}/${assetBatchId}`)
                  } else {
                    navigate(`/single-asset/${id}/${assetTokenId}`)
                  }
                }

                const message =
                  selectedDataSet.verifications[2].status === 'success' ? hovermessage : 'failed verification'

                return (
                  <TableRow
                    key={assetTokenId}
                    sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
                  >
                    <TableCell sx={{ paddingY: 1.75, paddingX: 3, border: 'none' }}>
                      <CustomLink onClick={onAssetClick} sx={{ cursor: 'pointer' }}>
                        {assetTokenId}
                      </CustomLink>
                    </TableCell>

                    <TableCell sx={{ display: 'flex', alignItems: 'center', paddingX: 3, border: 'none' }}>
                      <img src={metadata.image || selectedDataSet?.metadata?.image} width="36" height="36" alt="." />
                      <Typography variant="body2" color="grey.900" ml={1.5}>
                        {metadata.name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ paddingY: 1.75, paddingX: 4.5, border: 'none' }}>
                      <Tooltip title={message} placement="top">
                        <img
                          src={selectedDataSet.verifications[2].status === 'success' ? IconCheck : IconInfo}
                          alt="."
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, color: 'grey.600', border: 'none' }}>
                      {metadata ? metadata.chain : 'Zippienet'}
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none' }}>{assetTokenId}</TableCell>
                    <TableCell sx={{ paddingX: 3, border: 'none' }}>{assetBatchId}</TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none' }}>{row.owner}</TableCell>

                    <TableCell sx={{ paddingX: 3, textAlign: 'right', border: 'none' }}>
                      <CustomLink onClick={onAssetClick} sx={{ fontWeight: 500, cursor: 'pointer' }}>
                        Details
                      </CustomLink>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination}
      </>
    </Box>
  )
}

const AssetTab = () => {
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  const assetArray = selectedDataSet?.assets
  const lengthAssets = assetArray?.length as number
  const rowsdisplayed = lengthAssets < 10 ? lengthAssets : 10

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rowsdisplayed)

  if (isLoading || !selectedDataSet) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div>
  }
  const { assets } = selectedDataSet
  const numberOfRows = rowsPerPage * (page + 1)
  const numberOfRowsPerPage = numberOfRows <= assets.length ? numberOfRows : assets.length

  return (
    <>
      <Box mb={6}>
        <Typography variant="h2" color="grey.900" mb={1.25} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
          Assets
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Box mr={5.2} sx={{ width: { xl: '820px' } }}>
            <AssetsDetails assets={assets} />
          </Box>

          <Box sx={{ width: { xl: '378px' } }}>
            <SectionWrapper>
              <Typography variant="body2" color="grey.600" mb={1}>
                Total assets
              </Typography>
              <Typography
                variant="body1"
                color="grey.900"
                mr={0.75}
                sx={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.27 }}
              >
                {assets.length}
              </Typography>
            </SectionWrapper>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginBottom: '160px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h2" color="grey.900" mb={0.5} sx={{ fontSize: '20px', lineHeight: 1.5 }}>
              Individual assets
            </Typography>

            <Typography variant="body2" color="grey.500" mb={3}>
              Showing {rowsPerPage * page + 1} - {numberOfRowsPerPage} out of {assets.length} individual assets
            </Typography>
          </Box>
        </Box>

        <IndividualAssetTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          assets={assets}
          selectedDataSet={selectedDataSet}
        />
      </Box>
    </>
  )
}

export default () => <AssetTab />
