import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { ListOrderComponent } from './list/list-order/list-order.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DeleteModule } from 'src/app/directives/admin/delete.module';



@NgModule({
  declarations: [
    OrderComponent,
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:OrderComponent}
      
    ]),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FileuploadModule,
    DialogModule,
    MatCardModule,
    FormsModule,
    DeleteModule
  ],
  exports:[
    OrderComponent,
    ListOrderComponent
  ]
})
export class OrderModule { }
