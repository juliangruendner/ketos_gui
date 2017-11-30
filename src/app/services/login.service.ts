import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

const routes = {
  login: environment.serverUrl + '/users/login'
};

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  
  login(): Observable<Object> {
    return this.httpClient.get(routes.login);
  }

}
