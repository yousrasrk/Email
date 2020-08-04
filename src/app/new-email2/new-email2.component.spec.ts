import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmail2Component } from './new-email2.component';

describe('NewEmail2Component', () => {
  let component: NewEmail2Component;
  let fixture: ComponentFixture<NewEmail2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmail2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
