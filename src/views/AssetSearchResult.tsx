import React from 'react'
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

import IconCheck from '../assets/images/icon-check.svg'
import IconInfo from '../assets/images/icon-info.svg'

const EthLocation = {
  'Ethereum Mainet': 'https://opensea.io/assets/ethereum',
  Ethereum: 'https://opensea.io/assets/ethereum',
  ethereum: 'https://opensea.io/assets/ethereum',
  'Ethereum Goerli': 'https://testnets.opensea.io/assets/goerli',
}

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
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.200',
}))

const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

const AssetSearchResult = () => {
  const { assetContract, assetTokenId } = useParams()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()

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

  if (!assetContract || !assetTokenId || !datasetId) {
    return (
      <ContainerWithoutData>
        <Typography variant="body2" sx={{ fontSize: '20px' }}>
          Not found
        </Typography>
      </ContainerWithoutData>
    )
  }

  const { assets } = datasetOutputs[datasetId]

  const filtered = assets.filter(
    ({ locations }) =>
      locations[0].contract?.toLocaleLowerCase() === assetContract.toLocaleLowerCase() &&
      locations[0].tokenId === assetTokenId,
  )

  if (!assetContract || !assetTokenId) {
    return (
      <ContainerWithoutData>
        <Typography variant="body2" sx={{ fontSize: '20px' }}>
          Not found
        </Typography>
      </ContainerWithoutData>
    )
  }

  const hovermessage = 'Verified successfully'

  return filtered.length === 0 ? (
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
            <TableRow>
              <TableHeadCell>Serial No.</TableHeadCell>
              <TableHeadCell>Asset</TableHeadCell>
              <TableHeadCell sx={{ textAlign: 'center' }}>Status</TableHeadCell>
              <TableHeadCell>Blockchain</TableHeadCell>
              <TableHeadCell>Contract</TableHeadCell>
              <TableHeadCell>Token ID</TableHeadCell>
              <TableHeadCell>Owner Address</TableHeadCell>
              <TableHeadCell> </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((asset) => (
              <TableRow key={asset.assetNumber}>
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
                    {`${asset.locations[0].contract?.slice(0, 4)}...${asset.locations[0].contract?.slice(
                      asset.locations[0].contract.length - 4,
                    )}`}
                  </CustomLink>
                </TableBodyCell>

                <TableBodyCell>{asset?.locations[0].tokenId}</TableBodyCell>

                <TableBodyCell>
                  {`${asset.locations[0].ownerAccount.slice(0, 4)}...${asset.locations[0].ownerAccount.slice(
                    asset.locations[0].ownerAccount.length - 4,
                  )}`}
                </TableBodyCell>

                <TableBodyCell sx={{ textAlign: 'center' }}>
                  <Link
                    component={RouterLink}
                    to={`/dataset/${datasetId}`}
                    sx={{
                      color: 'primary.600',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    View Dataset
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
