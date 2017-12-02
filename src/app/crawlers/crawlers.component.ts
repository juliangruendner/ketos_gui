import { Component, OnInit } from '@angular/core';

import { CrawlersService } from '../services/crawlers.service';
import { Crawler } from '../models/crawlers';


@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss']
})
export class CrawlersComponent implements OnInit {

  crawlers: Crawler[] = [];

  constructor(private crawlersService : CrawlersService) { }

  ngOnInit() {
    this.crawlersService.getAll().subscribe(crawlers => { 
      this.crawlers = crawlers;
    });
  }


}
