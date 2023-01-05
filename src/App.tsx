import React, { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'

import './App.css'
import { theme } from './theme'

import Dataset from './views/Dataset'
import Home from './views/Home'
import ComingSoon from './views/ComingSoon'
import SingleAsset from './views/SingleAsset'
import SingleAssetNft from './views/SingleAssetNft'
import SingleAssetWithTabs from './views/SingleAssetWithTabs'
import AssetSearchResult from './views/AssetSearchResult'
import Hero from './components/Hero'
import Footer from './components/Footer'

import { SearchContext } from './context/SearchContext'
import { DataSetAssetsProvider } from './hooks/useDatachainOutput'
import { DataSetProvider } from './hooks/useDataset'
import { TrustlessIndexingProvider } from './hooks/useTrustlessIndexing'

const Layout = () => (
  <DataSetAssetsProvider>
    <Hero />
    <Outlet />
    <Footer />
  </DataSetAssetsProvider>
)

function App() {
  const [value, setValue] = useState<any>({ term: '', filter: 'all' })

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SearchContext.Provider value={{ value, setValue }}>
          <DataSetProvider>
            <TrustlessIndexingProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/dataset/:id/*" element={<Dataset />} />
                  <Route path="/search-asset/">
                    <Route path=":assetName/*" element={<Dataset />} />
                    <Route path=":assetContract/:assetTokenId" element={<AssetSearchResult />} />
                  </Route>

                  <Route path="/single-asset/:id">
                    <Route path=":assetContract/:assetTokenId" element={<SingleAsset />} />
                    <Route path=":assetSerial" element={<SingleAsset />} />
                  </Route>
                  <Route path="/single-asset-with-tabs/:id/:assetSerial/*" element={<SingleAssetWithTabs />} />
                  <Route path="/single-asset-nft/:id">
                    <Route path=":assetContract/:assetTokenId" element={<SingleAssetNft />} />
                  </Route>
                </Route>
                <Route path="/coming-soon" element={<ComingSoon />} />
              </Routes>
            </TrustlessIndexingProvider>
          </DataSetProvider>
        </SearchContext.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App
