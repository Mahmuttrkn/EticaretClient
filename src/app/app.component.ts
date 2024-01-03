import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SpinnerType } from './base/base.component';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { Position } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'ETicaretClient';

  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  constructor(public authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastrService:CustomToastrService,
    private router: Router,
    private httpClientService:HttpClientService,
    private dynamicLoadComponentService: DynamicLoadComponentService) {

    authService.idendtityCheck();
    }

    loadComponent() {
      const viewContainerRef = this.dynamicLoadComponentDirective.viewContainerRef;
      this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,viewContainerRef)
    }
    
    singOut()
    {
     
      localStorage.removeItem("accessToken");
      this.authService.idendtityCheck();
      this.router.navigate([""]);
      this.toastrService.message("Çıkış Başarılı Olarak Gerçekleştirilmiştir.","Oturum Sonlandırıldı",{
        messageType:ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
        
    })
    }
    
  }

  


