export interface NgxSpaSupportConfig {
  menu: NgxSpaSupportMenuItem[];
  scrollBehavior?: ScrollBehavior;
  sectionDetectionSize?: number;
  scrollOnCreated?: boolean;
  scrollSnapping?: boolean;
  sectionOffset?: number;
}

export interface NgxSpaSupportMenuItem {
  link: string;
  element?: HTMLElement;
  active: boolean;
  data: {
    [key: string]: any;
  };
  removable?: boolean;
}
