import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { UsercreateService } from 'src/app/services/models/usercreate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit  {

  constructor(private userService: UsercreateService, 
     spinner: NgxSpinnerService,
    private authService: AuthService,
    private socialAuthService:SocialAuthService,
    private activetedRoute: ActivatedRoute,
    private router: Router ) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser)=>{
      console.log(user)
      this.showSpinner(SpinnerType.Ballscale);
    await userService.googleLogin(user,() => {
      this.authService.idendtityCheck();
      this.hideSpinner(SpinnerType.Ballscale)});
    });
  }

  ngOnInit(): void {
    
  }
  async login(UserNameOrEmail:string,Password:string)
  {
    this.showSpinner(SpinnerType.Ballscale);
    await this.userService.login(UserNameOrEmail,Password, ()=> {
      this.authService.idendtityCheck();
      this.activetedRoute.queryParams.subscribe(params =>{
        const returnUrl: string = params["returnUrl"];
        if(returnUrl){
          this.router.navigate([returnUrl]);
        }
      })
      this.hideSpinner(SpinnerType.Ballscale);
     
    });

  }
}
