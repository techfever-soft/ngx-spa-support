import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuConfig, MenuItem } from './ngx-spa-support.interface';

@Injectable({
  providedIn: 'root',
})
export class NgxSpaSupportService {
  private menuItems: Subject<MenuItem[]> = new Subject();
  private dynamicMenuItems: Subject<MenuItem[]> = new Subject();
  private activeItem: Subject<MenuItem> = new Subject();
  private currentConfig: MenuConfig = {
    menu: [],
    scrollingBehavior: 'auto',
    useMenuScrolling: false,
    sectionMargin: 250,
    linkElementsPrefix: 'link',
    scrollableElementId: 'scrollable',
    menuElementId: 'menu',
  };

  constructor() {}

  private getLinkElementsPrefix(): string {
    return this.currentConfig.linkElementsPrefix
      ? this.currentConfig.linkElementsPrefix
      : 'link';
  }

  private getScrollableElementId(): string {
    return this.currentConfig.scrollableElementId
      ? this.currentConfig.scrollableElementId
      : 'scrollable';
  }

  private getMenuElementId(): string {
    return this.currentConfig.menuElementId
      ? this.currentConfig.menuElementId
      : 'menu';
  }

  private getSectionMargin(): number {
    return this.currentConfig.sectionMargin
      ? this.currentConfig.sectionMargin
      : 250;
  }

  private getScrollingBehavior(): ScrollBehavior {
    return this.currentConfig.scrollingBehavior
      ? this.currentConfig.scrollingBehavior
      : 'auto';
  }

  /**
   * Subscribes to the current active item (on each scroll event)
   *
   * @public
   * @returns Observable<MenuItem>
   */
  public getActiveItem(): Observable<MenuItem> {
    return this.activeItem.asObservable();
  }

