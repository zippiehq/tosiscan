import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { get } from '../adapters/axios'
import { useDataSetContext } from './useDataset'

export interface VerificationTimestampContextT {
  timestamps: number[]
  isLoading: boolean
}

export const VerificationTimestampContext = createContext<VerificationTimestampContextT>({
  timestamps: [],
  isLoading: true,
})

export const useVerificationTimestamps = () => useContext(VerificationTimestampContext)

export const VerificationTimestampsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [timestamps, setTimeStamps] = useState<number[]>([])
  const { id } = useParams()
  const { getDataSetById } = useDataSetContext()

  const asset = getDataSetById(id)
  useEffect(() => {
    if (!asset?.id) {
      return
    }
    const getTimeStamp = async () => {
      setLoading(true)
      const { data } = await get(`/tosi/api/v1/query-claims/${asset?.sealId}`, 'json')

      const timestamp = data.map((item: any) => item.timestamp)

      setTimeStamps(timestamp)
      setLoading(false)
    }

    getTimeStamp()
  }, [asset])

  return (
    <VerificationTimestampContext.Provider value={{ timestamps, isLoading }}>
      {children}
    </VerificationTimestampContext.Provider>
  )
}
