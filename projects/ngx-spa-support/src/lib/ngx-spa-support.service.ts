import { BehaviorSubject, Observable } from 'rxjs';
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

  /** Event on active section changes */
  public activeSectionChange: EventEmitter<string> = new EventEmitter<string>();

  /** Scrollable element "ngx-spa-scrollable" */
  private scrollableElement!: HTMLElement;

  /** Config of the service */
  private config!: NgxSpaSupportConfig;

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

    const foundMenuItemIndex = this.config.menu.findIndex(
      (menuItem: NgxSpaSupportMenuItem) => menuItem.link === '#' + id
    );
    const foundMenuItem = this.config.menu[foundMenuItemIndex];

    if (foundMenuItem) {
      foundMenuItem.active = true;

      this.activeSectionChange.emit(id);
      this.menuItems.next(this.config.menu);
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
      const menuItemId = foundActiveMenuItem.link.substring(1);
      this.activeSectionChange.emit(menuItemId);
    }
  }

  /**
   * Updates the current active section
   * @returns void
   */
  public updateCurrentSection(): void {
    /**
     * TODO: Rewrite the code because it was copied-pasted from old service 16.0.7
     */

    if (isPlatformBrowser(this.platformId)) {
      const scrollableRect = this.scrollableElement.getBoundingClientRect();
      const scrollableBottom = scrollableRect.top + scrollableRect.height;

      let activeSectionId: string | null = null;
      let activeSectionTop: number = Number.MAX_SAFE_INTEGER;
      let activeSectionBottom: number = Number.MIN_SAFE_INTEGER;

      // TODO: Custom margin
      const sectionMargin = 250;

      this.config.menu.forEach((item: NgxSpaSupportMenuItem) => {
        const sectionId: string = item.link.substring(1);
        const sectionElement: HTMLElement = document.getElementById(
          sectionId
        ) as HTMLElement;

        if (sectionElement) {
          const sectionRect = sectionElement.getBoundingClientRect();

          // NOTE: Apply margin to section top & bottom
          const sectionTop: number = sectionRect.top - sectionMargin;
          const sectionBottom: number = sectionRect.bottom + sectionMargin;

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

      if (activeSectionId) {
        this.setScrolledSection(activeSectionId);
      }
    }
  }

  /**
   * Trigger an anchor by her id (without #)
   * @param id string
   * @returns void
   */
  public triggerAnchorId(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const targetSectionElement = document.getElementById(id) as HTMLElement;
      const targetTop: number = targetSectionElement.offsetTop;

      this.scrollableElement.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }
  }
}
