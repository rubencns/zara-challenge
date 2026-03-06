import { Suspense, cache } from 'react'
import { notFound } from 'next/navigation'
import { getProductDetails } from '@/infrastructure/factories/serverUseCases'
import ProductDetailsClient from '@/presentation/components/ProductDetailsClient/ProductDetailsClient'
import Loading from '@/presentation/components/Loading/Loading'
import style from './page.module.css'
import type { Metadata } from 'next'

const getCachedProduct = cache(async (id: string) => {
  try {
    return await getProductDetails(id)
  } catch {
    return notFound()
  }
})

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getCachedProduct(id)
  return {
    title: `${product.name} - ${product.brand}`,
    description: product.description,
  }
}

export default async function Details({ params }: Props) {
  const { id } = await params
  const product = await getCachedProduct(id)

  return (
    <main className={style.productDetailsMain}>
      <Suspense fallback={<Loading />}>
        <ProductDetailsClient product={product} />
      </Suspense>
    </main>
  )
}
