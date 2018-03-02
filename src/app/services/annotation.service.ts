import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from "../core/authentication/authentication.service";
import { Observable } from "rxjs/Observable";
import { MLModel } from "../models/mlmodel.model";
import { environment } from '../../environments/environment';
import { PatientIDs } from '../models/patientIds.model';
import { Annotation } from '../models/annotation';

const routes = {
  base: environment.serverUrl + '/annotation_tasks',
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/models`,
  singleById: (id : number) => environment.serverUrl + `/models/${id}`,
  prediction: (id : number) => environment.serverUrl + `/models/${id}/prediction`,
  create: (number_annotators: number) => routes.base + `?number_of_annotators=${number_annotators}`,
};

export class AnnotationService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
    
  getAll(): Observable<MLModel[]> {
    return this.httpClient.get<MLModel[]>(routes.allByUser(this.authService.getUser().id));
  }

  post(annotation: Annotation, number_of_annotators : number): Observable<Annotation> {
    return this.httpClient.post<Annotation>(routes.create(number_of_annotators), annotation);
  }

  put(id: number, mlModel: MLModel): Observable<MLModel> {
    return this.httpClient.put<MLModel>(routes.singleById(id), mlModel);
  }

  predict(id: number, patientIds: PatientIDs): Observable<any> {
    return this.httpClient.post(routes.prediction(id), patientIds);
  }
}