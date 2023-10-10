import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductsComponent } from 'src/app/admin/components/products/products.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:ProductComponent}
    ])
  ],
  exports:[
    ProductComponent
  ]
})
export class ProductModule { }
