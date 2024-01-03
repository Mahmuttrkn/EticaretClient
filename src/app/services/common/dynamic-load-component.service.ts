import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';



//ViewContainerRef  : Dinamik olarak yüklenecek componenti içerisinde barındıran container.(Her yükleme öncesi bir önceki
//componenti clear etmemiz gerekmektedir.)
//Buradan sonra <ng-template></ng-template> kullanarak ilgili componentin içerisinde işlemleri gerçekleştirebiliriz.


@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor( ) { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef){

    let _component: any=null;

    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/basket/basket.component")).BasketComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);

  }
}
export enum ComponentType {
  BasketsComponent
}