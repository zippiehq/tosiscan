import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'

import "./App.css";
// import AssetDetails from "./components/asset/AssetDetails";
import { DatasetContext } from "./context/DatasetContext";
import { SearchContext } from "./context/SearchContext";
import AssetDetails from "./pages/asset/AssetDetails";
import Home from "./pages/home/Home";
import ComingSoon from "./pages/ComingSoon";

import AssetSearchResult from './pages/assetSearchResult/AssetSearchResult'
import { DatachainOutputProvider } from "./hooks/useDatachainOutput";
import {theme} from './theme'
function App() {
  const [value, setValue] = useState<any>({ term: "", filter: "all" });
  const [dataset, setDataset] = useState<any>([]);
  return (
    <ThemeProvider theme={theme}>

    <div className="App">
      <DatachainOutputProvider>
        <SearchContext.Provider value={{ value, setValue }}>
          <DatasetContext.Provider value={{ dataset, setDataset }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coming-soon" element={<ComingSoon />} />

              <Route path="/asset/:id" element={<AssetDetails />} />
              <Route path="/search-asset/:assetContract/:assetTokenId" element={<AssetSearchResult />} />
            </Routes>
          </DatasetContext.Provider>
        </SearchContext.Provider>
      </DatachainOutputProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
