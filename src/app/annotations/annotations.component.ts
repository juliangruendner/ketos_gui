import { Component, OnInit } from '@angular/core';
import { Crawler } from '../models/crawlers';
import { CrawlersService } from '../services/crawlers.service';
import { AnnotationService } from '../services/annotation.service';
import { Annotation } from '../models/annotation';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {

  form_annotation: any = {};
  crawlers: Crawler[] = [];

  anno_types : any = [
    {"name": "Multiple Choice", "id": 0},
    {"name": "Single Choice", "id": 1}
  ];

  constructor(private crawlersService: CrawlersService, private annotationService: AnnotationService) { }

  ngOnInit() {
    this.crawlersService.getAll().subscribe(resp => {
      this.crawlers = resp;
    });
  }

  create(annotation: Annotation, number_of_annotators: number){
    console.log(number_of_annotators)
    this.annotationService.post(annotation, number_of_annotators).subscribe(resp => {
      console.log(resp)
    });
  }

}
