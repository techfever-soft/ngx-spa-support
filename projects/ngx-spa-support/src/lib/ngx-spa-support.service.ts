import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  NgxSpaSupportConfig,
  NgxSpaSupportMenuItem,
} from './ngx-spa-support.interface';

@Injectable({
  providedIn: 'root',
})
export class NgxSpaSupportService {
  private configSubject = new BehaviorSubject<NgxSpaSupportConfig | null>(null);

  private menuItems: BehaviorSubject<NgxSpaSupportMenuItem[]> =
    new BehaviorSubject<NgxSpaSupportMenuItem[]>([]);

  private currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  public activeSectionChange: EventEmitter<string> = new EventEmitter<string>();

  private scrollableElement!: HTMLElement;
  private previousScrollTop: number = 0;

  constructor() {}

  public getMenuItems() {
    return this.menuItems.asObservable();
  }

  public getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  public getConfig() {
    return this.configSubject.asObservable();
  }

  public init(config?: NgxSpaSupportConfig) {
    if (config) {
      this.configSubject.next(config);
      this.menuItems.next(config.menu);
    }

    // TODO: Dynamically set the scrollable element
    this.scrollableElement = document.querySelector(
      'ngx-spa-support-scrollable'
    ) as HTMLElement;

    setTimeout(() => {
      this.configSubject.getValue()?.menu.forEach((section) => {
        if (section.active) {
          this.scrollToAnchorId(section.link);
        }
      });
    }, 0);
  }

  public setActiveSection(section: string) {
    this.activeSectionChange.emit(section);
  }

  public scrollToAnchorId(id: string) {
    const targetSectionElement = this.scrollableElement.querySelector(
      '#' + id
    ) as HTMLElement;

    if (targetSectionElement) {
      const targetTop: number = targetSectionElement.offsetTop;

      this.scrollableElement.scrollTo({
        top: targetTop,
        behavior: this.configSubject.getValue()?.scrollBehavior || 'smooth',
      });
    } else {
      console.error('No anchor found with id "' + id + '"');
    }
  }

  // public toggleScrollSnapping() {
  //   const config = this.configSubject.getValue();

  //   if (config) {
  //     config.scrollSnapping = !config.scrollSnapping;
  //     this.configSubject.next(config);

  //     if (config.scrollSnapping) {
  //     }
  //   }
  // }

  public toggleScrollOnCreated(state: boolean) {
    const config = this.configSubject.getValue();

    if (config) {
      config.scrollOnCreated = state;
      this.configSubject.next(config);
    }
  }

  public addNewSection() {
    const config = this.configSubject.getValue();

    if (config) {
      const newSection: NgxSpaSupportMenuItem = {
        link: 'newSection' + (config.menu.length + 1),
        active: false,
        removable: true,
        data: {
          label: 'New section ' + (config.menu.length + 1),
        },
      };

      config.menu.push(newSection);
      this.configSubject.next(config);
      this.menuItems.next(config.menu);

      setTimeout(() => {
        if (config.scrollOnCreated) {
          this.scrollToAnchorId(newSection.link);
        }
      }, 0);
    }
  }

  public updateCurrentSection() {
    const config = this.configSubject.getValue();

    if (config) {
      const currentScrollTop = this.scrollableElement.scrollTop;
      const sectionDetectionSize = config.sectionDetectionSize || 250;

      const menuItems = this.menuItems.getValue();

      // if (config.loopMode) {
      //   // TODO
      // }

      // if (config.rubberBandEffect) {
      //   // TODO
      // }

      // if (config.scrollSnapping) {
      //   // TODO
      // }

      menuItems.forEach((section) => {
        const sectionElement = this.scrollableElement.querySelector(
          '#' + section.link
        ) as HTMLElement;

        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionBottom = sectionTop + sectionElement.clientHeight;

          if (
            currentScrollTop >= sectionTop - sectionDetectionSize &&
            currentScrollTop <= sectionBottom - sectionDetectionSize
          ) {
            section.active = true;
          } else {
            section.active = false;
          }
        }
      });
    }
  }

  public scrollToPreviousSection() {
    const activeItemIndex = this.menuItems
      .getValue()
      .findIndex((item) => item.active);

    const previousItem = this.menuItems.getValue()[activeItemIndex - 1];
    console.log(previousItem);

    if (previousItem) {
      const previousItemId = previousItem.link.includes('#')
        ? previousItem.link.substring(1)
        : previousItem.link;

      console.log(previousItemId);

      this.scrollToAnchorId(previousItemId);
    }
  }

  public scrollToNextSection() {
    const activeItemIndex = this.menuItems
      .getValue()
      .findIndex((item) => item.active);

    console.log(activeItemIndex);
    console.log(this.menuItems.getValue());

    const nextItem = this.menuItems.getValue()[activeItemIndex + 1];
    console.log(nextItem);

    if (nextItem) {
      const nextItemId = nextItem.link.includes('#')
        ? nextItem.link.substring(1)
        : nextItem.link;

      this.scrollToAnchorId(nextItemId);
    }
  }
}
