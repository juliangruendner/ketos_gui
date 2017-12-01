import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({name: 'username'})
export class UsernamePipe implements PipeTransform {
  transform(user: User, longFormat=true): string {
    var ret: string = user.username;

    if(longFormat && (user.first_name || user.last_name)) {
        ret += " (";
        if(user.first_name) {
            ret += user.first_name + " ";
        }
        if(user.last_name) {
            ret += user.last_name;
        }
        ret += ")";
    }

    return ret;
  }
}