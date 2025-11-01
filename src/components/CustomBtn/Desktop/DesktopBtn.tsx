import type { CustomBtnInterface } from '../../../interface/CustomBtnInterface'
import styles from './styles.module.scss'

const DesktopBtn = ({ value, handleChange, icon, hasIcon }: CustomBtnInterface) => {
  return (
    <button type="submit" className={`${styles.container} ${hasIcon && styles.icon}`} onClick={handleChange}>
      {hasIcon && (
        icon()
      )}
      {value}
    </button>
  )
}

export default DesktopBtn