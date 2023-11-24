import { CUSTOM_ELEMENTS_SCHEMA, NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './ui/components/login/login.component';
import { SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
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
    {
      provide:"SocialAuthServiceConfig",
      useValue:{
        autoLogin:false,
        providers: [
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider("373473022397-6fvm2atr5gm9oj3f3on1sk56fbgslpnr.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      }as SocialAuthServiceConfig
    }
    
  ],
  
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
