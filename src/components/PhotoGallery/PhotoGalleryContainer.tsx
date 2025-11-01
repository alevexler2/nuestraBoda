import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import PhotoGalerryDesktop from "./Desktop/PhotoGalerryDesktop";
import { api } from "../../api/apiService";
import type { CloudinaryFile } from "../../interface/PhotoGalleryInterface";
import MediaCardContainer from "../MediaCard/MediaCardContainer";
import { Oval } from "react-loader-spinner";
import colors from "../../assets/_themes-vars.module.scss";
import styles from "./Desktop/styles.module.scss";
import { MAX_SIZE } from "../../common/constants";

const PhotoGalleryContainer = ({ setAccessGranted }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<CloudinaryFile[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("");
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleUpload(files);
      e.target.value = '';
    }
  };

  const toggleActiveImage = (imgUrl: string, ref?: HTMLDivElement | null) => {
    setActiveImage((prev) => (prev === imgUrl ? "" : imgUrl));
    activeCardRef.current = ref ?? null;
  };

  const handleUpload = async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;
    setIsLoading(true)
    const uploadedUrls: string[] = [];

    try {
      const savedName = localStorage.getItem("userName") || "sin-nombre";
      for (const file of filesToUpload) {
        if (file.size > MAX_SIZE) {
          alert(
            `El archivo ${file.name} supera los 100 MB y no se puede subir.`
          );
          continue;
        }
        const extension = file.name.split(".").pop();
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const newFileName = `${baseName}_*${savedName}*`;

        const formData = new FormData();
        formData.append("file", file, `${newFileName}.${extension}`);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append("folder", "mi_boda");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/auto/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        console.log("Archivo subido:", data.secure_url);
        uploadedUrls.push(data.secure_url);
      }

      console.log("Archivos subidos:", uploadedUrls);

      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Error al subir archivos:", err);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const data = await api.getImages();
        setFiles(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [refreshFlag]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeCardRef.current &&
        !activeCardRef.current.contains(event.target as Node)
      ) {
        setActiveImage(""); // cierra
        activeCardRef.current = null;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderMediaCards = () => {
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
          activeImage={activeImage}
          toggleActiveImage={toggleActiveImage}
          key={file.public_id}
          subtitle={`Subido por ${file.uploaded_by}`}
          imageUrl={file.url}
          mediaType={file.mediaType}
        />
      );
    });
  };

  return (
    <Container>
      <PhotoGalerryDesktop
        handleFileChange={handleFileChange}
        renderMediaCards={renderMediaCards}
        setAccessGranted={setAccessGranted}
        openGallery={openGallery}
        fileInputRef={fileInputRef}
      />
    </Container>
  );
};

export default PhotoGalleryContainer;
