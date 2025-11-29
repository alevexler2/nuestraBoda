import type { MediaCardInterface } from "../../../interface/MediaCardInterface";
import CustomModalContainer from "../../CustomModal/CustomModalContainer";
import styles from "./styles.module.scss";
import { Oval } from "react-loader-spinner";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import CustomInputContainer from "../../CustomInput/CustomInputContainer";

const MediaCardDesktop = ({
  subtitle,
  imageUrl,
  cardRef,
  mediaType,
  owner,
  onDelete,
  showAlertModal,
  setShowAlertModal,
  handleDelete,
  isLoading,
  handleLike,
  likesCount,
  isLikedByUser,
  handleShowComments,
  value,
  setValue,
  handleSendComment,
  renderComments,
  comments,
  commentsRef,
  viewLikes,
  handleShowLikes,
  renderLikes,
  likes,
}: MediaCardInterface) => {
  return (
    <div ref={cardRef} className={styles.container}>
      {/* Sección izquierda - Media */}
      <div className={styles.mediaSection}>
        <div className={styles.mediaWrapper}>
          {mediaType === 1 && (
            <img src={imageUrl} alt={subtitle} className={styles.media} />
          )}

          {mediaType === 2 && (
            <video className={styles.media} src={imageUrl} controls />
          )}
        </div>
      </div>

      {/* Sección derecha - Interacciones */}
      <div ref={commentsRef} className={styles.interactionSection}>
        {/* Header con título y botón eliminar */}
        <div className={styles.interactionHeader}>
          <div className={styles.uploaderInfo}>
            <span>{subtitle}</span>
          </div>
          {owner && (
            <div
              className={styles.trashIcon}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e);
              }}
            >
              <Trash2 size={18} strokeWidth={1.8} />
            </div>
          )}
        </div>

        {/* Contenido: Likes o Comentarios */}
        {viewLikes ? (
          <div className={styles.contentContainer}>
            <h4 className={styles.contentTitle}>Listado de "Me gusta"</h4>
            <div className={styles.scrollableContent}>
              {renderLikes(styles)}
            </div>
          </div>
        ) : (
          <div className={styles.contentContainer}>
            {comments.length > 0 && (
              <h4 className={styles.contentTitle}>Listado de comentarios</h4>
            )}

            <div className={styles.scrollableContent}>
              {renderComments(styles)}
            </div>
          </div>
        )}

        <div className={styles.actionsContainer}>
          {/* Acciones (like y comment icons) */}
          <div className={styles.actions}>
            <div className={styles.likeIconWrapper} onClick={handleLike}>
              <Heart
                size={20}
                strokeWidth={1.8}
                className={isLikedByUser ? styles.liked : ""}
              />
              {likesCount > 0 && (
                <span className={styles.likeNumber}>{likesCount}</span>
              )}
            </div>
            <div
              className={styles.commentIconWrapper}
              onClick={handleShowComments}
            >
              <MessageCircle size={20} strokeWidth={1.8} />
              {comments.length > 0 && (
                <span className={styles.commentsBadge}>{comments.length}</span>
              )}
            </div>
          </div>

          {/* Contador de likes */}
          <div className={`${styles.likesCount}`} onClick={handleShowLikes}>
            {likesCount > 0 ? (
              <span>
                {likesCount === 1
                  ? `${likes[0]?.UserName || "Alguien"} dio "me gusta"`
                  : `${
                      (likes[0]?.UserName || "Alguien").split(" ")[0] ||
                      "Alguien"
                    } y ${likesCount - 1} persona${
                      likesCount - 1 > 1 ? "s" : ""
                    } más dieron "me gusta"`}
              </span>
            ) : (
              <span>¡Sé el primero en dar "me gusta"! 😄</span>
            )}
          </div>
        </div>
        {/* Input de comentario - siempre visible */}
        <div className={styles.inputWrapper}>
          <CustomInputContainer
            placeholder="Ingresa un comentario"
            value={value}
            setValue={setValue}
            handleSendComment={handleSendComment}
          />
        </div>
      </div>

      <CustomModalContainer
        isOpen={showAlertModal}
        setIsOpen={setShowAlertModal}
      >
        <div className={styles.modalContent}>
          <h3>¿Eliminar archivo?</h3>
          <p>Esta acción no se puede deshacer.</p>

          <div className={styles.modalButtons}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowAlertModal(false)}
            >
              Cancelar
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              {isLoading ? (
                <Oval
                  height={16}
                  width={16}
                  color="#ffffff"
                  secondaryColor="#ffffff"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  visible={true}
                  ariaLabel="loading"
                />
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </div>
      </CustomModalContainer>
    </div>
  );
};

export default MediaCardDesktop;
