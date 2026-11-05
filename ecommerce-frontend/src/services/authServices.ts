import api from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  createdAt: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/users/login", credentials);
  return response.data;
}

export async function registerUser(
  details: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users/register", details);
  return response.data;
}
