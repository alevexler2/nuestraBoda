import { Oval } from "react-loader-spinner";
import type { MediaCardInterface } from "../../../interface/MediaCardInterface";
import CustomModalContainer from "../../CustomModal/CustomModalContainer";
import styles from "./styles.module.scss";
import { Heart, MessageCircle, Trash2, User, X } from "lucide-react";
import CustomInputContainer from "../../CustomInput/CustomInputContainer";

const MediaCardTablet = ({
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
  viewComments,
  value,
  setValue,
  handleSendComment,
  renderComments,
  comments,
  commentsRef,
  isLastCommentOwn,
  viewLikes,
  handleShowLikes,
  renderLikes,
  handleClose,
  likes,
}: MediaCardInterface) => {
  return (
    <div ref={cardRef} className={styles.container}>
      <div className={styles.mediaWrapper}>
        <div className={styles.uploaderOverlay}>
          <span>{subtitle}</span>
        </div>
        {mediaType === 1 && (
          <img src={imageUrl} alt={subtitle} className={styles.media} />
        )}

        {mediaType === 2 && (
          <video className={styles.media} src={imageUrl} controls />
        )}

        {owner && (
          <div
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e);
            }}
          >
            <Trash2 size={18} strokeWidth={1.8} />
          </div>
        )}
      </div>

      <div
        ref={commentsRef}
        className={`${styles.cardLower} ${
          viewComments || viewLikes ? styles.showComments : ""
        }`}
      >
        <div className={styles.actions}>
          <div className={styles.actionsRight}>
            <div className={styles.likeIconWrapper} onClick={handleLike}>
              <Heart
                size={18}
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
              <MessageCircle size={18} strokeWidth={1.8} />
              {comments.length > 0 && (
                <span className={styles.commentsBadge}>{comments.length}</span>
              )}
            </div>
          </div>
          {(viewComments || viewLikes) && <X size={20} onClick={handleClose} />}
        </div>
        <div className={`${styles.likesCount}`} onClick={handleShowLikes}>
          {likesCount > 0 ? (
            <span>
              {!viewComments &&
                !viewLikes &&
                (likesCount === 1
                  ? `${likes[0]?.UserName || "Alguien"} dio "me gusta"`
                  : `${
                      (likes[0]?.UserName || "Alguien").split(" ")[0] ||
                      "Alguien"
                    } y ${likesCount - 1} persona${
                      likesCount - 1 > 1 ? "s" : ""
                    } más dieron "me gusta"`)}
            </span>
          ) : (
            <span>¡Sé el primero en dar "me gusta"! 😄</span>
          )}
        </div>

        {viewLikes ? (
          <div className={styles.commentsContainer}>
            <div className={styles.commets}>{renderLikes(styles)}</div>
          </div>
        ) : viewComments ? (
          <div className={styles.commentsContainer}>
            <div className={styles.commets}>{renderComments(styles)}</div>

            <CustomInputContainer
              placeholder="Ingresa un comentario"
              value={value}
              setValue={setValue}
              handleSendComment={handleSendComment}
            />
          </div>
        ) : (
          <>
            <div
              className={`${styles.lastCommentPreview} ${
                isLastCommentOwn ? styles.isLastCommentOwn : ""
              }`}
            >
              {comments.length > 0 && (
                <div className={styles.userNameContainer}>
                  <User
                    size={18}
                    strokeWidth={1.8}
                    className={isLastCommentOwn ? styles.isLastCommentOwn : ""}
                  />
                  <p
                    className={`${styles.userName} ${
                      isLastCommentOwn ? styles.isLastCommentOwn : ""
                    }`}
                  >
                    {isLastCommentOwn
                      ? "Yo"
                      : comments[comments.length - 1]?.UserName}
                    :{}
                  </p>
                </div>
              )}
              <p>{comments[comments.length - 1]?.CommentText}</p>
            </div>

            <div
              className={styles.viewAllComments}
              onClick={handleShowComments}
            >
              Ver todos los comentarios
            </div>
          </>
        )}
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

export default MediaCardTablet;
