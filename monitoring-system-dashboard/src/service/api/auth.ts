import http from "../http";


type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

export interface AuthResponse {
  username: string;
  email: string;
  passwordHash: string;
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export type AuthPayload = AtLeastOne<{
  username: string;
  email: string;
}> & {
  password: string;
};

export const register = (data: AuthPayload) => {
  return http.post<ServiceResponse<AuthResponse>>("/auth/register", data);
};

export const login = (data: AuthPayload) => {
  return http.post<ServiceResponse<AuthResponse>>("/auth/login-by-password", data);
};
