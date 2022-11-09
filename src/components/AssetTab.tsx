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
  Link,
} from '@mui/material'
import { styled } from '@mui/system'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'
import GoldBar from '../assets/images/gold-bar.svg'

import { useDataSetAssetsContext, IFinalAsset } from '../hooks/useDatachainOutput'

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

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(1.5),
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.43,
  color: theme.palette.grey['500'],
}))

const TableBodyCellUnique = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(2.5),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(2.5),
  paddingLeft: theme.spacing(3),
  fontSize: '14px',
  lineHeight: 1.43,
  textAlign: 'right',
  color: theme.palette.grey['500'],
}))

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const AssetsDetails = ({ assets }: { assets: IFinalAsset[] }) => {
  let uniqueItems: any = new Set(assets.map((asset: IFinalAsset) => asset.assetName))
  uniqueItems = Array.from(uniqueItems)

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
          {uniqueItems.map((asset: any) => (
            <TableRow key={asset}>
              <TableBodyCellUnique sx={{ textAlign: 'left', fontSize: '16px', lineHeight: 1.5, color: 'grey.700' }}>
                {asset}
              </TableBodyCellUnique>
              <TableBodyCellUnique>
                {assets?.filter((item: any) => item.product === asset || item.assetName === asset).length}
              </TableBodyCellUnique>
              <TableBodyCellUnique>0</TableBodyCellUnique>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const IndividualAssetTable = ({
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

  return (
    <Box>
      <>
        <TableContainer>
          <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: 'grey.50', borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
              >
                <TableHeadCell sx={{ width: '125px', paddingY: 1.5, paddingX: 3 }}>Serial No.</TableHeadCell>
                <TableHeadCell sx={{ width: '367px', paddingY: 1.5, paddingX: 3 }}>Asset</TableHeadCell>
                <TableHeadCell sx={{ width: '92px', paddingY: 1.5, paddingX: 3 }}>Status</TableHeadCell>
                <TableHeadCell sx={{ width: '120px', paddingY: 1.5, paddingX: 3 }}>Blockchain</TableHeadCell>
                <TableHeadCell sx={{ width: '199px', paddingY: 1.5, paddingX: 3 }}>Token ID</TableHeadCell>
                <TableHeadCell sx={{ width: '196px', paddingY: 1.5, paddingX: 3 }}>Owner Address</TableHeadCell>
                <TableHeadCell sx={{ width: '146px' }}> </TableHeadCell>
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
                  <TableRow
                    key={assetTokenId}
                    sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
                  >
                    <TableCell sx={{ paddingY: 1.75, paddingX: 3, border: 'none' }}>
                      <CustomLink onClick={onAssetClick} sx={{ cursor: 'pointer' }}>
                        {assetSerial}
                      </CustomLink>
                    </TableCell>

                    <TableCell sx={{ display: 'flex', alignItems: 'center', paddingX: 3, border: 'none' }}>
                      <img
                        src={row.assetName.indexOf('TEST') > -1 ? GoldBar : row.imageUrl}
                        width="36"
                        height="36"
                        alt="."
                      />
                      <Typography variant="body2" color="grey.900">
                        {row.assetName}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ paddingY: 1.75, paddingX: 4.5, border: 'none' }}>
                      <Tooltip title={message} placement="top">
                        <img src={row.status === 'ok' ? IconCheck : IconInfo} alt="." />
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, color: 'grey.600', border: 'none' }}>
                      {location ? location.name : 'Zippienet'}
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none' }}>
                      {location.contract
                        ? `${location.contract.substring(0, 4)}...${location.contract.substring(10, 30)}`
                        : `${location.tokenId.substring(0, 4)}...${location.tokenId.substring(10, 30)}`}
                    </TableCell>

                    <TableCell sx={{ paddingX: 3, border: 'none' }}>
                      {`${location.ownerAccount.substring(0, 4)}...${location.ownerAccount.substring(10, 30)}`}
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
  )
}

const AssetTab = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  if (isLoading || !selectedDataSet) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div>
  }
  const { assets } = selectedDataSet

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

            <SectionWrapper>
              <Typography variant="body2" color="grey.600" mb={1}>
                Total change
              </Typography>
              <Typography
                variant="body1"
                color="grey.900"
                mr={0.75}
                sx={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.27 }}
              >
                0
              </Typography>
            </SectionWrapper>

            <SectionWrapper>
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
                <Typography
                  variant="body1"
                  color="grey.900"
                  sx={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.5 }}
                >
                  TOSI
                </Typography>
              </Box>
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
              Showing {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} out of {assets.length} individual assets
            </Typography>
          </Box>
        </Box>

        <IndividualAssetTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          assets={assets}
        />
      </Box>
    </>
  )
}

export default () => <AssetTab />
