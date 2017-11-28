import { TestBed, inject } from '@angular/core/testing';

import { CrawlersService } from './crawlers.service';

describe('CrawlersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlersService]
    });
  });

  it('should be created', inject([CrawlersService], (service: CrawlersService) => {
    expect(service).toBeTruthy();
  }));
});
