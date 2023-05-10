import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

const services = [ConfigService, ]

@Global()
@Module({
    providers: [...services],
    exports: [...services],
})
export class SharedModule {}
