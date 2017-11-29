import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';

const routes = {
  allByUser: (id : Number) => `http://192.168.178.39:5000/users/${id}/environments`
};

@Injectable()
export class EnvironmentsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Object> {
    console.log("deine mudda")
    return this.httpClient.get(routes.allByUser(this.authService.getUser().id));
  }

}
