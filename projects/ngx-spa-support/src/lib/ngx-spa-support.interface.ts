export interface NgxSpaSupportConfig {
    menu: NgxSpaSupportMenuItem[];
    scrollBehavior: ScrollBehavior;
}

export interface NgxSpaSupportMenuItem {
    link: string;
    element?: HTMLElement;
    active: boolean;
    data: {
      [key: string]: any;
    };
  }
  