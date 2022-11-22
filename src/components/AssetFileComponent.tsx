import { Box, Typography, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ClipboardJS from 'clipboard'

import { ReactComponent as IconClock } from '../assets/icon-clock.svg'
import { ReactComponent as IconLocation } from '../assets/images/icon-location-mark.svg'
import { ReactComponent as IconCheck } from '../assets/images/icon-check.svg'
import { ReactComponent as MenuIcon } from '../assets/menu-icon.svg'
import { ReactComponent as CopyIcon } from '../assets/copy-icon.svg'
import { ReactComponent as LinkIcon } from '../assets/link-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

import { formatDate } from '../utils/timestapFormater'
import { IFinalAsset } from '../hooks/useDatachainOutput'

const shareClipboard = (text: any) => {
  const fakeBtn = document.createElement('button')
  const clipboard = new ClipboardJS(fakeBtn, {
    text() {
      return text
    },
  })
  const clipboardPromise = new Promise((resolve, reject) => {
    clipboard.on('success', () => {
      resolve(true)
      clipboard.destroy()
    })
    clipboard.on('error', (e: any) => {
      clipboard.destroy()
      reject()
    })
  })
  fakeBtn.click()
  return clipboardPromise
}

interface IAssetFile extends IFinalAsset {
  datasetId?: string
}

export const AssetFile = ({
  assetName,
  imageUrl,
  currentLocation,
  timestamp,
  status,
  failedReason,
  datasetId,
  assetNumber,
}: IAssetFile) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const timeFormat = 'DD MMM YYYY HH:mm:ss'
  const hovermessage = 'Verified successfully'

  const date = formatDate(timestamp / 1000, timeFormat)
  const message = status === 'ok' ? hovermessage : failedReason
  const navigate = useNavigate()

  const onCopyToClipboard = () => {
    shareClipboard(assetNumber)
    handleClose()
  }
  const onRedirectToDataset = () => {
    if (datasetId) {
      navigate(`/dataset/${datasetId}`)
    }
    handleClose()
  }
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
          <Tooltip title={message} placement="top">
            <IconCheck />
          </Tooltip>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText>View details</ListItemText>
            </MenuItem>
            {datasetId && (
              <MenuItem onClick={onRedirectToDataset}>
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText>Go to datasets</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={onCopyToClipboard}>
              <ListItemIcon>
                <CopyIcon />
              </ListItemIcon>
              <ListItemText>Copy asset ID</ListItemText>
            </MenuItem>
          </Menu>
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
