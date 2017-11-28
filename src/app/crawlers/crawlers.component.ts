import { Component, OnInit } from '@angular/core';
import { Crawler } from './crawlers';

import { CrawlersService } from '../services/crawlers.service';


@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss']
})
export class CrawlersComponent implements OnInit {

  crawlers: Crawler[] = [];

  constructor() { }

  ngOnInit() {
    this.getCrawlers();
  }

  getCrawlers() {
    this.crawlers.push(new Crawler('abbbb'));
    console.log('AAAAAAA');
  }

}
