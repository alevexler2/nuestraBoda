import type { EventInterface } from "./EventInterface";

export interface WeddingAccesInterfaceContainer {
  setAccessGranted: (value: boolean) => void;
  accessGranted: boolean;
  event: EventInterface;
}