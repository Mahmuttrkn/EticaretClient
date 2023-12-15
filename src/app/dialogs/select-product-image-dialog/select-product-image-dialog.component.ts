import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { ProductService } from 'src/app/services/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:selectImage | string ,
    private productService:ProductService,
    private spinnerService:NgxSpinnerService,
    private dialogService: DialogService)
  {
    super(dialogRef)
  }
  


  @Output() options: Partial< FileUploadOptions> = {
    controller: "products",
    action: "upload",
    queryString:`id=${this.data}`,
    explanation: "Ürün Resmini Seçin",
    isAdminPage: true,
    accept:".png, .jpg, .jpeg, .file",
  
  };
  

  

  images:List_Product_Image[];
  async ngOnInit() {
    //this.spinnerService.show(SpinnerType.Ballscale);
    this.images = await this.productService.readImage(this.data as string,() => this.spinnerService.hide(SpinnerType.Ballscale));
    
  }

 async deleteImage(imageId:string,event: any)
  {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async() =>{  this.spinnerService.show(SpinnerType.Ballscale)
        await this.productService.deleteImage(this.data as string, imageId,() =>{
         this.spinnerService.hide(SpinnerType.Ballscale);
         var card = $(event.srcElement).parent().parent();
         card.fadeOut(8000)
        });
        
      }

    });
  
  }
  showCase(imageId:string)
  {
    this.spinnerService.show(SpinnerType.Ballscale);
    this.productService.changeShowcaseImage(imageId,this.data as string,() => {
      this.spinnerService.hide(SpinnerType.Ballscale);
    });
  }

}

export enum selectImage{
  Close
}