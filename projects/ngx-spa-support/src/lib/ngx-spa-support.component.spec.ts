import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpaSupportComponent } from './ngx-spa-support.component';

describe('NgxSpaSupportComponent', () => {
  let component: NgxSpaSupportComponent;
  let fixture: ComponentFixture<NgxSpaSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSpaSupportComponent]
    });
    fixture = TestBed.createComponent(NgxSpaSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
