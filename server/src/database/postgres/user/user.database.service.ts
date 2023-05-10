// users.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entity/user.entity';
import { AuthResponse, AuthSignInRequest } from 'src/modules/auth/dto/auth.dt';

export interface User{
  displayName: string;
  hash: string;
  role: string;
}

export interface UpdateRefreshToken {
  userName: string,
  refresh_token: string,
}

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async postUser(user: Partial<UserEntity>): Promise<AuthResponse>{
    const model = await this.userRepository.save(user)
    return this.mapUserToAuthRespone(model)
  }

  async getUser({ username }: {username: string}): Promise<UserEntity>{
    try{
      const user = await this.userRepository.findOneOrFail({
        where: [
          { email: username},
          { displayName: username},
          { phoneNumber: username},
        ]
      })
      return user
    } catch (error){
      throw new UnauthorizedException(`Username and password combination do not Match`)
    }
  }

  async getUserHash({ username }: {username: string}): Promise<User>{
    try{
      const model = await this.getUser({username})
      return {
        displayName: model.displayName,
        hash: model.password,
        role: model.role,
      }
    } catch (error){
      throw new UnauthorizedException(`Username and password combination do not Match`)
    }
  }

  async updateUserRefreshToken( refreshToken: UpdateRefreshToken){
    const user = await this.getUser({ username: refreshToken.userName})
    user.refreshToken = refreshToken.refresh_token
    const model = await this.userRepository.save(user)
    return model
  }

  mapUserToAuthRespone(user: UserEntity): AuthResponse {
    return {
      displayName: user.displayName,
      role: user.role,
    }
  }
}
