export interface Credentials {
    email: string;
    password: string;
}

export type InputElement = HTMLInputElement;

export type ShowMessageFn = (msg: string, type: 'error' | 'success') => void;

export type ValidateEmailFn = (email: string) => boolean;

export type CheckCredentialsFn = (email: string, password: string) => boolean;
