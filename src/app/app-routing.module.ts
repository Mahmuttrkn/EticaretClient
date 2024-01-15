import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { authGuard } from './guards/common/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent,canActivate:[authGuard]},
    {path:"customer",loadChildren: () => import("./admin/components/customer/customer.module").then(module=>module.CustomerModule),canActivate:[authGuard]},
    {path:"product",loadChildren: () =>import("./admin/components/products/products.module").then(module=>module.ProductsModule),canActivate:[authGuard]},
    {path:"order",loadChildren: () =>import("./admin/components/order/order.module").then(module=>module.OrderModule),canActivate:[authGuard]},
    
    
  ],canActivate:[authGuard]
},
{path:"",component:HomeComponent},
{path:"basket",loadChildren: () => import("./ui/components/basket/basket.module").then(module=>module.BasketModule)},
{path:"product",loadChildren: () => import("./ui/components/product/product.module").then(module=>module.ProductModule)},
{path:"product/:pageNo",loadChildren: () => import("./ui/components/product/product.module").then(module=>module.ProductModule)},
{path:"register",loadChildren:() => import("./ui/components/register/register.module").then(module=>module.RegisterModule)},
{path:"login",loadChildren:() => import("./ui/components/login/login.module").then(module=>module.LoginModule)},
{path:"password-reset",loadChildren:() => import("./ui/components/password-reset/password-reset.module").then(module=>module.PasswordResetModule)},
{path:"update-password/:userId/:resetToken",loadChildren:() => import("./ui/components/update-password/update-password.module").then(module=>module.UpdatePasswordModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
