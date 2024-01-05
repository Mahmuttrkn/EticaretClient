import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from '../dialogs/dialog/dialog.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
    RouterModule,
    MatSidenavModule,
    HttpClientModule,
    DialogModule
  ],
  exports:[
    LayoutModule
  ]
})
export class AdminModule { }
