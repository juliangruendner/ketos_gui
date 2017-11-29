import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const routes = {
  login: 'http://192.168.178.39:5000/users/login'
};

@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  
  login(): Observable<Object> {
    return this.httpClient.get(routes.login);
  }

}
