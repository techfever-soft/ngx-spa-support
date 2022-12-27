import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxSpaSupportModule } from '@techfever/ngx-spa-support';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleComponent } from './example/example.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,

    HighlightModule,
    NgxSpaSupportModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          shell: () => import('highlight.js/lib/languages/shell'),
        },
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
