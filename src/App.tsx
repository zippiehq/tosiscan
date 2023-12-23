import React, { useState } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

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

import { DataSetAssetsProvider } from './hooks/useDatachainOutput'
import { DataSetProvider } from './hooks/useDataset'
import { TrustlessIndexingProvider } from './hooks/useTrustlessIndexing'
import SmallHero from './components/SmallHero'

const Layout = () => {
  const { pathname } = useLocation()
  return (
    <DataSetAssetsProvider>
      {pathname === '/' ? <Hero /> : <SmallHero />}
      <Outlet />
      <Footer />
    </DataSetAssetsProvider>
  )
}

function App() {
  const [value, setValue] = useState<any>({ term: '', filter: 'all' })

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DataSetProvider>
          <TrustlessIndexingProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/dataset/:id/*" element={<Dataset />} />
                <Route path="/search-asset/:encoded" element={<AssetSearchResult />} />
                <Route path="/single-asset/:id">
                  <Route path=":assetTokenId/:assetBatchId" element={<SingleAsset />} />
                  <Route path=":assetTokenId" element={<SingleAsset />} />
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
      </div>
    </ThemeProvider>
  )
}

export default App
