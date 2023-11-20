import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileuploadComponent } from './fileupload.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import {MatCardModule} from '@angular/material/card';





@NgModule({
  declarations: [
    FileuploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    FileuploadComponent,
    FileUploadDialogComponent
  ]
})
export class FileuploadModule { }
