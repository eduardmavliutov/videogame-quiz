export interface FormControl {
  value: string;
  rules: string;
  name: string;
  type: string;
}

export interface AuthForm {
  email: FormControl;
  password: FormControl;
}
