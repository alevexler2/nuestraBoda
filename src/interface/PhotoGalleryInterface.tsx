import type { JSX, RefObject } from "react";
import type { EventInterface } from "./EventInterface";

export interface CloudinaryFile {
  ID: string;
  public_id: string;
  URL: string;
  format: string;
  type: string;
  UploadedBy?: string;
  UploadedByName?: string;
  ownerEmail: string;
  MediaTypeID?: number;
  MediaFileID: string;
  data: Base64URLString;
  imageUrl: string;
}

export interface PhotoGalleryInterface {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderMediaCards: () => JSX.Element | JSX.Element[];
  renderPagination?: () => JSX.Element | null;
  setAccessGranted: (value: boolean) => void;
  openGallery: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  event: EventInterface;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  isUploading: boolean;
}
