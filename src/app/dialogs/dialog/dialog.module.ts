import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from '../select-product-image-dialog/select-product-image-dialog.component';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteDialogComponent,

   
   
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileuploadModule,
    MatCardModule,
    FormsModule
    
  ],
  exports:[
    DeleteDialogComponent,
   
   
  ]
})
export class DialogModule { }
