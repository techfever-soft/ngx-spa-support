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
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";

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
    MatCardModule,
    MatCheckboxModule
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
        removable: false,
        data: {
          label: 'My second section',
        },
      },
    ],
    // loopMode: false,
    // rubberBandEffect: false,
    // scrollSnapping: false,
    scrollOnCreated: true,
    scrollBehavior: 'smooth',
    sectionDetectionSize: 250,
  };

  constructor(private spaService: NgxSpaSupportService) {}

  ngAfterViewInit() {
    this.spaService.init(this.spaConfig);

    this.spaService
      .getMenuItems()
      .subscribe((menuItems: NgxSpaSupportMenuItem[]) => {
        this.menuItems = menuItems;
      });

    this.spaService.getConfig().subscribe((config: any) => {
      this.spaConfig = config;
    });
  }

  public onToggleScrollSnaping() {
    // this.spaService.toggleScrollSnapping();
  }

  public onToggleScrollOnCreated(event: MatCheckboxChange) {
    this.spaService.toggleScrollOnCreated(event.checked);
  }

  public addNewSection() {
    this.spaService.addNewSection();
  }

  public isFirstSection(index: number) {
    return index === 0;
  }

  public isLatestSection(index: number) {
    return this.menuItems.length - 1 === index;
  }
}
