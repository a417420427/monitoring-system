import http from '../http';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = (data: RegisterPayload) => {
  return http.post('/register', data);
};

export const login = (data: LoginPayload) => {
  return http.post('/login', data);
};