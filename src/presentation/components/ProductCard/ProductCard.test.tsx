import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from '@/presentation/components/ProductCard/ProductCard'
import type { ProductListItem } from '@/domain/entities/Product'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img data-fill={fill ? 'true' : undefined} {...rest} />
  },
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

const mockProduct: ProductListItem = {
  id: 'prod-1',
  brand: 'Apple',
  name: 'iPhone 15 Pro',
  basePrice: 999,
  imageUrl: '/iphone15.jpg',
}

describe('ProductCard', () => {
  it('should render the product brand', () => {
    render(<ProductCard product={mockProduct} />)

    screen.getByText('Apple')
  })

  it('should render the product name', () => {
    render(<ProductCard product={mockProduct} />)

    screen.getByText('iPhone 15 Pro')
  })

  it('should render the product price with EUR', () => {
    render(<ProductCard product={mockProduct} />)

    screen.getByText('999 EUR')
  })

  it('should render a link to the product details page', () => {
    render(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/details/prod-1')
  })

  it('should render the product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText('Apple iPhone 15 Pro')
    expect(image.getAttribute('src')).toBe('/iphone15.jpg')
  })

  it('should render as an article element', () => {
    render(<ProductCard product={mockProduct} />)

    screen.getByRole('article')
  })
})
