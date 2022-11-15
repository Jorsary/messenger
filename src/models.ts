import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export interface NavLinks {
  icon?: JSX.Element;
  title: string;
  auth: boolean;
  path: string;
}

export interface SettingsLinks {
  icon?: JSX.Element;
  title: string;
  path: string;
}

export interface IAuthForm {
  phone: any;
  password: string;
  otp: string;
}

