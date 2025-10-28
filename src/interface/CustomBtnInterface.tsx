import type { MouseEventHandler } from "react";

export interface CustomBtnInterface {
  value: string;
  handleChange: MouseEventHandler<HTMLButtonElement>;
  icon?: boolean;
}