import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"customer",loadChildren: () => import("./admin/components/customer/customer.module").then(module=>module.CustomerModule)},
    {path:"product",loadChildren: () =>import("./admin/components/products/products.module").then(module=>module.ProductsModule)},
    {path:"order",loadChildren: () =>import("./admin/components/order/order.module").then(module=>module.OrderModule)},
    //{path:"product",loadChildren: () =>import("./admin/components/products/products.module").then(module=>module.ProductsModule)},
  ]
},
{path:"",component:HomeComponent},
{path:"basket",loadChildren: () => import("./ui/components/basket/basket.module").then(module=>module.BasketModule)},
{path:"product",loadChildren: () => import("./ui/components/product/product.module").then(module=>module.ProductModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
