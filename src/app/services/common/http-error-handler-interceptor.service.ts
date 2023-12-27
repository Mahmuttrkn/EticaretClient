import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { Position } from '../admin/alertify.service';
import { UserAuthService } from '../models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toasterService: CustomToastrService,
     private userAuthService:UserAuthService,
     private router: Router,
     private spinner:NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error=>{
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
         
         this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"),(state) => {
          if(!state){
            const url = this.router.url;
            this.spinner.show(SpinnerType.Ballscale);
            if(url=="/product")
            {
              this.toasterService.message("Sepete ürün eklemek için oturum açmanız gerekmektedir","Oturum açınız",{
                messageType:ToastrMessageType.Info,
                position:ToastrPosition.TopRight
              });
            }
            else{
              this.toasterService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır.","Yetkisiz işlem.",{
                messageType:ToastrMessageType.Error,
                position:ToastrPosition.TopFullWidth
              });
            }
          }
         }).then(data =>{

         });
          break;
          case HttpStatusCode.InternalServerError:
          this.toasterService.message("Servise erişimde sorun yaşanmaktadır.","Servis hatası!",{
            messageType:ToastrMessageType.Warning,
            position:ToastrPosition.TopRight
          });
          break;
          case HttpStatusCode.BadRequest:
            this.toasterService.message("Geçersiz istek yapıldı.","Geçersiz işlem!",{
              messageType:ToastrMessageType.Warning,
              position:ToastrPosition.TopRight
            });
          break;
          case HttpStatusCode.NotFound:
            this.toasterService.message("İstenilen sayfa bulunamadı.","Sayfa bulunamadı!",{
              messageType:ToastrMessageType.Warning,
              position:ToastrPosition.TopRight
            });
          break;
          default:
            this.toasterService.message("Beklenmeyen bir hata ile karşılaşıldı.","Sistem ekibi ile görüşünüz.",{
              messageType:ToastrMessageType.Warning,
              position:ToastrPosition.BottomFullWidth
            });
            break;
            
      }
      this.spinner.hide(SpinnerType.Ballscale);
      return of(error);
    }));
  }
}
