import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create-basket-item';
import { List_Product } from 'src/app/contracts/list_product';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { BasketService } from 'src/app/services/models/basket.service';
import { FileService } from 'src/app/services/models/file.service';
import { ProductService } from 'src/app/services/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, 
    private activetedRoute: ActivatedRoute,
     private fileService: FileService,
     private basketService: BasketService,
     private customerToastrService: CustomToastrService,
      spinner:NgxSpinnerService){
      super(spinner)
     }
  
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount:number;
  pageSize: number=12;
  pageList: number[] = [];
  baseUrl: BaseUrl;
  products: List_Product[];

 async ngOnInit() {
  this.activetedRoute.params.subscribe(async params => {

    this.baseUrl = await this.fileService.getBaseStorageUrl();

   this.currentPageNo= parseInt(params["pageNo"] ?? 1);

    const data: {totalProductCount:number,products:List_Product[]} = await this.productService.read(this.currentPageNo -1,this.pageSize,
      () => {

      },errorMessage => {

      });
      this.products = data.products;

     this.products = this.products.map<List_Product>( p => {
        const listproduct: List_Product = {
          id : p.id,
          createdDate: p.createdDate,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          imagePath:`${this.baseUrl}/${p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : ""}` ,
          productImageFiles: p.productImageFiles 
          
        }
        return listproduct;
      });

     

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / 12);

      this.pageList = [];

      if(this.totalPageCount >=4)
      {
        if(this.currentPageNo -3 <=0)
        {
          for(let i =1; i<=4; i++)
          { 
              this.pageList.push(i);
          }
        }
        else if(this.currentPageNo + 3 >= this.totalPageCount)
        {
          for(let i =this.totalPageCount-3; i<=this.totalPageCount; i++)
          { 
              this.pageList.push(i);
          }
        }
        else{
          for(let i =this.totalPageCount-3; i<=this.currentPageNo + 3; i++)
          { 
              this.pageList.push(i);
          }
        }
      }
      else
      {

              for (let i = 1; i <= this.totalPageCount; i++)
              {
                 this.pageList.push(i);
              }
            }
     
  });
  }
  async addToBasket(product:List_Product){
    this.showSpinner(SpinnerType.Ballscale)
    let _basketItem:Create_Basket_Item = new Create_Basket_Item();
    _basketItem.ProductId = product.id;
    _basketItem.Quantity = 1;

    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Ballscale);
    this.customerToastrService.message("Ürün Sepete Eklenmiştir","Başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopFullWidth
    });
  }
}
