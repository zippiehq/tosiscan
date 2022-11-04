import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Typography,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from '@mui/material/'

import './AssetSearchResult.css'

import { useDataSetAssetsContext } from '../../hooks/useDatachainOutput'

import { check, info } from '../../assets'

const EthLocation = {
  'Ethereum Mainet': 'https://opensea.io/assets/ethereum',
  Ethereum: 'https://opensea.io/assets/ethereum',
  ethereum: 'https://opensea.io/assets/ethereum',
  'Ethereum Goerli': 'https://testnets.opensea.io/assets/goerli',
}
const AssetDetails = () => {
  const { assetContract, assetTokenId } = useParams()
  const { isLoading, datasetOutputs } = useDataSetAssetsContext()
  const navigate = useNavigate()

  if (!datasetOutputs || isLoading) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div>
  }
  const datasetId = Object.keys(datasetOutputs).find((id) => {
    const { assets } = datasetOutputs[id]
    return assets.some(
      ({ locations }) =>
        locations[0].contract?.toLocaleLowerCase() === assetContract &&
        // @ts-ignore
        (locations[0].tokenId === assetTokenId || locations[0].tokenID === assetTokenId),
    )
  })

  if (!assetContract || !assetTokenId || !datasetId) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Not found</div>
  }

  const { assets } = datasetOutputs[datasetId]

  const filtered = assets.filter(
    ({ locations }) =>
      locations[0].contract?.toLocaleLowerCase() === assetContract.toLocaleLowerCase() &&
      // @ts-ignore
      (locations[0].tokenId === assetTokenId || locations[0].tokenID === assetTokenId),
  )

  if (!assetContract || !assetTokenId) {
    return <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Not found</div>
  }
  const hovermessage = 'Verified successfully'
  // const message = asset.status === 'ok' ? hovermessage : asset.failedReason
  return filtered.length === 0 ? (
    <div style={{ margin: '100px 50px', fontSize: '20px' }}>No data</div>
  ) : (
    <Box
      className="asset-tab-overiew"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1300px',
        margin: '0 auto',
        marginBottom: '32px',
        width: '100%',
      }}
    >
      <Typography color="textPrimary" fontSize="24px" mt="32px" fontWeight={500} mb={3.5}>
        Search Results
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Contract</TableCell>
              <TableCell>Token ID</TableCell>
              <TableCell>Owner Address</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((asset) => (
              <TableRow key={asset.assetNumber}>
                <TableCell>
                  <a
                    onClick={() => {
                      navigate(`/single-asset/${datasetId}/${assetContract}/${assetTokenId}`)
                    }}
                    style={{ color: '#07939C', textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {asset.assetNumber}
                  </a>
                </TableCell>

                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>
                    <img
                      src={asset.imageUrl}
                      className="avatar"
                      width="40px"
                      height="40px"
                      style={{ marginRight: '12px' }}
                      alt="."
                    />
                  </span>
                  {asset.assetName}
                </TableCell>

                <TableCell>
                  <Tooltip title={asset.status === 'ok' ? hovermessage : asset.failedReason} placement="top">
                    <img src={asset.status === 'ok' ? check : info} alt="check icon" />
                  </Tooltip>
                </TableCell>

                <TableCell>{asset.locations[0].name}</TableCell>

                <TableCell>
                  <a
                    // @ts-ignore
                    href={`${EthLocation[asset.locations[0].name]}/${asset.locations[0].contract}/${
                      // @ts-ignore
                      asset.locations[0].tokenId || asset.locations[0].tokenID
                    }`}
                    style={{ color: '#07939C', textDecoration: 'none' }}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    {`${asset.locations[0].contract?.slice(0, 4)}...${asset.locations[0].contract?.slice(
                      asset.locations[0].contract.length - 4,
                    )}`}
                  </a>
                </TableCell>

                <TableCell>{asset?.locations[0].tokenId}</TableCell>

                <TableCell>
                  {`${asset.locations[0].ownerAccount.slice(0, 4)}...${asset.locations[0].ownerAccount.slice(
                    asset.locations[0].ownerAccount.length - 4,
                  )}`}
                </TableCell>

                <TableCell>
                  <Link
                    to={`/asset/${datasetId}`}
                    style={{
                      color: '#07939C',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    View Dataset
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default () => <AssetDetails />
