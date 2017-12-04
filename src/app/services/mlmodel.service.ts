import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from "../core/authentication/authentication.service";
import { Observable } from "rxjs/Observable";
import { MLModel } from "../models/mlmodel.model";
import { environment } from '../../environments/environment';

const routes = {
    base: environment.serverUrl + '/models'
};

export class MLModelsService {

    constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
    
  post(mlModel: MLModel): Observable<MLModel> {
    return this.httpClient.post<MLModel>(routes.base, mlModel);
  }
}