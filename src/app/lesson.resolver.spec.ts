import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { lessonResolver } from './lesson.resolver';

describe('lessonResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => lessonResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
