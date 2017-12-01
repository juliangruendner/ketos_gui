import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Image } from "../models/image.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

const routes = {
  base: environment.serverUrl + '/images'
};

@Injectable()
export class ImagesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(routes.base);
  }

}
