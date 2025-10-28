import type { InputInterface } from '../../../interface/InputInterface'
import styles from './styles.module.scss'

const InptuDesktop = ({ placeholder, value, handleChange }: InputInterface) => {
  return (
    <input type="text" placeholder={placeholder} className={styles.container} value={value} onChange={handleChange}/>
  )
}

export default InptuDesktop