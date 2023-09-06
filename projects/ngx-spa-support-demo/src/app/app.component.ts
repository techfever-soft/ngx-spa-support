import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpaSupportService } from 'ngx-spa-support';
import {
  NgxSpaSupportConfig,
  NgxSpaSupportMenuItem,
} from 'projects/ngx-spa-support/src/lib/ngx-spa-support.interface';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('toggleConfig', [
      state(
        'opened',
        style({
          height: '390px',
        })
      ),
      state(
        'closed',
        style({
          height: '50px',
        })
      ),
      transition('opened <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  public optionsFormGroup: FormGroup;
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
    scrollSnapping: false,
    sectionOffset: 0,
  };

  public menuItems: NgxSpaSupportMenuItem[] = [];
  public currentIndex!: number;
  public configOpened: boolean = false;

  constructor(
    private spaService: NgxSpaSupportService,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.optionsFormGroup = this.fb.group({
      scrollOnCreated: [this.spaConfig.scrollOnCreated],
      sectionDetectionSize: [this.spaConfig.sectionDetectionSize],
      scrollBehavior: [this.spaConfig.scrollBehavior],
      scrollSnapping: [this.spaConfig.scrollSnapping],
      sectionOffset: [this.spaConfig.sectionOffset],
    });

    this.optionsFormGroup.valueChanges.subscribe((options) => {
      this.spaService.updateConfig(options);
    });

    this.spaService
      .getMenuItems()
      .subscribe((menuItems: NgxSpaSupportMenuItem[]) => {
        this.menuItems = menuItems;
      });

    this.spaService.getCurrentIndex().subscribe((index) => {
      this.currentIndex = index;
    });

    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        if (result.matches) {
          this.spaConfig.sectionOffset = 56;
          this.spaService.updateConfig(this.spaConfig);
        } else {
          this.spaConfig.sectionOffset = 64;
          this.spaService.updateConfig(this.spaConfig);
        }
      });
  }

  public goToLastSection() {
    this.spaService.triggerLastAnchor();
  }

  public goToFirstSection() {
    this.spaService.triggerFirstAnchor();
  }

  public goToPreviousSection() {
    this.spaService.triggerPreviousAnchor();
  }

  public goToNextSection() {
    this.spaService.triggerNextAnchor();
  }

  public onRemoveSection(id: string) {
    this.spaService.removeAnchor(id);
  }

  public onAddSection() {
    const newSectionIndex = this.menuItems.length + 1;

    this.spaService.addAnchor('mySection' + newSectionIndex, {
      label: 'Dynamic section #' + newSectionIndex,
    });
  }

  public onToggleConfig() {
    this.configOpened = !this.configOpened;
  }
}
