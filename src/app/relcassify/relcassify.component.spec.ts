import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelcassifyComponent } from './relcassify.component';

describe('RelcassifyComponent', () => {
  let component: RelcassifyComponent;
  let fixture: ComponentFixture<RelcassifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelcassifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelcassifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
