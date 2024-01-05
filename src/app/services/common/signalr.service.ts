import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("signalRUrl") private signalRUrl: string) { }

  // private _connection: HubConnection;
  // get connection(): HubConnection{
  //   return this._connection;
  // }

  start(hubUrl:string){
    hubUrl = this.signalRUrl+hubUrl;
   // if(!this.connection || this._connection?.state == HubConnectionState.Disconnected){
      const builder: HubConnectionBuilder =new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

      hubConnection.start()
      .then(()=>
        console.log("Connected")
      )
      .catch(error => setTimeout(()=> this.start(hubUrl),2000));

      //this.hubConnection = hubConnection;
    //}

    hubConnection.onreconnected(connectionId => console.log("Reconnected"));
    hubConnection.onreconnecting(error => console.log("Reconnecting"));
    hubConnection.onclose(error => console.log("Close reconnecting"));
    return hubConnection;
  }

  invoke(hubUrl:string ,procedurName:string,message: any, successCallBack?: (values) => void, errorCallBack?:(error)=>void) {
    this.start(hubUrl).invoke(procedurName,message)
    .then(successCallBack)
    .catch(errorCallBack);
  }

  on(hubUrl:string,procedurName:string,callBack:(...message: any)=>void) {
    this.start(hubUrl).on(procedurName,callBack);
  }
}
