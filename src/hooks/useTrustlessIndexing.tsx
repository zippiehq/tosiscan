import axios from 'axios'
import constate from 'constate'
import { useState, useEffect } from 'react'

export interface ITLIDataSet {
  contract: {
    name: string
    owner: string
    address: string
    metadata: { [key: string]: string }
    type: string
    uri: string
  }
  token: {
    id: string
    metadata: { [key: string]: string; attributes: any }
    owner: string
    tokenUri: string
    uri: string
    mintTimestamp: any
  }
}

// to decide: store past results?
export interface ITLIDataSet2 {
  contract: {
    name: string
    owner: string
    address: string
    metadata: { [key: string]: string }
    type: string
    uri: string
  }
  tokens: Array<{
    id: string
    metadata: { [key: string]: string }
    owner: string
    tokenUri: string
    uri: string
  }>
}

const TrustlessIndexingURLs = {
  dev: 'https://api.dev.zippie.com/trustless-indexing',
  test: 'https://api.dev.zippie.com/trustless-indexing',
  prod: 'https://api.dev.zippie.com/trustless-indexing',
}

const useTrustlessIndexing = () => {
  const [TLIQuery, setTLIQuery] = useState<{ assetContract?: string; assetTokenId?: string }>()
  const [isTLILoading, setIsTLILoading] = useState<boolean>(true)
  const [TLIDataSet, setTLIDataSet] = useState<ITLIDataSet>()

  const fetchSingleAsset = async (assetContract?: string, assetTokenId?: string) => {
    const response = await axios
      .get(`${TrustlessIndexingURLs.dev}/api/nfts/${assetContract}/${assetTokenId}/data`)
      .then((data) => data.data.data)

    const dsItem: ITLIDataSet = {
      contract: {
        name: response.contractData.contractName,
        owner: response.contractData.contractOwner,
        address: response.contractData.contractAddress,
        metadata: response.contractData.contractMetadata,
        type: response.contractData.contractType,
        uri: response.contractData.contractUri,
      },
      token: {
        id: response.tokenData.tokenId,
        metadata: response.tokenData.tokenMetadata,
        owner: response.tokenData.tokenOwner,
        tokenUri: response.tokenData.tokenUri,
        uri: response.tokenData.uri,
        mintTimestamp: response.tokenData.tokenMintTimestamp,
      },
    }
    setTLIDataSet(dsItem)
    setIsTLILoading(false)
  }

  useEffect(() => {
    if (TLIQuery !== undefined && TLIQuery.assetContract && TLIQuery.assetTokenId) {
      setIsTLILoading(true)

      if (
        TLIDataSet &&
        TLIDataSet.contract.address === TLIQuery.assetContract &&
        TLIDataSet.token.id === TLIQuery.assetTokenId
      ) {
        setIsTLILoading(false)
        return
      }

      fetchSingleAsset(TLIQuery.assetContract, TLIQuery.assetTokenId)
    }
  }, [TLIQuery, TLIDataSet])

  return { isTLILoading, TLIDataSet, setTLIQuery }
}

const [TrustlessIndexingProvider, useTrustlessIndexingContext] = constate(useTrustlessIndexing)

export { TrustlessIndexingProvider, useTrustlessIndexingContext }
