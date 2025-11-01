import type { JSX } from "react";

export interface CustomBtnInterfaceContainer {
  value: string;
  icon: () => JSX.Element;
  hasIicon: boolean
  setOpenModal?: (value: boolean) => void;
}