import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import { ProductsModule } from 'src/app/admin/components/products/products.module';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileuploadModule
    
  ],
  exports:[
    DeleteDialogComponent
  ]
})
export class DialogModule { }
