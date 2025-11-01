import type { JSX, MouseEventHandler } from "react";
export interface CustomBtnInterface {
  value: string;
  handleChange: MouseEventHandler<HTMLButtonElement>;
  icon: () => JSX.Element;
  hasIcon: boolean
}