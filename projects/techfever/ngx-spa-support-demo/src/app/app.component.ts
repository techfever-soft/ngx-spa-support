import { Component } from '@angular/core';
import { NgxSpaSupportService } from '@techfever/ngx-spa-support';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ngxSpaService: NgxSpaSupportService) {}

  changeTab(event: any) {
    this.ngxSpaService.triggerFirstAnchor()
  }
}
