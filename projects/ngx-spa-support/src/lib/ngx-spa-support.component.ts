import { Component } from '@angular/core';
import { NgxSpaSupportMenuComponent } from './ngx-spa-support-menu/ngx-spa-support-menu.component';
import { NgxSpaSupportScrollableComponent } from './ngx-spa-support-scrollable/ngx-spa-support-scrollable.component';
import { NgxSpaAnchorDirective } from './ngx-spa-anchor.directive';
import { NgxSpaAnchorDownwardDirective } from './ngx-spa-anchor-downward.directive';
import { NgxSpaAnchorUpwardDirective } from './ngx-spa-anchor-upward.directive';

@Component({
  selector: 'ngx-spa-support',
  standalone: true,
  imports: [
    NgxSpaSupportMenuComponent,
    NgxSpaSupportScrollableComponent,
    NgxSpaAnchorDirective,
    NgxSpaAnchorUpwardDirective,
    NgxSpaAnchorDownwardDirective,
  ],
  template: `<ng-content></ng-content>`,
  styles: ``,
})
export class NgxSpaSupportComponent {}
