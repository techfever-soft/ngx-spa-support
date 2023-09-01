import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpaSupportModule } from 'ngx-spa-support';

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
