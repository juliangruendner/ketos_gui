import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';

const routes = {
  allByUser: (id : Number) => environment.serverUrl + `/users/${id}/environments`,
  singleById: (id : Number) => environment.serverUrl + `/environments/${id}`
};

@Injectable()
export class EnvironmentsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Object> {
    return this.httpClient.get(routes.allByUser(this.authService.getUser().id));
  }

  getSingleById(id: Number): Observable<Object> {
    return this.httpClient.get(routes.singleById(id));
  }

  putSingle(env: any): Observable<Object> {
    return this.httpClient.put(routes.singleById(env.id), env);
  }

}
