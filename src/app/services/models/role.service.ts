import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Role } from 'src/app/contracts/role/create-role';
import { List_Role } from 'src/app/contracts/role/list-role';
import { HttpClientService } from '../common/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }
  async create(role: Create_Role, successCallBack?: () => void, errorMessage?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller:"role"
    },role);

    return await firstValueFrom(observable) as {succeeded:boolean};
  }

  
  async getRoles(page:number=0,size:number=5,successCallBack?: ()=>void,errorCallBack?:(errorMessage:string)=>void): Promise<{totalRoleCount: number; roles: List_Role[]}>
  {
  const promisData: Promise<{totalRoleCount: number; roles: List_Role[]}>= this.httpClientService.get<{totalRoleCount: number; roles: List_Role[]}>({
      controller:"role",
      queryString:`page=${page}&size=${size}`

    }).toPromise();

    promisData.then(d => successCallBack())
    .catch((errorResponse: HttpErrorResponse)=>errorCallBack(errorResponse.message))

    return await promisData;
  }
}
