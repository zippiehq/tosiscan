import React from 'react'

import { Box, Container } from '@mui/material'
import { styled } from '@mui/system'

import TosiBackground from '../assets/images/tosiscan-bg-1440x88-2x-min.jpg'

import Header from './Header'
import Search from './Search'

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '88px',
  backgroundImage: `url(${TosiBackground})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}))

export default function SmallHero() {
  return (
    <>
      <Header />
      <Wrapper>
        <Container
          sx={{
            maxWidth: { xl: '1280px' },
            margin: '0 auto',
            paddingX: { xs: 0 },
            textAlign: 'center',
          }}
        >
          <Search />
        </Container>
      </Wrapper>
    </>
  )
}
