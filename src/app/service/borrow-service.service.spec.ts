import { TestBed } from '@angular/core/testing';

import { BorrowServiceService } from './borrow-service.service';

describe('BorrowServiceService', () => {
  let service: BorrowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
