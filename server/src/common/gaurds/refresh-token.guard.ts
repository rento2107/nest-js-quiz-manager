import { AuthGuard } from "@nestjs/passport";

export class RefreshTokenGaurd extends AuthGuard('jwt'){
    constructor(){
        super(
            
        )
    }
}


