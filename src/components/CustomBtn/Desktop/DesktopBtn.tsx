import type { CustomBtnInterface } from '../../../interface/CustomBtnInterface'
import { Camera } from "lucide-react";
import styles from './styles.module.scss'

const DesktopBtn = ({ value, handleChange, icon }: CustomBtnInterface) => {
  return (
    <button type="submit" className={`${styles.container} ${icon && styles.icon}`} onClick={handleChange}>
      {icon && (
        <Camera
          size={17}
          strokeWidth={2}
          className={styles.icon}
        />
      )}
      {value}
    </button>
  )
}

export default DesktopBtn