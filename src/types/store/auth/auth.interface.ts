export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

export interface SetTokensPayload {
  accessToken: string;
  refreshToken: string;
}