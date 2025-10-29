import useBreakpoints from "../../hooks/useBreakpoints";
import type { MediaCardInterfaceContainer } from "../../interface/MediaCardInterfaceContainer";
import MediaCardDesktop from "./Desktop/MediaCardDesktop"
import MediaCardMobile from "./Mobile/MediaCardMobile";
import MediaCardTablet from "./Tablet/MediaCardTablet";
import { useRef } from "react";

const MediaCardContainer = ({ subtitle, imageUrl, toggleActiveImage, activeImage, mediaType }: MediaCardInterfaceContainer) => {
  const { isMdDown, isLgDown } = useBreakpoints();

  const cardRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
    toggleActiveImage(imageUrl);

    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center" 
      });
    }
  };

  const commonProps = {
    subtitle,
    imageUrl,
    activeImage,
    handleClick,
    cardRef,
    mediaType,
  }

  return (
    <>
      {
        isMdDown ? (
          <MediaCardMobile {...commonProps} />
        ) : isLgDown ? (
          <MediaCardTablet {...commonProps} />
        ) : (
          <MediaCardDesktop {...commonProps} />
        )}
    </>
  )
}

export default MediaCardContainer