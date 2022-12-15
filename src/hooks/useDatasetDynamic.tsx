import { useState, useEffect } from 'react'
import constate from 'constate'
import axios from 'axios'

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

const DynamicDatasetUrl = 'https://api.test.zippie.com/dataset-issuance/api/dataset'

function useDataSetDynamic() {
  const [datasetsDynamic, setDatasetDynamic] = useState<IDatasetDynamic[]>([])

  // const getDataSetById = (id: string | undefined) => datasetsDynamic.find((item) => item.cid === id)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${DynamicDatasetUrl}/?metadataField=status&metadataValue=active`)
      if (response && response.data) {
        setDatasetDynamic(response.data.data.datasets)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { datasetsDynamic }
}

const [DataSetProviderDynamic, useDataSetContextDynamic] = constate(useDataSetDynamic)

export { DataSetProviderDynamic, useDataSetContextDynamic }
