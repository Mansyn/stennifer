import {
  Directive,
  Input,
  EventEmitter,
  ElementRef,
  Renderer,
  OnInit
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[focus]'
})
export class FocusDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('focus') focus: boolean;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.focus) {
      this.renderer
        .invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
    };
  }
}
