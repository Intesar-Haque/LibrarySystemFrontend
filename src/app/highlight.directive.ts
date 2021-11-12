import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  colors: string[];
  sizes: string[];
  constructor(private el: ElementRef) {
    this.sizes = ['small', 'large', 'larger', 'smaller'];
    this.colors = ['red', 'green', 'blue', 'purple'];
  }
  @HostListener('mouseenter') onMouseEnter() {
    let size: string;
    let color: string;
    color = this.colors[Math.floor(Math.random() * this.colors.length)];
    size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    this.highlight(size, color);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('', '');
    this.el.nativeElement.style.color = 'black';
  }
  private highlight(size: string, color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.fontSize = size;
    this.el.nativeElement.style.color = 'white';
  }
}
