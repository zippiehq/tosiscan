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
import { useDataSetContextDynamic } from '../hooks/useDatasetDynamic'
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
  const { datasetsDynamic } = useDataSetContextDynamic()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()

  const navigate = useNavigate()

  const OnClickToDataset = (available: boolean, id: string) => (available ? navigate(`/dataset/${id}`) : false)

  return (
    <TableContainer sx={{ mb: '160px' }}>
      <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
        <TableHead sx={{ backgroundColor: 'grey.50' }}>
          <TableRow>
            <TableHeadCell>Dataset</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Asset Class</TableHeadCell>
            <TableHeadCell>Last verified</TableHeadCell>
            <TableHeadCell>Publisher</TableHeadCell>
            <TableHeadCell>Issuer/s</TableHeadCell>
          </TableRow>
        </TableHead>

        {isLoading ? (
          <TableBody>
            {datasets.map((asset: any, index: any) =>
              index < 3 ? (
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
              ) : (
                ''
              ),
            )}
          </TableBody>
        ) : (
          <TableBody>
            {datasets.map((asset: any) => {
              const lastVerified = isLoading || !datasetOutputs ? 0 : datasetOutputs[asset.id]?.lastVerified
              let datasetName = datasetOutputs?.[asset.id]?.metadata?.name
              let datasetContract = datasetOutputs?.[asset.id]?.metadata?.contract
              let datasetAssetClass = datasetOutputs?.[asset.id]?.metadata?.['asset-class']
              let datasetType = datasetOutputs?.[asset.id]?.metadata?.['asset-type']
              let date = moment(moment.unix(lastVerified).utc().format('DD MMM YYYY HH:mm:ss [UTC]')).fromNow()
              const { publisher } = asset

              switch (datasetName) {
                case 'Carbon Credit Futures':
                  datasetName = datasetsDynamic[0].metadata ? datasetsDynamic[0].metadata.name : ''
                  datasetContract = datasetsDynamic[0].metadata ? datasetsDynamic[0].metadata.contract : ''
                  datasetType = datasetsDynamic[0].metadata ? datasetsDynamic[0].metadata['asset-type'] : ''
                  datasetAssetClass = datasetsDynamic[0].metadata ? datasetsDynamic[0].metadata['asset-class'] : ''
                  date = moment(datasetsDynamic[0].updatedAt).fromNow()
                  break
                case 'Nguru Satellite Image':
                  datasetName = datasetsDynamic[1].metadata ? datasetsDynamic[1].metadata.name : ''
                  datasetContract = datasetsDynamic[1].metadata ? datasetsDynamic[1].metadata.contract : ''
                  datasetType = datasetsDynamic[1].metadata ? datasetsDynamic[1].metadata['asset-type'] : ''
                  datasetAssetClass = datasetsDynamic[1].metadata ? datasetsDynamic[1].metadata['asset-class'] : ''
                  date = moment(datasetsDynamic[1].updatedAt).fromNow()
                  break
                default:
              }

              return (
                <TableBodyRow
                  key={asset.id}
                  className={asset.available ? '' : 'disabled'}
                  onClick={() => {
                    OnClickToDataset(asset.available, asset.id)
                  }}
                >
                  <TableBodyCell>
                    <Box sx={{ display: 'flex' }}>
                      <img src={asset.image} width="40" height="40" alt="." />

                      <Box ml={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" color="grey.900" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                          {datasetName}
                        </Typography>
                        <Typography variant="caption" color="primary.600" sx={{ lineHeight: 1.5 }}>
                          {`${datasetContract?.slice(0, 10)}...${datasetContract?.slice(-10)}`}
                        </Typography>
                        {!asset.available ? (
                          <Typography
                            sx={{
                              alignSelf: 'flex-start',
                              marginTop: '8px',
                              paddingY: 0.3,
                              paddingX: 1.25,
                              fontSize: '11px',
                              border: '1px solid #667085',
                              borderRadius: '100px',
                            }}
                          >
                            {asset.status}
                          </Typography>
                        ) : (
                          ''
                        )}
                      </Box>
                    </Box>
                  </TableBodyCell>

                  <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{datasetType}</TableBodyCell>

                  <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{datasetAssetClass}</TableBodyCell>

                  <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>{date}</TableBodyCell>

                  <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                    {publisher.name}
                    <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                  </TableBodyCell>

                  <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                    {asset.issuers}
                    <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
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
