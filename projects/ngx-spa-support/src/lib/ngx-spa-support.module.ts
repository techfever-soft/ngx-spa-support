import { NgModule } from '@angular/core';
import { NgxAnchorDirective } from './ngx-anchor.directive';
import { NgxSpaSupportComponent } from './ngx-spa-support.component';
import { NgxSpaSupportMenuComponent } from './ngx-spa-support-menu/ngx-spa-support-menu.component';
import { NgxSpaSupportScrollableComponent } from './ngx-spa-support-scrollable/ngx-spa-support-scrollable.component';

@NgModule({
  declarations: [
    NgxSpaSupportComponent,
    NgxSpaSupportScrollableComponent,
    NgxSpaSupportMenuComponent,
    NgxAnchorDirective,
  ],
  imports: [],
  exports: [
    NgxSpaSupportComponent,
    NgxSpaSupportScrollableComponent,
    NgxSpaSupportMenuComponent,
    NgxAnchorDirective,
  ],
})
export class NgxSpaSupportModule {}
