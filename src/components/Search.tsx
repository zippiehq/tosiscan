import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, TextField } from '@mui/material'
import { styled } from '@mui/system'

import SearchIcon from '@mui/icons-material/Search'

const SearchField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  width: '100%',

  '& .MuiInputBase-root input': {
    boxSizing: 'border-box',
    width: '100%',
    height: 'auto',
    paddingTop: theme.spacing(1.75),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(1.75),
    paddingLeft: theme.spacing(6),
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: 1.5,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '100px',

    '&::placeholder': {
      paddingTop: theme.spacing(0.75), // TODO find out why placeholder is not aligning vertically in center
      color: 'grey.400',
    },
  },

  '& .MuiInputBase-root fieldset': {
    border: 'none',
    borderRadius: '100px',
  },
}))

const BoxField = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '640px',
  margin: '0 auto',
}))

const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const encoded = encodeURIComponent(searchValue)
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && encoded) {
      navigate(`/search-asset/${encoded}`)
      setSearchValue('')
    }
  }

  return (
    <BoxField>
      <SearchIcon
        style={{
          position: 'absolute',
          zIndex: 10,
          top: '50%',
          left: '16px',
          transform: 'translateY(-50%)',
          fill: '#667085',
        }}
      />

      <SearchField
        type="text"
        placeholder="Token URL or name"
        onKeyDown={handleKeyDown}
        onChange={(ev) => {
          setSearchValue(ev.target.value)
        }}
        value={searchValue}
        aria-label="Search"
      />
    </BoxField>
  )
}

export default () => <Search />
