import type { JSX } from "react";

export interface CloudinaryFile {
  public_id: string;
  url: string;
  format: string;
  type: string;
  uploaded_by?: string;
  mediaType?: 'image' | 'video';
}

export interface PhotoGalleryInterface {
  setError: (value: string) => void;
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  handleUpload: () => void;
  handleCancel: () => void;
  renderMediaCards: () => JSX.Element | JSX.Element[];
  isUploading: boolean;
}