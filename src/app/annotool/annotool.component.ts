import { Component, OnInit } from '@angular/core';
import { CrawlersService } from '../services/crawlers.service';
import { ActivatedRoute } from '@angular/router';
import { AnnotationService } from '../services/annotation.service';

@Component({
  selector: 'app-annotool',
  templateUrl: './annotool.component.html',
  styleUrls: ['./annotool.component.scss']
})
export class AnnotoolComponent implements OnInit {

  anno_id: string;
  task_id: number;

  constructor(private route: ActivatedRoute, private annotationService: AnnotationService) {}

  ngOnInit() {
    this.anno_id = this.route.snapshot.paramMap.get('id');
    this.annotationService.getTaskByAnnotator(this.anno_id).subscribe(resp => {
      this.task_id = resp.task_id;
      this.annotationService.getEntries(this.task_id).subscribe(resp => {
        console.log(resp);
      });
    });
    
  }

}
