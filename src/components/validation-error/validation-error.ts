import { Component, Input, Host } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
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

  @Input() errors: ValidationErrors;
  objectKeys = Object.keys;


  constructor() {
  }

  private getErrorBessageByKey(errorKey : string){

    let errorMessage : string;
    switch(errorKey){
      case 'min' : errorMessage = `` ; break;
      case 'max' : errorMessage = `` ; break;
      case 'required' : errorMessage = `This field is required`  ; break;
      case 'email' : errorMessage = `Please insert a valid email address` ; break; ; 
      case 'minlength' : errorMessage = `Please insert at least ${this.errors.minlength.requiredLength} characters` ; break;
      case 'maxlength' : errorMessage = `Please insert at most ${this.errors.maxlength.requiredLength} characters` ; break;
      case 'pattern' : errorMessage = `Please respect pattern ${this.errors.pattern.requiredPattern}` ; break;
    }

    return errorMessage;
  }





}
