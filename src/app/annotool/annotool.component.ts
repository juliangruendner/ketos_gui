import { Component, OnInit } from '@angular/core';
import { CrawlersService } from '../services/crawlers.service';
import { ActivatedRoute } from '@angular/router';
import { AnnotationService } from '../services/annotation.service';
import { ScaleEntry } from '../models/ScaleEntry';
import { Annotation } from '../models/annotation';
import { AnnotationEntry } from '../models/AnnotationEntry';

@Component({
  selector: 'app-annotool',
  templateUrl: './annotool.component.html',
  styleUrls: ['./annotool.component.scss']
})
export class AnnotoolComponent implements OnInit {

  anno_id: string;
  task_id: number;
  scale_entries : ScaleEntry[];
  entries: AnnotationEntry[];
  task: Annotation;
  current_entry_id: number = 0;

  constructor(private route: ActivatedRoute, private annotationService: AnnotationService) {}

  ngOnInit() {
    this.anno_id = this.route.snapshot.paramMap.get('id');
    this.annotationService.getTaskByAnnotator(this.anno_id).subscribe(resp => {
      this.task_id = resp.task_id;

      this.annotationService.get(this.task_id).subscribe(resp => {
        this.task = resp;
      });

      this.annotationService.getEntries(this.task_id).subscribe(resp => {
        this.entries = resp;
      });

      this.annotationService.getScaleEntries(this.task_id).subscribe(resp => {
        this.scale_entries = resp;
      });
    });
    
  }

  getType(id: number){
    if(id == 0){
      return "checkbox";
    }
    return "radio";
  }

}
