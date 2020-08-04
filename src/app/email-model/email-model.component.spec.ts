import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailModelComponent } from './email-model.component';

describe('EmailModelComponent', () => {
  let component: EmailModelComponent;
  let fixture: ComponentFixture<EmailModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
