import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dataResolverResolver } from './data-resolver.resolver';

describe('dataResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dataResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
