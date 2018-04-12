import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedProvider {

  constructor() {}

  public data:any;
}
