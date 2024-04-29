import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { MarvelAPIService } from "./marvel.service";
import { MarvelApiConfig } from "./marvel.config";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useClass: MarvelApiConfig,
        }),
    ],
    providers: [MarvelAPIService],
    exports: [MarvelAPIService],
})
export class MarvelAPIModule { }