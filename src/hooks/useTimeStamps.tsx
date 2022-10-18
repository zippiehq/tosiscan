import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { get } from "../adapters/axios";

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

  useEffect(() => {
    const getTimeStamp = async () => {
      setLoading(true);
      const { data } = await get(
        "/tosi/api/v1/query-claims/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa",
        "json"
      );

      const timestamp = data.map((item: any) => item.timestamp);

      setTimeStamps(timestamp);
      setLoading(false);
    };

    getTimeStamp();
  }, []);

  return (
    <VerificationTimestampContext.Provider value={{ timestamps, isLoading }}>
      {children}
    </VerificationTimestampContext.Provider>
  );
};
