import type { MediaCardInterface } from '../../../interface/MediaCardInterface'
import styles from './styles.module.scss'

const MediaCardDesktop = ({ subtitle, imageUrl }: MediaCardInterface) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.text}>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

    </div>
  )
}

export default MediaCardDesktop