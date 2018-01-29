import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { ResourceConfig } from '../models/resourceConfig.model';

const routes = {
  // base: environment.serverUrl + '/resources_config',
  base: 'http://localhost:5002' + '/resources_config',
  // singleById: (resourceName: string) => environment.serverUrl + `/${resourceName}`,
  singleById: (resourceName: string) => 'http://localhost:5002' + `/resources_config/${resourceName}`,
};

@Injectable()
export class ResourcesConfigService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAll(): Observable<ResourceConfig[]> {
    return this.httpClient.get<ResourceConfig[]>(routes.base);
  }

  getSingleById(resourceName: string): Observable<ResourceConfig> {
    return this.httpClient.get<ResourceConfig>(routes.singleById(resourceName));
  }

  putSingle(resoureConfig: ResourceConfig): Observable<ResourceConfig> {
    return this.httpClient.put<ResourceConfig>(routes.singleById(resoureConfig.resource_name), resoureConfig);
  }

  post(resoureConfig: ResourceConfig): Observable<ResourceConfig> {
    return this.httpClient.post<ResourceConfig>(routes.base, resoureConfig);
  }

  delete(resoureConfig: ResourceConfig): Observable<String> {
    return this.httpClient.delete<String>(routes.singleById(resoureConfig.resource_name));
  }

}
