import type { ReactNode } from "react";
import type { EventInterface } from "./EventInterface";

export interface ContainerProps {
  children?: ReactNode; 
  event: EventInterface
}