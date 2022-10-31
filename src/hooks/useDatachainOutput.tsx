import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import constate from 'constate'
import { get } from '../adapters/axios'
import unzip from '../utils/unzip'
import { DatasetContext } from '../context/DatasetContext'
import { IDataset } from '../interfaces/Dataset.interface'

interface ILocation {
  name?: string
  contract?: string
  tokenId: string
  ownerAccount: string
}
export interface Asset {
  tokenId: string
  product: string
  ownerName: string
  ownerAccount: string
  serial: string
  imageUrl: string
  location: ILocation
  locations: ILocation[]
  status: string
}

export interface IFinalAsset {
  assetNumber?: string
  assetName: string
  imageUrl: string
  currentLocation?: string
  locations: ILocation[]
  status: string
}

const getLocations = (data: any): ILocation[] | [] => {
  if (data.locations) return data.locations

  if (data.location) return [data.location]
  if (data.ownerAccount) {
    return [
      {
        ownerAccount: data.ownerAccount,
        tokenId: data.tokenId,
      },
    ]
  }
  return []
}
const getCurrentLocation = (data: any) => {
  if (data.currentLocation) return data.currentLocation

  if (data.location) return data.location.name
}
const formatDataStructure = (data: any): IFinalAsset => ({
  assetNumber: data.assetNumber || data.serial,
  assetName: data.assetName || data.product,
  imageUrl: data.imageUrl,
  currentLocation: getCurrentLocation(data),
  locations: getLocations(data),
  status: data.status,
})
export interface DatachainOutputContextT {
  assets: Asset[]
  isLoading: boolean
  metadata?: MetaData
}
interface MetaData {
  contract: string
  name: string
  ['asset-description']: string
  ['asset-class']: string
  ['main-location']: string
  ['supported-locations']: string[]
}
export const fetchDataSet = async (id: string) => {
  const sealResponse = await get(`/tosi/api/v1/query-seal/${id}`, 'json')
  const path = sealResponse.data.status
  const { data } = await get(`/tosi/api/v0/ipfs/get/${path}/output.zip`, 'blob')
  const [assets, metadata] = await Promise.all([unzip(data, 'assets.json'), unzip(data, 'metadata.json')])

  return { assets, metadata }
}
function useDataSetAssets() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [assets, setAssets] = useState<IFinalAsset[]>([])
  const [metadata, setMetadata] = useState<MetaData | undefined>()
  const { id } = useParams()
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)
  const asset = dataset?.find((item) => item.id === id)

  const update = async (id: string) => {
    setLoading(true)
    const { assets, metadata } = await fetchDataSet(id)
    const formattedAssets = Array.from(assets).map((asset) => formatDataStructure(asset))
    setAssets(formattedAssets)
    console.log(formattedAssets)
    // @ts-ignore
    setMetadata(metadata)
    setLoading(false)
  }

  useEffect(() => {
    if (asset) {
      update(asset.sealId)
    }
  }, [asset])

  return { isLoading, assets, metadata }
}

// 2️⃣ Wrap your hook with the constate factory
const [DataSetAssetsProvider, useDataSetAssetsContext] = constate(useDataSetAssets)

export { DataSetAssetsProvider, useDataSetAssetsContext }
