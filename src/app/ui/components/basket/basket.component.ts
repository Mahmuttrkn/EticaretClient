import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update-basket-item';
import { create_order } from 'src/app/contracts/orders/create_order';
import { BasketService } from 'src/app/services/models/basket.service';
import { OrderService } from 'src/app/services/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';


declare var $:any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,
    private basketService:BasketService,
    private toastrService:CustomToastrService,
    private router:Router,
    private orderService: OrderService){
    super(spinner)
  }
  basketItems:List_Basket_Item[];
  
async ngOnInit():Promise<any> {
this.spinner.show(SpinnerType.Ballscale)
   this.basketItems = await this.basketService.get()
   this.spinner.hide(SpinnerType.Ballscale)
}

async changeQuantity(object: any){
  this.showSpinner(SpinnerType.Ballscale)
const basketItemId:string = object.target.attributes["id"].value;
const quantity: number = object.target.value;
const basketItem : Update_Basket_Item = new Update_Basket_Item();
basketItem.BasketItemId = basketItemId;
basketItem.Quantity = quantity;
await this.basketService.put(basketItem);
this.hideSpinner(SpinnerType.Ballscale)
}

async deleteBasketItem(basketItemId:string){
this.showSpinner(SpinnerType.Ballscale);



await this.basketService.remove(basketItemId);

$("."+ basketItemId).fadeOut(500,() => 
  this.hideSpinner(SpinnerType.Ballscale));
}
async shoppingComplete(){
  this.showSpinner(SpinnerType.Ballscale);
  const order: create_order = new create_order();
  order.address="Yenimahalle";
  order.description="Ankara";
 await this.orderService.create(order);
 this.hideSpinner(SpinnerType.Ballscale);
this.toastrService.message("Sepetiniz Oluşturulmuştur","Onaylandı",{
  messageType:ToastrMessageType.Info,
  position:ToastrPosition.TopRight
})
 this.router.navigate(["/"]);
}

}
