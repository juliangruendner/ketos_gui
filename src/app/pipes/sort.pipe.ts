import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';


@Pipe({name: 'sortForProperty'})
export class SortForObjPropertyPipe implements PipeTransform {
  transform(values: any[], property: string): any[] {
    return _.sortBy(values, property);
  }
}
