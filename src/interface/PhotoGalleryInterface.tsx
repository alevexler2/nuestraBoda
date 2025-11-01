import type { JSX, RefObject } from "react";

export interface CloudinaryFile {
  public_id: string;
  url: string;
  format: string;
  type: string;
  uploaded_by?: string;
  mediaType?: 'image' | 'video';
}

export interface PhotoGalleryInterface {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  handleUpload: () => void;
  handleCancel: () => void;
  renderMediaCards: () => JSX.Element | JSX.Element[];
  isUploading: boolean;
  setAccessGranted: (value: boolean) => void;
  openGallery: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}