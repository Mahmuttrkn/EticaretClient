import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Position } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

  constructor(private toastrService:CustomToastrService) {
    //toastrService.message(" Baba","Destur!!!!",{
      //messageType: ToastrMessageType.Info,
      //position:ToastrPosition.TopRight
    };
  }  
  
  //  $.get("https://localhost:7238/",data => {
  //   console.log(data)



//$(document).ready(()=>{
 // alert("asd")
//})


