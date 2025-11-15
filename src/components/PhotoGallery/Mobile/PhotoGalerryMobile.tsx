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
}: PhotoGalleryInterface) => {
  return (
    <div className={styles.container}>
      <HeaderContainer setAccessGranted={setAccessGranted} event={event} />
      <div className={styles.bannner}>
        <DividerContainer />
        <h2>¡Bienvenidos a nuestro álbum de boda!</h2>
        <p>
          Gracias por acompañarnos en este día tan especial.¡Subí tus fotos y
          videos para compartir tus momentos con nosotros!
        </p>
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
        <AddBtnContainer onClick={openGallery}/>
      </div>
    </div>
  );
};

export default PhotoGalerryMobile;
