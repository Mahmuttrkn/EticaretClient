import { Injectable } from '@angular/core';
declare var alertify : any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string,options: Partial<AlertifyOptions>) {
    const msg= alertify[options.messageType](message)
    alertify.set('notifier','position',options.position);
    alertify.set('notifier','delay',options.delay)
    if(options.dismissOthers)
    msg.dismissOthers();
  }
  dismiss() {
    alertify.dismiss();
  }
}
export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position:Position = Position.TopRight;
  delay:number = 5;
  dismissOthers:boolean = false;
}

export enum MessageType {
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}

export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}
