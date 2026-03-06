import type { Product } from '@/domain/entities/Product'
import style from './ProductSpecifications.module.css'

interface Props {
  product: Product
}

const getSpecRows = (product: Product): { label: string; value: string }[] => [
  { label: 'Brand', value: product.brand },
  { label: 'Name', value: product.name },
  { label: 'Description', value: product.description },
  { label: 'Screen', value: product.specs.screen },
  { label: 'Resolution', value: product.specs.resolution },
  { label: 'Processor', value: product.specs.processor },
  { label: 'Main Camera', value: product.specs.mainCamera },
  { label: 'Selfie Camera', value: product.specs.selfieCamera },
  { label: 'Battery', value: product.specs.battery },
  { label: 'OS', value: product.specs.os },
  { label: 'Screen Refresh Rate', value: product.specs.screenRefreshRate },
]

const ProductSpecifications = (props: Props) => {
  const { product } = props

  return (
    <div className={style.productSpecifications}>
      {getSpecRows(product).map((row) => (
        <div key={row.label} className={style.productSpecificationsRow}>
          <p className="body-extra-small">{row.label}</p>
          <p className="text-extra-small">{row.value}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductSpecifications
