import { TestBed } from '@angular/core/testing';

import { HiveDataService } from './hive-data.service';

describe('HiveDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiveDataService = TestBed.get(HiveDataService);
    expect(service).toBeTruthy();
  });
});
