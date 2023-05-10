import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.use(
    session({
      name: 'rento',
      secret: 'test',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000*60*15
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  const port = 3005
  await app.listen(process.env.PORT || port);
  console.log(`Running on Port: ${port}`)
}
bootstrap();
