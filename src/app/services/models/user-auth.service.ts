import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpclientService:HttpClientService,private toastrService: CustomToastrService) { }

  async login(UserNameOrEmail:string,Password:string, callBackFunction? : () => void): Promise<any> {
    const observable:Observable<any | TokenResponse> = this.httpclientService.post<any | TokenResponse >({
      controller:"auth",
      action:"login"
    },{UserNameOrEmail,Password})

    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(token != null)
    {
      localStorage.setItem("accessToken",token.token.accessToken);


      this.toastrService.message("Kullanıcı Girişi Sağlanmıştır","Giriş Başarılı.",{
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }
    
    callBackFunction();
  }
 async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> = this.httpclientService.post<SocialUser | TokenResponse>({
      action:"google-login",
      controller:"auth"
    },user)

   const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

   if(tokenResponse != null)
   {
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);

    this.toastrService.message("Google üzerinden giriş başarılı sağlanmıştır.","Giriş başarılı.",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRight
    });
   }
   else if(tokenResponse == null )
   {
      this.toastrService.message("ERROR","HATA",{
        messageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
   }
   callBackFunction();
  }
}
