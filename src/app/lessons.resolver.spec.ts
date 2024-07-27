import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { lessonsResolver } from './lessons.resolver';

describe('lessonsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => lessonsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
