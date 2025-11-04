import type { EventInterface } from "./EventInterface";

export interface PhotoGalleryContainerInterface {
  setAccessGranted: (value: boolean) => void;
  event: EventInterface;
}