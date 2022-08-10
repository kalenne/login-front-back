import { TestBed } from '@angular/core/testing';

import { HidenavbarService } from './hidenavbar.service';

describe('HidenavbarService', () => {
  let service: HidenavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HidenavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
