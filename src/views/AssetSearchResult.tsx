import React, { useEffect } from 'react'
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom'

import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Link,
  Tooltip,
  Box,
} from '@mui/material'

import { TableHeadCell, TableBodyCell, TableBodyRow, CustomLink, ContainerWithoutData } from '../components/TableStyles'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'
import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'
import { formatTimeStamp } from '../utils/timestapFormater'
import { isValidUrl } from '../utils/helper'

const EthLocation = {
  'Ethereum Mainet': 'https://opensea.io/assets/ethereum',
  Ethereum: 'https://opensea.io/assets/ethereum',
  ethereum: 'https://opensea.io/assets/ethereum',
  'Ethereum Goerli': 'https://testnets.opensea.io/assets/goerli',
}

const TrustLessIndexingCID = 'bafybeih6h347f6iqvue6lfcxpjw2iqwnyulg2n2wtskyw2ioj4y6olqogu'

// TO BE refactored!!!

const AssetSearchResult = () => {
  const { encoded } = useParams()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()
  const { TLIDataSet, setTLIQuery } = useTrustlessIndexingContext()

  const navigate = useNavigate()
  const searchValue = decodeURIComponent(encoded || '')

  const assetContract = searchValue?.split('/').slice(-2, -1)[0]
  // eslint-disable-next-line no-unsafe-optional-chaining
  const assetTokenId = searchValue?.substring(searchValue?.lastIndexOf('/') + 1)
  // search by name and find the dataset
  const onClickToDataset = (id: string) => navigate(`/dataset/${id}`)
  const Datasets = Object.values(datasetOutputs)
  const datasets = Datasets.filter((object) =>
    object.metadata?.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  )

  // search by url
  useEffect(() => setTLIQuery({ assetContract, assetTokenId }), [assetContract, assetTokenId])
  if (!datasetOutputs || isLoading) {
    return (
      <ContainerWithoutData>
        <Typography variant="body2" sx={{ fontSize: '20px' }}>
          Loading...
        </Typography>
      </ContainerWithoutData>
    )
  }
  const lenthToken = TLIDataSet?.token.id.length as number
  const tokenRef =
    lenthToken > 12 ? `${TLIDataSet?.token.id.slice(0, 6)}...${TLIDataSet?.token.id.slice(-4)}` : TLIDataSet?.token.id
  const datasetId = Object.keys(datasetOutputs).find((id) => {
    const { assets } = datasetOutputs[id]
    return assets.some(
      ({ locations }) =>
        locations[0].contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
        locations[0].tokenId === assetTokenId,
    )
  })

  if ((!assetContract || !assetTokenId || !datasetId) && !TLIDataSet && !datasets.length) {
    return (
      <ContainerWithoutData>
        <Typography variant="body2" sx={{ fontSize: '20px' }}>
          Not found
        </Typography>
      </ContainerWithoutData>
    )
  }

  const assets = datasetId ? datasetOutputs[datasetId].assets : []
  const filtered = assets
    ? assets.filter(
        ({ locations }) =>
          locations[0].contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
          locations[0].tokenId === assetTokenId,
      )
    : []

  const verifiedId = Object.keys(datasetOutputs).find((id) => {
    const { assets } = datasetOutputs[id]

    return assets.some(
      (asset) =>
        asset.currentLocation === 'Verra Registry Database' &&
        asset.serialNumberStart &&
        assetTokenId &&
        asset.serialNumberEnd &&
        Number(asset.serialNumberStart) <= Number(assetTokenId) &&
        Number(asset.serialNumberEnd) >= Number(assetTokenId),
    )
  })

  const verifiedAssets = verifiedId ? datasetOutputs[verifiedId].assets : []
  const verified = verifiedAssets
    ? verifiedAssets.filter(
        (asset) =>
          asset.currentLocation === 'Verra Registry Database' &&
          asset.serialNumberStart &&
          assetTokenId &&
          asset.serialNumberEnd &&
          Number(asset.serialNumberStart) <= Number(assetTokenId) &&
          Number(asset.serialNumberEnd) >= Number(assetTokenId),
      )
    : []

  const hovermessage = 'Verified successfully'

  return filtered.length === 0 && !TLIDataSet && !datasets ? (
    <ContainerWithoutData>
      <Typography variant="body2" sx={{ fontSize: '20px' }}>
        No data
      </Typography>
    </ContainerWithoutData>
  ) : (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xl: '1280px' },
        margin: '0 auto',
        marginBottom: '32px',
        paddingX: { xs: 0 },
        width: '100%',
      }}
    >
      <Typography variant="h6" color="grey.900" mt={5.5} mb={4} sx={{ fontWeight: 600 }}>
        Search Results
      </Typography>
      {isValidUrl(searchValue) === true ? (
        <Box>
          {' '}
          {filtered.length > 0 ||
            (TLIDataSet && (
              <TableContainer sx={{ mb: '160px' }}>
                <Table sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
                  <TableHead sx={{ backgroundColor: 'grey.50' }}>
                    <TableRow sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}>
                      <TableHeadCell sx={{ width: '140px' }}>Serial No.</TableHeadCell>
                      <TableHeadCell sx={{ width: '300px' }}>Asset</TableHeadCell>
                      <TableHeadCell sx={{ textAlign: 'center' }}>Status</TableHeadCell>
                      <TableHeadCell>Blockchain</TableHeadCell>
                      <TableHeadCell>Contract</TableHeadCell>
                      <TableHeadCell>Token Ref.</TableHeadCell>
                      <TableHeadCell>Owner Address</TableHeadCell>
                      <TableHeadCell sx={{ width: '197px' }}>Dataset</TableHeadCell>
                      <TableHeadCell sx={{ width: '82px' }}> </TableHeadCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtered.map((asset: any) => (
                      <TableRow
                        key={asset.assetNumber}
                        sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
                      >
                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/single-asset/${datasetId}/${assetContract}/${assetTokenId}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {asset.assetNumber}
                          </Link>
                        </TableBodyCell>

                        <TableBodyCell sx={{ display: 'flex', alignItems: 'center', color: 'grey.900' }}>
                          <img
                            src={asset.imageUrl}
                            style={{ width: '32px', height: '32px', marginRight: '12px' }}
                            alt="."
                          />
                          {asset.assetName}
                        </TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Tooltip title={asset.status === 'ok' ? hovermessage : asset.failedReason} placement="top">
                            <img src={asset.status ? IconCheck : IconInfo} alt="." />
                          </Tooltip>
                        </TableBodyCell>

                        <TableBodyCell>{asset.locations[0].name}</TableBodyCell>

                        <TableBodyCell>
                          <CustomLink
                            // @ts-ignore
                            href={`${EthLocation[asset.locations[0].name]}/${asset.locations[0].contract}/${
                              asset.locations[0].tokenId || asset.locations[0].tokenId
                            }`}
                            target="_blank"
                            rel="noreferrer nofollow"
                          >
                            {`${asset.locations[0].contract?.slice(0, 6)}...${asset.locations[0].contract?.slice(
                              asset.locations[0].contract.length - 4,
                            )}`}
                          </CustomLink>
                        </TableBodyCell>

                        <TableBodyCell>{asset?.locations[0].tokenId}</TableBodyCell>

                        <TableBodyCell>
                          {`${asset.locations[0].ownerAccount.slice(0, 6)}...${asset.locations[0].ownerAccount.slice(
                            asset.locations[0].ownerAccount.length - 4,
                          )}`}
                        </TableBodyCell>

                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/dataset/${datasetId}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {datasetId ? datasetOutputs[datasetId].metadata?.name : ''}
                          </Link>
                        </TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Link
                            component={RouterLink}
                            to={`/single-asset/${datasetId}/${assetContract}/${assetTokenId}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Details
                          </Link>
                        </TableBodyCell>
                      </TableRow>
                    ))}
                    {TLIDataSet && (
                      <TableRow
                        key={TLIDataSet.token.id}
                        sx={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'grey.200' }}
                      >
                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/single-asset-nft/${TrustLessIndexingCID}/${TLIDataSet.contract.address}/${TLIDataSet.token.id}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            1
                          </Link>
                        </TableBodyCell>

                        <TableBodyCell sx={{ display: 'flex', alignItems: 'center', color: 'grey.900' }}>
                          <img
                            src={TLIDataSet.token.metadata.image}
                            style={{ width: '32px', height: '32px', marginRight: '12px' }}
                            alt="."
                          />
                          {TLIDataSet.token.metadata.name}
                        </TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Asset not verified" placement="top">
                            <img src={IconInfo} alt="." />
                          </Tooltip>
                        </TableBodyCell>

                        <TableBodyCell>Ethereum Mainnet</TableBodyCell>

                        <TableBodyCell>
                          <CustomLink
                            // @ts-ignore
                            href={`${EthLocation['Ethereum Mainet']}/${TLIDataSet.contract.address}/${TLIDataSet.token.id}`}
                            target="_blank"
                            rel="noreferrer nofollow"
                          >
                            {`${TLIDataSet.contract.address.slice(0, 6)}...${TLIDataSet.contract.address.slice(
                              TLIDataSet.contract.address.length - 4,
                            )}`}
                          </CustomLink>
                        </TableBodyCell>

                        <TableBodyCell>{tokenRef}</TableBodyCell>

                        <TableBodyCell>
                          {TLIDataSet.token.owner
                            ? `${TLIDataSet.token.owner.slice(0, 6)}...${TLIDataSet.token.owner.slice(
                                TLIDataSet.token.owner.length - 4,
                              )}`
                            : '-'}
                        </TableBodyCell>

                        <TableBodyCell>Trustless Ethereum NFT</TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Link
                            component={RouterLink}
                            to={`/single-asset-nft/${TrustLessIndexingCID}/${TLIDataSet.contract.address}/${TLIDataSet.token.id}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Details
                          </Link>
                        </TableBodyCell>
                      </TableRow>
                    )}
                    {verified.map((asset: any) => (
                      <TableRow key={asset.serialNumberStart}>
                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/single-asset-with-tabs/${verifiedId}/${asset.assetNumber}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {asset.assetNumber
                              ? `${asset.assetNumber.slice(0, 4)}...${asset.assetNumber.slice(
                                  asset.assetNumber.length - 5,
                                )}`
                              : ''}
                          </Link>
                        </TableBodyCell>

                        <TableBodyCell sx={{ color: 'grey.900', borderBottom: 'none' }}>
                          {asset.locations[0].name}
                        </TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Tooltip title="Asset verified" placement="top">
                            <img src={IconCheck} alt="." />
                          </Tooltip>
                        </TableBodyCell>

                        <TableBodyCell>Verra Registry Database</TableBodyCell>

                        <TableBodyCell>
                          {`${asset.locations[0].contract.slice(0, 6)}...${asset.locations[0].contract.slice(
                            asset.locations[0].contract.length - 4,
                          )}`}
                        </TableBodyCell>

                        <TableBodyCell> - </TableBodyCell>

                        <TableBodyCell> - </TableBodyCell>

                        <TableBodyCell>
                          <Link
                            component={RouterLink}
                            to={`/dataset/${verifiedId}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Verra Carbon Registry
                          </Link>
                        </TableBodyCell>

                        <TableBodyCell sx={{ textAlign: 'center' }}>
                          <Link
                            component={RouterLink}
                            to={`/single-asset-with-tabs/${verifiedId}/${asset.assetNumber}`}
                            sx={{
                              color: 'primary.600',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Details
                          </Link>
                        </TableBodyCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </Box>
      ) : (
        <Box>
          {' '}
          {datasets && (
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

                <TableBody>
                  {datasets.map((dataset: any) => (
                    <TableBodyRow
                      key={dataset?.id}
                      onClick={() => {
                        onClickToDataset(dataset?.id)
                      }}
                    >
                      <TableBodyCell>
                        <Box sx={{ display: 'flex' }}>
                          <img src={dataset?.metadata?.image} width="40" height="40" alt="." />

                          <Box ml={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" color="grey.900" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                              {dataset?.metadata?.name}
                            </Typography>
                            <Typography variant="caption" color="primary.600" sx={{ lineHeight: 1.5 }}>
                              {`${dataset?.metadata?.contract?.slice(0, 10)}...${dataset?.metadata?.contract?.slice(
                                -10,
                              )}`}
                            </Typography>
                          </Box>
                        </Box>
                      </TableBodyCell>

                      <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>
                        {dataset?.metadata?.['asset-class']}
                      </TableBodyCell>
                      <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>
                        {dataset?.assets.length}
                      </TableBodyCell>

                      <TableBodyCell sx={{ fontSize: '14px', color: 'grey.500' }}>
                        {formatTimeStamp(dataset?.lastVerified)}
                      </TableBodyCell>

                      <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                        {dataset?.metadata?.publisher || '-'}
                        {dataset?.metadata?.publisher && (
                          <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                        )}{' '}
                      </TableBodyCell>

                      <TableBodyCell sx={{ fontSize: '14px', color: 'grey.900' }}>
                        {dataset?.metadata?.publisher || '-'}
                        {dataset?.metadata?.publisher && (
                          <IconVerifiedTick style={{ marginLeft: '6px', width: '12px', height: '12px' }} />
                        )}{' '}
                      </TableBodyCell>
                    </TableBodyRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Container>
  )
}

export default () => <AssetSearchResult />
