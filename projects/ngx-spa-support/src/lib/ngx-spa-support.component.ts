import { Component, ElementRef, Input } from '@angular/core';

import { NgxSpaSupportService } from './ngx-spa-support.service';

@Component({
  selector: 'ngx-spa-support',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class NgxSpaSupportComponent {
  @Input('config') public config: any;

  constructor(private spaService: NgxSpaSupportService) {}

  ngOnChanges(): void {
    this.spaService.initWithConfig(this.config);
  }
}
