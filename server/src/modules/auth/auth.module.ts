import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AccessTokenStrategy } from './strategy/acces-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './utils/session-serializer.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({

  providers: [
    AuthService, 
    AccessTokenStrategy,
    RefreshTokenStrategy,
    SessionSerializer,
    LocalStrategy,
  ],
  controllers: [AuthController],
  imports: [
    DatabaseModule, 
    JwtModule.register({}),
    // PassportModule

  ]
})
export class AuthModule {}
