import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateBasketItem } from 'src/app/contracts/basket/create-basket-item';
import { DeleteBasketItem } from 'src/app/contracts/basket/delete-basket-item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { UpdateBasketItem } from 'src/app/contracts/basket/update-basket-item';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async get(): Promise<ListBasketItem[]>{
    const observable : Observable<ListBasketItem[]> = this.httpClientService.get({
      controller:"basket"
    });

  return await firstValueFrom(observable);
  }

 async add(basket:CreateBasketItem): Promise<void>{
   const creatObservable: Observable<any> = this.httpClientService.post({
      controller:"basket",

    },basket);
    
   await firstValueFrom(creatObservable);
  }

 async put(updateBasket: UpdateBasketItem): Promise<void>{
    const updateObservable: Observable<any> = this.httpClientService.put({
      controller:"basket"
    },updateBasket);
    await firstValueFrom(updateObservable);
  }
 async delete(deleteBasketItem:string)
  {
   const deleteObservable: Observable<any> = this.httpClientService.delete({
      controller:"basket"
    },deleteBasketItem);

    await firstValueFrom(deleteObservable);
  }
}
