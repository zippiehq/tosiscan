import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import constate from 'constate'
import { get } from '../adapters/axios'
import unzip from '../utils/unzip'
import { useDataSetContext } from './useDataset'

interface ILocation {
  name?: string
  contract?: string
  tokenId: string
  ownerAccount: string
}

export interface DatachainOutputContextT {
  assets: IFinalAsset[]
  metadata?: MetaData
  dataSetId: string
}
interface MetaData {
  contract: string
  name: string
  ['asset-description']: string
  ['asset-class']: string
  ['main-location']: string
  ['supported-locations']: string[]
}

export interface IFinalAsset {
  assetNumber?: string
  assetName: string
  imageUrl: string
  currentLocation?: string
  locations: ILocation[]
  status: string
}
interface IDataSetOutputs {
  [key: string]: DatachainOutputContextT
}
const getLocations = (data: any): ILocation[] | [] => {
  if (data.locations) return data.locations

  if (data.location) return [data.location]
  if (data.ownerAccount) {
    return [
      {
        ownerAccount: data.ownerAccount,
        tokenId: data.tokenId,
        name: 'Zippienet',
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

export const fetchDataSet = async (id: string) => {
  const sealResponse = await get(`/tosi/api/v1/query-seal/${id}`, 'json')
  const path = sealResponse.data.status
  const { data } = await get(`/tosi/api/v0/ipfs/get/${path}/output.zip`, 'blob')
  const [assets, metadata] = await Promise.all([unzip(data, 'assets.json'), unzip(data, 'metadata.json')])

  return { assets, metadata, id }
}

const fetchDataSetAssets = async (sealId: string, id: string) => {
  const { assets, metadata } = await fetchDataSet(sealId)
  const formattedAssets = Array.from(assets).map((asset) => formatDataStructure(asset))
  return { assets: formattedAssets, metadata, dataSetId: id }
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
      datasets.filter((dataset) => dataset.sealId).map((dataset) => fetchDataSetAssets(dataset.sealId, dataset.id)),
    )

    const finalAssets = assets.reduce((prev, dataSet) => ({ ...prev, [dataSet.dataSetId]: dataSet }), {})
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
