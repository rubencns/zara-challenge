import style from './ProductColorPicker.module.css'
import type { ColorPickerOption } from '@/presentation/types/ColorPickerOption'

interface Props {
  options: ColorPickerOption[]
  selected: ColorPickerOption['name']
  onChange: (option: ColorPickerOption) => void
}

const ProductColorPicker = (props: Props) => {
  const { options, selected, onChange } = props

  return (
    <div className={style.colorPickerContainer}>
      <div className={style.colorPicker}>
        {options.map((option) => (
          <button
            type="button"
            key={option.name}
            className={[style.colorPickerOption, selected === option.name ? style.selected : ''].join(' ')}
            aria-label={option.name}
            aria-pressed={selected === option.name}
            onClick={() => onChange(option)}
          >
            <div className={style.color} style={{ backgroundColor: option.color }}></div>
          </button>
        ))}
      </div>
      <p className="text-extra-small">{selected}</p>
    </div>
  )
}

export default ProductColorPicker
