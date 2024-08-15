import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[highlightUser]',
  standalone: true,
})
export class HighlightUserDirective {

  private defaultColor = '#f7f5ec';
  private highlightColor = '#ffffff';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.defaultColor);
  }
}
