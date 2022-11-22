import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { AssetFile } from './AssetFileComponent'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

export default () => {
  const { datasetOutputs } = useDataSetAssetsContext()

  const { id } = useParams<{ id: string }>()
  if (!id) {
    return null
  }
  const dataset = datasetOutputs ? datasetOutputs[id] : null

  const assets = dataset?.assets || []
  return dataset ? (
    <Box display="flex" flexWrap="wrap" mt={2} marginBottom="160px">
      {assets.map((asset, index) => (index > 3 ? null : <AssetFile {...asset} key={asset.assetName} datasetId={id} />))}
    </Box>
  ) : null
}
