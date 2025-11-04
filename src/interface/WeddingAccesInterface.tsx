import type { FormEventHandler } from "react";
import type { EventInterface } from "./EventInterface";

export interface WeddingAccesInterface {
  loginWithGoogle: FormEventHandler<HTMLFormElement>;
  event: EventInterface;
}