import { CUSTOM_ELEMENTS_SCHEMA, NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';
import { SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { BasketItemRemoveDialogComponent } from './dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { OrderDetailDialogComponent } from './dialogs/order-detail-dialog/order-detail-dialog.component';
import { CompleteOrderDialogComponent } from './dialogs/complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './dialogs/authorize-menu-dialog/authorize-menu-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7238"]

      }
    })
  ],
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:7238/api",multi:true},
    {provide:"signalRUrl",useValue:"https://localhost:7238/"},
    {
      provide:"SocialAuthServiceConfig",
      useValue:{
        autoLogin:false,
        providers: [
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider("373473022397-6fvm2atr5gm9oj3f3on1sk56fbgslpnr.apps.googleusercontent.com")
          },{
            id:FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("")
          }
          
        ],
        onError: err => console.log(err)
      }as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService, multi:true},
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
