import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-basket-shopping-complete',
  templateUrl: './basket-shopping-complete.component.html',
  styleUrls: ['./basket-shopping-complete.component.scss']
})
export class BasketShoppingCompleteComponent extends BaseDialog<BasketShoppingCompleteComponent> {

  constructor(dialogRef:MatDialogRef<BasketShoppingCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketShoppingComplete) 
    {
    super(dialogRef);
  }
}
export enum BasketShoppingComplete{
  Yes,
  No
 }
 
