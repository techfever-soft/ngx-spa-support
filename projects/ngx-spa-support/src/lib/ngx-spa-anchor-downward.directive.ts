import { Directive, HostListener } from '@angular/core';
import { NgxSpaSupportService } from './ngx-spa-support.service';

@Directive({
  selector: '[ngxSpaAnchorDownward]',
  standalone: true,
})
export class NgxSpaAnchorDownwardDirective {
  constructor(private spaService: NgxSpaSupportService) {}

  @HostListener('click')
  onClick() {
    this.spaService.scrollToNextSection();
  }
}
