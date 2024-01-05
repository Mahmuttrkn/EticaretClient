import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketShoppingCompleteComponent } from './basket-shopping-complete.component';

describe('BasketShoppingCompleteComponent', () => {
  let component: BasketShoppingCompleteComponent;
  let fixture: ComponentFixture<BasketShoppingCompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketShoppingCompleteComponent]
    });
    fixture = TestBed.createComponent(BasketShoppingCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
