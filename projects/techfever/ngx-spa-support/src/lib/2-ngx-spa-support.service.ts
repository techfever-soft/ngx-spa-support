import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from './interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class NgxSpaSupportService2 {
  private registeredAnchors: Subject<MenuItem[]> = new Subject();

  constructor() {}

  public getMenuItems(): Observable<MenuItem[]> {
    return this.registeredAnchors.asObservable();
  }

  public createScrollAnchors(
    anchors: any[],
    scrollSpyEnabled: boolean,
    scrollSpySpacing: number
  ): void {
    const scrollable = document.body.querySelector('#scrollable');

    let newAnchors: MenuItem[] = [];
    anchors.forEach((anchor: any) => {
      newAnchors.push({
        title: anchor.title,
        link: anchor.link,
        element: document.body.querySelector(anchor.link),
        active: false,
      });
    });

    function initSpyScroll() {
      newAnchors.forEach((item: MenuItem) => {
        item.active = false;

        // const scrollSpySpacing = item.element.getBoundingClientRect().height;

        if (
          item.element?.getBoundingClientRect().top < scrollSpySpacing &&
          item.element?.getBoundingClientRect().top > -scrollSpySpacing
        ) {
          const menuElement = document.body.querySelector('#menu');

          item.active = true;

          // console.log(item.element?.clientLeft);
          // console.log(item.element?.scrollLeft);
          // console.log(item.element?.getBoundingClientRect().left);
          // console.log(item.element?.getBoundingClientRect().x);

          let activeItemEl: Element;

          menuElement?.childNodes.forEach((link, index) => {
            let lastItem = menuElement?.children.item(index - 1);
            let item = menuElement?.children.item(index);
            let activeItem = item?.classList.contains('active');

            let itemLeft = item?.getBoundingClientRect().left;
            let lastLeft = lastItem?.getBoundingClientRect().left;

            if (activeItem) {
              item?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });

              // if (activeItemEl) {
              //   menuElement?.scrollTo({
              //     left: item?.getBoundingClientRect().left,
              //     behavior: 'smooth',
              //   });
              // } else {
              //   menuElement?.scrollTo({
              //     left: lastItem?.getBoundingClientRect().left,
              //     behavior: 'smooth',
              //   });
              // }
            }
          });
        }
      });
    }

    if (scrollSpyEnabled) {
      initSpyScroll();

      scrollable?.addEventListener('scroll', () => {
        // const currentTop = scrollable?.scrollTop;
        // console.log(scrollable?.scrollTop);

        // this.getMenuItems().subscribe((menu) => {

        initSpyScroll();
      });
      // });
    }

    this.registeredAnchors.next(newAnchors);
  }

  public triggerScrollAnchor(link: string) {
    console.log(link);

    const scrollable = document.body.querySelector('#scrollable');

    let itemElement = document.body.querySelector(link);

    let elementTop = itemElement?.getBoundingClientRect().y;
    let elementLeft = itemElement?.getBoundingClientRect().x;
    
    console.log(itemElement?.scrollTop);
    console.log(itemElement?.clientTop);

    scrollable?.scrollTo({
      top: elementTop,
      behavior: 'smooth',
    });

    // const menuElement = document.querySelector('#menu');

    // menuElement?.scrollTo({
    //   left: itemElement?.getBoundingClientRect().left,
    //   behavior: 'smooth',
    // });

    // this.getMenuItems().subscribe((menu) => {
    //   console.log(menu);

    //   menu.forEach((item: MenuItem) => {
    //     console.log(item);
    //     if (item.link === link) {
    //       item.active = true;

    //       scrollable?.scrollTo({
    //         top: item.element?.getBoundingClientRect()?.top,
    //         behavior: 'smooth',
    //       });
    //     }
    //   });
    // });
  }
}
