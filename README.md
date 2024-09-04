# 📲 ngx-spa-support

A package to help you to build more easily single page applications, using scroll anchors.

#

![](https://img.shields.io/npm/v/ngx-spa-support) ![](https://img.shields.io/npm/dt/ngx-spa-support)

# Demo

[SEE DEMO](https://ngx-spa-support.web.app/)

# Features

- [x] Anchor scrolling
- [x] Menu scroll-spy
- [x] Dynamic anchors 
- [x] Scroll snapping 
- [ ] Keyboard navigation
- [ ] Section horizontal scrolling
- [ ] Menu horizontal scrolling
- [ ] Custom transitions
- [ ] Infinite scroll

# Basic example

Template part

```
<ngx-spa-support [config]="spaConfig">
  <ngx-spa-support-menu>
    <a *ngFor="let menuItem of menuItems" [ngxAnchor]="menuItem.link">
      {{ menuItem.data["label"] }}
    </a>
  </ngx-spa-support-menu>

  <ngx-spa-support-scrollable>
    <section [id]="section.link" *ngFor="let section of menuItems">
      {{ section | json }}
    </section>
  </ngx-spa-support-scrollable>
</ngx-spa-support>
```

TypeScript

```
  public spaConfig: NgxSpaSupportConfig = {
    menu: <NgxSpaSupportMenuItem[]>[
      {
        link: 'mySection1',
        active: false,
        removable: false,
        data: {
          label: 'My first section',
        },
      },
      {
        link: 'mySection2',
        active: true,
        removable: true,
        data: {
          label: 'My second section',
        },
      },
    ],
    scrollBehavior: 'smooth',
    sectionDetectionSize: 250,
    scrollOnCreated: true,
    scrollSnapping: true,
  };

  constructor(
    private spaService: NgxSpaSupportService
  ) {
    this.spaService
      .getMenuItems()
      .subscribe((menuItems: NgxSpaSupportMenuItem[]) => {
        this.menuItems = menuItems;
      });
  }


```

Style part (SCSS)

```
* {
    clear: both;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

body {
    margin: 0;
}

ngx-spa-support {
    ngx-spa-support-menu {
        position: fixed;
        top: 100px;
        a.active {
            background: blue;
            color: #fff;
        }
    }
    ngx-spa-support-scrollable {
        display: block;
        height: 100%;
        overflow: auto;

        section {
            height: 100%;
            &:nth-child(1) {
                background: #858585;
            }
            &:nth-child(2) {
                background: #afafaf;
            }
            &:nth-child(n + 3) {
                background: #dddddd;
            }
        }
    }
}

```