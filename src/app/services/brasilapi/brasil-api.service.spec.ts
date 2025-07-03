import { TestBed } from '@angular/core/testing';

import { BrasilApiService } from './brasil-api.service';

describe('BrasilApiService', () => {
  let service: BrasilApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrasilApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
