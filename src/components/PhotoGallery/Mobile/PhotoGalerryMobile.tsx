import type { PhotoGalleryInterface } from "../../../interface/PhotoGalleryInterface";
import AddBtnContainer from "../../AddBtn/AddBtnContainer";
import DividerContainer from "../../Divider/DividerContainer";
import HeaderContainer from "../../Header/HeaderContainer";
import styles from "./styles.module.scss";

const PhotoGalerryMobile = ({
  handleFileChange,
  renderMediaCards,
  setAccessGranted,
  openGallery,
  fileInputRef,
  event,
  scrollContainerRef,
  isUploading
}: PhotoGalleryInterface) => {

  return (
    <div 
      className={styles.container} 
      ref={scrollContainerRef}
    >
      <HeaderContainer setAccessGranted={setAccessGranted} event={event} />
      <div className={styles.bannner}>
        <DividerContainer />
        <h2>{event.title}</h2>
        <DividerContainer />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        />
      <div className={styles.cardsContainer}>{renderMediaCards()}</div>
      <div className={styles.footer}>
        <AddBtnContainer onClick={!isUploading && openGallery}/>
        <span>Publicar</span>
      </div>
    </div>
  );
};

export default PhotoGalerryMobile;
