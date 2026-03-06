import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/presentation/components/Button/Button'

describe('Button', () => {
  const user = userEvent.setup()

  it('should render children text', () => {
    render(<Button onClick={vi.fn()}>Click me</Button>)

    expect(screen.getByRole('button').textContent).toBe('Click me')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(
      <Button onClick={vi.fn()} disabled>
        Disabled
      </Button>,
    )

    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('should not be disabled by default', () => {
    render(<Button onClick={vi.fn()}>Enabled</Button>)

    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )

    await user.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should have type="button"', () => {
    render(<Button onClick={vi.fn()}>Submit</Button>)

    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('should render with primary variant by default', () => {
    const { container } = render(<Button onClick={vi.fn()}>Primary</Button>)
    const button = container.querySelector('button')

    expect(button?.className).toContain('primary')
  })

  it('should render with secondary variant', () => {
    const { container } = render(
      <Button onClick={vi.fn()} variant="secondary">
        Secondary
      </Button>,
    )
    const button = container.querySelector('button')

    expect(button?.className).toContain('secondary')
  })

  it('should apply fitContent class when fitContent is true', () => {
    const { container } = render(
      <Button onClick={vi.fn()} fitContent>
        Fit
      </Button>,
    )
    const button = container.querySelector('button')

    expect(button?.className).toContain('fitContent')
  })
})
