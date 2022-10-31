import React, { useState } from 'react'

import { Menu, MenuItem, Button } from '@mui/material'
import { styled } from '@mui/system'

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const ButtonFilter = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  zIndex: 10,
  width: '122px',
  fontSize: '16px',
  lineHeight: 1.5,
  color: theme.palette.grey['900'],
  textTransform: 'none',
  transform: 'translateY(-50%)',
}))

const MenuFilter = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    marginTop: theme.spacing(1),
    marginLeft: '-48px',
  },
}))

const SearchFilter = () => {
  const [filter, setFilter] = useState('All filter')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (event: any) => {
    setFilter(event.target.outerText)
    handleClose()
  }

  return (
    <>
      <ButtonFilter
        id="filter-button"
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      >
        {filter}
      </ButtonFilter>

      <MenuFilter
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        <MenuItem onClick={handleSelect}>All Filter</MenuItem>
        <MenuItem onClick={handleSelect}>Asset URL</MenuItem>
        <MenuItem onClick={handleSelect}>Asset ID</MenuItem>
        <MenuItem onClick={handleSelect}>Contract Address</MenuItem>
      </MenuFilter>
    </>
  )
}

export default () => <SearchFilter />
