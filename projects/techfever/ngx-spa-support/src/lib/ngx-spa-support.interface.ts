export interface MenuConfig {
  /**
   * Your own menu array with optional data
   * @type MenuItem[] | any[]
   */
  menu: MenuItem[] | any[];

  /**
   * The mode of scrolling for the menu and scrollable elements
   * @type ScrollBehavior | 'string' | 'auto'
   * @default auto
   */
  scrollingBehavior?: ScrollBehavior | 'smooth' | 'auto';

  /**
   * If true, the menu will automatically scrolls to the active element
   *
   * @type ?boolean
   * @default false
   */
  useMenuScrolling?: boolean;

  /**
   * When using menu scrolling, the menu is scrolling to the active element, but
   * can be not adjusted to your item because of an element placed before the menu.
   * (for example a brand link before menu items)
   *
   * @type ?number
   * @default 0
   */
  menuHorizontalScrollMargin?: number;

  /**
   * Use this property if your section scrolling is misplaced because of
   * an element placed before the section wrapper (for example a navbar)
   *
   * @type ?number
   * @default 0
   */
  sectionVerticalScrollMargin?: number;

  /**
   * The detection size between your sections (used by the scrollspy)
   *
   * @type ?number
   * @default 250
   */
  sectionDetectionSize?: number;

  /**
   * The prefix of anchor elements that will be used to scroll (without #)
   *
   * @type ?string
   * @example myLink will be used as document.getElementById(myLink)
   * @default link
   */
  linkElementsPrefix?: string;

  /**
   * The sections container id (without #)
   *
   * @type ?string
   * @default scrollable
   */
  scrollableElementId?: string;

  /**
   * The id used for your subscribed menu, used for scrollspy (without #)
   *
   * @type ?string
   * @default menu
   */
  menuElementId?: string;

  // TODO: rememberActive?: boolean;
  // TODO: autoScrolling?: boolean;
}

export interface MenuItem {
  /**
   * The link of the item used for scrolling to the anchor (with #)
   * @type string
   */
  link: string;

  /**
   * Determines if the item is active
   *
   * @type boolean
   */
  active: boolean;

  /**
   *  The HTMLElement used for scrolling natively, will be automatically created
   *
   * @type ?HTMLElement
   */
  element?: HTMLElement | null;

  /**
   * Your own data you want to reuse in your subscribed menu items
   *
   * @type [key: string]: any;
   * @example myOwnVariable: 'test'
   */
  data: {
    [key: string]: any;
  };
}
