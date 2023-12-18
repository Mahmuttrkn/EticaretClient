import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { BaseUrl } from "src/app/contracts/base_url";
import { HttpClientService } from "../common/http-client.service";

@Injectable({
    providedIn: 'root'
  })
  export class FileService {
  
    constructor(private httpclientService:HttpClientService) { }

   async getBaseStorageUrl():Promise<BaseUrl>{
       const getObservable:Observable<BaseUrl> = this.httpclientService.get<BaseUrl>({
            controller:"file",
            action:"GetBaseUrl"
        });

        return await firstValueFrom(getObservable);
    }
    
  }
