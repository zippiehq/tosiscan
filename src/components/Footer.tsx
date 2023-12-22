import React from 'react'

import { Container, Box } from '@mui/material'

import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

import { ReactComponent as Logo } from '../assets/images/tosiscan-logo-header.svg'

const Footer = () => {
  const onExternalLinkClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <Box sx={{ paddingTop: '64px', backgroundColor: 'grey.900', position: 'fixed', bottom: '0px', width: '100%' }}>
      <Container sx={{ maxWidth: { xl: '1280px' }, margin: '0 auto', paddingX: { xs: 0, xl: 4 } }}>
        <Box sx={{ paddingBottom: '64px' }}>
          <Logo style={{ width: '112px', height: '32px' }} />
        </Box>

        {/* <Box
          pt={4}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'grey.800',
          }}
        >
          <Typography variant="body1" color="grey.300">
            Copyrighted by TOSI Foundation 2023
          </Typography>

          <Box>
            <IconButton
              onClick={() => onExternalLinkClick('https://twitter.com/tosichain')}
              sx={{ marginRight: 3, padding: 0 }}
            >
              <TwitterIcon style={{ fill: '#98a2b3' }} />
            </IconButton>

            <IconButton
              onClick={() => onExternalLinkClick('https://www.youtube.com/channel/UCMdL-559OXnd95KocIRJsVA')}
              sx={{ marginRight: 3, padding: 0 }}
            >
              <YouTubeIcon style={{ fill: '#98a2b3' }} />
            </IconButton>

            <IconButton
              onClick={() => onExternalLinkClick('https://www.linkedin.com/company/tosichain.com')}
              sx={{ padding: 0 }}
            >
              <LinkedInIcon style={{ fill: '#98a2b3' }} />
            </IconButton>
          </Box>
        </Box> */}
      </Container>
    </Box>
  )
}

export default () => <Footer />
