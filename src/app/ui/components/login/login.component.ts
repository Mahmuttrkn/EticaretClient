import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UsercreateService,  spinner: NgxSpinnerService,private authService: AuthService ) {
    super(spinner);
  }

  ngOnInit(): void {
    
  }
  async login(UserNameOrEmail:string,Password:string)
  {
    this.showSpinner(SpinnerType.Ballscale);
    await this.userService.login(UserNameOrEmail,Password, ()=> {
      this.authService.idendtityCheck();
      this.hideSpinner(SpinnerType.Ballscale);
     
    });
  }
}
