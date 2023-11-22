import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
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
    private activetedRoute: ActivatedRoute,
    private router: Router ) {
    super(spinner);
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
