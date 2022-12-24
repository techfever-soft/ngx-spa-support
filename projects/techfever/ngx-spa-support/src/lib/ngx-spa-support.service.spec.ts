import { TestBed } from '@angular/core/testing';

import { NgxSpaSupportService } from './2-ngx-spa-support.service';

describe('NgxSpaSupportService', () => {
  let service: NgxSpaSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSpaSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
