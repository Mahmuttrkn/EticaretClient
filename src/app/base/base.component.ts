import { NgxSpinnerService } from "ngx-spinner";



export class BaseComponent {

  constructor(private spinner:NgxSpinnerService){}
  

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType);

    setTimeout(()=>{
      this.hideSpinner(spinnerNameType)
    },3000);
  }

  hideSpinner(spinnerNameType:SpinnerType){
    this.spinner.hide(spinnerNameType);
  }

}

export enum SpinnerType{
  Ballscalemultiple="s1",
  Ballscale="s2"
}

