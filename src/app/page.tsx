import { Suspense } from 'react'
import { searchProducts } from '@/infrastructure/factories/serverUseCases'
import ProductSearch from '@/presentation/components/ProductSearch/ProductSearch'
import Loading from '@/presentation/components/Loading/Loading'
import style from './page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zara Challenge',
  description: 'Browse and search our catalog of mobile phones.',
}

export default async function Home() {
  const products = await searchProducts({ search: '', limit: 20 })

  return (
    <main className={style.main}>
      <Suspense fallback={<Loading />}>
        <ProductSearch initialProducts={products} />
      </Suspense>
    </main>
  )
}
