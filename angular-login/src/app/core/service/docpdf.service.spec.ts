import { TestBed } from '@angular/core/testing';

import { DocpdfService } from './docpdf.service';

describe('DocpdfService', () => {
  let service: DocpdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocpdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
