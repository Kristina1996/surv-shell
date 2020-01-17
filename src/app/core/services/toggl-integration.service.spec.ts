import { TestBed } from '@angular/core/testing';

import { TogglIntegrationService } from './toggl-integration.service';

describe('TogglIntegrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TogglIntegrationService = TestBed.get(TogglIntegrationService);
    expect(service).toBeTruthy();
  });
});
