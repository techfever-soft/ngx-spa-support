import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpaSupportScrollableComponent } from './ngx-spa-support-scrollable.component';

describe('NgxSpaSupportScrollableComponent', () => {
  let component: NgxSpaSupportScrollableComponent;
  let fixture: ComponentFixture<NgxSpaSupportScrollableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSpaSupportScrollableComponent]
    });
    fixture = TestBed.createComponent(NgxSpaSupportScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
