import React from 'react'

import { Box, Typography } from '@mui/material'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'
import { getVerificationComponent } from './Verifications'

const SingleAssetVerificationTab = () => {
  const { selectedDataSet, isLoading } = useDataSetAssetsContext()
  const datasetName = selectedDataSet?.metadata?.name || 'Lohko Gold'

  const Verification = getVerificationComponent(datasetName || '')
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" color="grey.900" sx={{ fontSize: '20px', lineHeight: 1.5 }}>
        Supporting verification
      </Typography>

      <Verification />
    </Box>
  )
}

export default () => <SingleAssetVerificationTab />
