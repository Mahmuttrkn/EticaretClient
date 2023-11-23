import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';



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
  ]
})
export class ComponentsModule {
}
