import { Body, Controller, Get, Param, Post, Query, Session, UseGuards } from '@nestjs/common';
import { User } from 'src/database/postgres/user/user.database.service';
import { AuthResponse, AuthSignInRequest, AuthSignUpRequest, AuthTokenResponse } from './dto/auth.dt';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGurad } from 'src/common/gaurds/local-auth.guard';
import { Auth } from 'src/common/decorator/auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('sign-up')
    async signUp( @Body() signUpRequest: AuthSignUpRequest): Promise<AuthResponse>{
        const model = await this.authService.signUp(signUpRequest)
        return model
    }

    @Auth()
    @Post('sign-in')
    async signIn(@Body() signInRequest: AuthSignInRequest){
        return signInRequest
    }

    @Post('log-out/:userName')
    async logOut(@Param('userName') userName: string){
        const response = await this.authService.logOut(userName)
        return response
    }

    @Post('refresh-token')
    async refreshToken(){}

    @Auth()
    @Get('test')
    getUser(@Session() session: Record<string, any>){
        console.log(session)
        console.log(session.id)
        session.authenticate = true
        return session
    }
    
}
