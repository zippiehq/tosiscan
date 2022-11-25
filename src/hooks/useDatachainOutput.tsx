import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import constate from 'constate'
import { get } from '../adapters/axios'
import unzip from '../utils/unzip'
import { useDataSetContext } from './useDataset'

export enum StatusType {
  success = 'success',
  warning = 'warning',
  failure = 'failure',
}

export interface IVerifications {
  timestamp: number
  status: StatusType
  message: string
}
interface ILocation {
  name?: string
  contract?: string
  tokenId: string
  ownerAccount: string
}

export interface DatachainOutputContextT {
  assets: IFinalAsset[]
  metadata?: MetaData
  id: string
  timestamps: number[]
  creationDate: number
  lastVerified: number
  verifications: IVerifications[]
}
interface MetaData {
  contract: string
  name: string
  ['asset-description']: string
  ['asset-class']: string
  ['main-location']: string
  ['supported-locations']: string[]
  ['asset-type']: string
}

export interface IFinalAsset {
  assetNumber?: string
  assetName: string
  imageUrl: string
  currentLocation?: string
  locations: ILocation[]
  status: string
  failedReason: string
  timestamp: number
}
interface IDataSetOutputs {
  [key: string]: DatachainOutputContextT
}

export const fetchDataSet = async (id: string) => {
  const sealResponse = await get(`/tosi/api/v1/query-seal/${id}`, 'json')
  const path = sealResponse.data.status
  const { data } = await get(`/tosi/api/v0/ipfs/get/${path}/output.zip`, 'blob')
  const [assets, metadata, verifications] = await Promise.all([
    unzip(data, 'assets.json'),
    unzip(data, 'metadata.json'),
    unzip(data, 'verifications.json'),
  ])
  const { data: claimsData } = await get(`/tosi/api/v1/query-claims/${id}`, 'json')
  const timestamps = claimsData.map((item: any) => item.timestamp)
  const creationDate = Math.min(...timestamps)
  const lastVerified = Math.max(...timestamps)
  const formattedAssets = assets ? Array.from(assets) : []

  return { assets: formattedAssets, metadata, timestamps, creationDate, lastVerified, verifications, id }
}

function useDataSetAssets() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [datasetOutputs, setDataSetOutputs] = useState<IDataSetOutputs>()
  const [selectedDataSet, setSelectedDataSet] = useState<DatachainOutputContextT>()
  const { id } = useParams()
  const { datasets } = useDataSetContext()

  const fetchAssets = async () => {
    setLoading(true)
    const assets = await Promise.all(
      datasets.filter((dataset) => dataset.available).map((dataset) => fetchDataSet(dataset.id)),
    )

    const finalAssets = assets.reduce((prev, dataSet) => ({ ...prev, [dataSet.id]: dataSet }), {})
    setDataSetOutputs(finalAssets)
    setLoading(false)
  }

  useEffect(() => {
    if (datasets.length) {
      fetchAssets()
    }
  }, [datasets])

  useEffect(() => {
    if (datasetOutputs && id && datasetOutputs[id]) {
      setSelectedDataSet(datasetOutputs[id])
    }
  }, [datasetOutputs, id])

  return { isLoading, datasetOutputs, selectedDataSet }
}

// 2️⃣ Wrap your hook with the constate factory
const [DataSetAssetsProvider, useDataSetAssetsContext] = constate(useDataSetAssets)

export { DataSetAssetsProvider, useDataSetAssetsContext }
