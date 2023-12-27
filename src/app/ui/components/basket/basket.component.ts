import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { BasketService } from 'src/app/services/models/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(spinner:NgxSpinnerService,
    private basketService:BasketService){
    super(spinner)
  }
  basketItems:ListBasketItem[];
async ngOnInit() {
this.spinner.show(SpinnerType.Ballscale);
   this.basketItems = await this.basketService.get();
   this.spinner.hide(SpinnerType.Ballscale);
}
}
