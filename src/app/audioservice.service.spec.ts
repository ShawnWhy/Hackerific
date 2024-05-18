import { TestBed } from '@angular/core/testing';

import { AudioserviceService } from './audioservice.service';

describe('AudioserviceService', () => {
  let service: AudioserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
