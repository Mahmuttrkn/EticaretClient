import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_order } from 'src/app/contracts/orders/create_order';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async create(order: create_order){
    const observable: Observable<any> = this.httpClientService.post({
      controller:"order",
    },order);

   await firstValueFrom(observable);
  }
}
