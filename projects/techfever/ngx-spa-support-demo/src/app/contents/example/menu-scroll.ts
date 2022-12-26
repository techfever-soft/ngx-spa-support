export const firstContentHTML = `
<div class="scrollable-sections" id="scrollable">
  <section id="link1">
    <h2 class="mat-h2">my dynamic content 1</h2>

    <button (click)="triggerScrollById('link2')">
      <mat-icon>arrow_downward</mat-icon> Go to next section
    </button>

    <button (click)="triggerScrollById('link4')">
      <mat-icon>last_page</mat-icon> Go to last section
    </button>

    </div>
  </section>

  <!-- 
  <section id="link2">
    ...
  </section>
  -->
</div>
`;

export const firstContentTS = `
import { Component, OnInit } from '@angular/core';
import {
  MenuConfig,
  MenuItem,
  NgxSpaSupportService,
} from '@techfever/ngx-spa-support';

export class ExampleComponent implements OnInit {
    
  constructor(
    private spaService: NgxSpaSupportService
  ) {
    // ...
    // Subscribe to your menu if you want spyscroll
  }

  ngOnInit(): void {
    const scrollConfig: MenuConfig = {
      menu: [
        {
          link: '#link1',
          data: {
            title: 'Section 1',
          },
        },
        // ...
        // Add your own menu items
      ],
      scrollingBehavior: 'smooth',
      useMenuScrolling: false,
      sectionMargin: 250,
    };

    this.spaService.createScrollAnchors(scrollConfig);
  }

  public triggerScrollById(itemId: string) {
    this.spaService.triggerScrollAnchorById(itemId);
  }
}
`;

export const firstContentSCSS = `
app-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  #scrollable {
    height: 100%;
    overflow: auto;

    section {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 1.5em;

      &:nth-child(1) {
        background-color: rgba(0, 0, 0, 0.4);
      }
      &:nth-child(2) {
        background-color: rgba(0, 0, 0, 0.3);
      }
      &:nth-child(3) {
        background-color: rgba(0, 0, 0, 0.2);
      }
      &:nth-child(4) {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .scrollable-sections {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-flow: wrap;
  }
}
`;
