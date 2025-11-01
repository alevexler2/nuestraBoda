import type { CustomBtnInterface } from '../../../interface/CustomBtnInterface'
import styles from './styles.module.scss'

const DesktopBtn = ({ value, handleChange, icon, hasIicon }: CustomBtnInterface) => {
  return (
    <button type="submit" className={`${styles.container} ${hasIicon && styles.icon}`} onClick={handleChange}>
      {hasIicon && (
        icon()
      )}
      {value}
    </button>
  )
}

export default DesktopBtn