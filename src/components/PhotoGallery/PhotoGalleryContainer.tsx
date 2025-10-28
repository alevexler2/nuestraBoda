import { useEffect, useState } from "react"
import Container from "../Container/Container"
import PhotoGalerryDesktop from "./Desktop/PhotoGalerryDesktop"
import type { PhotoGalleryInterfaceContainer } from "../../interface/PothoGalleryInterfaceContainer"
import { api } from "../../api/apiService";
import type { CloudinaryFile } from "../../interface/PhotoGalleryInterface";
import MediaCardContainer from "../MediaCard/MediaCardContainer";
import { Oval } from "react-loader-spinner";
import colors from "../../assets/_themes-vars.module.scss";
import styles from './Desktop/styles.module.scss'
import { MAX_SIZE } from "../../common/constants";

const PhotoGalleryContainer = ({ inputValue }: PhotoGalleryInterfaceContainer) => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [files, setFiles] = useState<CloudinaryFile[]>([])
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles(files)
    }
  }

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
          key={file.public_id}
          subtitle={`Subido por ${file.uploaded_by}`}
          imageUrl={file.url}
        />
      );
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setIsUploading(true);

    const uploadedUrls: string[] = []

    try {
      for (const file of selectedFiles) {
        if (file.size > MAX_SIZE) {
          alert(`El archivo ${file.name} supera los 100 MB y no se puede subir.`);
          continue;
        }
        const extension = file.name.split('.').pop();
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        const newFileName = `${baseName}_*${inputValue}*`;

        const formData = new FormData();
        formData.append('file', file, `${newFileName}.${extension}`);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'mi_boda');

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: 'POST', body: formData }
        );

        const data = await res.json();
        console.log('Archivo subido:', data.secure_url);
        uploadedUrls.push(data.secure_url)
      }

      console.log('Archivos subidos:', uploadedUrls)

      setSelectedFiles([])
      setOpenModal(false)
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error('Error al subir archivos:', err)
      setError('Error al subir archivos. Intenta nuevamente.')
    } finally {
      setIsUploading(false);
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
    setSelectedFiles([])
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await api.getImages();
        setFiles(data)
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [refreshFlag]);

  return (
    <Container>
      <PhotoGalerryDesktop setError={setError} setOpenModal={setOpenModal} openModal={openModal} handleFileChange={handleFileChange} selectedFiles={selectedFiles} handleUpload={handleUpload} handleCancel={handleCancel} renderMediaCards={renderMediaCards} isUploading={isUploading}/>
    </Container>
  )
}

export default PhotoGalleryContainer