export type TAuthForm = "Login" | "Signup" | "Forgot" | "null";

export interface IAuthStore {
  selectedForm: TAuthForm;
  isAuthVisible: boolean;
}
