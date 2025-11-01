import type { JSX } from "react";

export interface CustomBtnInterfaceContainer {
  value: string;
  icon: () => JSX.Element;
  hasIcon: boolean
  setOpenModal?: (value: boolean) => void;
  onClick?: () => void;
}