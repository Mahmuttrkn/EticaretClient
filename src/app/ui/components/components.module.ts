import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { MatButtonModule } from '@angular/material/button';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdatePasswordModule } from './update-password/update-password.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ProductModule,
    BasketModule,
    HomeModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[
    BasketModule
  ]
})
export class ComponentsModule {
}
