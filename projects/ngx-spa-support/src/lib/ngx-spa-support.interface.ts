export interface NgxSpaSupportConfig {
  menu: NgxSpaSupportMenuItem[];
  // rubberBandEffect?: boolean;
  // loopMode?: boolean;
  // scrollSnapping?: boolean;
  scrollBehavior?: ScrollBehavior;
  sectionDetectionSize?: number;
  scrollOnCreated?: boolean;
  sectionOffset?: number;
  lazyLoad?: boolean;
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
