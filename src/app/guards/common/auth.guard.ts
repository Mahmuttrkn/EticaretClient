
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';





export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const jwthelper = inject(JwtHelperService);
  const router = inject(Router);
  const toastrService = inject(CustomToastrService);
  const spinner = inject(NgxSpinnerService);
  const authService = inject(AuthService);
  
  spinner.show(SpinnerType.Ballscale);

//  const token :String = localStorage.getItem("accessToken");

//   //const decodeToken =jwthelper.decodeToken(token.toString());
//   //const expireDate: Date = jwthelper.getTokenExpirationDate(token.toString());
//   let expiredToken: boolean ;
//   try {
//     expiredToken = jwthelper.isTokenExpired(token.toString());
//   } catch {
//     expiredToken = true;
//   }

  if(!_isAuthenticated)
  {
    router.navigate(["login"],{queryParams:{returnUrl: state.url}});
    toastrService.message("Oturum açmanız gerekmektedir.","Yetkisiz Erişim",{
      messageType:ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    })
  }

 spinner.hide(SpinnerType.Ballscale);
  return true;
};
