import React from 'react'

import { Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { withStyles } from '@mui/material/styles'

import BgHeroDecorationLeft from '../assets/images/bg-hero-decoration-left.svg'
import BgHeroDecorationRight from '../assets/images/bg-hero-decoration-right.svg'

import Header from './Header'
import Search from './Search'
import { theme } from '../theme'

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '88px',
  background:
    'linear-gradient(117.62deg, #07939c -4.96%, #24b871 95.78%), ' +
    'linear-gradient(90deg, #7f56d9 0%, #9e77ed 100%), ' +
    'linear-gradient(90deg, #322272 0%, #5329ae 100%)',
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
