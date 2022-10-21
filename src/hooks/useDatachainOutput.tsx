import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { get } from "../adapters/axios";
import unzip from "../utils/unzip";

export interface Asset {
  tokenId: string
  product: string
  ownerName: string
  ownerAccount: string
  serial: string
  imageUrl: string
  location: {
    name: string
    contract: string
    tokenId: string
    ownerAccount: string
  }
  status: string
}

export interface DatachainOutputContextT {
  assets: Asset[]
  isLoading: boolean
}

export const DatachainOutputContext = createContext<DatachainOutputContextT>({ assets: [], isLoading: true });
export const useDatachainOutput = () => useContext(DatachainOutputContext);

export const DatachainOutputProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [assets, setAssets] = useState<Asset[]>([])

  const update = async () => {
    setLoading(true)
    const sealResponse = await get(
      '/tosi/api/v1/query-seal/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa',
      'json'
    )
      /*await get(
        '/tosi/api/v1/query-seal/bafyreiccffzwpigoyg7fhskwxbchby7xtns33rm7rkw6dkb6h4ax2m4vbe',
        'json'
      ) */

    const { data } = await get(
      "/tosi/api/v0/ipfs/get/" + sealResponse.data.status + "/output.zip",
      "blob"
    );
    let res: any = await unzip(data, "assets.json");
    res = Array.from(res)
    setAssets(res);
    setLoading(false)
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <DatachainOutputContext.Provider value={{ assets, isLoading }}>
      {children}
    </DatachainOutputContext.Provider>
  )
}