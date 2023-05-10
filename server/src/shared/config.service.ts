import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv'

@Injectable()
export class ConfigService{
    private readonly env: { [x: string]: string; }
    constructor(){
        const dotEnv = dotenv.config({ path: './.env'}).parsed
        const exampleEnv = dotenv.config({path: './.env.example'}).parsed
        this.env = {...exampleEnv, ...dotEnv}
    }

    get(variable: string){
        const value = this.env[variable];
        if(value){
            return value
        } else {
            throw Error(`${variable} was not found in .env file!`)
        }
    }

  
}