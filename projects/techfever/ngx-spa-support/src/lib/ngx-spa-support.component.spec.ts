import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpaSupportComponent } from './ngx-spa-support.component';

describe('NgxSpaSupportComponent', () => {
  let component: NgxSpaSupportComponent;
  let fixture: ComponentFixture<NgxSpaSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSpaSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSpaSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
