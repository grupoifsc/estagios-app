import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { iesGuard } from './ies.guard';

describe('iesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => iesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
