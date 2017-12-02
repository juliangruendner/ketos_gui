import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Crawler } from '../models/crawlers';


const routes = {
  all: 'http://localhost:5002/crawler/jobs',
  create: 'http://localhost:5002/crawler/jobs'
};

@Injectable()
export class CrawlersService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<Crawler[]> {
    return this.httpClient.get<Crawler[]>(routes.all);
  }

  create(crawler: Crawler): Observable<Crawler> {
    return this.httpClient.post<Crawler>(routes.create, crawler);
  }
  
}
