import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxSpaSupportModule } from '@techfever/ngx-spa-support';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSpaSupportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
