import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from 'src/app/contracts/application-configurations/menu';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async GetAuthorizeDefinitionEndPoint(){
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller:"applicationservices"
    });

     return await firstValueFrom(observable);
  }
}
