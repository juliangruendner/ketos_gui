import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from "../core/authentication/authentication.service";
import { Observable } from "rxjs/Observable";
import { MLModel } from "../models/mlmodel.model";
import { environment } from '../../environments/environment';
import { PatientIDs } from '../models/patientIds.model';

const routes = {
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/models`,
  singleById: (id : number) => environment.serverUrl + `/models/${id}`,
  prediction: (id : number, ownInputData : boolean) => environment.serverUrl + `/models/${id}/prediction?writeToFhir=False&ownInputData=${ownInputData}`,
  create: (create_example_model : boolean) => environment.serverUrl + `/models?create_example_model=${create_example_model}`,
  base: environment.serverUrl + '/models',
  export: (id: number) => environment.serverUrl + `/models/${id}/export`,
  import: (env_id: number, feature_set_id: Number ) => environment.serverUrl + `/models/import?environment_id=${env_id}&feature_set_id=${feature_set_id}`,
};

export class MLModelsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
    
  getAll(): Observable<MLModel[]> {
    return this.httpClient.get<MLModel[]>(routes.allByUser(this.authService.getUser().id));
  }

  post(mlModel: MLModel, create_example_model : boolean = true): Observable<MLModel> {
    return this.httpClient.post<MLModel>(routes.create(create_example_model), mlModel);
  }

  put(id: number, mlModel: MLModel): Observable<MLModel> {
    return this.httpClient.put<MLModel>(routes.singleById(id), mlModel);
  }

  delete(id: number): Observable<MLModel> {
      return this.httpClient.delete<any>(routes.singleById(id))
  }

  predict(id: number, patientIds: PatientIDs, ownInputData: boolean): Observable<any> {
    return this.httpClient.post(routes.prediction(id, ownInputData), patientIds);
  }

  prepare_export(id: number): Observable<MLModel> {
    return this.httpClient.post<any>(routes.export(id), "")
  }

  export(id: number): void {
    //return this.httpClient.get<Blob>(routes.export(id));
    document.location.href = routes.export(id);
  }

  import(file: File, env_id: number, fs_id: number) {
    let header: HttpHeaders = new HttpHeaders();
    var auth = 'Basic ' + this.authService.credentials.username + ':' + this.authService.credentials.password;
    auth = btoa(auth)
    header.append('Authorization', auth)
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = { headers: header };
    let data: FormData = new FormData();
    data.append('file', file);
    return this.httpClient.post(routes.import(env_id, fs_id), data, options);
  }
}