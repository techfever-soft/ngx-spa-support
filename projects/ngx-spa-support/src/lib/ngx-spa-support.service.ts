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

  constructor() {}

  public getMenuItems() {
    return this.menuItems.asObservable();
  }

  public getCurrentIndex() {
    return this.currentIndex.asObservable();
  }

  public setConfig(config: NgxSpaSupportConfig) {
    this.configSubject.next(config);
    this.menuItems.next(config.menu);

    // TODO: Dynamically set the scrollable element
    this.scrollableElement = document.querySelector(
      'ngx-spa-support-scrollable'
    ) as HTMLElement;
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
        behavior: 'smooth',
      });
    } else {
      console.error('No anchor found with id "' + id + '"');
    }
  }

  public toggleScrollSnapping() {
    const config = this.configSubject.getValue();

    if (config) {
      config.scrollSnapping = !config.scrollSnapping;
      this.configSubject.next(config);

      if (config.scrollSnapping) {
      }
    }
  }

  public updateCurrentSection() {
    const config = this.configSubject.getValue();

    if (config) {
      const currentScrollTop = this.scrollableElement.scrollTop;

      const currentSectionIndex = config.menu.findIndex((section) => {
        const sectionElement = document.querySelector(
          '#' + section.link
        ) as HTMLElement;

        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionBottom = sectionTop + sectionElement.clientHeight;

          return (
            currentScrollTop >= sectionTop && currentScrollTop < sectionBottom
          );
        }

        return false;
      });

      this.currentIndex.next(currentSectionIndex);

      if (currentSectionIndex > -1) {
        this.menuItems.getValue().forEach((section, index) => {
          section.active = index === currentSectionIndex;
        });

        this.menuItems.next(this.menuItems.getValue());
        this.setActiveSection(config.menu[currentSectionIndex].link);
      } else {
        console.error('No section found for current scroll position');
      }
    }

    console.log('Current index: ', this.currentIndex.getValue());
  }

  public scrollToPreviousSection() {
    const activeItemIndex = this.menuItems
      .getValue()
      .findIndex((item) => item.active);

    const previousItem = this.menuItems.getValue()[activeItemIndex - 1];

    if (previousItem) {
      const previousItemId = previousItem.link.includes('#')
        ? previousItem.link.substring(1)
        : previousItem.link;

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

    if (nextItem) {
      const nextItemId = nextItem.link.includes('#')
        ? nextItem.link.substring(1)
        : nextItem.link;

      this.scrollToAnchorId(nextItemId);
    }
  }
}
