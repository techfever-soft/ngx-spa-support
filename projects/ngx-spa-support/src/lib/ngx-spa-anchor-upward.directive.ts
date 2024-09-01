import { Directive, HostListener, Input } from '@angular/core';
import { NgxSpaSupportService } from './ngx-spa-support.service';

@Directive({
  selector: '[ngxSpaAnchorUpward]',
  standalone: true,
})
export class NgxSpaAnchorUpwardDirective {

  constructor(private spaService: NgxSpaSupportService) {}

  @HostListener('click')
  onClick() {
    this.spaService.scrollToPreviousSection();
  }
}
