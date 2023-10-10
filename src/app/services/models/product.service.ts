import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientService:HttpClientService) { }

  create(product: Create_Product, successCallBack?: ()=>void, errorCallBack?: (errorMessage:string) =>void) {

    this.httpclientService.post({
      controller: "products"

    },product).subscribe(result=>{
      successCallBack();
      
    },(errorResponse:HttpErrorResponse) => {

      const _error: Array<{key:string, value: Array<string>}> =  errorResponse.error;
      let message =" ";
      _error.forEach((v,index)=>{
          v.value.forEach((_v,_index)=>{
            message += `${_v}<br>`
          });
      });
      errorCallBack(message);
    });

  }
  async read(page:number=0,size:number=5,successCallBack?: ()=>void,errorCallBack?:(errorMessage:string)=>void): Promise<{totalCount: number; products: List_Product[]}>
  {
  const promisData: Promise<{totalCount: number; products: List_Product[]}>= this.httpclientService.get<{totalCount: number; products: List_Product[]}>({
      controller:"products",
      queryString:`page=${page}&size=${size}`

    }).toPromise();

    promisData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promisData;
  }
   async delete(id: string)
  {
    const deleteObservable: Observable<any>= this.httpclientService.delete<any>({
      controller:"products"
    },id);

   await firstValueFrom(deleteObservable);
  }
}
