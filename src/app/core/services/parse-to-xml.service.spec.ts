import { TestBed } from '@angular/core/testing';

import { ParseToXmlService } from './parse-to-xml.service';

describe('ParseToXmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParseToXmlService = TestBed.get(ParseToXmlService);
    expect(service).toBeTruthy();
  });
});
