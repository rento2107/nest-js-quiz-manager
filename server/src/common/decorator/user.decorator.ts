import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(( data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.user)
    // console.log('data:', request.user[data])
    if(!data) return request.user;
    return request.user[data]
})