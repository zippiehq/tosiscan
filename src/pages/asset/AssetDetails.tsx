import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DatasetContext } from "../../context/DatasetContext";
import "./AssetDetails.css";
import { IDataset } from "../../interfaces/Dataset.interface";
import BasicTabs from "../../components/asset/Tabs";
import Footer from "../../components/footer/Footer";
import { avatar, chevronRight, homeIcon } from "../../assets";

export default function AssetDetails() {
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext);
  const { id } = useParams();
  const asset = dataset?.find((item) => item.id === id);

  return (
    <>
      {/* header */}
      <div className="asset-details">
        <div className="dataset-header">
          <div className="breadcrumbs">
            <img src={homeIcon} alt="breadcrumb home icon" />
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset?.type}</span>
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset?.assetClass}</span>
            <img src={chevronRight} alt="Chevron Right" />
            <span>{asset?.dataset}</span>
          </div>
          <div className="title">
            <img src={avatar} alt={`${asset?.dataset} avatar`} />
            <div className="details">
              <h1>{asset?.dataset}</h1>
              <div className="badge">
                <span>Asset backed</span>
                <span>Last verified {asset?.lastVerified}</span>
              </div>
            </div>
          </div>
          <div className="tabs-button">
            <BasicTabs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
