import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { get } from "../../adapters/axios";
import unzip from "../../utils/unzip";
import { buttonGroup, searchPlaceHolder } from "../../assets";
import image from "../../assets/Lohko.svg";

export default function AssetTab() {
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
      res = Array.from(res);
      setAssets(res);
    }

    fetchAssets();
  }, []);

  const items = assets?.map((asset) => asset.product);

  let uniqueItems: any = new Set(items);

  uniqueItems = Array.from(uniqueItems);

  return (
    <div className="asset-tab">
      <div className="asset-tab-overiew">
        <div className="col-1">
          <h3>Assets</h3>
          <AssetTable assets={items} items={uniqueItems} />
        </div>

        <div className="col-2">
          <div className="stats total-assets">
            <h5>Total assets</h5>
            <h4>28</h4>
          </div>
          <div className="stats total-assets">
            <h5>Total change</h5>
            <h4>0</h4>
          </div>
          <div className="stats total-assets">
            <h5>Publisher staking</h5>
            <h4>100,000 TOSI</h4>
          </div>
        </div>
      </div>

      <div className="individual-assets">
        <div className="header">
          <div className="text">
            <h3>Individual Assets</h3>
            <p>Showing 1-10 out of 28 individual assets</p>
          </div>
          <div className="search">
            <img src={searchPlaceHolder} alt="search placeholder" />
            <img src={buttonGroup} alt="search placeholder" />
          </div>
        </div>
        <IndividualAssetTable assets={assets} />
      </div>
    </div>
  );
}

function AssetTable({ items, assets }: { items: any; assets: any }) {
  return (
    <div style={{ width: "820px", marginTop: "16px" }}>
      <TableContainer>
        <Table sx={{ borderRadius: "6px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{row}</TableCell>
                  <TableCell>
                    {assets?.filter((item: any) => item === row).length}
                  </TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function IndividualAssetTable({ assets }: { assets: any }) {
  return (
    <div style={{ marginTop: "16px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Blockchain ID</TableCell>
              <TableCell>Owner Address</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((row: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ color: "#07939C" }}>{row.serial}</TableCell>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <span>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          marginRight: "12px",
                        }}
                        className="avatar"
                        src={image}
                        alt="lohko"
                      />
                    </span>
                    {row.product}
                  </TableCell>
                  <TableCell>ZippieNet</TableCell>
                  <TableCell sx={{ color: "#07939C" }}>
                    0x4b6e915b821c28a1
                  </TableCell>
                  <TableCell sx={{ color: "#07939C" }}>
                    0xf919ee77447b7497
                  </TableCell>
                  <TableCell>Asset Passport</TableCell>
                  <TableCell sx={{ color: "#07939C" }}>Details</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
