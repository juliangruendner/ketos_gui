import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';

const routes = {
  base: environment.fhirServerUrl,
  metaData: environment.fhirServerUrl + '/metadata?_format=json'
};

@Injectable()
export class FhirBaseService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getMetaData(): Observable<any[]> {
    return this.httpClient.get<any[]>(routes.metaData);
  }

}
