import type { InputInterface } from '../../../interface/InputInterface'
import styles from './styles.module.scss'
import { Send } from 'lucide-react';

const InptuDesktop = ({ placeholder, value, handleChange, onClick }: InputInterface) => {
  return (
    <div className={styles.inputWrapper}>
      <input type="text" placeholder={placeholder} className={styles.input} value={value} onChange={handleChange} onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick();
        }
      }} />
      <button className={styles.sendButton} onClick={onClick}>
        <Send size={20} />
      </button>
    </div>
  )
}

export default InptuDesktop