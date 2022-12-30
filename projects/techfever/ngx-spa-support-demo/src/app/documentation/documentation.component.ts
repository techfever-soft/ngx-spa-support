import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent {
  public addToModuleCode = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpaSupportModule } from '@techfever/ngx-spa-support';

@NgModule({
  declarations: [AppModule],
  imports: [
    BrowserModule,
    // ...
    NgxSpaSupportModule
  ]
})
export class AppModule {}
`;

  public useInStyleCode = `
#scrollable {
  height: 100%;
  overflow: auto;

  section {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 1.5em;

    &:nth-child(1) {
      background-color: rgba(0, 0, 0, 0.4);
    }
    &:nth-child(2) {
      background-color: rgba(0, 0, 0, 0.3);
    }
    &:nth-child(3) {
      background-color: rgba(0, 0, 0, 0.2);
    }
    &:nth-child(4) {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

.scrollable-sections {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
}
`;

  public useInTemplateCode = `
<!-- 
  We use a dynamic menu for the example, but you can also use a static menu
-->
<div class="scrollable-menu">
  <ul id="menu">
    <li
      *ngFor="let item of subscribedMenu"
      [class]="item.active ? 'active' : ''"
    >
      <a
        *ngIf="!item.active"
        mat-button
        href="javascript:void(0)"
        (click)="triggerScroll(item)"
      >
        <mat-icon>{{ item.data["icon"] }}</mat-icon> {{ item.data["title"] }}</a
      >
      <a
        *ngIf="item.active"
        mat-raised-button
        color="accent"
        href="javascript:void(0)"
      >
        <mat-icon>{{ item.data["icon"] }}</mat-icon> {{ item.data["title"] }}</a
      >
    </li>
  </ul>
</div>

<div class="scrollable-sections" id="scrollable">
  <section id="link0">
    My own section 1
  </section>
  <!-- 
    ...
    Your static sections goes here
    ...
  -->

  <!-- Else use dynamic sections here -->
  <section
    *ngFor="let section of dynamicSections; last as last"
    [id]="section.data['rawLink']"
      {{ section.data["title"] }}
  >
  </section>
</div>
`;

  public useInComponentCode = `
import { Component, OnInit } from '@angular/core';
import {
  MenuConfig,
  MenuItem,
  NgxSpaSupportService,
} from '@techfever/ngx-spa-support';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  /** 
   * Your menu subscribed to the service menu
   */
  public subscribedMenu: MenuItem[] = [];

  /** 
   * Your base menu config, without dynamic sections
   * All properties explained on the documentation and in typings
   */
  public spaConfig: MenuConfig = {
    menu: <MenuItem[]>[
      {
        link: '#link0',
        data: {
          title: 'Home',
        },
        active: true
      },
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
    linkElementsPrefix: 'link',
    scrollableElementId: 'scrollable',
    menuElementId: 'menu',
  };

  constructor(private spaService: NgxSpaSupportService) {
    /** 
     * Subscribe to your menu that will be used in the template
     */
    this.spaService.getMenuItems().subscribe((menu) => {
      this.subscribedMenu = menu;
    });
  }

  ngOnInit(): void {
    /** 
     * Create a menu with the specified config you writed, then get it to check the creation
     */
    this.spaService
      .registerScrollAnchors(this.spaConfig)
      .then((menu: MenuItem[]) => {
        console.log('My created menu => ', menu);
      })
      .catch((err: { message: string }) => {
        console.error(err.message);
      });
  }

  /**
   * Delete an anchor by its ID
   */
  public deleteSectionById(id: string): void {
    this.spaService.removeScrollAnchor(id);
  }

  
  /**
   * Scroll to the next section relative to the active one
   */
  public triggerNextAnchor(): void {
    this.spaService.triggerNextAnchor();
  }

  
  /**
   * Scroll to the specified section using item selection
   */
  public triggerScroll(item: MenuItem): void {
    this.spaService.triggerScrollAnchor(item);
  }

  /** 
   * Adding a new dynamic anchor 
   */
  public addScrollAnchor(): void {
    const newDynamicItemData: MenuItem['data'] = {
      title: 'New dynamic item',
      icon: 'bolt',
    };

    this.spaService.pushScrollAnchor(newDynamicItemData, true).then((item) => {
      console.log(item);

      this.spaService.updateScrollAnchor(item, {
        title: 'New item, last title was "' + item.data['title'] + '"',
      });
    });
  }
}
`;

  public get serviceMethods(): any[] {
    const rawMethods = [
      {
        name: 'getActiveItem',
        description:
          'Subscribes to the current active item (on each scroll event)',
        signature: '(): Observable<MenuItem>',
      },
      {
        name: 'getMenuItems',
        description: 'Subscribes to the entire menu (on each scroll event)',
        signature: '(): Observable<MenuItem[]>',
      },
      {
        name: 'getDynamicMenuItems',
        description: 'Subscribe only to your dynamic anchors',
        signature: '(): Observable<MenuItem[]>',
      },
      {
        name: 'registerScrollAnchor',
        description:
          'Registers your anchor menu then returns your created menu',
        signature: '(): Promise<MenuItem[]>',
      },
      {
        name: 'triggerScrollAnchor',
        description: 'Scrolls the page to the specified anchor, using her link',
        signature: '(item: MenuItem): void',
      },
      {
        name: 'triggerScrollAnchorById',
        description:
          'Scrolls the page to the specified anchor, using her document ID',
        signature: '(id: string): void',
      },
      {
        name: 'pushScrollAnchor',
        description:
          'Creates a new anchor and push it to your menu, you must specify her data. If you want to scroll to it after created, set triggerOnCreate to true',
        signature:
          "(data: MenuItem['data'], triggerOnCreate?: boolean): Promise<MenuItem>",
      },
      {
        name: 'removeScrollAnchor',
        description:
          'Removes a scroll anchor from the menu with the specified id or link',
        signature: '(id: string): void',
      },
      {
        name: 'updateScrollAnchorById',
        description: 'Updates the data of a scroll anchor by her link or id',
        signature: "(id: string, data: MenuItem['data']): void",
      },
      {
        name: 'updateScrollAnchor',
        description: 'Updates a scroll anchor by menu element',
        signature: "(anchor: MenuItem, data: MenuItem['data']): void",
      },
      {
        name: 'triggerFirstAnchor',
        description: 'Scroll to the first item of the menu',
        signature: '(): void',
      },
      {
        name: 'triggerLastAnchor',
        description: 'Scroll to the last item of the menu',
        signature: '(): void',
      },
      {
        name: 'triggerNextAnchor',
        description: 'Scroll to the next item of the menu',
        signature: '(): void',
      },
      {
        name: 'triggerPreviousAnchor',
        description: 'Scroll to the previous item of the menu',
        signature: '(): void',
      },
    ];

    return rawMethods.sort((one, two) => (one.name > two.name ? 1 : -1));
  }

  public get interfaces(): any[] {
    const rawInterfaces = [
      {
        name: 'MenuConfig',
        properties: [
          {
            name: 'menu',
            type: 'MenuItem[] | any[]',
          },
          {
            name: 'scrollingBehavior?',
            type: "ScrollBehavior | 'smooth' | 'auto' ",
          },
          {
            name: 'useMenuScrolling?',
            type: 'boolean',
          },
          {
            name: 'menuHorizontalScrollMargin?',
            type: 'number',
          },
          {
            name: 'sectionVerticalScrollMargin?',
            type: 'number',
          },
          {
            name: 'sectionDetectionSize?',
            type: 'number',
          },
          {
            name: 'linkElementsPrefix?',
            type: 'string',
          },
          {
            name: 'scrollableElementId?',
            type: 'string',
          },
          {
            name: 'menuElementId?',
            type: 'string',
          },
        ],
      },
      {
        name: 'MenuItem',
        properties: [
          {
            name: 'link',
            type: 'string',
          },
          {
            name: 'active',
            type: 'boolean',
          },
          {
            name: 'element?',
            type: 'HTMLElement | null',
          },
          {
            name: 'data?',
            type: '[key: string]: any',
          },
        ],
      },
    ];

    let newInterfaces: any[] = [];

    rawInterfaces.forEach((i) => {
      i.properties = i.properties.sort((one, two) =>
        one.name > two.name ? 1 : -1
      );
      newInterfaces.push(i);
    });

    return newInterfaces.sort((one, two) => (one.name > two.name ? 1 : -1));
  }

  public get todos(): any[] {
    return [
      {
        name: 'Remember scrolled section when DOM changes, for example when tab changes',
        completed: false,
      },
      {
        name: 'Auto scroll to previous and next sections',
        completed: false,
      },
    ];
  }
}
