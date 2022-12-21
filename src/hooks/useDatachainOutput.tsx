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
  currentLocation?: string
}

interface IMetadata {
  name: string
  image: string
  status: string
  contract: string
  ['asset-type']: string
  ['asset-class']: string
  ['main-location']: string
  ['asset-description']: string
  ['supported-locations']: string[]
  datasetLinked?: string[]
  publisher: string
}

export interface IDatasetDynamic {
  id: string
  type: string
  reqId: string
  cid: string
  status: string
  createdAt: string
  updatedAt: string
  metadata?: IMetadata
}

export interface DatachainOutputContextT {
  assets: IFinalAsset[]
  metadata?: IMetadata
  id: string
  creationDate: number
  lastVerified: number
  verifications: IVerifications[]
}

export interface IFinalAsset {
  assetNumber?: string
  assetName: string
  imageUrl: string
  currentLocation?: string
  locations: ILocation[]
  attributes?: any
  status: string
  failedReason: string
  timestamp: number
  serialNumberStart?: string
  serialNumberEnd?: string
}
interface IDataSetOutputs {
  [key: string]: DatachainOutputContextT
}
const DynamicDatasetUrl = 'https://api.test.zippie.com/dataset-issuance/api/dataset'

const fetchDataDynamic = async () => {
  try {
    const response = await get(`${DynamicDatasetUrl}/?metadataField=status&metadataValue=active`, 'json')
    return response.data.data.datasets
  } catch (error) {
    console.log(error)
  }
}
interface IAdditionalData {
  image: string
  publisher: string
}
export const fetchDataSet = async (id: string, additionalMetadata: any = {}) => {
  const sealResponse = await get(`/tosi/api/v1/query-seal/${id}`, 'json')
  const path = sealResponse.data.status
  const [output] = await Promise.all([
    get(`/tosi/api/v0/ipfs/get/${path}/output.zip`, 'blob'),
    // get(`/tosi/api/v1/query-claims/${id}`, 'json'),
  ])
  const [assets, metadata, verifications] = await Promise.all([
    unzip(output.data, 'assets.json'),
    unzip(output.data, 'metadata.json'),
    unzip(output.data, 'verifications.json'),
  ])
  // @ts-ignore
  const timestamps = verifications.map((item: any) => item.timestamp / 1000)
  const creationDate = Math.min(...timestamps)
  const lastVerified = Math.max(...timestamps)
  const formattedAssets = assets ? Array.from(assets) : []
  return {
    assets: formattedAssets,
    metadata: {
      ...additionalMetadata,
      // @ts-ignore
      ...metadata,
    },
    verifications,
    id,
    creationDate,
    lastVerified,
  }
}

function useDataSetAssets() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [datasetOutputs, setDataSetOutputs] = useState<IDataSetOutputs>({})
  const [selectedDataSet, setSelectedDataSet] = useState<DatachainOutputContextT>()
  const { id } = useParams()
  const { datasets } = useDataSetContext()

  const fetchAssets = async () => {
    setLoading(true)
    const assets = await Promise.all(
      datasets.filter((dataset) => dataset.available).map((dataset) => fetchDataSet(dataset.id, dataset)),
    )
    const dynamic = await fetchDataDynamic()
    const assetsDynamic = await Promise.all(dynamic.map((dataset: any) => fetchDataSet(dataset.cid)))
    const finalAssets = assets.reduce((prev, dataSet) => ({ ...prev, [dataSet.id]: dataSet }), {})
    const finalAssetsDyanmic = assetsDynamic.reduce((prev, dataSet) => ({ ...prev, [dataSet.id]: dataSet }), {})
    setDataSetOutputs({ ...finalAssets, ...finalAssetsDyanmic })
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
