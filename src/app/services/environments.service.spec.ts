import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentsService } from './environments.service';

describe('EnvironmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentsService]
    });
  });

  it('should be created', inject([EnvironmentsService], (service: EnvironmentsService) => {
    expect(service).toBeTruthy();
  }));
});
