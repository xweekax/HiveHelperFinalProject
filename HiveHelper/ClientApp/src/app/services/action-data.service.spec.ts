import { TestBed } from '@angular/core/testing';

import { ActionDataService } from './action-data.service';

describe('ActionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionDataService = TestBed.get(ActionDataService);
    expect(service).toBeTruthy();
  });
});
