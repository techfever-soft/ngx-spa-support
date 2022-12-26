import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuConfig, MenuItem } from './interfaces/menu.interface';

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

  public getLinkElementsPrefix(): string {
    return this.currentConfig.linkElementsPrefix
      ? this.currentConfig.linkElementsPrefix
      : 'link';
  }

  public getScrollableElementId(): string {
    return this.currentConfig.scrollableElementId
      ? this.currentConfig.scrollableElementId
      : 'scrollable';
  }

  public getMenuElementId(): string {
    return this.currentConfig.menuElementId
      ? this.currentConfig.menuElementId
      : 'menu';
  }

  public getSectionMargin(): number {
    return this.currentConfig.sectionMargin
      ? this.currentConfig.sectionMargin
      : 250;
  }

  public getScrollingBehavior(): ScrollBehavior {
    return this.currentConfig.scrollingBehavior
      ? this.currentConfig.scrollingBehavior
      : 'auto';
  }

  public getActiveItem(): Observable<MenuItem> {
    return this.activeItem.asObservable();
  }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems.asObservable();
  }

  public getDynamicMenuItems(): Observable<MenuItem[]> {
    return this.dynamicMenuItems.asObservable();
  }

  public registerScrollAnchors(scrollConfig: MenuConfig): Promise<MenuItem[]> {
    return new Promise((resolve, reject) => {
      this.currentConfig = scrollConfig;

      const configMenu: MenuItem[] = this.currentConfig.menu;

      if (configMenu.length) {
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

  public setActiveItem(link: string): void {
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
        //   console.log('scroll to full page');
        //   const prevItem = menu.at(menuIndex - 1);
        //   const nextItem = menu.at(menuIndex + 1);

        //   // scroll to the top of the next section
        //   const scrollElement = document.getElementById('scrollable');
        //   console.log(prevItem);
        //   console.log(nextItem);
        //   if (nextItem) {
        //     const sectionId = nextItem?.link.substring(1);
        //     const sectionElement = document.getElementById(sectionId);
        //     console.log(sectionElement?.getBoundingClientRect());

        //     scrollElement?.scrollTo({
        //       top: sectionElement?.getBoundingClientRect().top,
        //       behavior: 'smooth',
        //     });
        //   }
        // }
      }
      newMenu.push(menuItem);
    });

    this.menuItems.next(newMenu);
  }

  public triggerScrollAnchor(item: MenuItem): void {
    const itemId: string = item.link.substring(1);
    const itemElement: HTMLElement = document.getElementById(
      itemId
    ) as HTMLElement;
    const scrollElement: HTMLElement = document.getElementById(
      this.getScrollableElementId()
    ) as HTMLElement;

    this.setActiveItem(item.link);

    scrollElement?.scrollTo({
      top: itemElement.offsetTop,
      behavior: this.getScrollingBehavior(),
    });
  }

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
        top: itemElement.offsetTop,
        behavior: this.getScrollingBehavior(),
      });
    } else {
      console.error("Can't find section with id => " + itemId);
    }
  }

  public createScrollAnchor(): Promise<MenuItem> {
    return new Promise((resolve) => {
      const menu: MenuItem[] = this.currentConfig.menu;
      const menuLength: number = menu.length + 1;

      let newDynamicItems: MenuItem[] = [];

      let newDynamicItem: MenuItem = {
        link: '#' + this.getLinkElementsPrefix() + menuLength,
        element: null,
        active: false,
        data: {
          title: 'New dynamic item #' + menuLength,
          dynamic: true,
          rawLink: this.getLinkElementsPrefix() + menuLength,
        },
      };
      this.getDynamicMenuItems().subscribe((items: MenuItem[]) => {
        items.push(newDynamicItem);
      });

      menu.push(newDynamicItem);

      this.dynamicMenuItems.next(newDynamicItems);

      resolve(newDynamicItem);
    });
  }

  public removeScrollAnchor(id: string): void {
    const menu: MenuItem[] = this.currentConfig.menu;

    const menuItemIndex: number = menu.findIndex(
      (item: MenuItem) => item.link === id
    );

    if (menuItemIndex !== -1) {
      menu.splice(menuItemIndex, 1);
      this.triggerScrollAnchorById(menu[menuItemIndex - 1].link);
    }

    let newDynamicItems: MenuItem[] = [];

    this.getDynamicMenuItems().subscribe((items: MenuItem[]) => {
      items.forEach((item: MenuItem) => {
        if (item.link !== id) {
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

  // TODO
  // public pushScrollAnchor(item: MenuItem) {}

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

  private setSectionScrolledActive(): void {
    const menu: MenuItem[] = this.currentConfig.menu;

    menu.forEach((item: MenuItem) => {
      const sectionId: string = item.link.substring(1);
      const sectionElement: HTMLElement = document.getElementById(
        sectionId
      ) as HTMLElement;

      if (
        sectionElement?.getBoundingClientRect().top < this.getSectionMargin() &&
        sectionElement.getBoundingClientRect().top > -this.getSectionMargin()
      ) {
        this.setActiveItem(item.link);
      }
    });
  }
}
