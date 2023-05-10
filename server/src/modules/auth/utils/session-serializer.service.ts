import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User, UsersDbService } from "src/database/postgres/user/user.database.service";
import { CustomRepositoryCannotInheritRepositoryError } from "typeorm";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private readonly userDbService: UsersDbService){
        super()
    }

    serializeUser(user: any, done: (err, user: any) => void) {
        console.log('serializer working')
        done(null, user)
    }

    async deserializeUser(user: User, done: (err, user: any) => void) {
        console.log('deserializer working')
        console.log(arguments)
        const userModel = await this.userDbService.getUser({ username: user.displayName})
        return userModel ? done(null, user) : done(null, null)
    }
}