import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from "../core/authentication/authentication.service";
import { Observable } from "rxjs/Observable";
import { MLModel } from "../models/mlmodel.model";
import { environment } from '../../environments/environment';
import { PatientIDs } from '../models/patientIds.model';
import { Annotation } from '../models/annotation';
import { ScaleEntry } from '../models/ScaleEntry';
import { AnnotationEntry } from '../models/AnnotationEntry';

const routes = {
  base: environment.serverUrl + '/annotation_tasks',
  get: (id : number) => routes.base + `/${id}`,
  allByUser: (id : number) => environment.serverUrl + `/users/${id}/annotation_tasks`,
  getAnnotators: (id : number) => routes.base + `/${id}/annotators`,
  delete: (id : number) => routes.base + `/${id}`,
  create: (number_annotators: number) => routes.base + `?number_of_annotators=${number_annotators}`,
  scaleentries: (id : number) => routes.base + `/${id}/scale_entries`,
  annotationByTask: (id : string) => environment.serverUrl + `/annotators/${id}`,
  entries: (id : number) => routes.base + `/${id}/entries`,
};

export class AnnotationService {

  constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
    
  get(annotation_id: number): Observable<Annotation> {
    return this.httpClient.get<Annotation>(routes.get(annotation_id));
  }

  getAll(): Observable<Annotation[]> {
    return this.httpClient.get<Annotation[]>(routes.allByUser(this.authService.getUser().id));
  }

  post(annotation: Annotation, number_of_annotators : number): Observable<Annotation> {
    return this.httpClient.post<Annotation>(routes.create(number_of_annotators), annotation);
  }

  delete(annotation_id: number): Observable<Annotation> {
    return this.httpClient.delete<Annotation>(routes.delete(annotation_id));
  }

  getAnnotators(id: number): Observable<any> {
    return this.httpClient.get(routes.getAnnotators(id));
  }

  getScaleEntries(id: number): Observable<ScaleEntry[]>{
    return this.httpClient.get<ScaleEntry[]>(routes.scaleentries(id));
  }

  createScaleEntry(id: number, scaleEntry: ScaleEntry): Observable<ScaleEntry[]>{
    return this.httpClient.post<ScaleEntry[]>(routes.scaleentries(id), scaleEntry);
  }

  getTaskByAnnotator(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.annotationByTask(id));
  }

  getEntries(id: number): Observable<AnnotationEntry[]>{
    return this.httpClient.get<AnnotationEntry[]>(routes.entries(id));
  }

  
}