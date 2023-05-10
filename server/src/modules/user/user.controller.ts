import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { UsersDbService } from 'src/database/postgres/user/user.database.service';
import { UserEntity } from 'src/database/postgres/user/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userDbService: UsersDbService) {}

  @Post('/sign-up')
  async doUserRegistration(@Body() user: UserEntity){
    const model = await this.userDbService.postUser(user)
    return model
  }

  @Get('')
  helloWorld(){
    return 'hello world'
  }
}
