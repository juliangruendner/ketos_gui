import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

const routes = {
  all: '/environments'
};

@Injectable()
export class EnvironmentsService {

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {
    console.log("deine mudda")
    return this.http.get(routes.all)
      .pipe(
        map((res: Response) => res.json()),
        catchError(() => Observable.of('Error, could not load environments'))
      );
  }

}
