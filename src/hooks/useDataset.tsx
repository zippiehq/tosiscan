import constate from 'constate'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface IPublisher {
  name: string
  description: string
  twitter?: string
  web?: string
  webName?: string
  opensea?: string
  publisherSince: string
  logo: string
}
export interface IDataset {
  id: string
  dataset: string
  contract: string
  type: string
  assetClass: string
  lastVerified: string
  publisher: IPublisher
  issuers: string
  image: string
  available: string
  assetIssued: number
  datasetLinked?: string[]
}

function useDataSet() {
  const [datasets, setDataset] = useState<IDataset[]>([])

  const getDataSetById = (id: string | undefined) => datasets.find((item) => item.id === id)

  const fetchData = async () => {
    try {
      const response = await axios.get('/db.json')
      if (response && response.data) {
        setDataset(response.data.verifications)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { datasets, getDataSetById }
}

const [DataSetProvider, useDataSetContext] = constate(useDataSet)

export { DataSetProvider, useDataSetContext }
