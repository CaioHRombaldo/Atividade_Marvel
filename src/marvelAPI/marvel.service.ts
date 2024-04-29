import { AxiosError } from "axios";
import { map } from "rxjs/internal/operators/map";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { HttpService } from "@nestjs/axios/dist/http.service";
import { catchError } from "rxjs/internal/operators/catchError";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigGetOptions, ConfigService } from "@nestjs/config/dist/config.service";
import { MarvelVariables } from "./interfaces/marvelVariables.interface";
import { MarvelRequest } from "./interfaces/marvelRequest.interface";
import { serieData } from "./interfaces/serieData.interface";

@Injectable()
export class MarvelAPIService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService<MarvelVariables>
    ) { }
    private getOptions: ConfigGetOptions = { infer: true }
    private params = new URLSearchParams(
        {
            ts: this.configService.get('ts', this.getOptions),
            apikey: this.configService.get('public_key', this.getOptions),
            hash: this.configService.get('hash', this.getOptions),
        }
    )

    get<T>(url: string, externalParameters: URLSearchParams = null) {
        let parameters: URLSearchParams = this.params
        if (externalParameters) {
            parameters = new URLSearchParams(
                {
                    ...Object.fromEntries(this.params),
                    ...Object.fromEntries(externalParameters)
                }
            )
        }
        return firstValueFrom(
            this.httpService.get<T>(url, { params: parameters })
                .pipe(map(item => item.data))
                .pipe(catchError((error: AxiosError) => {
                    console.log(error)
                    throw 'Um erro aconteceu!';
                })
                )
        )
    }

    async getPlanetHulk(): Promise<serieData> {
        return this.get<MarvelRequest<serieData>>(
            'series',
            new URLSearchParams({ title: "Hulk", startYear: "2014" })
        ).then(item => item.data.results.at(0))
    }
}
