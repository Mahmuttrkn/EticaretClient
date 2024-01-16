import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_user } from 'src/app/contracts/users/create_user';
import { Token } from 'src/app/contracts/token/token';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UsercreateService {

  constructor(private httpclientService:HttpClientService,private toastrService: CustomToastrService) { }

  async create(user: User): Promise<create_user>{
   const observable: Observable<create_user | User> = this.httpclientService.post<create_user | User>({
      controller: "users"
    },user);

  return await firstValueFrom(observable) as create_user;
 
}
async updatePassword(userId:string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void,errorCallBack?: (error) => void){
const observable: Observable<any> = this.httpclientService.post({
  controller:"auth",
  action:"update-password"
},{userId:userId,resetToken:resetToken,password:password,passwordConfirm:passwordConfirm});

const promisData:Promise<any> = firstValueFrom(observable);
promisData.then(value => successCallBack()).catch(error => errorCallBack(error));
await promisData;
}
}
