import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_order } from 'src/app/contracts/orders/create_order';
import { List_Order } from 'src/app/contracts/orders/list_order';
import { List_OrderById } from 'src/app/contracts/orders/orderById';
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
  async getAllOrders(page:number=0,size:number=5,successCallBack?: ()=>void,errorCallBack?:(errorMessage:string)=>void): Promise<{totalOrderCount: number; orders: List_Order[]}>
  {
  const promisData: Promise<{totalOrderCount: number; orders: List_Order[]}>= this.httpClientService.get<{totalOrderCount: number; orders: List_Order[]}>({
      controller:"order",
      queryString:`page=${page}&size=${size}`

    }).toPromise();

    

    promisData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promisData;
  }
  async getOrderById(id:string,successCallBack?: ()=>void,errorCallBack?:(errorMessage:string)=>void){
      const getobservable :Observable<List_OrderById> = this.httpClientService.get<List_OrderById>({
        controller:"order",

      },id);
      debugger;
      const promiseData = firstValueFrom(getobservable);
      promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))
      return await promiseData;
  }
  async completeOrder(id:string){
    const observable: Observable<any> = this.httpClientService.get({
      controller:"order",
      action:"complete-order"
    },id);
    await firstValueFrom(observable);
  }
}
