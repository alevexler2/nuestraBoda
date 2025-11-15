import { api } from "../../api/apiService";
import useBreakpoints from "../../hooks/useBreakpoints";
import type { MediaCardInterfaceContainer } from "../../interface/MediaCardInterfaceContainer";
import MediaCardDesktop from "./Desktop/MediaCardDesktop";
import MediaCardMobile from "./Mobile/MediaCardMobile";
import MediaCardTablet from "./Tablet/MediaCardTablet";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { User } from "lucide-react";

const MediaCardContainer = ({
  subtitle,
  imageUrl,
  mediaType,
  owner,
  setRefreshFlag,
  MediaFileID,
}: MediaCardInterfaceContainer) => {
  const { isMdDown, isLgDown } = useBreakpoints();
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  const currentUser = localStorage.getItem("userEmail") || "Invitado";

  const isLastCommentOwn =
    comments.length > 0 &&
    comments[comments.length - 1]?.UserEmail === currentUser;

  const cardRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const onDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    setShowAlertModal(true);
  };

  const handleShowComments = () => {
    setViewComments(!viewComments);
  };

  const handleDelete = async () => {
    if (!imageUrl) return;
    try {
      setIsLoading(true);
      const result = await api.deleteMediaFile(MediaFileID);
      if (result.success) {
        setRefreshFlag(true);
      }
    } catch (err) {
      console.error("Error al eliminar archivo:", err);
      alert("Ocurrió un error al eliminar el archivo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation();
      const userName = localStorage.getItem("userEmail") || "Invitado";

      await api.toggleLike(MediaFileID, userName);
      fetchLikes();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const handleSendComment = async () => {
    const UserEmail = localStorage.getItem("userEmail") || "Invitado";
    await api.createMediaFileComment({
      MediaFileID,
      UserEmail,
      CommentText: value,
    });
    setValue("");
    fetchComments();
  };

  const fetchLikes = async () => {
    try {
      if (MediaFileID) {
        const likes = await api.getLikesByMediaFile(MediaFileID);
        setLikes(likes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    if (MediaFileID) {
      const comments = await api.getCommentsByMediaFile(MediaFileID);
      setComments(comments);
    }
  };

  const renderComments = (styles: any) => {
    const currentUser = localStorage.getItem("userEmail") || "Invitado";

    return comments.map((comment: any) => {
      const isOwnComment = comment.UserEmail === currentUser;

      return (
        <div
          key={comment.ID}
          className={`${styles.commentPreview} ${
            isOwnComment ? styles.ownComment : ""
          }`}
        >
          <div className={styles.userNameContainer}>
            <User
              size={18}
              strokeWidth={1.8}
              className={isOwnComment ? styles.isOwnComment : styles.icon}
            />
            <p className={styles.userName}>
              {isOwnComment ? "Yo" : comment.UserEmail}:
            </p>
          </div>
          <p>{comment.CommentText}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userEmail");
    setIsLikedByUser(likes.some((like) => like.UserEmail === userName));
  }, [likes]);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        commentsRef.current &&
        !commentsRef.current.contains(event.target as Node)
      ) {
        setViewComments(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const commonProps = {
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
    likesCount: likes.length,
    isLikedByUser,
    handleShowComments,
    viewComments,
    setValue,
    value,
    handleSendComment,
    renderComments,
    comments,
    commentsRef,
    isLastCommentOwn
  };

  return (
    <>
      {isMdDown ? (
        <MediaCardMobile {...commonProps} />
      ) : isLgDown ? (
        <MediaCardTablet {...commonProps} />
      ) : (
        <MediaCardDesktop {...commonProps} />
      )}
    </>
  );
};

export default MediaCardContainer;
