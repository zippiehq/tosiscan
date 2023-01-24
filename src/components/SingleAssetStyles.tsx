import React from 'react'

import { Container, Box, Typography, Link, Paper, ListItem } from '@mui/material'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabUnstyled from '@mui/base/TabUnstyled'
import { styled } from '@mui/system'

export const ContentContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1280px',
  },
  [theme.breakpoints.up('xs')]: {
    paddingRight: theme.spacing(2.5),
    paddingLeft: theme.spacing(2.5),
  },
  margin: '0 auto',
}))

export const Badge = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(0.25),
  paddingRight: theme.spacing(1.25),
  paddingBottom: theme.spacing(0.25),
  paddingLeft: theme.spacing(1.25),
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: 1.43,
  borderRadius: '16px',

  '&.primary': {
    color: theme.palette.primary['700'],
    backgroundColor: theme.palette.primary['50'],
  },

  '&.error': {
    color: theme.palette.error['700'],
    backgroundColor: theme.palette.error['50'],
  },

  '&.warning': {
    color: theme.palette.warning['700'],
    backgroundColor: theme.palette.warning['50'],
  },
}))

export const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

/* Will be replaced to button with a dropdown later */
export const LinkDropdown = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'flex-end',
  paddingTop: theme.spacing(1.25),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(2),
  fontWeight: 500,
  color: theme.palette.grey['700'],
  textDecoration: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['300'],
  borderRadius: '100px',
})) as typeof Link

export const SectionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['200'],
  borderRadius: '10px',
}))

export const AssetPropertyWrapper = styled(Paper)(({ theme }) => ({
  width: '250px',
  padding: theme.spacing(2),
  marginRight: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  backgroundColor: theme.palette.grey['25'],
  boxShadow: 'none',

  '&:nth-of-type(even)': {
    marginRight: 0,
  },

  '& p:first-of-type': {
    marginBottom: theme.spacing(0.5),
    fontSize: '14px',
    lineHeight: 1.43,
    color: theme.palette.grey['600'],
  },

  '& p:last-of-type': {
    fontSize: '20px',
    lineHeight: 1.5,
    color: theme.palette.grey['900'],
  },
}))

export const DatasetItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: theme.palette.grey['200'],

  '&:last-of-type': {
    borderBottom: 'none',
  },
}))

export const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: theme.spacing(5.5),
  padding: theme.spacing(0.75),
  backgroundColor: theme.palette.grey['50'],
  borderRadius: '8px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.grey['100'],
}))

export const Tab = styled(TabUnstyled)(({ theme }) => ({
  paddingTop: theme.spacing(1.25),
  paddingRight: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(1.75),
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  lineHeight: 1.5,
  fontWeight: 500,
  color: theme.palette.grey['700'],
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',

  '&.Mui-selected': {
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  },
}))
