import { TestBed } from '@angular/core/testing';

import { AdapterService } from './adapter.service';

describe('AdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdapterService = TestBed.get(AdapterService);
    expect(service).toBeTruthy();
  });
});
