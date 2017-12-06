import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { ID } from '../models/id.model';
import { Feature } from '../models/features.model';

const routes = {
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/features`,
  singleById: (id : number) => environment.serverUrl + `/features/${id}`,
  base: environment.serverUrl + '/features'
};

@Injectable()
export class FeaturesService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Feature[]> {
    return this.httpClient.get<Feature[]>(routes.allByUser(this.authService.getUser().id));
  }

  getSingleById(id: number): Observable<Feature> {
    return this.httpClient.get<Feature>(routes.singleById(id));
  }

  putSingle(id: number, feature: Feature): Observable<Feature> {
    return this.httpClient.put<Feature>(routes.singleById(id), feature);
  }

  post(feature: Feature): Observable<Feature> {
    return this.httpClient.post<Feature>(routes.base, feature);
  }

  delete(id: number): Observable<ID> {
    return this.httpClient.delete<ID>(routes.singleById(id));
  }

}
