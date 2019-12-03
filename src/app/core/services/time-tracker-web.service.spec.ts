import { TestBed } from '@angular/core/testing';

import { TimeTrackerWebService } from './time-tracker-web.service';

describe('TimeTrackerWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeTrackerWebService = TestBed.get(TimeTrackerWebService);
    expect(service).toBeTruthy();
  });
});
