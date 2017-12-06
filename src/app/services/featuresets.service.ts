import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { ID } from '../models/id.model';
import { FeatureSet } from '../models/featureSets.model';
import { FeatureIDs } from '../models/featureIds.model';
import { HttpHeaders } from '@angular/common/http/src/headers';

const routes = {
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/featuresets`,
  singleById: (id : number) => environment.serverUrl + `/featuresets/${id}`,
  base: environment.serverUrl + '/featuresets',
  featuresForFeatureSet: (id : number) => environment.serverUrl + `/featuresets/${id}/features`
};

@Injectable()
export class FeatureSetsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }

  getAll(): Observable<FeatureSet[]> {
    return this.httpClient.get<FeatureSet[]>(routes.allByUser(this.authService.getUser().id));
  }

  getSingleById(id: number): Observable<FeatureSet> {
    return this.httpClient.get<FeatureSet>(routes.singleById(id));
  }

  putSingle(id: number, feature: FeatureSet): Observable<FeatureSet> {
    return this.httpClient.put<FeatureSet>(routes.singleById(id), feature);
  }

  post(feature: FeatureSet): Observable<FeatureSet> {
    return this.httpClient.post<FeatureSet>(routes.base, feature);
  }

  delete(id: number): Observable<ID> {
    return this.httpClient.delete<ID>(routes.singleById(id));
  }

  getFeaturesForFeatureSet(id: number): Observable<FeatureSet> {
    return this.httpClient.get<FeatureSet>(routes.featuresForFeatureSet(id));
  }

  postFeatures(id: number, featureIds: FeatureIDs): Observable<FeatureSet> {
    return this.httpClient.post<FeatureSet>(routes.featuresForFeatureSet(id), featureIds);
  }

  deleteFeatures(id: number, featureIds: FeatureIDs): Observable<FeatureSet> {
    return this.httpClient.request<FeatureSet>("delete", routes.featuresForFeatureSet(id), {body: featureIds});
  }

}
