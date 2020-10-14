import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLabelComponent } from './email-label.component';

describe('EmailLabelComponent', () => {
  let component: EmailLabelComponent;
  let fixture: ComponentFixture<EmailLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
