import { TestBed } from '@angular/core/testing';

import { FormServiceService } from './form-service.service';

describe('FormServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormServiceService = TestBed.get(FormServiceService);
    expect(service).toBeTruthy();
  });
});
