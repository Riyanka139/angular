import {
  Directive,
  OnInit,
  Renderer2,
  HostListener,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})

// example of attributes directive
export class BetterHighlightDirective implements OnInit {
  @Input() defaultBgColor: string = "transparent";
  @Input('appBetterHighlight') highlightBgColor: string = "green";
  @Input() highlightColor: string;
  @HostBinding('style.backgroundColor') backgroundColor: string
  @HostBinding('style.color') color: string

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'green')
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white')
    this.backgroundColor=this.defaultBgColor
    this.renderer.setStyle(this.elRef.nativeElement, 'padding', '5px');
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'green'
    // );
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'white');
    this.backgroundColor = this.highlightBgColor
    this.color = this.highlightColor
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
    // this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
    this.backgroundColor = this.defaultBgColor;
    this.color = "black";
  }

}
