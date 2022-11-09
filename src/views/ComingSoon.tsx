import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { Box, IconButton, Typography, Button } from '@mui/material'

import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ReactComponent as Logo } from '../assets/images/logo-tosi-scan-colors.svg'

import Footer from '../components/Footer'

const ComingSoon = () => {
  const navigate = useNavigate()
  const onExternalLinkClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <Box
        p="32px 112px 100px 112px"
        maxWidth="1300px"
        margin="0 auto"
        display="flex"
        flexDirection="column"
        height="100%"
        flexGrow={2}
        justifyContent="center"
        width="100%"
      >
        <Logo style={{ width: '96px', height: '28px' }} />

        <Typography variant="h1" mt={3} mb={3} sx={{ fontWeight: '600', lineHeight: 1.25, color: 'grey.900' }}>
          Coming soon
        </Typography>

        <Typography
          sx={{
            fontSize: '20px',
            color: 'grey.500',
            maxWidth: '480px',
          }}
        >
          TOSI is the world’s greenest decentralized solution for asset and data verification.
        </Typography>

        <Box display="flex" mt={6}>
          <Button
            component={RouterLink}
            to=".."
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              marginRight: 1.5,
              paddingY: 1.5,
              paddingX: 2.5,
            }}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{
              paddingY: 1.5,
              paddingX: 2.5,
            }}
          >
            Take me home
          </Button>
        </Box>

        <Box display="flex" mt={10}>
          <IconButton onClick={() => onExternalLinkClick('https://twitter.com/tosichain')} sx={{ marginRight: 2 }}>
            <TwitterIcon style={{ fill: '#98a2b3' }} />
          </IconButton>

          <IconButton
            sx={{ marginRight: 2 }}
            onClick={() => onExternalLinkClick('https://www.youtube.com/channel/UCMdL-559OXnd95KocIRJsVA')}
          >
            <YouTubeIcon style={{ fill: '#98a2b3' }} />
          </IconButton>

          <IconButton onClick={() => onExternalLinkClick('https://www.linkedin.com/company/tosichain.com')}>
            <LinkedInIcon style={{ fill: '#98a2b3' }} />
          </IconButton>
        </Box>
      </Box>

      <Footer />
    </>
  )
}

export default () => <ComingSoon />
