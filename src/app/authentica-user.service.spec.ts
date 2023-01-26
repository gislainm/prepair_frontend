import { TestBed } from '@angular/core/testing';

import { AuthenticaUserService } from './authentica-user.service';

describe('AuthenticaUserService', () => {
  let service: AuthenticaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
