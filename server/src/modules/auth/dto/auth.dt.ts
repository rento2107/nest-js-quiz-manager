import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export interface AuthSignUpRequest {

    firstName: string;
    lastName: string;
    displayName: string
    phoneNumber: string;
    email: string;
    password: string
}
// i want an interface 
export interface AuthResponse {
    displayName: string;
    role: string;
}

export interface AuthSignInRequest{
    username: string;
    password?: string;
}

export interface AuthTokenResponse{
    access_token: string;
    refresh_token: string;
}

export interface AuthRefreshTokensRequest{
    userName: string;
    refresh_token: string;
}