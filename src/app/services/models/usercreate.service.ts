import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { create_user } from 'src/app/contracts/users/create_user';
import { Token } from 'src/app/contracts/token/token';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

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
  async login(UserNameOrEmail:string,Password:string, callBackFunction? : () => void): Promise<any> {
    const observable:Observable<any | TokenResponse> = this.httpclientService.post<any | TokenResponse >({
      controller:"users",
      action:"login"
    },{UserNameOrEmail,Password})

    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(token)
    {
      localStorage.setItem("accessToken",token.token.accessToken);


      this.toastrService.message("Kullanıcı Girişi Sağlanmıştır","Giriş Başarılı.",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    
    callBackFunction();
  }
}
