import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Environment } from '../models/environment.model';
import { ID } from '../models/id.model';

const routes = {
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/environments`,
  singleById: (id : number) => environment.serverUrl + `/environments/${id}`,
  base: environment.serverUrl + '/environments'
};

@Injectable()
export class EnvironmentsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Environment[]> {
    return this.httpClient.get<Environment[]>(routes.allByUser(this.authService.getUser().id));
  }

  getSingleById(id: number): Observable<Environment> {
    return this.httpClient.get<Environment>(routes.singleById(id));
  }

  putSingle(id: number, env: Environment): Observable<Environment> {
    return this.httpClient.put<Environment>(routes.singleById(id), env);
  }

  post(env: Environment): Observable<Environment> {
    return this.httpClient.post<Environment>(routes.base, env);
  }

  delete(id: number): Observable<ID> {
    return this.httpClient.delete<ID>(routes.singleById(id));
  }

}
