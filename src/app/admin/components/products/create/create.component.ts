import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { ProductService } from 'src/app/services/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private productService: ProductService,private alertify:AlertifyService){
    super(spinner)
   }


  ngOnInit(): void {
      
  }

  @Output() createdProduct: EventEmitter<any> = new EventEmitter();
  // @Output() fileUploadOptions: Partial< FileUploadOptions> = {
  //   action: "upload",
  //   controller: "products",
  //   explanation: "Dosya Seçin",
  //   isAdminPage: true,
  //   accept:".png, .jpg, .jpeg"
  // };

  create(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement){
    this.showSpinner(SpinnerType.Ballscale);

    const create_product: Create_Product = new Create_Product();
    create_product.name=name.value;
    create_product.price=parseFloat(price.value);
    create_product.stock=parseInt(stock.value);

    if(!name.value) {
      this.hideSpinner(SpinnerType.Ballscalemultiple);
      this.alertify.message("İsim Bilgisi Boş Geçilemez.",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      return;
    }
    if(parseInt(stock.value)<0){
      this.hideSpinner(SpinnerType.Ballscalemultiple);
      this.alertify.message("Stock Değeri Negatif Olamaz",{
        dismissOthers:true,
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      return;
    }

    this.productService.create(create_product,() =>{


      this.hideSpinner(SpinnerType.Ballscalemultiple);
      this.alertify.message("Ürün Başarılı Şekilde Eklenmiştir.",{
        dismissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(create_product);
    },errorMessage=> {
      this.alertify.message(errorMessage,
        {
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        })
    });
  }
}
