import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDraftComponent } from './single-draft.component';

describe('SingleDraftComponent', () => {
  let component: SingleDraftComponent;
  let fixture: ComponentFixture<SingleDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
