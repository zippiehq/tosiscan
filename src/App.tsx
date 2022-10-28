import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import './App.css'

// import AssetDetails from "./components/asset/AssetDetails";
import { DatasetContext } from './context/DatasetContext'
import { SearchContext } from './context/SearchContext'

import AssetDetails from "./pages/asset/AssetDetails";
import Home from "./pages/home/Home";
import ComingSoon from "./pages/ComingSoon";
import SingleAsset from "./pages/singleAsset/SingleAsset";
import AssetSearchResult from "./pages/assetSearchResult/AssetSearchResult";

import { DatachainOutputProvider } from "./hooks/useDatachainOutput";
import { VerificationTimestampsProvider } from "./hooks/useTimeStamps";
import { theme } from "./theme";
import axios from "axios";

const Layout = () => {
  return (
    <DatachainOutputProvider>
      <VerificationTimestampsProvider>
        <Outlet />
      </VerificationTimestampsProvider>
    </DatachainOutputProvider>
  );
};

function App() {
  const [value, setValue] = useState<any>({ term: "", filter: "all" });
  const [dataset, setDataset] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/db.json");
      if (response && response.data) {
        setDataset(response.data.verifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SearchContext.Provider value={{ value, setValue }}>
          <DatasetContext.Provider value={{ dataset, setDataset }}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/asset/:id" element={<AssetDetails />} />
                <Route
                  path="/search-asset/:id/:assetContract/:assetTokenId"
                  element={<AssetSearchResult />}
                />
                <Route path="/single-asset/:id">
                  <Route
                    path=":assetContract/:assetTokenId"
                    element={<SingleAsset />}
                  />
                  <Route path=":assetSerial" element={<SingleAsset />} />
                </Route>
              </Route>
            </Routes>
          </DatasetContext.Provider>
        </SearchContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
