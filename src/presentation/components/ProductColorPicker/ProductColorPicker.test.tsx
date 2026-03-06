import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductColorPicker from '@/presentation/components/ProductColorPicker/ProductColorPicker'
import type { ColorPickerOption } from '@/presentation/types/ColorPickerOption'

const mockOptions: ColorPickerOption[] = [
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Blue', color: '#0000FF' },
]

describe('ProductColorPicker', () => {
  const user = userEvent.setup()

  it('should render all color options', () => {
    render(<ProductColorPicker options={mockOptions} selected="Black" onChange={vi.fn()} />)

    screen.getByLabelText('Black')
    screen.getByLabelText('White')
    screen.getByLabelText('Blue')
  })

  it('should display the selected color name as text', () => {
    render(<ProductColorPicker options={mockOptions} selected="Black" onChange={vi.fn()} />)

    screen.getByText('Black')
  })

  it('should call onChange when a color option is clicked', async () => {
    const handleChange = vi.fn()
    render(<ProductColorPicker options={mockOptions} selected="Black" onChange={handleChange} />)

    await user.click(screen.getByLabelText('White'))

    expect(handleChange).toHaveBeenCalledWith({ name: 'White', color: '#FFFFFF' })
  })

  it('should mark the selected option with aria-pressed true', () => {
    render(<ProductColorPicker options={mockOptions} selected="Black" onChange={vi.fn()} />)

    expect(screen.getByLabelText('Black').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('White').getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByLabelText('Blue').getAttribute('aria-pressed')).toBe('false')
  })

  it('should render the correct number of buttons', () => {
    render(<ProductColorPicker options={mockOptions} selected="Black" onChange={vi.fn()} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('should update aria-pressed when different color is selected', () => {
    render(<ProductColorPicker options={mockOptions} selected="Blue" onChange={vi.fn()} />)

    screen.getByText('Blue')
    expect(screen.getByLabelText('Blue').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByLabelText('Black').getAttribute('aria-pressed')).toBe('false')
  })
})
