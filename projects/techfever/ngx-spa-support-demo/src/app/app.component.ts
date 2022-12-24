import { Component, OnInit } from '@angular/core';
import { MenuConfig, NgxSpaSupportService } from '@techfever/ngx-spa-support';
import { MenuItem } from '@techfever/ngx-spa-support';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = '@techfever/ngx-spa-support-demo';

  subscribedMenu: MenuItem[] = [];

  constructor(private spaService: NgxSpaSupportService) {
    this.spaService.getMenuItems().subscribe((menu) => {
      this.subscribedMenu = menu;
    });
  }

  ngOnInit() {
    const scrollConfig: MenuConfig = {
      menu: [
        {
          title: 'Home',
          link: '#link1',
        },
        {
          title: 'Home 2',
          link: '#link2',
        },
        {
          title: 'Home 3',
          link: '#link3',
        },
        {
          title: 'Home 4',
          link: '#link4',
        },
      ],
      scrollingBehavior: 'smooth',
      useMenuScrolling: true,
      sectionMargin: 250,
      fullSectionScroll: true,
    };

    this.spaService.createScrollAnchors(scrollConfig);
  }

  public triggerScroll(item: MenuItem) {
    this.spaService.triggerScrollAnchor(item);
  }
}
