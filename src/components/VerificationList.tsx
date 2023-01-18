import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Skeleton,
} from '@mui/material'
import { styled } from '@mui/system'

import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

import Pagination from './Pagination'

import Gray from '../assets/images/Collection-gray.png'

const PageSize = 5

const TableHeadCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.43,
  textAlign: 'left',
  color: theme.palette.grey['500'],
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.200',
}))

const TableBodyRow = styled(TableRow)(() => ({
  cursor: 'pointer',

  '&.disabled': {
    backgroundColor: '#fdfdfd',
    opacity: 0.75,
    cursor: 'default !important',
  },
}))

const TableBodyCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.8),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1.8),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.43,
  textAlign: 'left',
  color: theme.palette.grey['600'],
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.200',
}))

const VerificationList = () => {
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()

  const navigate = useNavigate()

  const OnClickToDataset = (available: boolean, id: string) => (available ? navigate(`/dataset/${id}`) : false)

  const [currentPage, setCurrentPage] = useState(1)

  const slicedDatasets = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize

    const datasets = Object.keys(datasetOutputs).map((assetCid: any) => datasetOutputs[assetCid])

    const sortedByDateDescending = datasets.sort(
      (previousAsset: any, nextAsset: any) => nextAsset.lastVerified - previousAsset.lastVerified,
    )

    if (!isLoading) {
      return sortedByDateDescending.slice(firstPageIndex, lastPageIndex)
    }
  }, [isLoading, currentPage])

  const loadingSkeletonRowLength = 3
  const loadingSkeletonRow = []

  for (let i = 0; i < loadingSkeletonRowLength; i += 1) {
    loadingSkeletonRow.push(
      <TableRow key={i}>
        <TableBodyCell>
          <Skeleton animation="wave" width="350px" />
        </TableBodyCell>
        <TableBodyCell>
          <Skeleton animation="wave" width="110px" />
        </TableBodyCell>
        <TableBodyCell>
          <Skeleton animation="wave" width="110px" />
        </TableBodyCell>
        <TableBodyCell>
          <Skeleton animation="wave" width="110px" />
        </TableBodyCell>
        <TableBodyCell>
          <Skeleton animation="wave" width="110px" />
        </TableBodyCell>
        <TableBodyCell>
          <Skeleton animation="wave" width="190px" />
        </TableBodyCell>
      </TableRow>,
    )
  }

  return (
    <TableContainer sx={{ mb: '160px' }}>
      <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
        <TableHead sx={{ backgroundColor: 'grey.50' }}>
          <TableRow>
            <TableHeadCell>Dataset</TableHeadCell>
            <TableHeadCell>Asset Class</TableHeadCell>
            <TableHeadCell>Assets issued</TableHeadCell>

            <TableHeadCell>Last verified</TableHeadCell>
            <TableHeadCell>Publisher</TableHeadCell>
            <TableHeadCell>Issuer/s</TableHeadCell>
          </TableRow>
        </TableHead>

        {isLoading ? (
          <TableBody>{loadingSkeletonRow}</TableBody>
        ) : (
          <TableBody>
            {slicedDatasets &&
              slicedDatasets.map((asset: any) => {
                const lastVerified = isLoading || !datasetOutputs ? 0 : asset.lastVerified
                const datasetName = asset?.metadata?.name
                const publisher = asset?.metadata?.publisher
                const datasetContract = asset?.metadata?.contract
                const datasetAssetClass = asset?.metadata?.['asset-class']
                const date = moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()
                const image = asset.metadata.image === '' ? Gray : asset.metadata.image
                return (
                  <TableBodyRow
                    key={asset.id}
                    onClick={() => {
                      OnClickToDataset(true, asset.id)
                    }}
                  >
                    <TableBodyCell>
                      <Box sx={{ display: 'flex' }}>
                        <img src={image} width="40" height="40" style={{ borderRadius: '5px' }} alt="." />

                        <Box ml={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="subtitle1" color="grey.900" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                            {datasetName}
                          </Typography>
                          <Typography variant="caption" color="primary.600" sx={{ lineHeight: 1.5 }}>
                            {`${datasetContract?.slice(0, 10)}...${datasetContract?.slice(-10)}`}
                          </Typography>
                        </Box>
                      </Box>
                    </TableBodyCell>

                    <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{datasetAssetClass}</TableBodyCell>
                    <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{asset.assets.length}</TableBodyCell>

                    <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{date}</TableBodyCell>

                    <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                      {publisher || '-'}
                      {publisher && (
                        <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                      )}{' '}
                    </TableBodyCell>

                    <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                      {publisher || '-'}
                      {publisher && (
                        <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                      )}{' '}
                    </TableBodyCell>
                  </TableBodyRow>
                )
              })}
          </TableBody>
        )}
      </Table>
      <Pagination
        currentPage={currentPage}
        totalCount={Object.keys(datasetOutputs).length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </TableContainer>
  )
}

export default () => <VerificationList />