  /**
   * Subscribes to the entire menu (on each scroll event)
   *
   * @public
   * @returns Observable<MenuItem[]>
   */
  public getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems.asObservable();
  }

  /**
   * Subscribe only to your dynamic anchors
   *
   * @public
   * @returns Observable<MenuItem[]>
   */
  public getDynamicMenuItems(): Observable<MenuItem[]> {
    return this.dynamicMenuItems.asObservable();
  }

  /**
   *  Registers your anchor menu then returns your created menu
   *
   * @public
   * @param MenuConfig scrollConfig
   * @returns Promise<MenuItem[]>
   */
  public registerScrollAnchors(scrollConfig: MenuConfig): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.currentConfig = scrollConfig;

      const configMenu: MenuItem[] = this.currentConfig.menu;

      if (configMenu && configMenu.length) {
        let newMenu: MenuItem[] = [];

        configMenu.forEach((section: MenuItem, index: number) => {
          const sectionId: string = section.link.substring(1);
          const sectionElement: HTMLElement = document.getElementById(
            sectionId
          ) as HTMLElement;

          const newSectionItem: MenuItem = {
            link: section.link,
            element: sectionElement,
            active: index === 0 ? true : false,
            data: { ...section.data },
          };

          if (newSectionItem.active) {
            this.setActiveItem(newSectionItem.link);
          }

          newMenu.push(newSectionItem);
        });

        this.initSpyScroll();

        this.menuItems.next(newMenu);

        resolve(newMenu);
      } else {
        reject({
          message: 'Error : menu config not found',
        });
      }
    });
  }

  /**
   *  Scrolls the page to the specified anchor, using her link
   *
   * @public
   * @param MenuItem item
   */
  public triggerScrollAnchor(item: MenuItem): void {
    const itemId: string = item.link.substring(1);
    const itemElement: HTMLElement = document.getElementById(
      itemId
    ) as HTMLElement;
    const scrollElement: HTMLElement = document.getElementById(
      this.getScrollableElementId()
    ) as HTMLElement;

    if (itemElement) {
      this.setActiveItem('#' + itemId);

      scrollElement?.scrollTo({
        top: itemElement.offsetTop - 70,
        behavior: this.getScrollingBehavior(),
      });
    } else {
      console.error("Can't find section with id => " + itemId);
    }
  }

  /**
   * Scrolls the page to the specified anchor, using her document ID
   *
   * @public
   * @param string id
   */
  public triggerScrollAnchorById(id: string): void {
    let itemId: string;
    if (id.includes('#')) {
      itemId = id.substring(1);
    } else {
      itemId = id;
    }

    const itemElement: HTMLElement = document.getElementById(
      itemId
    ) as HTMLElement;
    const scrollElement: HTMLElement = document.getElementById(
      this.getScrollableElementId()
    ) as HTMLElement;

    if (itemElement) {
      this.setActiveItem('#' + itemId);

      scrollElement?.scrollTo({
        top: itemElement.offsetTop - 70,
        behavior: this.getScrollingBehavior(),
      });
    } else {
      console.error("Can't find section with id => " + itemId);
    }
  }

  /**
   * Creates a new anchor and push it to your menu, you must specify her data.
   * If you want to scroll to it after created, set triggerOnCreate to true
   *
   * @public
   * @param any data
   * @param ?boolean triggerOnCreate
   * @returns Promise<MenuItem>
   */
  public pushScrollAnchor(
    data: MenuItem['data'],
    triggerOnCreate?: boolean
  ): Promise<MenuItem> {
    return new Promise((resolve) => {
      const menu: MenuItem[] = this.currentConfig.menu;
      const menuLength: number = menu.length + 1;

      let newDynamicItems: MenuItem[] = [];

      let newDynamicItemElement: HTMLElement = document.getElementById(
        this.getLinkElementsPrefix() + menuLength
      ) as HTMLElement;

      let newDynamicItem: MenuItem = {
        link: '#' + this.getLinkElementsPrefix() + menuLength,
        element: newDynamicItemElement,
        active: false,
        data: {
          ...data,
          dynamic: true,
          rawLink: this.getLinkElementsPrefix() + menuLength,
        },
      };
      this.getDynamicMenuItems().subscribe((items: MenuItem[]) => {
        items.push(newDynamicItem);
      });

      menu.push(newDynamicItem);

      this.dynamicMenuItems.next(newDynamicItems);

      if (triggerOnCreate) {
        setTimeout(() => {
          this.triggerScrollAnchorById(newDynamicItem.data['rawLink']);
        });
      }

      resolve(newDynamicItem);
    });
  }

  /**
   * Removes a scroll anchor from the menu with the specified id or link
   *
   * @public
   * @param string id
   */
  public removeScrollAnchor(id: string): void {
    const menu: MenuItem[] = this.currentConfig.menu;
    let itemId: string;

    if (id.includes('#')) {
      itemId = id;
    } else {
      itemId = '#' + id;
    }

    const menuItemIndex: number = menu.findIndex(
      (item: MenuItem) => item.link === itemId
    );

    if (menuItemIndex !== -1) {
      menu.splice(menuItemIndex, 1);
      this.triggerScrollAnchorById(menu[menuItemIndex - 1].link);
    }

    let newDynamicItems: MenuItem[] = [];

    this.getDynamicMenuItems().subscribe((items: MenuItem[]) => {
      items.forEach((item: MenuItem) => {
        if (item.link !== itemId) {
          newDynamicItems.push(item);
        }
      });

      const dynamicItemIndex: number = items.findIndex(
        (item) => item.link === id
      );

      if (dynamicItemIndex !== -1) {
        newDynamicItems.splice(dynamicItemIndex, 1);
        items.splice(dynamicItemIndex, 1);
      }
    });

    setTimeout(() => {
      this.dynamicMenuItems.next(newDynamicItems);
    }, 500);
  }

  /**
   * Updates the data of a scroll anchor by her link or id
   *
   * @public
   * @param string id
   * @param any data
   */
  public updateScrollAnchorById(id: string, data: MenuItem['data']): void {
    let anchorId: string;

    if (id.toString().includes('#')) {
      anchorId = id;
    } else {
      anchorId = '#' + id;
    }

    const foundItemIndex = this.currentConfig.menu.findIndex(
      (item) => item.link === anchorId
    );

    setTimeout(() => {
      this.currentConfig.menu[foundItemIndex].data = {
        ...this.currentConfig.menu[foundItemIndex].data,
        ...data,
      };
    });
  }

  /**
   * Updates a scroll anchor by menu element
   *
   * @public
   * @param MenuItem anchor
   * @param any data
   */
  public updateScrollAnchor(anchor: MenuItem, data: MenuItem['data']): void {
    const foundItemIndex = this.currentConfig.menu.findIndex(
      (item) => item.link === anchor.link
    );

    setTimeout(() => {
      this.currentConfig.menu[foundItemIndex].data = {
        ...this.currentConfig.menu[foundItemIndex].data,
        ...data,
      };
    });
  }

  /**
   * Scroll to the first item of the menu
   *
   * @public
   * @returns void
   */
  public triggerFirstAnchor(): void {
    const firstItem: MenuItem = this.currentConfig.menu[0];
    this.triggerScrollAnchorById(firstItem.link);
  }

  /**
   * Scroll to the last item of the menu
   *
   * @public
   * @returns void
   */
  public triggerLastAnchor(): void {
    const lastItem: MenuItem =
      this.currentConfig.menu[this.currentConfig.menu.length - 1];
    this.triggerScrollAnchorById(lastItem.link);
  }

  /**
   * Scroll to the next item of the menu
   *
   * @public
   * @returns void
   */
  public triggerNextAnchor(): void {
    let itemIndex: number = 0;
    const activeItem: MenuItem = this.currentConfig.menu.find((item, index) => {
      itemIndex = index;
      return item.active;
    });

    if (activeItem) {
      const nextItem: MenuItem = this.currentConfig.menu[itemIndex + 1];
      this.triggerScrollAnchorById(nextItem.link);
    }
  }

  /**
   * Scroll to the previous item of the menu
   *
   * @public
   * @returns void
   */
  public triggerPreviousAnchor(): void {
    let itemIndex: number = 0;
    const activeItem: MenuItem = this.currentConfig.menu.find((item, index) => {
      itemIndex = index;
      return item.active;
    });

    if (activeItem) {
      const previousItem: MenuItem = this.currentConfig.menu[itemIndex - 1];
      this.triggerScrollAnchorById(previousItem.link);
    }
  }

  // ANCHOR: Private Methods

  /**
   * Sets the active item in the menu and scrolls to it in the menu if enabled
   *
   * @private
   * @returns void
   */
  private setActiveItem(link: string): void {
    const menu: MenuItem[] = this.currentConfig.menu;

    let newMenu: MenuItem[] = [];

    menu.forEach((menuItem: MenuItem) => {
      menuItem.active = false;

      if (menuItem.link === link) {
        menuItem.active = true;

        this.activeItem.next(menuItem);

        if (this.currentConfig.useMenuScrolling) {
          const menuElement: HTMLElement = document.getElementById(
            this.getMenuElementId()
          ) as HTMLElement;

          menuElement?.childNodes.forEach((node: Node, index: number) => {
            let menuItemElement = menuElement?.children.item(index);

            if (
              menuItemElement &&
              menuItemElement.classList.contains('active')
            ) {
              const itemLeftScroll: number =
                menuElement.scrollLeft +
                menuItemElement?.getBoundingClientRect().left;

              menuElement.scrollTo({
                left: itemLeftScroll,
                behavior: this.getScrollingBehavior(),
              });
            }
          });
        }

        // TODO
        // if (this.currentConfig.fullSectionScroll) {

        // }
      }
      newMenu.push(menuItem);
    });

    this.menuItems.next(newMenu);
  }

  /**
   * Initializes the spyscroll for following the page scroll
   *
   * @private
   * @returns void
   */
  private initSpyScroll(): void {
    setTimeout(() => {
      const scrollElement: HTMLElement = document.getElementById(
        this.getScrollableElementId()
      ) as HTMLElement;

      this.setSectionScrolledActive();

      scrollElement?.addEventListener('scroll', (e) => {
        this.setSectionScrolledActive();
      });
      scrollElement?.addEventListener('wheel', (e) => {
        this.setSectionScrolledActive();
      });
    });
  }

  /**
   * Check if the section is in the viewport and then set it active
   *
   * @private
   * @returns void
   */
  private setSectionScrolledActive(): void {
    const menu: MenuItem[] = this.currentConfig.menu;

    menu.forEach((item: MenuItem) => {
      const sectionId: string = item.link.substring(1);
      const sectionElement: HTMLElement = document.getElementById(
        sectionId
      ) as HTMLElement;
      const scrollableElement: HTMLElement = document.getElementById(
        this.getScrollableElementId()
      ) as HTMLElement;

      if (
        sectionElement?.getBoundingClientRect().bottom <
          scrollableElement.clientHeight + this.getSectionMargin() &&
        sectionElement.getBoundingClientRect().bottom >
          scrollableElement.clientHeight - this.getSectionMargin()
      ) {
        this.setActiveItem(item.link);
      }
    });
  }
}
