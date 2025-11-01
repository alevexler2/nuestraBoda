import { Oval } from "react-loader-spinner";
import type { PhotoGalleryInterface } from "../../../interface/PhotoGalleryInterface";
import CustomBtnContainer from "../../CustomBtn/CustomBtnContainer";
import CustomModalContainer from "../../CustomModal/CustomModalContainer";
import DividerContainer from "../../Divider/DividerContainer";
import HeaderContainer from "../../Header/HeaderContainer";
import styles from "./styles.module.scss";
import { Camera } from "lucide-react";

const CameraIcon = () => (
  <Camera size={17} strokeWidth={2} className={styles.icon} />
);

const PhotoGalerryDesktop = ({
  setOpenModal,
  openModal,
  handleFileChange,
  selectedFiles,
  handleUpload,
  handleCancel,
  renderMediaCards,
  isUploading,
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
        setOpenModal={setOpenModal}
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
      {openModal && (
        <CustomModalContainer isOpen={openModal} setIsOpen={setOpenModal}>
          <div className={styles.modalContainer}>
            <h2>Seleccionar archivos multimedia</h2>
            <p>Subí imágenes o videos desde tu computadora o celular</p>

            <label htmlFor="mediaUpload" className={styles.dropzone}>
              <div className={styles.icon}>📁</div>
              <span>
                Arrastrá tus archivos aquí o hacé onClick para seleccionar
              </span>
              <input
                id="mediaUpload"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
            </label>

            <div className={styles.previewContainer}>
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file) => (
                  <div key={file.name} className={styles.previewItem}>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className={styles.previewImage}
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className={styles.previewVideo}
                      />
                    )}
                  </div>
                ))
              ) : (
                <span className={styles.noFiles}>
                  No hay archivos seleccionados
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancelar
              </button>
              <button
                className={styles.uploadBtn}
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
              >
                {isUploading ? (
                  <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                    visible={true}
                    ariaLabel="subiendo"
                  />
                ) : (
                  "Subir archivos"
                )}
              </button>
            </div>
          </div>
        </CustomModalContainer>
      )}
    </div>
  );
};

export default PhotoGalerryDesktop;
