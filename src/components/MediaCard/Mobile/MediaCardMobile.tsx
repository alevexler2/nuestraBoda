import type { MediaCardInterface } from '../../../interface/MediaCardInterface'
import styles from './styles.module.scss'

const MediaCardMobile = ({ subtitle, imageUrl, activeImage, handleClick, cardRef, mediaType }: MediaCardInterface) => {
  const isActive = activeImage === imageUrl;

  return (
    <div
      ref={cardRef}
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {mediaType === 'video' && (
        <video className={styles.media} src={imageUrl} controls />
      )}

      <div className={styles.text}>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

    </div>
  )
}

export default MediaCardMobile