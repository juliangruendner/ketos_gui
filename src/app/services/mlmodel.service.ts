import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from "../core/authentication/authentication.service";
import { Observable } from "rxjs/Observable";
import { MLModel } from "../models/mlmodel.model";
import { environment } from '../../environments/environment';
import { PatientIDs } from '../models/patientIds.model';

const routes = {
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/models`,
  singleById: (id : number) => environment.serverUrl + `/models/${id}`,
  prediction: (id : number) => environment.serverUrl + `/models/${id}/prediction`,
  create: environment.serverUrl + `/models?createExampleModel=True`,
  base: environment.serverUrl + '/models'
};

export class MLModelsService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
    
  getAll(): Observable<MLModel[]> {
    return this.httpClient.get<MLModel[]>(routes.allByUser(this.authService.getUser().id));
  }

  post(mlModel: MLModel): Observable<MLModel> {
    return this.httpClient.post<MLModel>(routes.create, mlModel);
  }

  put(id: number, mlModel: MLModel): Observable<MLModel> {
    return this.httpClient.put<MLModel>(routes.singleById(id), mlModel);
  }

  predict(id: number, patientIds: PatientIDs): Observable<any> {
    return this.httpClient.post(routes.prediction(id), patientIds);
  }
}