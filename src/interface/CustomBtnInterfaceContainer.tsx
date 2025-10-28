export interface CustomBtnInterfaceContainer {
  value: string;
  inputValue?: string;
  setAccessGranted?: (value: boolean) => void;
  setOpenModal?: (value: boolean) => void;
  setError: (value: string) => void;
  accessGranted?: boolean;
  icon?: boolean;
}