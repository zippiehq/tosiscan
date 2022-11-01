import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { searchIcon } from '../../assets'

export default function SearchBar() {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [assetTokenId, setAssetTokenId] = useState('')
  const [assetContract, setAssetContract] = useState('')

  useEffect(() => {
    if (!searchValue) {
      return
    }

    setAssetContract(searchValue.split('/').slice(-2, -1)[0])
    setAssetTokenId(searchValue.substring(searchValue.lastIndexOf('/') + 1))
  }, [searchValue])

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      navigate(`/search-asset/${assetContract}/${assetTokenId}`)
    }
  }
  return (
    <div className="search-box">
      <img src={searchIcon} alt="Search Icon" />
      <input
        type="text"
        placeholder="Token URL"
        onKeyDown={handleKeyDown}
        onChange={(ev) => {
          setSearchValue(ev.target.value)
        }}
      />
    </div>
  )
}
