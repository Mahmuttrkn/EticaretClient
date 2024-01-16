import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/models/user-auth.service';
import { UsercreateService } from 'src/app/services/models/usercreate.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private authService: UserAuthService,
    private activatedRoute : ActivatedRoute,
    private toastrService: CustomToastrService,
    private userService: UsercreateService,
    private alertify: AlertifyService,
    private router: Router) {
    super(spinner);
  }
state:any = true;

ngOnInit(): void {
  this.showSpinner(SpinnerType.Ballscale)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken:string = params["resetToken"];
      this.state = await this.authService.verifyResetToken(userId,resetToken, () => {

          this.state = true;
          this.hideSpinner(SpinnerType.Ballscale);
        })
      }
    });
}
updatePassword(password:string,passwordConfirm:string)
{
  this.showSpinner(SpinnerType.Ballscale);
  if(password != passwordConfirm)
  {
    this.toastrService.message("Şifreler Eşleşmiyor","Hata",{
      position:ToastrPosition.TopRight,
      messageType:ToastrMessageType.Error
      
    });
    this.hideSpinner(SpinnerType.Ballscale);
    return;
  }
  else{
    this.activatedRoute.params.subscribe({
      next:async params => {
        const userId: string = params["userId"];
        const resetToken:string = params["resetToken"];
      await  this.userService.updatePassword(userId,resetToken,password,passwordConfirm,
        () => {
                this.alertify.message("Şifre Başarıyla Güncellendi.",{
                  messageType:MessageType.Success,
                  position:Position.TopRight
                })
                this.router.navigate(["/login"])
              },
      error => {
                  console.log(error);
               })
      }
    })
    
  }
}
}
