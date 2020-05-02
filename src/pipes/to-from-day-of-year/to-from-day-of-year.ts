import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ToFromDayOfYearPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'toFromDayOfYear',
})
export class ToFromDayOfYearPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, currentLang) {

    var nonLoSo : number = new Date(2020, 0).setDate(value);
    var dateToReturn : Date = new Date(nonLoSo);
    
    return dateToReturn.toLocaleDateString(
      currentLang,
      { /*year: "numeric", */month: 'long', day: 'numeric' }
    );
  }
}
