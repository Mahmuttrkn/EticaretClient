import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { List_Order } from 'src/app/contracts/orders/list_order';
import { List_OrderById } from 'src/app/contracts/orders/orderById';
import { OrderService } from 'src/app/services/models/order.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent>
  {

    constructor(
      dialogRef: MatDialogRef<OrderDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
      private orderService: OrderService) 
      {
     super(dialogRef)
   }

   listOrderById : List_OrderById;

   displayedColumns: string[] = ['name','price','quantity','totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;

 async ngOnInit(): Promise<void> {
  this.listOrderById = await this.orderService.getOrderById(this.data as string)
  this.dataSource =this.listOrderById.basketItems;

  this.totalPrice = this.listOrderById.basketItems.map((List_Basket_Item,index) => List_Basket_Item.price * List_Basket_Item.quantity).reduce((price,current)=>price + current);

  }

  }
  
  export enum OrderDetailDialogState{
  Close,
  ShoppingCompleted
  }
 

