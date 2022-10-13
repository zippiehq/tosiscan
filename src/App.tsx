import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import AssetDetails from "./components/asset/AssetDetails";
import { DatasetContext } from "./context/DatasetContext";
import { SearchContext } from "./context/SearchContext";
import AssetDetails from "./pages/asset/AssetDetails";
import Home from "./pages/home/Home";

function App() {
  const [value, setValue] = useState<any>({ term: "", filter: "all" });
  const [dataset, setDataset] = useState<any>([]);
  return (
    <div className="App">
      <SearchContext.Provider value={{ value, setValue }}>
        <DatasetContext.Provider value={{ dataset, setDataset }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/asset/:id" element={<AssetDetails />} />
          </Routes>
        </DatasetContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
