import { ReactNode } from 'react'
import style from './Button.module.css'

interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  fitContent?: boolean
  children: ReactNode
  onClick: () => void
}

const Button = (props: Props) => {
  const { variant = 'primary', disabled = false, fitContent, children, onClick } = props

  const classnames = [style.button, style[variant], fitContent ? style.fitContent : ''].join(' ')

  return (
    <button type="button" className={classnames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
