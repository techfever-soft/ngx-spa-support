# 📲 ngx-spa-support

A package to help you to build more easily single page applications, using scroll anchors.

![](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=techfever&button_colour=43a047&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00)

#

![](https://img.shields.io/npm/v/ngx-spa-support)

![](https://img.shields.io/npm/dt/ngx-spa-support)

# Breaking changes

- NgxSpaSupport is now a component. Please use version 16.0.7 to use the full-service
- Other options will arrive soon...

## Demo and documentation

@see [DEMO & DOCUMENTATION](https://ngx-spa-support.firebaseapp.com/)

## Getting Started

`npm i -s ngx-spa-support`

## Usage

Template part

```
 <ngx-spa-support [config]="spaConfig">
    <ngx-spa-support-menu>
      <a ngxAnchor="mySection1" ngxAnchorActiveClass="active">Go to section 1</a>
      <a ngxAnchor="mySection2" ngxAnchorActiveClass="active">Go to section 2</a>
      <!-- You own menu items -->
    </ngx-spa-support-menu>

    <ngx-spa-support-scrollable>
        <section id="mySection1">
            My section 1
        </section>
        <section id="mySection2">
            My section 2
        </section>
        <!-- Your own sections -->
    </ngx-spa-support-scrollable>
</ngx-spa-support>
```

TypeScript part

```
  public spaConfig: NgxSpaSupportConfig = {
    menu: <NgxSpaSupportMenuItem[]>[
      {
        link: '#mySection1',
        active: true,
      },
      {
        link: '#mySection2',
        active: true,
      },
    ],
    scrollBehavior: 'smooth',
    // Other options will follow soon...
  };
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
        }
    }
    ngx-spa-support-scrollable {
        display: block;
        height: 100%;
        overflow: auto;

        section {
            height: 100%;
            &:nth-child(1) {
                background: red;
            }
            &:nth-child(2) {
                background: orange;
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
