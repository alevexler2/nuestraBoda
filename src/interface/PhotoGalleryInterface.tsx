import type { JSX, RefObject } from "react";
import type { EventInterface } from "./EventInterface";

export interface CloudinaryFile {
  public_id: string;
  url: string;
  format: string;
  type: string;
  uploaded_by?: string;
  ownerEmail: string;
  mediaType?: 'image' | 'video';
  MediaFileID: string;
}

export interface PhotoGalleryInterface {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderMediaCards: () => JSX.Element | JSX.Element[];
  setAccessGranted: (value: boolean) => void;
  openGallery: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  event: EventInterface;
}