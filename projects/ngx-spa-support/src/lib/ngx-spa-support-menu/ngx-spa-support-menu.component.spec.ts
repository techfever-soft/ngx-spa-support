import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpaSupportMenuComponent } from './ngx-spa-support-menu.component';

describe('NgxSpaSupportMenuComponent', () => {
  let component: NgxSpaSupportMenuComponent;
  let fixture: ComponentFixture<NgxSpaSupportMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSpaSupportMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSpaSupportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
