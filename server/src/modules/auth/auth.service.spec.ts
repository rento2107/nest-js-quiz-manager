//auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { typeOrmAsyncConfig, typeOrmConfig } from 'src/shared/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

describe('AuthService', () => {
  let authService: AuthService;
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        DatabaseModule,
        ...typeOrmAsyncConfig.map((typeOrmConfig) => TypeOrmModule.forRootAsync(typeOrmConfig))
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  // afterAll(async () => {
  //   app.close()
  // });
  

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
