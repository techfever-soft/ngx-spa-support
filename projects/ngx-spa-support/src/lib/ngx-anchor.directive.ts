import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { NgxSpaSupportService } from './ngx-spa-support.service';

@Directive({
  selector: '[ngxAnchor]',
})
export class NgxAnchorDirective {
  @Input('ngxAnchor') targetSectionId!: string;
  @Input('ngxAnchorActiveClass') targetSectionActiveClass: string = 'active';

  constructor(
    private spaService: NgxSpaSupportService,
    private elementRef: ElementRef
  ) {
    this.spaService.activeSectionChange.subscribe((activeSectionId: string) => {
      if (activeSectionId === this.targetSectionId) {
        this.elementRef.nativeElement.classList.add(
          this.targetSectionActiveClass
        );
      } else {
        this.elementRef.nativeElement.classList.remove(
          this.targetSectionActiveClass
        );
      }
    });
  }

  @HostListener('click') onClick() {
    this.spaService.triggerAnchorId(this.targetSectionId);
  }
}
