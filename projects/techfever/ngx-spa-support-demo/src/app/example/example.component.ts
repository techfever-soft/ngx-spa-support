import { Component, Input, OnInit } from '@angular/core';
import {
  MenuConfig,
  MenuItem,
  NgxSpaSupportService,
} from '@techfever/ngx-spa-support';
import { MatTabGroup } from '@angular/material/tabs';
import { secondContentHTML, secondContentTS } from '../contents';
import {
  firstContentHTML,
  firstContentTS,
  firstContentSCSS,
} from '../contents/example/menu-scroll';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  @Input('tabGroup') tabGroup!: MatTabGroup;

  public subscribedMenu: MenuItem[] = [];
  public dynamicSections: MenuItem[] = [];

  public firstSectionCodeExpanded: boolean = false;
  public secondSectionCodeExpanded: boolean = false;

  public firstContentHTML = firstContentHTML;
  public firstContentTS = firstContentTS;
  public firstContentSCSS = firstContentSCSS;

  public secondContentHTML = secondContentHTML;
  public secondContentTS = secondContentTS;

  public spaConfig: MenuConfig = {
    menu: <MenuItem[]>[
      {
        link: '#link0',
        active: true,
        data: {
          title: 'Home',
          icon: 'home',
        },
      },
      {
        link: '#link1',
        data: {
          title: 'Section scroll',
          icon: 'mouse',
        },
      },
      {
        link: '#link2',
        data: {
          title: 'Menu scroll',
          icon: 'menu',
        },
      },
      {
        link: '#link3',
        data: {
          title: 'Dynamic sections',
          icon: 'view_stream',
        },
      },
    ],
    scrollingBehavior: 'smooth',
    useMenuScrolling: true,
    sectionDetectionSize: 250,
    sectionVerticalScrollMargin: 70,
    linkElementsPrefix: 'link',
    scrollableElementId: 'scrollable',
    menuElementId: 'menu',
  };

  constructor(private spaService: NgxSpaSupportService) {
    this.spaService.getMenuItems().subscribe((menu: MenuItem[]) => {
      this.subscribedMenu = menu;
    });

    this.spaService.getDynamicMenuItems().subscribe((dynamicMenu: MenuItem[]) => {
      this.dynamicSections = dynamicMenu;
    });
  }

  ngOnInit(): void {
    this.spaService
      .registerScrollAnchors(this.spaConfig)
      .then((menu: MenuItem[]) => {
        // console.log('My created menu => ', menu);
      })
      .catch((err: { message: string }) => {
        console.error(err.message);
      });
  }

  public triggerScroll(item: MenuItem) {
    this.firstSectionCodeExpanded = false;
    this.secondSectionCodeExpanded = false;

    this.spaService.triggerScrollAnchor(item);
  }

  public triggerScrollById(itemId: string) {
    this.firstSectionCodeExpanded = false;
    this.secondSectionCodeExpanded = false;

    this.spaService.triggerScrollAnchorById(itemId);
  }

  public addScrollAnchor() {
    const newDynamicItemData: MenuItem['data'] = {
      title: 'New dynamic item',
      icon: 'bolt',
    };

    this.spaService.pushScrollAnchor(newDynamicItemData, true).then((item: MenuItem) => {
      this.spaService.updateScrollAnchor(item, {
        title: 'New item, last title was "' + item.data['title'] + '"',
      });
    });
  }

  public deleteSectionById(id: string) {
    this.spaService.removeScrollAnchor(id);
  }

  public triggerNextAnchor() {
    this.spaService.triggerNextAnchor();
  }

  public triggerPreviousAnchor() {
    this.spaService.triggerPreviousAnchor();
  }

  public triggerFirstAnchor() {
    this.spaService.triggerFirstAnchor();
  }

  public triggerLastAnchor() {
    this.spaService.triggerLastAnchor();
  }

  public changeTab(index: number) {
    this.tabGroup.selectedIndex = index;
  }
}
