import { Component } from '@angular/core';
import { NgxSpaSupportService } from 'ngx-spa-support';
import {
  NgxSpaSupportConfig,
  NgxSpaSupportMenuItem,
} from 'projects/ngx-spa-support/src/lib/ngx-spa-support.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * NOTE: For debugging
   */
  // public menuItems: NgxSpaSupportMenuItem[] = [];
  public spaConfig: NgxSpaSupportConfig = {
    menu: <NgxSpaSupportMenuItem[]>[
      {
        link: '#mySection1',
        active: true,
        data: {
          mySectionData: 'test 1',
        },
      },
      {
        link: '#mySection2',
        active: false,
        mySectionData: 'test 2',
      },
    ],
    scrollBehavior: 'smooth',
  };

  constructor(private spaService: NgxSpaSupportService) {
    /**
     * NOTE: For debugging
     */
    // this.spaService
    //   .getMenuItems()
    //   .subscribe((menuItems: NgxSpaSupportMenuItem[]) => {
    //     this.menuItems = menuItems;
    //   });
  }
}
