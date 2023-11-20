import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UsercreateService } from 'src/app/services/models/usercreate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit  {

  constructor(private userService: UsercreateService,  spinner: NgxSpinnerService ) {
    super(spinner);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  async login(UserNameOrEmail:string,Password:string)
  {
    this.showSpinner(SpinnerType.Ballscale);
    await this.userService.login(UserNameOrEmail,Password, ()=> this.hideSpinner(SpinnerType.Ballscale));
  }
}
