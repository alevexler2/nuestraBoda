import type { JSX, RefObject } from "react";
import type { EventInterface } from "./EventInterface";

export interface CloudinaryFile {
  ID: string;
  public_id: string;
  URL: string;
  format: string;
  type: string;
  UploadedBy?: string;
  ownerEmail: string;
  MediaTypeID?: number;
  MediaFileID: string;
  data: Base64URLString
}

export interface PhotoGalleryInterface {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderMediaCards: () => JSX.Element | JSX.Element[];
  setAccessGranted: (value: boolean) => void;
  openGallery: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  event: EventInterface;
}