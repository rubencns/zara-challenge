import style from './ProductStorageSelector.module.css'

interface Props {
  options: string[]
  selected: string
  onChange: (option: string) => void
}

const ProductStorageSelector = (props: Props) => {
  const { options, selected, onChange } = props

  return (
    <div className={style.storageSelector}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={[style.storageOption, selected === option ? style.selected : ''].join(' ')}
          aria-pressed={selected === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default ProductStorageSelector
