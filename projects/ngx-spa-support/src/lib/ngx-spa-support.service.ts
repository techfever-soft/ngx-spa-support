import { BehaviorSubject, Observable, last } from 'rxjs';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  NgxSpaSupportConfig,
  NgxSpaSupportMenuItem,
} from './ngx-spa-support.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NgxSpaSupportService {
  /** The menu of items stored */
  private menuItems: BehaviorSubject<NgxSpaSupportMenuItem[]> =
    new BehaviorSubject<NgxSpaSupportMenuItem[]>([]);

  /** Current item index */
  private currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  /** Event on active section changes */
  public activeSectionChange: EventEmitter<string> = new EventEmitter<string>();

  /** Scrollable element "ngx-spa-scrollable" */
  private scrollableElement!: HTMLElement;

  /** Actual config of the service */
  private config!: NgxSpaSupportConfig;

  /** The previous scroll position */
  private previousScrollPosition = 0;

  /** If next method is triggered */
  private isNextTriggered: boolean = false;

  /** If previous method is triggered */
  private isPreviousTriggered: boolean = false;

  /** The next promise to execute once next method on scroll snapping */
  private nextPromise: Promise<void> | null = null;

  /** The next promise to execute once next method on scroll snapping */
  private previousPromise: Promise<void> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Sets the scrolled active section
   * @param id string
   * @returns void
   */
  private setScrolledSection(id: string): void {
    this.config.menu.forEach((menuItem: NgxSpaSupportMenuItem) => {
      menuItem.active = false;
    });

    const foundMenuItemIndex = this.menuItems
      .getValue()
      .findIndex((menuItem: NgxSpaSupportMenuItem) => menuItem.link === id);
    const foundMenuItem = this.config.menu[foundMenuItemIndex];

    if (foundMenuItem) {
      foundMenuItem.active = true;

      this.activeSectionChange.emit(id);
      this.menuItems.next(this.config.menu);

      const activeItemIndex = this.menuItems
        .getValue()
        .findIndex((item) => item.link === id);

      this.currentIndex.next(activeItemIndex);
    }
  }

  /**
   * Gets the "ngx-spa-scrollable" element
   * @returns HTMLElement
   */
  public getScrollableElement(): HTMLElement {
    return this.scrollableElement;
  }

  /**
   * Gets the menu items
   * @returns Observable<NgxSpaSupportMenuItem[]>
   */
  public getMenuItems(): Observable<NgxSpaSupportMenuItem[]> {
    return this.menuItems.asObservable();
  }

  public getCurrentIndex(): Observable<number> {
    return this.currentIndex.asObservable();
  }

  /**
   * Gets the actual config
   * @returns NgxSpaSupportConfig
   */
  public getConfig(): NgxSpaSupportConfig {
    return this.config;
  }

  /**
   * Register the scrollable container "ngx-spa-scrollable"
   * @param element HTMLElement
   */
  public registerScrollableContainer(element: HTMLElement): void {
    this.scrollableElement = element;
  }

  /**
   * Init the service with a specified config
   * @param config NgxSpaSupportConfig
   */
  public initWithConfig(config: NgxSpaSupportConfig): void {
    this.config = config;
    this.menuItems.next(this.config.menu);

    const foundActiveMenuItem = this.menuItems
      .getValue()
      .find((menuItem: NgxSpaSupportMenuItem) => menuItem.active);

    if (foundActiveMenuItem) {
      setTimeout(() => {
        this.activeSectionChange.emit(foundActiveMenuItem.link);
        this.triggerAnchorId(foundActiveMenuItem.link);
      });
    }
  }

  /**
   * Updates the current configuration of the service
   * @param config NgxSpaSupportConfig
   * @returns void
   */
  public updateConfig(config: any): void {
    this.config = {
      menu: config.menu ? config.menu : [],
      scrollBehavior: config.scrollBehavior ? config.scrollBehavior : 'smooth',
      sectionDetectionSize: config.sectionDetectionSize
        ? config.sectionDetectionSize
        : 250,
      scrollOnCreated: config.scrollOnCreated ? config.scrollOnCreated : true,
      scrollSnapping: config.scrollSnapping ? config.scrollSnapping : false,
      sectionOffset: config.sectionOffset ? config.sectionOffset : 0,

      /**
       * TODO: MENU horizontal scrolling
       */
      /**
       * TODO: Horizontal scrolling
       */
      /**
       * TODO: Keyboard navigation
       */
    };
  }

  /**
   * Updates the current active section
   * @returns void
   */
  public updateCurrentSection(): void {
    /**
     * NOTE: Some features can be slow on some devices
     */
    if (isPlatformBrowser(this.platformId)) {
      const scrollableRect = this.scrollableElement.getBoundingClientRect();
      const scrollableBottom = scrollableRect.top + scrollableRect.height;

      let activeSectionId: string | null = null;
      let activeSectionTop: number = Number.MAX_SAFE_INTEGER;
      let activeSectionBottom: number = Number.MIN_SAFE_INTEGER;

      const sectionMargin: number = this.config.sectionDetectionSize
        ? this.config.sectionDetectionSize
        : 250;

      this.menuItems.getValue().forEach((item: NgxSpaSupportMenuItem) => {
        const sectionId: string = item.link.includes('#')
          ? item.link.substring(1)
          : item.link;
        const sectionElement: HTMLElement = document.getElementById(
          sectionId
        ) as HTMLElement;

        if (sectionElement) {
          const sectionRect = sectionElement.getBoundingClientRect();

          // NOTE: Apply margin to section top & bottom
          const sectionTop: number = sectionRect.top - sectionMargin;
          const sectionBottom: number = sectionRect.bottom + sectionMargin;

          // NOTE: Scroll snapping on each scroll event
          if (this.config.scrollSnapping) {
            const currentScrollPosition = this.scrollableElement.scrollTop;

            if (
              !this.nextPromise &&
              currentScrollPosition > this.previousScrollPosition
            ) {
              // NOTE: Scrolling top
              this.nextPromise = this.triggerNext();
            } else if (
              !this.previousPromise &&
              currentScrollPosition < this.previousScrollPosition
            ) {
              // NOTE: Scrolling bottom
              this.previousPromise = this.triggerPrevious();
            }

            this.previousScrollPosition = currentScrollPosition;
          }

          // NOTE: If section top & bottom is in viewport
          const isSectionVisible: boolean =
            sectionTop <= scrollableBottom &&
            sectionBottom >= scrollableRect.top;

          if (isSectionVisible) {
            const visibleSectionTop: number = Math.max(
              sectionTop,
              scrollableRect.top
            );
            const visibleSectionBottom: number = Math.min(
              sectionBottom,
              scrollableBottom
            );
            const sectionHeight: number =
              visibleSectionBottom - visibleSectionTop;

            // NOTE: If section is visible in the viewport
            const isSectionInViewPort: boolean =
              visibleSectionTop < activeSectionTop ||
              (visibleSectionTop === activeSectionTop &&
                sectionHeight > activeSectionBottom - activeSectionTop);

            if (isSectionInViewPort) {
              activeSectionId = sectionId;
              activeSectionTop = visibleSectionTop;
              activeSectionBottom = visibleSectionBottom;
            }
          }
        }
      });

      // NOTE: If section is in viewport, set it active
      if (activeSectionId) {
        this.setScrolledSection(activeSectionId);
      }
    }
  }

  /**
   * Trigger next method only one time for scroll snapping
   * @returns Promise<void>
   */
  private async triggerNext(): Promise<void> {
    if (!this.isNextTriggered) {
      this.isNextTriggered = true;

      this.triggerNextAnchor();

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.isNextTriggered = false;
      this.nextPromise = null;
    }
  }

  /**
   * Trigger previous method only one time for scroll snapping
   * @returns Promise<void>
   */
  private async triggerPrevious(): Promise<void> {
    if (!this.isPreviousTriggered) {
      this.isPreviousTriggered = true;

      this.triggerPreviousAnchor();

      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.isPreviousTriggered = false;
      this.previousPromise = null;
    }
  }

  /**
   * Trigger an anchor by her id (without #)
   * @param id string
   * @returns void
   */
  public triggerAnchorId(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const targetSectionElement = this.scrollableElement.querySelector(
        '#' + id
      ) as HTMLElement;

      if (targetSectionElement) {
        const targetTop: number =
          targetSectionElement.offsetTop -
          (this.config.sectionOffset ? this.config.sectionOffset : 0);

        this.scrollableElement.scrollTo({
          top: targetTop,
          behavior: this.config.scrollBehavior,
        });
      } else {
        console.error('No anchor found with id "' + id + '"');
      }
    }
  }

  /**
   * Trigger the first anchor
   * @returns void
   */
  public triggerFirstAnchor(): void {
    const firstItem = this.menuItems.getValue()[0];
    const firstItemId = firstItem.link.includes('#')
      ? firstItem.link.substring(1)
      : firstItem.link;

    if (firstItem && firstItemId) {
      this.triggerAnchorId(firstItemId);
    }
  }

  /**
   * Trigger the last anchor
   * @returns void
   */
  public triggerLastAnchor(): void {
    const lastItem =
      this.menuItems.getValue()[this.menuItems.getValue().length - 1];

    const lastItemID = lastItem.link.includes('#')
      ? lastItem.link.substring(1)
      : lastItem.link;

    if (lastItem && lastItemID) {
      this.triggerAnchorId(lastItemID);
    }
  }

  /**
   * Trigger the next anchor
   * @returns void
   */
  public triggerNextAnchor(): void {
    const activeItemIndex = this.menuItems
      .getValue()
      .findIndex((item) => item.active);

    const nextItem = this.menuItems.getValue()[activeItemIndex + 1];

    if (nextItem) {
      const nextItemId = nextItem.link.includes('#')
        ? nextItem.link.substring(1)
        : nextItem.link;

      this.triggerAnchorId(nextItemId);
    }
  }

  /**
   * Trigger the previous anchor
   * @returns void
   */
  public triggerPreviousAnchor(): void {
    const activeItemIndex = this.menuItems
      .getValue()
      .findIndex((item) => item.active);

    const previousItem = this.menuItems.getValue()[activeItemIndex - 1];

    if (previousItem) {
      const previousItemId = previousItem.link.includes('#')
        ? previousItem.link.substring(1)
        : previousItem.link;

      this.triggerAnchorId(previousItemId);
    }
  }

  /**
   * Remove an anchor by id (without #)
   * @returns void
   */
  public removeAnchor(id: string): void {
    const menuItemIndex = this.menuItems
      .getValue()
      .findIndex((menuItem) => menuItem.link === id);
    const isRemovable = this.menuItems.getValue()[menuItemIndex].removable;

    if (isRemovable) {
      this.triggerPreviousAnchor();

      // NOTE: Set a timeout for animation
      setTimeout(() => {
        this.menuItems.getValue().splice(menuItemIndex, 1);
      }, 1000);
    }
  }

  /**
   * Add an anchor by id providing her id and data (without #)
   * @returns void
   */
  public addAnchor(id: string, data: any, removable?: boolean): void {
    this.menuItems.getValue().push({
      link: id,
      data: data,
      active: this.config.scrollOnCreated ? true : false,
      removable: removable ? removable : true,
    });

    if (this.config.scrollOnCreated) {
      // NOTE: Wait for creation
      setTimeout(() => {
        this.triggerAnchorId(id);
      });
    }
  }
}
