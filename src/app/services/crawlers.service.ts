import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Crawler } from '../models/crawlers';
import { DataRequest } from '../models/dataRequest';


const routes = {
  create: environment.serverUrl + `/data`,
  all: environment.serverUrl + `/data`,
  singleById: (id : string) => environment.serverUrl + `/data/${id}`,
};


@Injectable()
export class CrawlersService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Crawler[]> {
    return this.httpClient.get<Crawler[]>(routes.all);
  } 

  getOne(id: string): Observable<Crawler> {
    return this.httpClient.get<Crawler>(routes.singleById(id));
  } 
  create(features_set_id: number, dataRequest: DataRequest): Observable<any> {
    return this.httpClient.post(routes.create, dataRequest);
  }
  
}
