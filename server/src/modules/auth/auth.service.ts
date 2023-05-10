import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRefreshTokensRequest, AuthResponse, AuthSignInRequest, AuthSignUpRequest, AuthTokenResponse } from './dto/auth.dt';
import { User, UsersDbService } from 'src/database/postgres/user/user.database.service';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userDbService: UsersDbService, private readonly jwtService: JwtService){}

    async signUp( singUpRequest: AuthSignUpRequest): Promise<AuthResponse>{
        const hash = await argon.hash(singUpRequest.password)
        singUpRequest.password = hash
        const model = await this.userDbService.postUser(singUpRequest)
        return model
    }

    async signIn(signInRequest: AuthSignInRequest): Promise<User>{
        const user = await this.userDbService.getUserHash(signInRequest)
        const isPasswordMatched = await argon.verify(user.hash, signInRequest.password)
        console.log(user)
        if(!isPasswordMatched){
            throw new UnauthorizedException(`Username and password combination do not Match`)
        }
        // const {access_token, refresh_token} = await this.signUserTokens({ displayName: user.displayName, role: user.role})
        // const refreshTokenHash = await argon.hash(refresh_token)
        // await this.userDbService.updateUserRefreshToken({refresh_token: refreshTokenHash, userName: user.displayName})
        return user
    }

    async logOut(userName: string){
        await this.userDbService.updateUserRefreshToken({ refresh_token: null, userName})
        return {
            msg: 'You have been logged out'
        }
    }

    async refreshToken(refreshRequest: AuthRefreshTokensRequest){
        const user = await this.userDbService.getUser({ username: refreshRequest.userName})
        const isPasswordMatched = await argon.verify(user.refreshToken, refreshRequest.refresh_token)
        if(!isPasswordMatched){
            throw new UnauthorizedException(`Username and password combination do not Match`)
        }
        const {access_token, refresh_token} = await this.signUserTokens({ displayName: user.displayName, role: user.role})
        const refreshTokenHash = await argon.hash(refresh_token)
        await this.userDbService.updateUserRefreshToken({refresh_token: refreshTokenHash, userName: user.displayName})
        return {
            access_token,
            refresh_token
        }
    }

    async signUserTokens(authResponse: AuthResponse): Promise<AuthTokenResponse>{
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(authResponse, { expiresIn: 60 * 15, secret: 'test'}),
            this.jwtService.signAsync(authResponse, { expiresIn: 60 * 60 * 24 * 7, secret: 'test-rt'}),

        ])
        return {
            access_token,
            refresh_token
        }
    }
}
