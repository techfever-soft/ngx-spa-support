import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpaSupportService } from './ngx-spa-support.service';

@Directive({
  selector: '[ngxSpaAnchor]',
  standalone: true,
})
export class NgxSpaAnchorDirective {
  @Input('ngxSpaAnchor') link!: string;
  private subscription!: Subscription;

  constructor(
    private el: ElementRef,
    private spaService: NgxSpaSupportService
  ) {}

  ngOnInit() {
    this.subscription = this.spaService
      .getMenuItems()
      .subscribe((menuItems) => {
        const activeItem = menuItems.find((item) => item.link === this.link);
        if (activeItem) {
          this.el.nativeElement.id = this.link;
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('click') onClick() {
    this.spaService.scrollToAnchorId(this.link);
  }
}
