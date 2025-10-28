import type { ChangeEventHandler } from "react";

export interface InputInterface {
  placeholder: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}