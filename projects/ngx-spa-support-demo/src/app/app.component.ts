import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgxSpaSupportComponent,
  NgxSpaSupportService,
} from '../../../ngx-spa-support/src/public-api';
import {
  NgxSpaSupportConfig,
  NgxSpaSupportMenuItem,
} from '../../../ngx-spa-support/src/lib/ngx-spa-support.interface';
import { CommonModule } from '@angular/common';
import { NgxSpaSupportScrollableComponent } from '../../../ngx-spa-support/src/lib/ngx-spa-support-scrollable/ngx-spa-support-scrollable.component';
import { NgxSpaAnchorDirective } from '../../../ngx-spa-support/src/lib/ngx-spa-anchor.directive';
import { NgxSpaSupportMenuComponent } from '../../../ngx-spa-support/src/lib/ngx-spa-support-menu/ngx-spa-support-menu.component';
import { NgxSpaAnchorUpwardDirective } from '../../../ngx-spa-support/src/lib/ngx-spa-anchor-upward.directive';
import { NgxSpaAnchorDownwardDirective } from '../../../ngx-spa-support/src/lib/ngx-spa-anchor-downward.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgxSpaSupportComponent,
    NgxSpaSupportScrollableComponent,
    NgxSpaSupportMenuComponent,
    NgxSpaAnchorDirective,
    NgxSpaAnchorUpwardDirective,
    NgxSpaAnchorDownwardDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public menuItems: NgxSpaSupportMenuItem[] = [];
  public spaConfig: NgxSpaSupportConfig = {
    menu: <NgxSpaSupportMenuItem[]>[
      {
        link: 'mySection1',
        active: false,
        removable: false,
        data: {
          label: 'My first section',
        },
      },
      {
        link: 'mySection2',
        active: true,
        removable: true,
        data: {
          label: 'My second section',
        },
      },
    ],
    scrollBehavior: 'smooth',
    sectionDetectionSize: 250,
    scrollOnCreated: true,
    scrollSnapping: true,
  };

  constructor(private spaService: NgxSpaSupportService) {
    this.spaService
      .getMenuItems()
      .subscribe((menuItems: NgxSpaSupportMenuItem[]) => {
        this.menuItems = menuItems;
      });
  }

  ngAfterViewInit() {
    this.spaService.setConfig(this.spaConfig);
  }

  public onToggleScrollSnaping() {
    this.spaService.toggleScrollSnapping();
  }
}
