import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductModule,
    BasketModule,
    HomeModule,
    RegisterModule,
    //LoginModule
  ],
  exports:[
    BasketModule
  ]
})
export class ComponentsModule {
}
