import type { EventInterface } from "./EventInterface";

export interface HeaderInterface {
  logout: () => void;
  event: EventInterface
}