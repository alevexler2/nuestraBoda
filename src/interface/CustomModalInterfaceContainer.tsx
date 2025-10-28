export interface CustomModalInterfaceContainer {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen:(value: boolean) => void;
}