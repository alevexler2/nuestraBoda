import type { FormEventHandler } from "react";

export interface WeddingAccesInterface {
  inputValue: string;
  error: string;
  setInputValue: (value: string) => void;
  setError: (value: string) => void;
  setAccessGranted: (value: boolean) => void;
  accessGranted: boolean;
  showError: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>; 
}