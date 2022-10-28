import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Tooltip,
} from "@mui/material";

import { buttonGroup, check, info, searchIcon } from "../../assets";
import image from "../../assets/Lohko.svg";

import { useDatachainOutput } from "../../hooks/useDatachainOutput";
import { IDataset } from "../../interfaces/Dataset.interface";
import { DatasetContext } from "../../context/DatasetContext";

interface AssetsGold {
  tokenId?: string;
  product?: string;
  ownerName?: string;
  ownerAccount?: string;
  serial?: string;
  imageUrl?: string;
  location?: {
    name?: string;
    contract?: string;
    tokenId?: string;
    ownerAccount?: string;
  };
  status?: string;
}

interface AssetsCredit {
  assetNumber?: string;
  assetName?: string;
  imageUrl?: string;
  currentLocation?: string;
  location?: [
    {
      name?: string;
      contract?: string;
      tokenId?: string;
      ownerAccount?: string;
    }
  ];
  status?: string;
}

export default function AssetTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { assets, isLoading } = useDatachainOutput();
  const { id } = useParams();
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext);
  const asset = dataset?.find((item) => item.id === id);
  return isLoading ? (
    <div style={{ margin: "100px 50px", fontSize: "20px1" }}>Loading...</div>
  ) : (
    <div className="asset-tab">
      <div className="asset-tab-overiew">
        <div className="col-1">
          <Typography
            component="h3"
            my={0}
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.5,
              color: "#101828",
            }}
          >
            Assets
          </Typography>

          <AssetTable assets={assets} />
        </div>

        <div className="col-2">
          <div className="stats total-assets">
            <h5>Total assets</h5>
            <h4>
              {assets.length}
            </h4>
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
            <Typography
              component="h3"
              my={0}
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: 1.5,
                color: "#101828",
              }}
            >
              Individual assets
            </Typography>

            <p>
              Showing {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} out
              of{" "}
              {assets.length}{" "}
              individual assets
            </p>
          </div>

          {asset?.id === "0x80bf3a24" ? (
            ""
          ) : (
            <div className="search">
              <div className="search-box">
                <img
                  className="search-icon"
                  src={searchIcon}
                  alt="Search Icon"
                />
                <input placeholder="Search assets..." />
              </div>

              <img
                src={buttonGroup}
                alt="search placeholder"
                style={{ marginLeft: "16px" }}
              />
            </div>
          )}
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

function AssetTable({ assets }: { assets: any; }) {

  let uniqueItems: any = new Set(assets.map((asset: any) => asset.assetName || asset.product));
  uniqueItems = Array.from(uniqueItems);
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
            {uniqueItems.map((asset: any, index: number) => {
          
              return (
                <TableRow key={index}>
                  <TableCell>{asset}</TableCell>
                  <TableCell>
                    {assets?.filter((item: any) => item.product === asset || item.assetName === asset).length}
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
  const navigate = useNavigate();

  const { id } = useParams();
  const { dataset }: { dataset: IDataset[] } = useContext(DatasetContext);
  const asset = dataset?.find((item) => item.id === id);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      {asset?.id === "0x80bf3a24" ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Blockchain</TableCell>
                  <TableCell>Token ID</TableCell>
                  <TableCell>Owner Address</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => {
                    const location = row.locations[0]
                    const assetContract = location.contract;
                    const ownerAccount = location.ownerAccount;

                    const assetTokenId = location.tokenId || location.tokenID;
                    const assetSerial = row.assetNumber;

                    const onAssetClick = () => {
                      if (assetContract && assetTokenId) {
                        navigate(
                          `/single-asset/${id}/${assetContract}/${assetTokenId}`
                        );
                      } else {
                        navigate(`/single-asset/${id}/${assetSerial}`);
                      }
                    };

                    return (
                      <TableRow sx={{ cursor: "none" }} key={index}>
                        <TableCell sx={{ cursor: "text" }}>
                          <a
                            onClick={onAssetClick}
                            style={{
                              color: "#07939C",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            {row.assetNumber}
                          </a>
                        </TableCell>

                        <TableCell
                          sx={{
                            cursor: "text",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={row.imageUrl}
                            width="32px"
                            height="32px"
                            alt="lohko"
                            style={{ marginRight: "12px" }}
                          />
                          <Box>
                            <Typography>{row.assetName}</Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <img
                            src={row.status === "ok" ? check : info}
                            alt="."
                          />
                        </TableCell>

                        <TableCell
                          sx={{ cursor: "text", textTransform: "capitalize" }}
                        >
                          {location.name}
                        </TableCell>
                        <TableCell sx={{ cursor: "text" }}>
                          {assetTokenId}
                        </TableCell>
                        <TableCell sx={{ cursor: "text" }}>
                          {ownerAccount}
                        </TableCell>

                        <TableCell>
                          {page > 1 ? (
                            <a
                              onClick={() => {
                                navigate(`/asset/0x80bf3a23`);
                              }}
                              style={{
                                color: "#07939C",
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                            >
                              Details
                            </a>
                          ) : (
                            ""
                          )}
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
        </>
      ) : (
        <>
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
                    const assetContract = row.location?.contract;
                    const assetTokenId = row.location?.tokenId;
                    const assetSerial = row.serial;

                    const onAssetClick = () => {
                      if (assetContract && assetTokenId) {
                        navigate(
                          `/single-asset/${id}/${assetContract}/${assetTokenId}`
                        );
                      } else {
                        navigate(`/single-asset/${id}/${assetSerial}`);
                      }
                    };

                    return (
                      <TableRow sx={{ cursor: "none" }} key={index}>
                        <TableCell sx={{ cursor: "text" }}>
                          <a
                            onClick={onAssetClick}
                            style={{
                              color: "#07939C",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            {row.serial}
                          </a>
                        </TableCell>
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
        </>
      )}
    </div>
  );
}
