import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDataSetAssetsContext } from '../hooks/useDatachainOutput'

import { useDataSetContext } from '../hooks/useDataset'
import { AssetFile } from '../components/AssetFileComponent'

const FilesView = ({ datasetId }: { datasetId: string }) => {
  const { datasetOutputs } = useDataSetAssetsContext()
  const dataset = datasetOutputs ? datasetOutputs[datasetId] : null

  const assets = dataset?.assets || []

  return (
    <Box display="flex" flexWrap="wrap">
      {assets.map((asset) => (
        <AssetFile {...asset} key={asset.assetName} />
      ))}
    </Box>
  )
}

export default () => {
  const [selectedLinkedDataset, setSelectedLikedDataset] = useState(
    'bafyreidjcney3xvcuyutfjtkykxpfsn3544du2t3mxlj6xt3wucojvuk2m',
  )
  const { datasets, getDataSetById } = useDataSetContext()
  const { datasetOutputs } = useDataSetAssetsContext()
  const { id } = useParams()
  const dataSet = getDataSetById(id)
  const linkedDataset = dataSet?.datasetLinked
    ? dataSet?.datasetLinked
        .map((datasetId) => {
          const dataSetDetails = datasets.find((dataset) => dataset.id === datasetId)
          const datasetOutput = datasetOutputs ? datasetOutputs[datasetId] : null

          return {
            datasetName: dataSetDetails?.dataset,
            datasetOutput,
            datasetId,
          }
        })
        .filter((dataset) => dataset.datasetName)
    : []

  return (
    <Box display="flex" height="100%" marginBottom="160px">
      <Box display="flex" flexDirection="column" width="240px" pr={3} borderRight="1px solid #EAECF0">
        <Typography color="grey.900" fontSize="18px" fontWeight={500} mb={2}>
          Linked datasets
        </Typography>

        {linkedDataset.map((dataset) => (
          <Box display="flex" alignItems="center">
            <Typography
              color="grey.500"
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '144px',
              }}
            >
              {dataset.datasetName}
            </Typography>
            <Box
              width="24px"
              height="24px"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="grey.100"
              ml="auto"
            >
              <Typography color="grey.700" variant="body2" fontSize="12px">
                {dataset.datasetOutput?.assets.length}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box display="flex" flexDirection="column" pl={3} pr={3}>
        <FilesView datasetId={selectedLinkedDataset} />
      </Box>
    </Box>
  )
}
