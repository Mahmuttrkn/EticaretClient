import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activetedRoute: ActivatedRoute){}
  
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount:number;
  pageSize: number=12;
  pageList: number[] = [];

  products: List_Product[];

  ngOnInit() {
  this.activetedRoute.params.subscribe(async params => {

   this.currentPageNo= parseInt(params["pageNo"] ?? 1);

    const data: {totalProductCount:number,products:List_Product[]} = await this.productService.read(this.currentPageNo -1,this.pageSize,
      () => {

      },errorMessage => {

      });
      this.products = data.products;
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
}
