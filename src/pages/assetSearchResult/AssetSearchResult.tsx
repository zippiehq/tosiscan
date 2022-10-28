import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material/";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material/";

import "./AssetSearchResult.css";

import Hero from "../../components/header/Hero";
import Footer from "../../components/footer/Footer";

import { useDatachainOutput } from "../../hooks/useDatachainOutput";

import { check } from "../../assets";
import { info } from "../../assets";

const AssetDetails = () => {
  const { assetContract, assetTokenId } = useParams();
  const { assets, isLoading } = useDatachainOutput();
  const navigate = useNavigate();

  const filtered = assets.filter(({ location }) => {
    if (
      location?.contract === assetContract &&
      location?.tokenId === assetTokenId
    ) {
      return true;
    }
  });

  if (isLoading) {
    return (
      <div style={{ margin: "100px 50px", fontSize: "20px1" }}>Loading...</div>
    );
  }

  return filtered.length === 0 ? (
    <div style={{ margin: "100px 50px", fontSize: "20px" }}>No data</div>
  ) : (
    <Box className="asset-tab-overiew" sx={{
      display:'flex',
      flexDirection:'column',
      maxWidth: '1300px',
      margin: '0 auto',
      marginBottom: '32px',
      width: '100%',
    }}>
      <Typography
        color="textPrimary"
        fontSize="24px"
        mt={"32px"}
        fontWeight={500}
        mb={3.5}
      >
        Search Results
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Contract</TableCell>
              <TableCell>Token ID</TableCell>
              <TableCell>Owner Address</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((asset) => (
              <TableRow key={asset.serial}>
                <TableCell>
                  <a
                    onClick={
                      () => {navigate(`/single-asset/0x80bf3a23/${assetContract}/${assetTokenId}`)}
                    }
                     style={{ color: "#07939C", textDecoration: 'none', cursor: 'pointer' }}
                  >
                    {asset.serial}
                  </a>
                </TableCell>

                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <img
                      src={asset.imageUrl}
                      className="avatar"
                      width="40px"
                      height="40px"
                      style={{ marginRight: "12px" }}
                      alt="."
                    />
                  </span>
                  {asset.product}
                </TableCell>

                <TableCell>
                  {asset.status ? (
                    <img src={check} alt="." />
                  ) : (
                    <img src={info} alt="." />
                  )}
                </TableCell>

                <TableCell>{asset.location.name}</TableCell>

                <TableCell>
                  <a
                    href={`https://opensea.io/assets/ethereum/${asset.location.contract}/${asset.location.tokenId}`}
                    style={{ color: "#07939C", textDecoration: "none" }}
                    target="_blank"
                    rel='noreferrer nofollow'
                  >
                    {asset.location.contract.slice(0, 4) +
                      "..." +
                      asset.location.contract.slice(
                        asset.location.contract.length - 4
                      )}
                  </a>
                </TableCell>

                <TableCell>{asset?.location.tokenId}</TableCell>

                <TableCell>
                  {asset.location.ownerAccount.slice(0, 4) +
                    "..." +
                    asset.location.ownerAccount.slice(asset.location.ownerAccount.length - 4)}
                </TableCell>

                <TableCell>
                  <a
                    onClick={
                      () => {navigate(`/asset/0x80bf3a23`)}
                    }
                    style={{
                      color: "#07939C",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    View Dataset
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default () => {
  return (
    <>
      <Hero />
      <AssetDetails />
      <Footer />
    </>
  );
};
