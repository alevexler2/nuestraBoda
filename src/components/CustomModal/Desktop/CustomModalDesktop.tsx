import styles from './styles.module.scss'

interface CustomModalDesktopProps {
  children: React.ReactNode;
  onClose: () => void;
}

const CustomModalDesktop: React.FC<CustomModalDesktopProps> = ({ children, onClose }) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default CustomModalDesktop