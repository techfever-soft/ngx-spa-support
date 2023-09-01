import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpaSupportMenuComponent } from './ngx-spa-support-menu.component';

describe('NgxSpaSupportMenuComponent', () => {
  let component: NgxSpaSupportMenuComponent;
  let fixture: ComponentFixture<NgxSpaSupportMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSpaSupportMenuComponent]
    });
    fixture = TestBed.createComponent(NgxSpaSupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
