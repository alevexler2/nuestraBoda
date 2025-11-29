import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import PhotoGalerryDesktop from "./Desktop/PhotoGalerryDesktop";
import { api } from "../../api/apiService";
import type { CloudinaryFile } from "../../interface/PhotoGalleryInterface";
import MediaCardContainer from "../MediaCard/MediaCardContainer";
import { Oval } from "react-loader-spinner";
import styles from "./Desktop/styles.module.scss";
import { MEDIA_TYPE_ID } from "../../common/constants";
import type { PhotoGalleryContainerInterface } from "../../interface/PhotoFalleryContainerInterface";
import useBreakpoints from "../../hooks/useBreakpoints";
import PhotoGalerryMobile from "./Mobile/PhotoGalerryMobile";
import type { PaginationMeta } from "../../interface/PaginationMeta.interface";

const PhotoGalleryContainer = ({
  setAccessGranted,
  event,
}: PhotoGalleryContainerInterface) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [files, setFiles] = useState<CloudinaryFile[]>([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { isMdDown } = useBreakpoints();
  const savedName = localStorage.getItem("userEmail") || "sin-nombre";
  const name =
    localStorage.getItem("userName") ||
    localStorage.getItem("userEmail") ||
    "sin-nombre";

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
            UploadedByName: name,
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

  const loadMore = () => {
    if (meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setRefreshFlag(false);
      const data = await api.getImages(event.ID, page, 10);

      if (page === 1) {
        setFiles(data.data);
      } else {
        setFiles((prev) => [...prev, ...data.data]);
      }
      setMeta(data.meta);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (event.ID) {
      setPage(1);
      setFiles([]);
      fetchImages();
    }
  }, [refreshFlag, event]);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
  }, [page]);

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

  useEffect(() => {
    const el = scrollContainerRef.current;

    if (!el) return;

    const handleScroll = () => {
      if (!meta?.hasNextPage || isLoading) return;

      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      const percentage = (scrollTop + clientHeight) / scrollHeight;

      if (percentage >= 0.8) {
        loadMore();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [meta, isLoading]);

  const renderPagination = () => {
    if (!meta?.hasNextPage) return null;

    return (
      <div className={styles.paginationContainer}>
        <button
          className={styles.loadMoreBtn}
          disabled={isLoading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Ver más
        </button>
      </div>
    );
  };

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

    const cards = files.map((file) => (
      <MediaCardContainer
        key={file.ID}
        subtitle={`Subido por ${file.UploadedByName}`}
        imageUrl={file.imageUrl}
        mediaType={file.MediaTypeID}
        owner={
          file.UploadedBy === savedName ||
          savedName === event.OwnerEmail1 ||
          savedName === event.OwnerEmail2
        }
        setRefreshFlag={setRefreshFlag}
        MediaFileID={file.ID}
      />
    ));

    // Si no hay imágenes y no estamos cargando
    if (!files || (files.length === 0 && !isLoading)) {
      return (
        <div className={styles.noImagesContainer}>
          <p className={styles.noImgMsge}>
            Todavía no hay imágenes. ¡Sé el primero en subir algo!
          </p>
        </div>
      );
    }

    return (
      <>
        {cards}

        {isLoading && (
          <div className={styles.loaderContainer}>
            <Oval
              height={32}
              width={32}
              strokeWidth={4}
              strokeWidthSecondary={4}
              visible={true}
              ariaLabel="loading"
            />
          </div>
        )}
      </>
    );
  };

  const uploading = Object.keys(uploadProgress).length > 0;

  return (
    <Container event={event}>
      {isMdDown ? (
        <PhotoGalerryMobile
          handleFileChange={handleFileChange}
          renderMediaCards={renderMediaCards}
          setAccessGranted={setAccessGranted}
          openGallery={openGallery}
          fileInputRef={fileInputRef}
          event={event}
          scrollContainerRef={scrollContainerRef}
          isUploading={uploading}
        />
      ) : (
        <PhotoGalerryDesktop
          handleFileChange={handleFileChange}
          renderMediaCards={renderMediaCards}
          setAccessGranted={setAccessGranted}
          openGallery={openGallery}
          fileInputRef={fileInputRef}
          event={event}
          scrollContainerRef={scrollContainerRef}
          renderPagination={renderPagination}
          isUploading={uploading}
        />
      )}
    </Container>
  );
};

export default PhotoGalleryContainer;
