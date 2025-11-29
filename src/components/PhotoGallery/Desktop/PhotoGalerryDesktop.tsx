import type { PhotoGalleryInterface } from "../../../interface/PhotoGalleryInterface";
import CustomBtnContainer from "../../CustomBtn/CustomBtnContainer";
import DividerContainer from "../../Divider/DividerContainer";
import HeaderContainer from "../../Header/HeaderContainer";
import styles from "./styles.module.scss";
import { Camera } from "lucide-react";

const CameraIcon = () => (
  <Camera size={17} strokeWidth={2} className={styles.icon} />
);

const PhotoGalerryDesktop = ({
  handleFileChange,
  renderMediaCards,
  setAccessGranted,
  openGallery,
  fileInputRef,
  event,
  scrollContainerRef,
  renderPagination,
  isUploading
}: PhotoGalleryInterface) => {
  console.log(renderPagination)
  return (
    <div className={styles.scrollWrapper} ref={scrollContainerRef}>
      <div className={styles.container} >
        <HeaderContainer setAccessGranted={setAccessGranted} event={event} />
        <DividerContainer />
        <div className={styles.bannner}>
          <h2>{event.title}</h2>
        </div>
        <DividerContainer />
        <CustomBtnContainer
          value="Subir"
          icon={CameraIcon}
          hasIcon={true}
          onClick={!isUploading ? openGallery : () => {}}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className={styles.cardsContainer}>{renderMediaCards()}</div>
        {renderPagination && renderPagination()}
      </div>
    </div>
  );
};

export default PhotoGalerryDesktop;
