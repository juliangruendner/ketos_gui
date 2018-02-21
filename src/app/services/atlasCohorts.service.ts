import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { AtlasCohort } from '../models/atlasCohort.model';

const routes = {
  singleById: (id : number) => environment.serverUrl + `/atlas/cohorts/${id}/patients`,
};

@Injectable()
export class AtlasCohortsService {

  constructor(private httpClient: HttpClient) { }

  getSingleById(id: number): Observable<AtlasCohort> {
    return this.httpClient.get<AtlasCohort>(routes.singleById(id));
  }
}
