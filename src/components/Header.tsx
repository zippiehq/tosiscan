import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import { AppBar, Container, Toolbar, Link, List, ListItem } from '@mui/material'
import { styled } from '@mui/system'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { ReactComponent as Logo } from '../assets/images/logo-tosi-scan-white.svg'
import { ReactComponent as LogoColors } from '../assets/images/logo-tosi-scan-colors.svg'

interface NavLinkProps {
  isDark: boolean
}
const NavLink = styled(Link)<NavLinkProps>(({ theme, isDark }) => ({
  paddingTop: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.43,
  color: isDark ? '#ffffff' : '#667085',
  textDecoration: 'none',
})) as any

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
              <NavLink component={RouterLink} to="/" isDark={isDark}>
                Home
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ width: 'auto', marginRight: 1.25 }}>
              <NavLink component={RouterLink} to="/coming-soon" isDark={isDark}>
                Digital Assets
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ width: 'auto', marginRight: 1.25 }}>
              <NavLink component={RouterLink} to="/coming-soon" isDark={isDark}>
                File Verifications
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ width: 'auto', marginRight: 1.25 }}>
              <NavLink
                component={RouterLink}
                to="/coming-soon"
                sx={{ display: 'flex', alignItems: 'center' }}
                isDark={isDark}
              >
                Publishers
                <KeyboardArrowDownIcon style={{ marginLeft: '8px' }} />
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ width: 'auto' }}>
              <NavLink
                isDark={isDark}
                component={RouterLink}
                to="/coming-soon"
                sx={{
                  paddingY: 1.25,
                  paddingX: 2,
                  border: '1px solid rgba(236, 253, 243, 0.5)',
                  borderRadius: '100px',
                }}
              >
                Become a publisher
              </NavLink>
            </ListItem>
          </List>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default () => <Header />
