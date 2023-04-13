import React from 'react'

import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'

import { ReactComponent as Logo } from '../assets/images/tosiscan-logo-center.svg'
import TosiBackground from '../assets/images/tosiscan-background-1x.jpg'

import Header from './Header'
import Search from './Search'

const Wrapper = styled(Box)(() => ({
  position: 'relative',
  minHeight: '389px',
  backgroundImage: `url(${TosiBackground})`,
}))

const Hero = () => (
  <Wrapper>
    <Header />
    <Container sx={{ maxWidth: { xl: '520px' }, margin: '0 auto', paddingX: { xs: 0 }, textAlign: 'center' }}>
      <Logo style={{ width: '236px', height: '69px', marginTop: '72px' }} />

      <Typography variant="body1" color="success.50" m={1} mb={4}>
        Explore the world’s greenest blockchain
      </Typography>

      <Search />
    </Container>
  </Wrapper>
)

export default () => <Hero />
