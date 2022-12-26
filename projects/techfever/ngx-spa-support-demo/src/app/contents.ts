

export const secondContentHTML = `
<div class="scrollable-menu">
  <ul id="menu">
    <li
      *ngFor="let item of subscribedMenu"
      [class]="item.active ? 'active' : ''"
    >
      <button
        *ngIf="!item.active"
        mat-button
        (click)="triggerScroll(item)"
        >{{ item.data["title"] }}</button
      >
      <button
        *ngIf="item.active"
        mat-raised-button
        color="accent"
        ><mat-icon>check_circle</mat-icon> 
        {{ item.data["title"] }}</button
      >
    </li>
  </ul>
</div>
  `;

export const secondContentTS = `
  import { Component, OnInit } from '@angular/core';
  import {
    MenuConfig,
    MenuItem,
    NgxSpaSupportService,
  } from '@techfever/ngx-spa-support';
  
  export class ExampleComponent implements OnInit {
    public subscribedMenu: MenuItem[] = [];
    
    constructor(
      private spaService: NgxSpaSupportService
    ) {
      // Subscribe to your menu to know which section is active
      this.spaService.getMenuItems().subscribe((menu) => {
        this.subscribedMenu = menu;
      });
    }

    ngOnInit(): void {
      const scrollConfig: MenuConfig = {
        // ... 
        // Add your own menu config
      }

      this.spaService.createScrollAnchors(scrollConfig);
    }

    public triggerScroll(item: MenuItem) {
      this.spaService.triggerScrollAnchor(item);
    }

  }
  `;
