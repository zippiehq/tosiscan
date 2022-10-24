import React, {useContext, useEffect, useState} from 'react'
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
  Tooltip
} from '@mui/material'

import { buttonGroup, check, info, searchIcon } from '../../assets'
import image from '../../assets/Lohko.svg'

import { useDatachainOutput } from '../../hooks/useDatachainOutput'
import { IDataset } from '../../interfaces/Dataset.interface'
import { DatasetContext } from '../../context/DatasetContext'
import { get } from '../../adapters/axios'
import unzip from '../../utils/unzip'

interface AssetsGold {
  tokenId?: string
  product?: string
  ownerName?: string
  ownerAccount?: string
  serial?: string
  imageUrl?: string
  location?: {
    name?: string
    contract?: string
    tokenId?: string
    ownerAccount?: string
  },
  status?: string
}

interface AssetsCredit {
  assetNumber?: string
  assetName?: string
  imageUrl?: string
  currentLocation?: string
  location?: [{
    name?: string
    contract?: string
    tokenId?: string
    ownerAccount?: string
  }],
  status?: string
}

export default function AssetTab() {
  const [isLoading, setLoading] = useState(true)
  const [assetsGold, setAssetsGold] = useState<AssetsGold[]>()
  const [assetsCredit, setAssetsCredit] = useState<AssetsCredit[]>()
  const [items, setItems] = useState()
  const [uniqueItems, setUniqueItems] = useState()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)



  /*const { assets, isLoading: fetchingAsset } = useDatachainOutput()*/

  /*const { id } = useParams()
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)
  const asset = dataset?.find((item) => item.id === id)*/

  /*const { assets, isLoading } = useDatachainOutput()
  const items = assets?.map((asset) => asset.product)
  let uniqueItems: any = new Set(items)
  uniqueItems = Array.from(uniqueItems)*/

  const navigate = useNavigate()

  const { id } = useParams()
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)

  const [asset, setAsset] = useState<any>()

  async function fetchAssets(assetId: string) {
    setLoading(true)
    const sealResponse = assetId === '0x80bf3a24' ? await get(
      '/tosi/api/v1/query-seal/bafyreiccffzwpigoyg7fhskwxbchby7xtns33rm7rkw6dkb6h4ax2m4vbe',
      'json'
    ) : await get(
      '/tosi/api/v1/query-seal/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa',
      'json'
    )

    const { data } = await get(
      '/tosi/api/v0/ipfs/get/' + sealResponse.data.status + '/output.zip',
      'blob'
    )

    let res: any = await unzip(data, 'assets.json')

    assetId === '0x80bf3a24' ? setAssetsCredit(res) : setAssetsGold(res)
    /*console.log(assetsGold)
    console.log(assetsCredit)*/
    setLoading(false)
  }

  const getItems = (assets: any) => {
    let items = (asset?.id === '0x80bf3a24') ?
      assets?.map((asset: any) => asset.assetName) :
      assets?.map((asset: any) => asset.product)

    setItems(items)
    return items
  }

  const getUniqueAssets = (assetId: string) => {
    const items = (assetId === '0x80bf3a24') ? getItems(assetsCredit) : getItems(assetsGold)
    /*console.log(items)*/
    let uniqueItems: any = new Set(items)
    uniqueItems = Array.from(uniqueItems)
    setUniqueItems(uniqueItems)
  }

  useEffect(() => {
    if (!asset || !id) return
    const assetDetails = dataset?.find((item) => item.id === id)
    setAsset(assetDetails)

    if (!assetDetails) return
    fetchAssets(assetDetails.id)
    getUniqueAssets(assetDetails.id)
  }, [asset, id, dataset])


  /*console.log(assetsCredit)*/

  return isLoading ?
    <div style={{ margin: '100px 50px', fontSize: '20px1' }}>Loading...</div> : (
    <div className='asset-tab'>
      <div className='asset-tab-overiew'>
        <div className='col-1'>
          <Typography component='h3' my={0} sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}>
            Assets
          </Typography>

          <AssetTable assets={items} items={uniqueItems} />
        </div>

        <div className='col-2'>
          <div className='stats total-assets'>
            <h5>Total assets</h5>
            <h4>{asset?.id === '0x80bf3a24' ? assetsCredit?.length : assetsGold?.length}</h4>
          </div>
          <div className='stats total-assets'>
            <h5>Total change</h5>
            <h4>0</h4>
          </div>
          <div className='stats total-assets'>
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

      <div className='individual-assets'>
        <div className='header'>
          <div className='text'>
            <Typography component='h3' my={0} sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.5, color: '#101828' }}>
              Individual assets
            </Typography>

            <p>
              Showing {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} out
              of {asset?.id === '0x80bf3a24' ? assetsCredit?.length : assetsGold?.length} individual assets
            </p>
          </div>

          {asset?.id === '0x80bf3a24' ?
              '' :
              <div className='search'>
                <div className='search-box'>
                  <img className='search-icon' src={searchIcon} alt='Search Icon' />
                  <input placeholder='Search assets...' />
                </div>

                <img src={buttonGroup} alt='search placeholder' style={{ marginLeft: '16px' }} />
              </div>
          }
        </div>
        <IndividualAssetTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          assets={asset?.id === '0x80bf3a24' ? assetsCredit : assetsGold}
        />
      </div>
    </div>
  );
}

