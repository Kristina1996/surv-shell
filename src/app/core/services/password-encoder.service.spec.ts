import { TestBed } from '@angular/core/testing';

import { PasswordEncoderService } from './password-encoder.service';

describe('PasswordEncoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordEncoderService = TestBed.get(PasswordEncoderService);
    expect(service).toBeTruthy();
  });
});
