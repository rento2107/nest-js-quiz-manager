import {
  CacheModule,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from './shared/typeorm.config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from './shared/config.service';
import {redisStore} from 'cache-manager-redis-store'
import { RedisConfig } from './shared/redis.config';

@Module({
  imports: [

    ...typeOrmAsyncConfig.map((typeOrmConfig) => TypeOrmModule.forRootAsync(typeOrmConfig)),
    PassportModule.register({
      session: true,
    }),
    SharedModule,
    UserModule,
    DatabaseModule,
    AuthModule,
    CacheModule.registerAsync({
      useClass: RedisConfig
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{

}
