import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'validation-error',
    templateUrl: 'validation-error.html',
    styleUrls: ['validation-error.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ValidationErrorComponent {

  @Input() errors: ValidationErrors;
  objectKeys = Object.keys;


  constructor() {
  }

  getErrorBessageByKey(errorKey: string) {

    let errorMessage: string;
    switch (errorKey) {
      case 'min': errorMessage = ``; break;
      case 'max': errorMessage = ``; break;
      case 'required': errorMessage = `This field is required`; break;
      case 'email': errorMessage = `Please insert a valid email address`; break;
      case 'minlength': errorMessage = `Please insert at least ${this.errors.minlength.requiredLength} characters`; break;
      case 'maxlength': errorMessage = `Please insert at most ${this.errors.maxlength.requiredLength} characters`; break;
      case 'pattern': errorMessage = `Please respect pattern ${this.errors.pattern.requiredPattern}`; break;
    }

    return errorMessage;
  }

}
