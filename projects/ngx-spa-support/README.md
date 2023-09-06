# 📲 ngx-spa-support

A package to help you to build more easily single page applications, using scroll anchors.

![](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=techfever&button_colour=43a047&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00)

#

![](https://img.shields.io/npm/v/ngx-spa-support)

![](https://img.shields.io/npm/dt/ngx-spa-support)

# Demo

[SEE DEMO](https://ngx-spa-support.web.app/)

![demo capture](https://firebasestorage.googleapis.com/v0/b/ngx-spa-support.appspot.com/o/ngx-spa-support.png?alt=media&token=d79d2209-4fb7-4150-bd48-40686250b985)

# Features

- [x] Anchor scrolling
- [x] Menu scroll-spy
- [x] Dynamic anchors **(v2)**
- [x] Scroll snapping **(NEW)**
- [ ] Menu horizontal scrolling - `Soon`
- [ ] Keyboard navigation
- [ ] Custom transitions
- [ ] Infinite scroll
- [ ] Section horizontal scrolling

## Breaking changes

- NgxSpaSupport is now a component. Please use version 16.0.7 to use the full-service
- Please use `*ngFor` to generate your menu items and dynamic items at the same time

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

#

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
