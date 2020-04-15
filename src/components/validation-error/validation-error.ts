import { Component, Input, Host } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AddPage } from '../../pages/add/add';

/**
 * Generated class for the ValidationErrorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'validation-error',
  templateUrl: 'validation-error.html'
})
export class ValidationErrorComponent {

  @Input() toCheckAbstractControl : AbstractControl;
  @Input() errorMsg : string;

  private _parent : AddPage;
  @Input() set parent(value: AddPage ) {
    this._parent = value;
}

get parent(): AddPage {
  return this._parent;
}


  constructor(@Host() parent : AddPage) {
  }

}
