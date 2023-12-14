import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

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
    </Box>
  )
}

export default () => <Home />
