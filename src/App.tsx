import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'

import './App.css'

// import AssetDetails from "./components/asset/AssetDetails";
import { SearchContext } from './context/SearchContext'

import AssetDetails from './pages/asset/AssetDetails'
import Home from './pages/home/Home'
import ComingSoon from './pages/ComingSoon'
import SingleAsset from './pages/singleAsset/SingleAsset'
import AssetSearchResult from './pages/assetSearchResult/AssetSearchResult'

import { DataSetAssetsProvider } from './hooks/useDatachainOutput'
import { DataSetProvider } from './hooks/useDataset'
import { theme } from './theme'
import Hero from './components/header/Hero'
import Footer from './components/footer/Footer'

const Layout = () => (
  <>
    <Hero />
    <Outlet />
    <Footer />
  </>
)

function App() {
  const [value, setValue] = useState<any>({ term: '', filter: 'all' })

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SearchContext.Provider value={{ value, setValue }}>
          <DataSetProvider>
            <DataSetAssetsProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/asset/:id" element={<AssetDetails />} />
                  <Route path="/search-asset/:assetContract/:assetTokenId" element={<AssetSearchResult />} />
                  <Route path="/single-asset/:id">
                    <Route path=":assetContract/:assetTokenId" element={<SingleAsset />} />
                    <Route path=":assetSerial" element={<SingleAsset />} />
                  </Route>
                </Route>
                <Route path="/coming-soon" element={<ComingSoon />} />
              </Routes>
            </DataSetAssetsProvider>
          </DataSetProvider>
        </SearchContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
