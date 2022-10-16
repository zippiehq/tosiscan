import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material/";

import './AssetSearchResult.css'

import Hero from '../../components/header/Hero'
import Footer from '../../components/footer/Footer'

import { avatar } from '../../assets'

import { IDataset } from '../../interfaces/Dataset.interface'
import { DatasetContext } from '../../context/DatasetContext'
import { get } from "../../adapters/axios";
import unzip from "../../utils/unzip";


const AssetDetails = () => {
  const { assetContract, assetTokenId } = useParams();

  const [assets, setAssets] = React.useState<any[]>([]);

  React.useEffect(() => {
    // use query seal to get latest data
    async function fetchAssets() {
      const sealResponse = await get("/tosi/api/v1/query-seal/bafyreifeidf34n4k6eef4fvammk5rpmu4wswzi774jllakwpjbjv3svasa", "json");
      const { data } = await get(
        "/tosi/api/v0/ipfs/get/" + sealResponse.data.status + "/output.zip",
        "blob"
      );
      let res: any = await unzip(data);
      res = Array.from(res)
      setAssets(res);
    }
    fetchAssets();
  }, []);

  const filteredAsset = assets.find(({location}) => {
    if (location?.contract === assetContract && location?.tokenId === assetTokenId) {
      return true
    }
  })

/*  if (!filteredAsset) {
    return 'no data'
  }*/

  console.log(filteredAsset)

  return !filteredAsset ? <div style={{ margin: '100px 50px', fontSize: '20px' }}>No data</div> : (
    <>
      <div className="asset-details">
        <div className="dataset-header">
          <div className="title">
            <h2 style={{ margin: 0 }}>Asset details</h2>
          </div>
        </div>
      </div>

      <div className="asset-tab">
        <div className="asset-tab-overiew">
          <div style={{ margin:'0 auto 60px 80px' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Asset</TableCell>
                    <TableCell>Blockchain</TableCell>
                    <TableCell>Contract</TableCell>
                    <TableCell>Token ID</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      {filteredAsset?.serial}
                    </TableCell>

                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <img src={filteredAsset?.imageUrl} className="avatar" width='40px' height='40px' style={{ marginRight: "12px",}} alt='.' />
                      </span>

                      {filteredAsset?.product}
                    </TableCell>

                    <TableCell>
                      {filteredAsset?.location.name}
                    </TableCell>

                    <TableCell>
                      <a href={`https://opensea.io/assets/ethereum/${assetContract}/${assetTokenId}`} style={{ color: "#07939C", textDecoration: 'none'}}>
                        {filteredAsset?.location.contract}
                      </a>
                    </TableCell>

                    <TableCell >
                      {filteredAsset?.location.tokenId}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  )
}


export default () =>  {
  return (
    <>
      <Hero />
      <AssetDetails />
      <Footer />
    </>
  )
}