import { api } from "../../api/apiService";
import useBreakpoints from "../../hooks/useBreakpoints";
import type { MediaCardInterfaceContainer } from "../../interface/MediaCardInterfaceContainer";
import MediaCardDesktop from "./Desktop/MediaCardDesktop";
import MediaCardMobile from "./Mobile/MediaCardMobile";
import MediaCardTablet from "./Tablet/MediaCardTablet";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const MediaCardContainer = ({
  subtitle,
  imageUrl,
  mediaType,
  owner,
  setRefreshFlag,
  MediaFileID,
}: MediaCardInterfaceContainer) => {
  const [showAlertModal, setShowAlertModal] = useState(false)
  const { isMdDown, isLgDown } = useBreakpoints();
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState<any[]>([])
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const onDelete = async (e: MouseEvent) => {
    e.stopPropagation()
    setShowAlertModal(true)
  };

  const handleDelete = async () => {
    if (!imageUrl) return;
    try {
      setIsLoading(true)
      const result = await api.deleteMediaFile(imageUrl);
      if (result.success) {
        setRefreshFlag(true)
      }
    } catch (err) {
      console.error("Error al eliminar archivo:", err);
      alert("Ocurrió un error al eliminar el archivo");
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const userName = localStorage.getItem("userEmail") || "Invitado";

      await api.toggleLike(MediaFileID, userName);
      fetchLikes()
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const likes = await api.getLikesByMediaFile(MediaFileID);
      setLikes(likes)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchLikes()
  }, [])

  useEffect(() => {
    const userName = localStorage.getItem("userEmail")
    setIsLikedByUser(likes.some(like => like.UserEmail === userName));
  }, [likes]);

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
