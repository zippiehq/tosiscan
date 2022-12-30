import { Box, Typography, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ClipboardJS from 'clipboard'
import Dialog from '@mui/material/Dialog'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'

import { styled } from '@mui/material/styles'

import { ReactComponent as IconClock } from '../assets/icon-clock.svg'
import { ReactComponent as IconLocation } from '../assets/images/icon-location-mark.svg'
import { ReactComponent as IconCheck } from '../assets/images/icon-check.svg'
import { ReactComponent as MenuIcon } from '../assets/menu-icon.svg'
import { ReactComponent as LinkIcon } from '../assets/link-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import { ReactComponent as CloseIcon } from '../assets/x-icon.svg'
import { ReactComponent as IconVerifiedTick } from '../assets/images/icon-verified-tick.svg'

import { formatDate } from '../utils/timestapFormater'
import { IFinalAsset } from '../hooks/useDatachainOutput'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // @ts-ignore
    backgroundColor: theme.palette.grey['25'],
  },
  // hide last border
  'td,th': {
    border: 0,
  },
}))

const hovermessage = 'Verified successfully'
const timeFormat = 'DD MMM YYYY HH:mm:ss'

const AssetDetails = ({ handleClose, status, failedReason, timestamp, assetName, currentLocation, imageUrl }: any) => {
  console.log('')
  const date = formatDate(timestamp / 1000, timeFormat)
  const message = status === 'ok' ? hovermessage : failedReason
  return (
    <Dialog
      fullScreen
      open
      PaperProps={{
        sx: {
          background: 'rgba(28, 36, 51, 0.56)',
        },
      }}
    >
      <Container sx={{ maxWidth: { xl: '1280px' }, margin: 'auto' }}>
        <Box display="flex" flexDirection="column">
          <Box ml="auto" mr="-32px">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                marginLeft: '-32px',
              }}
            >
              <CloseIcon style={{ width: '18px', height: '18px' }} />
            </IconButton>
          </Box>

          <Box bgcolor="white" borderRadius="8px" display="flex" width="100%">
            <Box bgcolor="grey.200" pt="24px" pl="35px" pr="35px" pb="86px" flex="1">
              <Box style={{ maxWidth: '839px', maxHeight: '596px', height: '100%', width: '100%' }}>
                <img src={imageUrl} alt={assetName} style={{ height: '100%', width: '100%' }} />
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              bgcolor="white"
              pt="32px"
              pl="24px"
              pr="24px"
              width="370px"
              pb={4}
            >
              <Box display="flex" alignItems="center" mb={1.5}>
                <Typography color="grey.900" fontSize="24px" fontWeight={600} mr={1}>
                  {assetName}
                </Typography>
                <Tooltip title={message} placement="top">
                  <IconCheck />
                </Tooltip>
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

              <Typography color="primary.700" fontSize="14px" mt={3} mb={3}>
                Properties
              </Typography>
              {/* eslint-disable-next-line react/no-unstable-nested-components */}
              <TableContainer component={(props) => <Paper sx={{ boxShadow: 'inherit' }} {...props} />}>
                <Table sx={{ minWidth: 332 }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <TableCell component="th" scope="row">
                        Timestamp
                      </TableCell>
                      <TableCell align="left">{date}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell component="th" scope="row">
                        Location
                      </TableCell>
                      <TableCell align="left">{currentLocation}</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell component="th" scope="row">
                        Coordinates
                      </TableCell>
                      <TableCell align="left">-6.0038725,37.3818094</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell component="th" scope="row">
                        Area
                      </TableCell>
                      <TableCell align="left">5,000 ha</TableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider sx={{ mb: 2, mt: 2 }} />

              <Typography color="grey.500" fontSize="13px" mb={1}>
                Published by
              </Typography>

              <Box display="flex" alignItems="center">
                <img src="/assets/logo-airimpact-publisher.svg" alt="" style={{ width: '24px', height: '24px' }} />
                <Typography color="grey.800" fontWeight={500} ml="6px">
                  AirImpact
                </Typography>
                <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
              </Box>

              <Typography color="grey.500" fontSize="13px" mb={1} mt={1.5}>
                Issued by
              </Typography>

              <Box display="flex" alignItems="center">
                <img src="/assets/pamps-foundation.svg" alt="" style={{ width: '24px', height: '24px' }} />

                <Typography color="grey.800" fontWeight={500} ml="6px">
                  PAMS Foundation
                </Typography>
                <IconVerifiedTick style={{ width: '12px', height: '12px', marginLeft: '6px' }} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}

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
      console.error(e)
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

export const AssetFile = (props: IAssetFile) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isAssetDetailsOpen, setIsAssetDetailsOpen] = React.useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { assetName, imageUrl, currentLocation, timestamp, status, failedReason, datasetId, assetNumber } = props

  const date = formatDate(timestamp / 1000, timeFormat)
  const message = status === 'ok' ? hovermessage : failedReason
  const navigate = useNavigate()

  const onCopyToClipboard = async () => {
    await shareClipboard(assetNumber)
    handleClose()
  }
  const onRedirectToDataset = () => {
    if (datasetId) {
      navigate(`/dataset/${datasetId}`)
    }
    handleClose()
  }
  const onAssetDetailsClick = () => {
    setIsAssetDetailsOpen(true)
    handleClose()
  }
  return (
    <>
      {isAssetDetailsOpen && <AssetDetails {...props} handleClose={() => setIsAssetDetailsOpen(false)} />}{' '}
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
              <MenuItem onClick={onAssetDetailsClick}>
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
    </>
  )
}
