'use client'

import CloseIcon from '@/assets/svgs/close.svg'
import { ChangeEvent } from 'react'
import style from './SearchInput.module.css'

interface Props {
  search: string
  onSearch: (value: string) => void
}

const SearchInput = (props: Props) => {
  const { search, onSearch } = props

  const handleClearSearch = () => onSearch('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className={style.searchInputContainer}>
      <input
        className={style.searchInput}
        type="text"
        placeholder="Search for a smartphone..."
        aria-label="Search for a smartphone"
        value={search}
        onChange={handleSearch}
      />
      {search !== '' && (
        <button
          className={style.searchInputClearButton}
          type="button"
          onClick={handleClearSearch}
          aria-label="Clear search"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

export default SearchInput
