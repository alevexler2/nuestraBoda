import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import PhotoGalerryDesktop from "./Desktop/PhotoGalerryDesktop";
import { api } from "../../api/apiService";
import type { CloudinaryFile } from "../../interface/PhotoGalleryInterface";
import MediaCardContainer from "../MediaCard/MediaCardContainer";
import { Oval } from "react-loader-spinner";
import colors from "../../assets/_themes-vars.module.scss";
import styles from "./Desktop/styles.module.scss";
import { MEDIA_TYPE_ID } from "../../common/constants";
import type { PhotoGalleryContainerInterface } from "../../interface/PhotoFalleryContainerInterface";
import useBreakpoints from "../../hooks/useBreakpoints";
import PhotoGalerryMobile from "./Mobile/PhotoGalerryMobile";

const PhotoGalleryContainer = ({
  setAccessGranted,
  event,
}: PhotoGalleryContainerInterface) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [files, setFiles] = useState<CloudinaryFile[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isMdDown } = useBreakpoints();
  const savedName = localStorage.getItem("userEmail") || "sin-nombre";

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleUpload(files);
      e.target.value = "";
    }
  };

  function getMediaType(file: File): number {
    const mime = file.type;
    if (mime.startsWith("image/")) return MEDIA_TYPE_ID.IMAGE;
    if (mime.startsWith("video/")) return MEDIA_TYPE_ID.VIDEO;

    return MEDIA_TYPE_ID.IMAGE;
  }

  const handleUpload = async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;
    setIsLoading(true);

    try {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      const eventId = pathSegments[pathSegments.length - 1];
      for (const file of filesToUpload) {
        const id = file.name;

        setUploadProgress((prev) => ({
          ...prev,
          [id]: 0,
        }));

        const mediaType = getMediaType(file);

        await api.createMediaFile(
          {
            file,
            MediaTypeID: mediaType,
            UploadedBy: savedName,
            EventID: eventId,
          },
          (percent) => {
            setUploadProgress((prev) => ({
              ...prev,
              [id]: percent,
            }));
          }
        );
      }

      setUploadProgress({});
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Error al subir archivos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setRefreshFlag(false);
        const data = await api.getImages(event.ID);
        setFiles(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (event.ID) fetchImages();
  }, [refreshFlag, event]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeCardRef.current &&
        !activeCardRef.current.contains(event.target as Node)
      ) {
        activeCardRef.current = null;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderMediaCards = () => {
    const uploading = Object.keys(uploadProgress).length > 0;

    if (uploading) {
      const values = Object.values(uploadProgress);
      const avg =
        values.length > 0
          ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
          : 0;
      return (
        <div className={styles.progressWrapper}>
          <p>Subiendo archivos... {avg}%</p>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${avg}%` }}
            />
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loaderContainer}>
          <Oval
            height={60}
            width={60}
            color={colors.backgroundBtn}
            strokeWidth={4}
            strokeWidthSecondary={4}
            visible={true}
            ariaLabel="loading"
          />
        </div>
      );
    }

    return files.map((file) => {
      return (
        <MediaCardContainer
          key={file.ID}
          subtitle={`Subido por ${file.UploadedBy}`}
          imageUrl={`${import.meta.env.VITE_API_URL}${file.URL}`}
          mediaType={file.MediaTypeID}
          owner={file.UploadedBy === savedName}
          setRefreshFlag={setRefreshFlag}
          MediaFileID={file.ID}
        />
      );
    });
  };

  return (
    <Container>
      {isMdDown ? (
        <PhotoGalerryMobile
          handleFileChange={handleFileChange}
          renderMediaCards={renderMediaCards}
          setAccessGranted={setAccessGranted}
          openGallery={openGallery}
          fileInputRef={fileInputRef}
          event={event}
        />
      ) : (
        <PhotoGalerryDesktop
          handleFileChange={handleFileChange}
          renderMediaCards={renderMediaCards}
          setAccessGranted={setAccessGranted}
          openGallery={openGallery}
          fileInputRef={fileInputRef}
          event={event}
        />
      )}
    </Container>
  );
};

export default PhotoGalleryContainer;
