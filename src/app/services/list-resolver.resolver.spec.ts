import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { listResolverResolver } from './list-resolver.resolver';

describe('listResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => listResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
