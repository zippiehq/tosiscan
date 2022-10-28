import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { get } from "../adapters/axios";
import {useParams} from 'react-router-dom'
import { DatasetContext } from '../context/DatasetContext'
import { IDataset } from '../interfaces/Dataset.interface'
export interface VerificationTimestampContextT {
  timestamps: number[];
  isLoading: boolean;
}

export const VerificationTimestampContext =
  createContext<VerificationTimestampContextT>({
    timestamps: [],
    isLoading: true,
  });

export const useVerificationTimestamps = () =>
  useContext(VerificationTimestampContext);

export const VerificationTimestampsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [timestamps, setTimeStamps] = useState<number[]>([]);
  const { id } = useParams()
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext)
  const asset = dataset?.find((item) => item.id === id)
  useEffect(() => {
    if(!asset?.id) {return}
    const getTimeStamp = async () => {
      setLoading(true);
      const { data } = await get(
        `/tosi/api/v1/query-claims/${asset?.sealId}`,
        "json"
      );

      const timestamp = data.map((item: any) => item.timestamp);

      setTimeStamps(timestamp);
      setLoading(false);
    };

    getTimeStamp();
  }, [asset]);

  return (
    <VerificationTimestampContext.Provider value={{ timestamps, isLoading }}>
      {children}
    </VerificationTimestampContext.Provider>
  );
};
