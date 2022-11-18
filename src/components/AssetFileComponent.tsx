import { Box, Typography } from '@mui/material'
import { ReactComponent as IconClock } from '../assets/icon-clock.svg'
import { ReactComponent as IconLocation } from '../assets/images/icon-location-mark.svg'
import { ReactComponent as IconCheck } from '../assets/images/icon-check.svg'
import { formatDate } from '../utils/timestapFormater'
import { IFinalAsset } from '../hooks/useDatachainOutput'

export const AssetFile = ({ assetName, imageUrl, currentLocation, timestamp }: IFinalAsset) => {
  const timeFormat = 'DD MMM YYYY HH:mm:ss'

  const date = formatDate(timestamp / 1000, timeFormat)

  return (
    <Box
      display="flex"
      height="296px"
      borderRadius="12px"
      border="solid 1px #eaecf0"
      width="270px"
      flexDirection="column"
      mr={2}
      mb={2}
    >
      <img src={imageUrl} alt={assetName} height="200px" width="100%" />
      <Box display="flex" flexDirection="column" p={1.5}>
        <Box display="flex" alignItems="center" mb={0.5}>
          <Typography color="grey.900" mr={1.5} fontWeight={500}>
            {'>3m forest'}
          </Typography>
          <IconCheck />
        </Box>

        <Box display="flex" alignItems="center" mb={0.5}>
          <IconClock />
          <Typography fontSize="12px" color="grey.500" ml="4px">
            {date}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <IconLocation width="14px" height="14px" />
          <Typography fontSize="12px" color="grey.500" ml="4px">
            {currentLocation}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
