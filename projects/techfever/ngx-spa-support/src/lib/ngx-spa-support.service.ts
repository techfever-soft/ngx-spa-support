import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuConfig, MenuItem } from './interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class NgxSpaSupportService {
  private menuItems: Subject<MenuItem[]> = new Subject();
  private activeItem: Subject<MenuItem> = new Subject();
  private currentConfig!: MenuConfig;

  constructor() {}

  public getActiveItem(): Observable<MenuItem> {
    return this.activeItem.asObservable();
  }

  public getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems.asObservable();
  }

  public setActiveItem(link: string) {
    const menu = this.currentConfig.menu;

    let newMenu: MenuItem[] = [];

    menu.forEach((menuItem, menuIndex) => {
      menuItem.active = false;

      if (menuItem.link === link) {
        menuItem.active = true;

        this.activeItem.next(menuItem);

        if (this.currentConfig.useMenuScrolling) {
          const menuElement = document.getElementById('menu');

          menuElement?.childNodes.forEach((node, index) => {
            let menuItemElement = menuElement?.children.item(index);

            if (
              menuItemElement &&
              menuItemElement.classList.contains('active')
            ) {
              const itemLeftScroll =
                menuElement.scrollLeft +
                menuItemElement?.getBoundingClientRect().left;

              menuElement.scrollTo({
                left: itemLeftScroll,
                behavior: 'smooth',
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

  public createScrollAnchors(scrollConfig: MenuConfig) {
    this.currentConfig = scrollConfig;

    const menu = this.currentConfig.menu;

    let newMenu: MenuItem[] = [];

    menu.forEach((section: any, index) => {
      const sectionId = section.link.substring(1);
      const sectionElement = document.getElementById(sectionId);
      newMenu.push({
        title: section.title,
        link: section.link,
        element: sectionElement,
        active: index === 0 ? true : false,
      });
    });

    this.initSpyScroll();

    this.menuItems.next(newMenu);
  }

  public triggerScrollAnchor(item: MenuItem) {
    const itemId = item.link.substring(1);
    const itemElement = document.getElementById(itemId) as HTMLElement;
    const scrollElement = document.getElementById('scrollable');

    this.setActiveItem('#' + itemId);

    scrollElement?.scrollTo({
      top: itemElement.offsetTop,
      behavior: 'smooth',
    });
  }

  private initSpyScroll() {
    const scrollElement = document.getElementById('scrollable');

    this.setSectionScrolledActive();

    scrollElement?.addEventListener('scroll', () => {
      this.setSectionScrolledActive();
    });
  }

  private setSectionScrolledActive() {
    const menu = this.currentConfig.menu;

    menu.forEach((item, index) => {
      const sectionId = item.link.substring(1);
      const sectionElement = document.getElementById(sectionId) as HTMLElement;

      if (
        sectionElement?.getBoundingClientRect().top < 250 &&
        sectionElement.getBoundingClientRect().top > -250
      ) {
        // console.log(sectionElement.id, ' => active');
        this.setActiveItem('#' + sectionId);
      }
    });
  }
}
