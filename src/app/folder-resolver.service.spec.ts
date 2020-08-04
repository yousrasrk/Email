import { TestBed } from '@angular/core/testing';

import { FolderResolverService } from './folder-resolver.service';

describe('FolderResolverService', () => {
  let service: FolderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
