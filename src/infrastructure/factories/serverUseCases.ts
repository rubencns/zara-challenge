import { createApiProductRepository } from '@/infrastructure/repositories/ApiProductRepository'
import { createSearchProducts } from '@/application/use-cases/products/searchProducts'
import { createGetProductDetails } from '@/application/use-cases/products/getProductDetails'

const productRepository = createApiProductRepository()

export const searchProducts = createSearchProducts(productRepository)
export const getProductDetails = createGetProductDetails(productRepository)
