import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductStorageSelector from '@/presentation/components/ProductStorageSelector/ProductStorageSelector'

const mockOptions = ['128GB', '256GB', '512GB']

describe('ProductStorageSelector', () => {
  const user = userEvent.setup()

  it('should render all storage options', () => {
    render(<ProductStorageSelector options={mockOptions} selected="128GB" onChange={vi.fn()} />)

    screen.getByText('128GB')
    screen.getByText('256GB')
    screen.getByText('512GB')
  })

  it('should call onChange when a storage option is clicked', async () => {
    const handleChange = vi.fn()
    render(<ProductStorageSelector options={mockOptions} selected="128GB" onChange={handleChange} />)

    await user.click(screen.getByText('256GB'))

    expect(handleChange).toHaveBeenCalledWith('256GB')
  })

  it('should mark the selected option with aria-pressed true', () => {
    render(<ProductStorageSelector options={mockOptions} selected="256GB" onChange={vi.fn()} />)

    expect(screen.getByText('128GB').getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByText('256GB').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('512GB').getAttribute('aria-pressed')).toBe('false')
  })

  it('should render the correct number of buttons', () => {
    render(<ProductStorageSelector options={mockOptions} selected="128GB" onChange={vi.fn()} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('should have type="button" on all options', () => {
    render(<ProductStorageSelector options={mockOptions} selected="128GB" onChange={vi.fn()} />)

    screen.getAllByRole('button').forEach((button) => {
      expect(button.getAttribute('type')).toBe('button')
    })
  })

  it('should handle single option', () => {
    render(<ProductStorageSelector options={['64GB']} selected="64GB" onChange={vi.fn()} />)

    screen.getByText('64GB')
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
})
