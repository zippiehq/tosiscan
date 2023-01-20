import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, TextField, InputAdornment } from '@mui/material'
import { styled } from '@mui/system'

import SearchIcon from '@mui/icons-material/Search'

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root input': {
    fontSize: '16px',
    backgroundColor: 'white',
    borderRadius: '100px',
    height: '52px',
    boxSizing: 'border-box',
  },

  '& .MuiInputBase-root fieldset': {
    border: 'none',
    borderRadius: '100px',
  },
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
    <SearchField
      variant="outlined"
      sx={{
        bgcolor: 'white',
        borderRadius: '100px',
        width: '100%',
      }}
      type="text"
      placeholder="Token URL or name"
      onKeyDown={handleKeyDown}
      onChange={(ev) => {
        setSearchValue(ev.target.value)
      }}
      value={searchValue}
      aria-label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              style={{
                fill: '#667085',
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default () => <Search />
