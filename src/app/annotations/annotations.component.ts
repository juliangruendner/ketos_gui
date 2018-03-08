import { Component, OnInit } from '@angular/core';
import { Crawler } from '../models/crawlers';
import { CrawlersService } from '../services/crawlers.service';
import { AnnotationService } from '../services/annotation.service';
import { Annotation } from '../models/annotation';
import { environment } from '../../environments/environment.prod';
import { ScaleEntry } from '../models/ScaleEntry';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {

  form_annotation: any = {};
  crawlers: Crawler[] = [];
  annotations : Annotation[];
  edit_mode: boolean = false;
  annotators: any[];
  ketosAnnoUrl = "http://localhost:4200/annotool/";
  numberannotators : number;
  scale_entries: ScaleEntry[];

  anno_types : any = [
    {"name": "Multiple Choice", "id": 0},
    {"name": "Single Choice", "id": 1}
  ];

  constructor(private crawlersService: CrawlersService, private annotationService: AnnotationService) { }

  ngOnInit() {
    this.crawlersService.getAll().subscribe(resp => {
      this.crawlers = resp;
    });

    this.getAll();
  }

  beforeOpenModal(){
    this.edit_mode = false;
    this.form_annotation = new Annotation();
  }

  getAll(){
    this.annotationService.getAll().subscribe(resp => {
      this.annotations = resp;
    });
  }

  create(annotation: Annotation, number_of_annotators: number){
    console.log(annotation);
    annotation.creator_id = 1;
    this.annotationService.post(annotation, number_of_annotators).subscribe(resp => {
      this.getAll();
    });
  }

  mapAnnoCodeToName(id: number){
    for(var anno_type of this.anno_types){
      if (id == anno_type.id){
        return anno_type.name;
      }
    }
    return "";
  }

  edit(annotation: Annotation){
    this.edit_mode = true;
    this.form_annotation = annotation;
    this.annotators = [];

    this.annotationService.getAnnotators(annotation.id).subscribe(resp => {
      this.annotators = resp;
    });

    this.getScaleEntries(annotation);
  }

  delete(annotation: Annotation){
    this.annotationService.delete(annotation.id).subscribe(resp => {
      this.getAll();
    });
  }

  getUrl(token: string){
    return this.ketosAnnoUrl + token;
  }

  createScaleEntry(annotation: Annotation, entryName: string){
    var max_code : number = 0;
    for(var scale_entry of this.scale_entries){
      if (scale_entry.code > max_code){
        max_code = +scale_entry.code;
      }
    }

    var tmp = new ScaleEntry();
    tmp.code = max_code + 1;
    tmp.name = entryName;
    this.annotationService.createScaleEntry(annotation.id, tmp).subscribe(resp => {
      this.getScaleEntries(annotation);
    });
  }

  getScaleEntries(annotation: Annotation){
    this.annotationService.getScaleEntries(annotation.id).subscribe(resp => {
      this.scale_entries = resp;
    });
  }

}
