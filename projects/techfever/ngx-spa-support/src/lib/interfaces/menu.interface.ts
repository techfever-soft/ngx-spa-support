export interface MenuConfig {
  menu: MenuItem[] | any[];
  scrollingBehavior?: ScrollBehavior | 'smooth' | 'auto';
  useMenuScrolling?: boolean;
  sectionMargin?: number;
  fullSectionScroll?: boolean;
}

export interface MenuItem {
  title: string;
  link: string;
  active: boolean;
  element: HTMLElement | null;
}
