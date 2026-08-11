import api from "./api";

export interface LoginRequest{
    email : string;
    password : string;
}

export interface LoginResponse{
    token : string;
}

export async function login(
    credentials : LoginRequest
): Promise<LoginResponse>{
    const response = await api.post<LoginResponse>(
        "/users/login",
        credentials
    );

    return response.data;
}
