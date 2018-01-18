import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash';


@Pipe({name: 'sortForProperty', pure: false})
export class SortForObjPropertyPipe implements PipeTransform {
  tmp: any[];

  transform(values: any[], property: string): any[] {
    this.tmp = [];
    this.tmp = this.tmp.concat(_.sortBy(values, property));
    return this.tmp;
  }
}
