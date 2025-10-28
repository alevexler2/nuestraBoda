import useBreakpoints from "../../hooks/useBreakpoints";
import type { MediaCardInterface } from "../../interface/MediaCardInterface"
import MediaCardDesktop from "./Desktop/MediaCardDesktop"
import MediaCardMobile from "./Mobile/MediaCardMobile";
import MediaCardTablet from "./Tablet/MediaCardTablet";

const MediaCardContainer = ({ subtitle, imageUrl }: MediaCardInterface) => {
  const { isMdDown, isLgDown } = useBreakpoints();

  return (
    <>
      {
        isMdDown ? (
          <MediaCardMobile
            subtitle={subtitle}
            imageUrl={imageUrl}
          />
        ) : isLgDown ? (
           <MediaCardTablet
            subtitle={subtitle}
            imageUrl={imageUrl}
          />
        ) : (
          <MediaCardDesktop
            subtitle={subtitle}
            imageUrl={imageUrl}
          />
        )}
    </>
  )
}

export default MediaCardContainer