import type { EventInterface } from "./EventInterface";

export interface WeddingAccesInterfaceContainer {
  setAccessGranted: (value: boolean) => void;
  setLoadingEventData: (value: boolean) => void;
  accessGranted: boolean;
  loadingEventData: boolean;
  event: EventInterface;
}