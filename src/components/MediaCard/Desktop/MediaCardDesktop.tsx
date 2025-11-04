import type { MediaCardInterface } from '../../../interface/MediaCardInterface'
import CustomModalContainer from '../../CustomModal/CustomModalContainer';
import styles from './styles.module.scss'
import { Oval } from "react-loader-spinner";
import { Heart, MessageCircle, Trash2 } from 'lucide-react';

const MediaCardDesktop = ({ subtitle, imageUrl, cardRef, mediaType, owner, onDelete, showAlertModal, setShowAlertModal, handleDelete, isLoading, handleLike, likesCount, isLikedByUser }: MediaCardInterface) => {
  const user = "Candelaria Reyes"
  const lastComment = "Hermoso recuerdo ❤️";

  return (
    <div
      ref={cardRef}
      className={styles.container}
    >
      <div className={styles.mediaWrapper}>
        <div className={styles.uploaderOverlay}>
          <span>{subtitle}</span>
        </div>
        {mediaType === 'image' && (
          <img src={imageUrl} alt={subtitle} className={styles.media} />
        )}

        {mediaType === 'video' && (
          <video className={styles.media} src={imageUrl} controls />
        )}

        {owner && (
          <div className={styles.closeButton} onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}>
            <Trash2 size={18} strokeWidth={1.8} />
          </div>
        )}
      </div>

      <div className={styles.cardLower}>
        <div className={styles.actions}>
          <Heart size={18} strokeWidth={1.8} onClick={handleLike} className={isLikedByUser ? styles.liked : ""}/>
          <MessageCircle size={18} strokeWidth={1.8} />
        </div>
        <div className={`${styles.likesCount}`}>
          {likesCount > 0 ? (
            <span>{likesCount} persona{likesCount > 1 ? "s" : ""} dio{likesCount > 1 ? "n" : ""} "me gusta"</span>
          ) : (
            <span>¡Sé el primero en dar "me gusta"! 😄</span>
          )}
        </div>
        <div className={styles.commentPreview}>
          <p className={styles.userName}>{user}:</p>
          <p>{lastComment}</p>
        </div>
        <div>
          Ver todos los comentarios
        </div>
      </div>
      <CustomModalContainer isOpen={showAlertModal} setIsOpen={setShowAlertModal}>
        <div className={styles.modalContent}>
          <h3>¿Eliminar archivo?</h3>
          <p>Esta acción no se puede deshacer.</p>

          <div className={styles.modalButtons}>
            <button className={styles.cancelButton} onClick={() => setShowAlertModal(false)}>
              Cancelar
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              {isLoading ? (
                <Oval
                  height={16}
                  width={16}
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  visible={true}
                  ariaLabel="loading"
                />
              ) : "Eliminar"}
            </button>
          </div>
        </div>
      </CustomModalContainer>
    </div>
  )
}

export default MediaCardDesktop