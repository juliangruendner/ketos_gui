import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { ResourceConfig } from '../models/resourceConfig.model';

const routes = {
  base: environment.serverUrl + '/resources_config'
};

@Injectable()
export class ResourcesConfigService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAll(): Observable<ResourceConfig[]> {
    return this.httpClient.get<ResourceConfig[]>(routes.base);
  }

  post(resoureConfig: ResourceConfig): Observable<ResourceConfig> {
    return this.httpClient.post<ResourceConfig>(routes.base, resoureConfig);
  }

  delete(resoureConfig: ResourceConfig): Observable<ResourceConfig> {
    // Angular does not allow bodies on delete requests -> use generic method instead
    return this.httpClient.request<ResourceConfig>('delete', routes.base, {"body": resoureConfig});
  }

}
