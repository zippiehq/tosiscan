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
  chain: string
  class: string
  token: string
  type: string
  vcu: string
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
  ['asset-type']: string
  imageUrl: string
  currentLocation?: string
  locations: ILocation[]
  attributes?: any
  status: string
  failedReason: string
  timestamp: number
  serialNumberStart?: string
  serialNumberEnd?: string
  batchId: number
  tokenId: number
  owner: string
  metadata: IMetadata
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

const fetchDataSet = async (id: string, additionalMetadata: any = {}) => {
  try {
    const latestStateResponse = await get(`/latest/${id}`, 'json')
    const latestStateCid = latestStateResponse.data.state_cid

    const [dataset, nonces, owners, metadata, batches, assets, balances, events, verifications] = await Promise.all([
      await get(`/ipfs/${latestStateCid}/dataset.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/nonces.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/owners.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/metadata.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/batches.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/assets.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/balances.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/events.json`, 'json'),
      await get(`/ipfs/${latestStateCid}/verifications.json`, 'json'),
    ])
    const timestamps = verifications.data.map((item: any) => item.timestamp / 1000)
    const creationDate = Math.min(...timestamps)
    const lastVerified = Math.max(...timestamps)
    return {
      assets: assets.data,
      metadata: { ...additionalMetadata, ...metadata.data },
      id,
      creationDate,
      lastVerified,
      verifications: verifications.data,
      events: events.data,
      batch: batches.data,
      balances: balances.data,
      dataset: dataset.data,
      nonces: nonces.data,
      owners: owners.data,
    }
  } catch (error) {
    console.error('Error fetching dataset:', error)
    return null
  }
}

function useDataSetAssets() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [datasetOutputs, setDataSetOutputs] = useState<IDataSetOutputs>({})
  const [selectedDataSet, setSelectedDataSet] = useState<DatachainOutputContextT>()
  const { id } = useParams()
  const { datasets } = useDataSetContext()

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true)
      try {
        const dynamicDatasets = await fetchDataDynamic()
        const fetchedDynamicDatasets = await Promise.all(
          dynamicDatasets.map((dataset: { cid: string; metadata: any }) => fetchDataSet(dataset.cid, dataset.metadata)),
        )

        const combinedDatasets = [...fetchedDynamicDatasets].reduce((acc, dataset) => {
          if (dataset) acc[dataset.id] = dataset
          return acc
        }, {})

        setDataSetOutputs(combinedDatasets)
      } catch (error) {
        console.error('Error fetching datasets:', error)
      } finally {
        setLoading(false)
      }
    }

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
