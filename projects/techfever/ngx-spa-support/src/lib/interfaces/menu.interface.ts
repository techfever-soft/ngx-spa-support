export interface MenuConfig {
  menu: MenuItem[] | any[];
  scrollingBehavior?: ScrollBehavior | 'smooth' | 'auto';
  useMenuScrolling?: boolean;
  sectionMargin?: number;
  // autoScrolling?: boolean;
  // fullSectionScroll?: boolean;
  linkElementsPrefix?: string;
  scrollableElementId?: string;
  menuElementId?: string;
}

export interface MenuItem {
  link: string;
  active: boolean;
  element?: HTMLElement | null;
  data: {
    [key: string]: any;
  };
}
