import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NgxSpaSupportService } from '../ngx-spa-support.service';

@Component({
  selector: 'ngx-spa-support-scrollable',
  standalone: true,
  imports: [],
  templateUrl: './ngx-spa-support-scrollable.component.html',
  styleUrl: './ngx-spa-support-scrollable.component.css'
})
export class NgxSpaSupportScrollableComponent {
  constructor(
    private elementRef: ElementRef,
    private spaService: NgxSpaSupportService,
    private renderer: Renderer2
  ) {
    this.renderer.listen(this.elementRef.nativeElement, 'scroll', () => {
      
      this.spaService.updateCurrentSection();
    });
  }
}
