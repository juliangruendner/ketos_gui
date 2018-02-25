import { Component, OnInit } from '@angular/core';
import { Crawler } from '../models/crawlers';
import { CrawlersService } from '../services/crawlers.service';

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

  constructor(private crawlersService: CrawlersService) { }

  ngOnInit() {
    this.crawlersService.getAll().subscribe(resp => {
      this.crawlers = resp;
      console.log(resp);
    });
  }

}
