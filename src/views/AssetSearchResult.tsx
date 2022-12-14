import React, { useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/system'

import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { useTrustlessIndexingContext } from '../hooks/useTrustlessIndexing'
import { useDataSetContext } from '../hooks/useDataset'

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

const EthLocation = {
  'Ethereum Mainet': 'https://opensea.io/assets/ethereum',
  Ethereum: 'https://opensea.io/assets/ethereum',
  ethereum: 'https://opensea.io/assets/ethereum',
  'Ethereum Goerli': 'https://testnets.opensea.io/assets/goerli',
}

const TrustLessIndexingCID = 'bafybeih6h347f6iqvue6lfcxpjw2iqwnyulg2n2wtskyw2ioj4y6olqogu'

const ContainerWithoutData = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1280px',
  },
  paddingTop: '120px',
  paddingRight: 0,
  paddingBottom: '120px',
  paddingLeft: 0,
}))

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

const TableBodyCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.8),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1.8),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.43,
  textAlign: 'left',
  color: theme.palette.grey['600'],
  border: 'none',
}))

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const AssetSearchResult = () => {
  const { assetContract, assetTokenId } = useParams()
  const { datasets } = useDataSetContext()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()
  const { TLIDataSet, setTLIQuery } = useTrustlessIndexingContext()
  const lenthToken = TLIDataSet?.token.id.length as number
  const tokenRef =
    lenthToken > 12 ? `${TLIDataSet?.token.id.slice(0, 6)}...${TLIDataSet?.token.id.slice(-4)}` : TLIDataSet?.token.id

  useEffect(() => setTLIQuery({ assetContract, assetTokenId }), [assetContract, assetTokenId, setTLIQuery])

  if (!datasetOutputs || isLoading) {
    return (
      <ContainerWithoutData>
        <Typography variant="body2" sx={{ fontSize: '20px' }}>
          Loading...
        </Typography>
      </ContainerWithoutData>
    )
  }

  const datasetId = Object.keys(datasetOutputs).find((id) => {
    const { assets } = datasetOutputs[id]
    return assets.some(
      ({ locations }) =>
        locations[0].contract?.toLocaleLowerCase() === assetContract?.toLocaleLowerCase() &&
        locations[0].tokenId === assetTokenId,
    )
  })

  const datasetIndex: any = Object.keys(datasets).find((item: any) =>
    datasets[item].id === datasetId ? datasets[item].id : '',
  )

  if (!assetContract || !assetTokenId || (!datasetId && !TLIDataSet)) {
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
          locations[0].contract?.toLocaleLowerCase() === assetContract.toLocaleLowerCase() &&
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
        asset.serialNumberStart <= assetTokenId &&
        asset.serialNumberEnd >= assetTokenId,
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
          asset.serialNumberStart <= assetTokenId &&
          asset.serialNumberEnd >= assetTokenId,
      )
    : []

  const hovermessage = 'Verified successfully'

  return filtered.length === 0 && !TLIDataSet ? (
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
                  <img src={asset.imageUrl} style={{ width: '32px', height: '32px', marginRight: '12px' }} alt="." />
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
                      ? `${asset.assetNumber.slice(0, 4)}...${asset.assetNumber.slice(asset.assetNumber.length - 5)}`
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
    </Container>
  )
}

export default () => <AssetSearchResult />
