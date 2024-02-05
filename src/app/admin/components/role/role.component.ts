import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Role } from 'src/app/contracts/role/create-role';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

var $:any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private httpClientService: HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.Ballscalemultiple);
    this.httpClientService.get({
      controller:"role"
    }).subscribe(data=>console.log(data));

}
@ViewChild(ListComponent) listComponent:ListComponent;
    
createdRole(createdRole:Create_Role){

  this.listComponent.getRoles();

}
}
