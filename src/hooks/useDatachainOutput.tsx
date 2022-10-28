import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { get } from "../adapters/axios";
import unzip from "../utils/unzip";
import { useParams } from "react-router-dom";
import { DatasetContext } from "../context/DatasetContext";
import { IDataset } from "../interfaces/Dataset.interface";

interface ILocation {
  name: string;
  contract: string;
  tokenId: string;
  tokenID: string;

  ownerAccount: string;
}
export interface Asset {
  tokenId: string;
  product: string;
  ownerName: string;
  ownerAccount: string;
  serial: string;
  imageUrl: string;
  location: ILocation;
  locations: ILocation[];
  status: string;
}

export interface DatachainOutputContextT {
  assets: Asset[];
  isLoading: boolean;
  metadata?: MetaData;
}
interface MetaData {
  contract: string;
  name: string;
  ["asset-description"]: string;
  ["asset-class"]: string;
  ["main-location"]: string;
  ["supported-locations"]: string[];
}
export const fetchDataSet = async (id: string) => {
  const sealResponse = await get(`/tosi/api/v1/query-seal/${id}`, "json");
  const path = sealResponse.data.status;
  const { data } = await get(
    "/tosi/api/v0/ipfs/get/" + path + "/output.zip",
    "blob"
  );
  const [assets, metadata] = await Promise.all([
    unzip(data, "assets.json"),
    unzip(data, "metadata.json"),
  ]);

  return { assets, metadata };
};
export const DatachainOutputContext = createContext<DatachainOutputContextT>({
  assets: [],
  isLoading: true,
});
export const useDatachainOutput = () => useContext(DatachainOutputContext);

export const DatachainOutputProvider: React.FC<PropsWithChildren> = ({
  children,
}: any) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [metadata, setMetadata] = useState<MetaData | undefined>();
  const { id } = useParams();
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext);
  const asset = dataset?.find((item) => item.id === id);

  const update = async (id: string) => {
    setLoading(true);
    const {assets, metadata } = await fetchDataSet(id);

    //@ts-ignore
    setAssets(Array.from(assets));
    //@ts-ignore
    setMetadata(metadata);
    setLoading(false);
  };

  useEffect(() => {
    if (asset) {
      update(asset.sealId);
    }
  }, [asset]);

  return (
    <DatachainOutputContext.Provider value={{ assets, isLoading, metadata }}>
      {children}
    </DatachainOutputContext.Provider>
  );
};
