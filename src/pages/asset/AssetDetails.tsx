import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DatasetContext } from "../../context/DatasetContext";
import "./AssetDetails.css";
import { IDataset } from "../../interfaces/Dataset.interface";
import BasicTabs from "../../components/asset/Tabs";
import Footer from "../../components/footer/Footer";
import { avatar, chevronRight, helpIconWarning, homeIcon } from "../../assets";
import Hero from "../../components/header/Hero";
import { get } from "../../adapters/axios";

export default function AssetDetails() {
  const [latestTimeStamp, setLatestTimeStamp] = useState(0);
  const [creationTimeStamp, setCreationTimeStamp] = useState(0);

  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext);
  const { id } = useParams();
  const asset = dataset?.find((item) => item.id === id);

  useEffect(() => {
    async function getLastVerificationTime() {
      const { data } = await get(
        "/tosi/api/v1/query-claims/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa",
        "json"
      );
      const timeStamp = data.map((item: any) => item.timestamp);
      const latestTimeStamp = Math.max(...timeStamp);
      const creationTimeStamp = Math.min(...timeStamp);
      setLatestTimeStamp(latestTimeStamp);
      setCreationTimeStamp(creationTimeStamp);
    }
    getLastVerificationTime();
  }, []);

  return (
    <>
      {/* header */}
      <Hero />
      <div className="asset-details">
        <div className="dataset-header">
          <div className="breadcrumbs">
            <img src={homeIcon} alt="breadcrumb home icon" />
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset ? asset.type : "Digital Asset"}</span>
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset ? asset.assetClass : "Gold"}</span>
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset ? asset.dataset : "Lohko Gold"}</span>
          </div>
          <div className="title">
            <img src={avatar} alt={`${asset?.dataset} avatar`} />
            <div className="details">
              <h1>{asset?.dataset}</h1>
              <div className="badge">
                <span>Asset backed</span>
                <div>
                  <img src={helpIconWarning} alt="Warning Icon" />
                  <p>There is a problem with this dataset</p>
                </div>
                <span>
                  Last verified{" "}
                  {moment(
                    moment
                      .unix(latestTimeStamp)
                      .format("d MMM YYYY hh:mm:ss [UTC]")
                  ).fromNow()}
                </span>
              </div>
            </div>
          </div>
          <div className="tabs-button">
            <BasicTabs
              creationTimeStamp={creationTimeStamp}
              latestTimeStamp={latestTimeStamp}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
