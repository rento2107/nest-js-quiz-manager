
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { SharedModule } from './shared.module';
import _ from 'lodash';

const config = new ConfigService()
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions[] = [{
  imports: [SharedModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      name: 'rento_postgres',
      type: 'postgres',
      host: config.get('DB_HOST'),
      database: config.get('DB_NAME'),
      port: parseInt(config.get('DB_PORT')),
      schema: 'rento',
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../database/migrations',
      },
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,
      };
  },
}];

export const typeOrmConfig: TypeOrmModuleOptions[] = [{
  name: 'rento_postgres',
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: parseInt(config.get('DB_PORT')),
  username: config.get('DB_USERNAME'),
  database: config.get('DB_NAME'),
  password: config.get('DB_PASSWORD'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: true,
}];

// import {
//   TypeOrmModuleAsyncOptions,
//   TypeOrmModuleOptions,
// } from '@nestjs/typeorm';
// import { config } from 'dotenv';

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       database: 'rento',
//       password: 'postgres',
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       cli: {
//         migrationsDir: __dirname + '/../database/migrations',
//       },
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false,
//       logging: true,
//     };
//   },
// };

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   database: 'rento',
//   password: 'postgres',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: __dirname + '/../database/migrations',
//   },
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   synchronize: false,
//   logging: true,
// };

