import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ID } from '../models/id.model';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const routes = {
  base: environment.serverUrl + "/users",
  singleById: (id : number) => environment.serverUrl + `/users/${id}`,
};

@Injectable()
export class UsersService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(routes.base);
  }

  getSingleById(id: number): Observable<User> {
    return this.httpClient.get<User>(routes.singleById(id));
  }

  putSingle(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(routes.singleById(id), user);
  }

  post(user: User): Observable<User> {
    return this.httpClient.post<User>(routes.base, user);
  }

  delete(id: number): Observable<ID> {
    return this.httpClient.delete<ID>(routes.singleById(id));
  }

}
