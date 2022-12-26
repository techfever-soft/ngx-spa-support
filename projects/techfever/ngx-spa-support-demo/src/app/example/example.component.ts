import { Component, OnInit } from '@angular/core';
import {
  MenuConfig,
  MenuItem,
  NgxSpaSupportService,
} from '@techfever/ngx-spa-support';
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
    menu: [
      {
        link: '#link1',
        data: {
          title: 'Section scroll',
        },
      },
      {
        link: '#link2',
        data: {
          title: 'Menu scroll',
        },
      },
      {
        link: '#link3',
        data: {
          title: 'Dynamic sections',
        },
      },
    ],
    scrollingBehavior: 'smooth',
    useMenuScrolling: true,
    sectionMargin: 250,
    // autoScrolling: false,
    // fullSectionScroll: false,
    linkElementsPrefix: 'link',
    scrollableElementId: 'scrollable',
    menuElementId: 'menu',
  };

  constructor(private spaService: NgxSpaSupportService) {
    this.spaService.getMenuItems().subscribe((menu) => {
      this.subscribedMenu = menu;
    });

    this.spaService.getDynamicMenuItems().subscribe((dynamicMenu) => {
      this.dynamicSections = dynamicMenu;
    });
  }

  ngOnInit(): void {
    this.spaService
      .registerScrollAnchors(this.spaConfig)
      .then((menu) => {
        console.log('My created menu => ' + menu);
      })
      .catch((err) => {
        console.error(err);
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
    this.spaService.createScrollAnchor().then((createdAnchor) => {
      setTimeout(() => {
        this.spaService.triggerScrollAnchorById(createdAnchor.link);
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
}