function AssetTable({ assets , items }: { assets: any; items: any }) {

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
            {items.map((row: any, index: number) => {
              /*console.log(items)
              console.log(assets)*/

              return (
                <TableRow key={index}>
                  <TableCell>{row}</TableCell>
                  <TableCell>
                    {assets?.filter((item: any) => item === row).length}
                  </TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function IndividualAssetTable({
  assets,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  assets: any;
  page: number;
  setPage: any;
  rowsPerPage: any;
  setRowsPerPage: any;
}) {
  const navigate = useNavigate();

  const { id } = useParams()
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)
  const asset = dataset?.find((item) => item.id === id)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ marginTop: '16px' }}>
      {asset?.id === '0x80bf3a24' ?
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
                {assets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    const assetContract = row.locations?.contract
                    const assetTokenId = row.locations?.tokenId
                    const assetSerial = row.assetNumber

                    /*console.log(row.location[0]?.ownerAccount)*/
                    /*console.log(row.locations[0].ownerAccount)*/

                    const onAssetClick = () => {
                      if (assetContract && assetTokenId) {
                        navigate(`/single-asset/${assetContract}/${assetTokenId}`)
                      } else {
                        navigate(`/single-asset/${assetSerial}`)
                      }
                    }

                    return (
                      <TableRow sx={{ cursor: 'none' }} key={index}>
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
                          <img src={row.imageUrl} width='32px' height='32px' alt='lohko' style={{ marginRight: '12px' }} />
                          <Box>
                            <Typography>
                              {row.assetName}
                            </Typography>

                            <Typography>
                              {}
                            </Typography>
                          </Box>

                        </TableCell>

                        <TableCell>
                            <img src={row.status === 'ok' ? check : info} alt='.' />
                        </TableCell>

                        <TableCell
                          sx={{ cursor: 'text', textTransform: 'capitalize' }}
                        >
                         {/* {row.locations.name}*/}
                        </TableCell>
                        <TableCell sx={{ cursor: 'text' }}>
                          {/*{row.location
                            ? `${row.location.contract}/${row.location.tokenId}`
                            : `${row.tokenId.substring(
                              0,
                              4
                            )}...${row.tokenId.substring(10, 30)}`}*/}
                        </TableCell>
                        <TableCell sx={{ cursor: 'text' }}>
                          0x0B2Dd6A1A0Cf479379737eAd4D28F6A61fabFC00
                          {/*{row.location?.ownerAccount.slice(0, 4) +
                          "..." +
                          row.location?.ownerAccount.slice(row.location?.ownerAccount.length - 4)}*/}
                        </TableCell>

                        <TableCell>
                          {page > 1 ?
                            <a
                              onClick={
                                () => {navigate(`/asset/0x80bf3a23`)}
                              }
                              style={{
                                color: "#07939C",
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                            >
                              Details
                            </a> : ''
                          }
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={assets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
        :
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
                </TableRow>
              </TableHead>
              <TableBody>
                {assets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    const assetContract = row.location?.contract
                    const assetTokenId = row.location?.tokenId
                    const assetSerial = row.serial

                    const onAssetClick = () => {
                      if (assetContract && assetTokenId) {
                        navigate(`/single-asset/${assetContract}/${assetTokenId}`)
                      } else {
                        navigate(`/single-asset/${assetSerial}`)
                      }
                    }

                    return (
                      <TableRow sx={{ cursor: 'none' }} key={index}>
                        <TableCell sx={{ cursor: 'text' }}>
                          <a
                            onClick={onAssetClick}
                            style={{
                              color: '#07939C',
                              textDecoration: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {row.serial}
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
                          className='avatar'
                          src={
                            row.product.indexOf('TEST') > -1
                              ? image
                              : row.imageUrl
                          }
                          alt='lohko'
                        />
                      </span>
                          {row.product}
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title={
                              row.status === 'ok'
                                ? 'Signature match'
                                : 'Signature does not match'
                            }
                            placement='top'
                          >
                            <img
                              src={row.status === 'ok' ? check : info}
                              alt='check icon'
                            />
                          </Tooltip>
                        </TableCell>
                        <TableCell
                          sx={{ cursor: 'text', textTransform: 'capitalize' }}
                        >
                          {row.location ? row.location.name : 'Zippienet'}
                        </TableCell>
                        <TableCell sx={{ cursor: 'text' }}>
                          {row.location
                            ? `${row.location.contract}/${row.location.tokenId}`
                            : `${row.tokenId.substring(
                              0,
                              4
                            )}...${row.tokenId.substring(10, 30)}`}
                        </TableCell>
                        <TableCell sx={{ cursor: 'text' }}>
                          {row.location
                            ? row.location.ownerAccount
                            : row.ownerAccount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={assets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      }
    </div>
  );
}
