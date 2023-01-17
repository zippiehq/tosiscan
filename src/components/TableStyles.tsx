import React from 'react'

import { TableRow, TableCell, Link, Container } from '@mui/material'
import { styled } from '@mui/system'

export const TableHeadCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.43,
  textAlign: 'left',
  color: theme.palette.grey['500'],
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.200',
}))

export const TableBodyCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1.8),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(1.8),
  paddingLeft: theme.spacing(3),
  lineHeight: 1.43,
  textAlign: 'left',
  color: theme.palette.grey['600'],
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.200',
}))

export const TableBodyRow = styled(TableRow)(() => ({
  cursor: 'pointer',

  '&.disabled': {
    backgroundColor: '#fdfdfd',
    opacity: 0.75,
    cursor: 'default !important',
  },
}))

export const CustomLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: 1.43,
  color: theme.palette.primary['600'],
  textDecoration: 'none',
})) as typeof Link

export const ContainerWithoutData = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1280px',
  },
  paddingTop: '120px',
  paddingRight: 0,
  paddingBottom: '120px',
  paddingLeft: 0,
}))
