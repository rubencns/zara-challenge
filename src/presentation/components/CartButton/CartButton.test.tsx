import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CartButton from '@/presentation/components/CartButton/CartButton'

vi.mock('@/assets/svgs/bag.svg', () => ({
  default: () => <svg data-testid="bag-icon" />,
}))

vi.mock('@/assets/svgs/bag-filled.svg', () => ({
  default: () => <svg data-testid="bag-filled-icon" />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('CartButton', () => {
  it('should render a link with the correct href', () => {
    render(<CartButton href="/cart" amount={0} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/cart')
  })

  it('should display the amount', () => {
    render(<CartButton href="/cart" amount={3} />)

    screen.getByText('3')
  })

  it('should render empty bag icon when amount is 0', () => {
    render(<CartButton href="/cart" amount={0} />)

    screen.getByTestId('bag-icon')
    expect(screen.queryByTestId('bag-filled-icon')).toBeNull()
  })

  it('should render filled bag icon when amount is greater than 0', () => {
    render(<CartButton href="/cart" amount={2} />)

    screen.getByTestId('bag-filled-icon')
    expect(screen.queryByTestId('bag-icon')).toBeNull()
  })

  it('should have accessible label with plural for 0 items', () => {
    render(<CartButton href="/cart" amount={0} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('aria-label')).toBe('View shopping cart, 0 items')
  })

  it('should have accessible label with singular for 1 item', () => {
    render(<CartButton href="/cart" amount={1} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('aria-label')).toBe('View shopping cart, 1 item')
  })

  it('should display zero amount', () => {
    render(<CartButton href="/cart" amount={0} />)

    screen.getByText('0')
  })
})
