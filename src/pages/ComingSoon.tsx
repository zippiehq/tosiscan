import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ReactComponent as TosiScanLogo } from '../assets/tosi-scan-logo.svg'
import { ReactComponent as ArrowLeftIcon } from '../assets/arrow-left-icon.svg'
import Footer from '../components/footer/Footer'
import { linkedInIcon, twitterIcon, youtubeIcon } from '../assets'

export default function ComingSoon() {
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
        <TosiScanLogo />

        <Typography
          mt={3}
          mb={3}
          sx={{
            fontSize: '72px',
            color: '#101828',
            fontWeight: '600',
          }}
        >
          Coming soon
        </Typography>

        <Typography
          sx={{
            fontSize: '20px',
            color: '#667085',
            maxWidth: '480px',
          }}
        >
          TOSI is the world’s greenest decentralized solution for asset and data verification.
        </Typography>

        <Box display="flex" mt={6}>
          <Button
            variant="outlined"
            startIcon={<ArrowLeftIcon />}
            sx={{
              color: 'text.primary',
              borderColor: 'text.primary',
            }}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>

          <Button variant="contained" sx={{ marginLeft: 1.5 }} onClick={() => navigate('/')}>
            Take me home
          </Button>
        </Box>
        <Box display="flex" mt={10}>
          <IconButton onClick={() => onExternalLinkClick('https://twitter.com/tosichain')} sx={{ marginRight: 2 }}>
            <img src={twitterIcon} alt="Twitter Icon" />
          </IconButton>
          <IconButton
            sx={{ marginRight: 2 }}
            onClick={() => onExternalLinkClick('https://www.youtube.com/channel/UCMdL-559OXnd95KocIRJsVA')}
          >
            <img src={youtubeIcon} alt="youtube Icon" />
          </IconButton>{' '}
          <IconButton onClick={() => onExternalLinkClick('https://www.linkedin.com/company/tosichain.com')}>
            <img src={linkedInIcon} alt="linkedin Icon" />
          </IconButton>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
