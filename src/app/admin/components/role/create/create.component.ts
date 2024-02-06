import { Component, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Role } from 'src/app/contracts/role/create-role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private roleService: RoleService){
    super(spinner);
  }

  @Output() createdRole: EventEmitter<any> = new EventEmitter();

  create(name:HTMLInputElement){
    this.showSpinner(SpinnerType.Ballscalemultiple);

    const create_role: Create_Role = new Create_Role();
    create_role.name=name.value;


    if(!name.value) {
      this.hideSpinner(SpinnerType.Ballscalemultiple);
      this.alertify.message("İsim Bilgisi Boş Geçilemez.",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      return;
    }
      this.roleService.create(create_role,() =>{
        this.hideSpinner(SpinnerType.Ballscalemultiple);
        this.alertify.message("Role Başarılı Şekilde Eklenmiştir.",{
          dismissOthers:true,
          messageType:MessageType.Success,
          position:Position.TopRight
        });
        this.createdRole.emit(create_role);
      },errorMessage=> {
        this.alertify.message(errorMessage,
          {
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          })
      });
    }
  }
