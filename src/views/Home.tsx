import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { Container, Box, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'

import BgCta from '../assets/images/bg-cta.png'

import VerificationList from '../components/VerificationList'

const ContentContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1280px',
  },
  [theme.breakpoints.up('xs')]: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  margin: '0 auto',
}))

const CtaWrapper = styled(Box)(({ theme }) => ({
  marginTop: '133px',
  marginBottom: '95px',
  padding: '64px',
  backgroundColor: theme.palette.grey['50'],
  borderRadius: '24px',
  backgroundImage: `url(${BgCta})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right',
}))

const Home = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ paddingTop: '80px' }}>
      <ContentContainer>
        <Typography
          variant="h5"
          color="grey.900"
          mb={4}
          sx={{ textAlign: 'center', fontWeight: 600, lineHeight: 1.27 }}
        >
          Latest verifications
        </Typography>

        <VerificationList />
      </ContentContainer>

      <ContentContainer sx={{ paddingX: { xl: 4 } }}>
        <CtaWrapper>
          <Box sx={{ width: '480px' }}>
            <Typography variant="h3" color="grey.900" mb={2.5}>
              Climate and nature positive
            </Typography>
            <Typography variant="body1" color="grey.500" mb={5} sx={{ fontSize: '18px', lineHeight: 1.56 }}>
              Learn how each data verification on the TOSI chain will make the planet&apos;s forests and biodiversity
              grow.
            </Typography>

            <Box>
              <Button
                component={RouterLink}
                to="/coming-soon"
                variant="contained"
                sx={{
                  marginRight: 1.5,
                  paddingY: 1.5,
                  paddingX: 2.5,
                }}
              >
                Learn more
              </Button>
              <Button
                component={RouterLink}
                to="/coming-soon"
                variant="outlined"
                sx={{
                  paddingY: 1.5,
                  paddingX: 2.5,
                }}
                onClick={() => navigate('')}
              >
                Become a publisher
              </Button>
            </Box>
          </Box>
        </CtaWrapper>
      </ContentContainer>
    </Box>
  )
}

export default () => <Home />
