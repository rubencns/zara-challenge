import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '@/presentation/components/SearchInput/SearchInput'

vi.mock('@/assets/svgs/close.svg', () => ({
  default: () => <svg data-testid="close-icon" />,
}))

describe('SearchInput', () => {
  const user = userEvent.setup()

  it('should render the search input', () => {
    render(<SearchInput search="" onSearch={vi.fn()} />)

    screen.getByLabelText('Search for a smartphone')
  })

  it('should display the search value', () => {
    render(<SearchInput search="iPhone" onSearch={vi.fn()} />)

    const input = screen.getByLabelText('Search for a smartphone') as HTMLInputElement
    expect(input.value).toBe('iPhone')
  })

  it('should call onSearch when typing', async () => {
    const handleSearch = vi.fn()
    render(<SearchInput search="" onSearch={handleSearch} />)

    await user.type(screen.getByLabelText('Search for a smartphone'), 'S')

    expect(handleSearch).toHaveBeenCalledWith('S')
  })

  it('should not show clear button when search is empty', () => {
    render(<SearchInput search="" onSearch={vi.fn()} />)

    expect(screen.queryByLabelText('Clear search')).toBeNull()
  })

  it('should show clear button when search has value', () => {
    render(<SearchInput search="test" onSearch={vi.fn()} />)

    screen.getByLabelText('Clear search')
  })

  it('should call onSearch with empty string when clear button is clicked', async () => {
    const handleSearch = vi.fn()
    render(<SearchInput search="test" onSearch={handleSearch} />)

    await user.click(screen.getByLabelText('Clear search'))

    expect(handleSearch).toHaveBeenCalledWith('')
  })

  it('should have the correct placeholder text', () => {
    render(<SearchInput search="" onSearch={vi.fn()} />)

    screen.getByPlaceholderText('Search for a smartphone...')
  })

  it('should render as a text input', () => {
    render(<SearchInput search="" onSearch={vi.fn()} />)

    const input = screen.getByLabelText('Search for a smartphone')
    expect(input.getAttribute('type')).toBe('text')
  })
})
