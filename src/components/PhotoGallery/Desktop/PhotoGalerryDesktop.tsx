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
}: PhotoGalleryInterface) => {
  return (
    <div className={styles.container}>
      <HeaderContainer setAccessGranted={setAccessGranted} />
      <DividerContainer />
      <h2>¡Bienvenidos a nuestro álbum de boda!</h2>
      <p>
        Gracias por acompañarnos en este día tan especial.¡Subí tus fotos y
        videos para compartir tus momentos con nosotros!
      </p>
      <DividerContainer />
      <CustomBtnContainer
        value="Subir"
        icon={CameraIcon}
        hasIcon={true}
        onClick={openGallery}
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
    </div>
  );
};

export default PhotoGalerryDesktop;
