import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { get } from "../../adapters/axios";
import unzip from "../../utils/unzip";
import { buttonGroup, check, info, searchIcon } from "../../assets";
import image from "../../assets/Lohko.svg";
import { TablePagination } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useDatachainOutput } from "../../hooks/useDatachainOutput";

export default function AssetTab() {
  const { assets, isLoading } = useDatachainOutput();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const items = assets?.map((asset) => asset.product);

  let uniqueItems: any = new Set(items);

  uniqueItems = Array.from(uniqueItems);

  if (isLoading) {
    return (
      <div style={{ margin: "100px 50px", fontSize: "20px1" }}>Loading...</div>
    );
  }

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
            <h4>{assets.length}</h4>
          </div>
          <div className="stats total-assets">
            <h5>Total change</h5>
            <h4>0</h4>
          </div>
          <div className="stats total-assets">
            <h5>Publisher staking</h5>
            <h4>
              100,000
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "20px",
                  lineHeight: "30px",
                }}
              >
                TOSI
              </span>
            </h4>
          </div>
        </div>
      </div>

      <div className="individual-assets">
        <div className="header">
          <div className="text">
            <h3>Individual Assets</h3>
            <p>
              Showing {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} out
              of {assets.length} individual assets
            </p>
          </div>
          <div className="search">
            <div className="search-box">
              <img className="search-icon" src={searchIcon} alt="Search Icon" />
              <input placeholder="Search assets..." />
            </div>
            <img src={buttonGroup} alt="search placeholder" />
          </div>
        </div>
        <IndividualAssetTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setPage={setPage}
          page={page}
          assets={assets}
        />
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

function IndividualAssetTable({
  assets,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  assets: any;
  page: number;
  setPage: any;
  rowsPerPage: any;
  setRowsPerPage: any;
}) {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log({ assets });

  return (
    <div style={{ marginTop: "16px" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Token ID</TableCell>
              <TableCell>Owner Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                return (
                  <TableRow sx={{ cursor: "none" }} key={index}>
                    <TableCell sx={{ cursor: "text" }}>{row.serial}</TableCell>
                    <TableCell
                      sx={{
                        cursor: "text",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <img
                          style={{
                            width: "32px",
                            height: "32px",
                            marginRight: "12px",
                          }}
                          className="avatar"
                          src={
                            row.product.indexOf("TEST") > -1
                              ? image
                              : row.imageUrl
                          }
                          alt="lohko"
                        />
                      </span>
                      {row.product}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          row.status === "ok"
                            ? "Signature match"
                            : "Signature does not match"
                        }
                        placement="top"
                      >
                        <img
                          src={row.status === "ok" ? check : info}
                          alt="check icon"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "text", textTransform: "capitalize" }}
                    >
                      {row.location ? row.location.name : "Zippienet"}
                    </TableCell>
                    <TableCell sx={{ cursor: "text" }}>
                      {row.location
                        ? `${row.location.contract}/${row.location.tokenId}`
                        : `${row.tokenId.substring(
                            0,
                            4
                          )}...${row.tokenId.substring(10, 30)}`}
                    </TableCell>
                    <TableCell sx={{ cursor: "text" }}>
                      {row.location
                        ? row.location.ownerAccount
                        : row.ownerAccount}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={assets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
