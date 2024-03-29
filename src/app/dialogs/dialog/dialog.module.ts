import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from '../select-product-image-dialog/select-product-image-dialog.component';
import { FileuploadModule } from 'src/app/services/common/fileupload/fileupload.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from '../basket-item-remove-dialog/basket-item-remove-dialog.component';
import { BasketShoppingCompleteComponent } from '../basket-shopping-complete/basket-shopping-complete.component';
import { OrderDetailDialogComponent } from '../order-detail-dialog/order-detail-dialog.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CompleteOrderDialogComponent } from '../complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from '../authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';





@NgModule({
  declarations: [
    DeleteDialogComponent,
    BasketItemRemoveDialogComponent,
    BasketShoppingCompleteComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
   AuthorizeMenuDialogComponent
  
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileuploadModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatBadgeModule
    
  ],
  exports:[
    DeleteDialogComponent,
    BasketItemRemoveDialogComponent,
    BasketShoppingCompleteComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent
   
  ]
})
export class DialogModule { }
