import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import { AppBar, Container, Toolbar, Link, List, ListItem } from '@mui/material'
import { styled } from '@mui/system'

import { ReactComponent as Logo } from '../assets/images/tosiscan-logo-header.svg'
import { ReactComponent as LogoColors } from '../assets/images/tosiscan-logo-light.svg'

const NavLink = styled(Link)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.43,
  textDecoration: 'none',
})) as typeof Link

const Header = () => {
  const { pathname } = useLocation()

  const isDark = pathname === '/'

  return (
    <AppBar component="nav" sx={{ position: 'relative', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container sx={{ maxWidth: { xl: '1280px' }, margin: '0 auto', paddingX: { xs: 0 } }}>
        <Toolbar
          sx={{ justifyContent: 'space-between', alignItems: 'center', minHeight: { xs: 'initial' }, paddingY: 1.25 }}
        >
          <Link component={RouterLink} to="/">
            {isDark ? (
              <Logo style={{ width: '96px', height: '28px' }} />
            ) : (
              <LogoColors style={{ width: '96px', height: '28px' }} />
            )}
          </Link>

          <List sx={{ display: 'flex', flexDirection: 'row', minHeight: 'initial', padding: 0 }}>
            <ListItem disablePadding sx={{ width: 'auto', marginRight: 1.25 }}>
              <NavLink component={RouterLink} to="/" sx={{ color: isDark ? 'white' : 'grey.500' }}>
                Home
              </NavLink>
            </ListItem>
          </List>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default () => <Header />
