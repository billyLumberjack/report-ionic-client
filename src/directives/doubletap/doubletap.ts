import {
  Directive,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Gesture } from "ionic-angular";

/**
 * Generated class for the DoubletapDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[doubletap]' // Attribute selector
})
export class DoubletapDirective implements AfterViewInit, OnDestroy {
  private pressGesture: Gesture;

  constructor(
      // the actual element
      private el: ElementRef
    ) {}

  public ngAfterViewInit(): void {
    this.pressGesture = new Gesture(this.el.nativeElement);

    this.pressGesture.listen();
    this.pressGesture.on("doubletap", (e: Event) => {
      this.ondoubletap.emit(e);
    });
  }

    // emit the `Event`, bind to (ondoubletap) in your markup
    @Output() public ondoubletap: EventEmitter<Event> = new EventEmitter();

  // clean things up
    public ngOnDestroy() {
      this.pressGesture.destroy();
    }

}
