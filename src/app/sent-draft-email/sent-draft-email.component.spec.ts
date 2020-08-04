import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentDraftEmailComponent } from './sent-draft-email.component';

describe('SentDraftEmailComponent', () => {
  let component: SentDraftEmailComponent;
  let fixture: ComponentFixture<SentDraftEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentDraftEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentDraftEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
