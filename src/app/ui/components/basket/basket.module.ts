import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { RouterModule } from '@angular/router';
import { BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BasketComponent,
    
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      {path:"",component:BasketComponent}
    ])
  ],
  exports:[
    BasketComponent,
    
  ]
})
export class BasketModule { }
