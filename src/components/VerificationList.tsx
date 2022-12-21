import React, { useEffect, useState } from 'react'
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

import { useDataSetContext } from '../hooks/useDataset'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

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
  const { datasets } = useDataSetContext()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()

  const navigate = useNavigate()

  const OnClickToDataset = (available: boolean, id: string) => (available ? navigate(`/dataset/${id}`) : false)

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
          <TableBody>
            {Object.keys(datasets).map((asset: any, index: any) => (
              <TableRow key={asset.id}>
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
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {datasetOutputs &&
              Object.keys(datasetOutputs).map((assetCid: any) => {
                const asset = datasetOutputs[assetCid]
                const lastVerified = isLoading || !datasetOutputs ? 0 : asset.lastVerified
                const datasetName = asset?.metadata?.name
                const publisher = asset?.metadata?.publisher
                const datasetContract = asset?.metadata?.contract
                const datasetAssetClass = asset?.metadata?.['asset-class']
                const datasetType = asset?.metadata?.['asset-type']
                const date = moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()
                return (
                  <TableBodyRow
                    key={asset.id}
                    onClick={() => {
                      OnClickToDataset(true, asset.id)
                    }}
                  >
                    <TableBodyCell>
                      <Box sx={{ display: 'flex' }}>
                        <img src={asset?.metadata?.image} width="40" height="40" alt="." />

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
    </TableContainer>
  )
}

export default () => <VerificationList />
