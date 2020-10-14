import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFolderComponent } from './email-folder.component';

describe('EmailFolderComponent', () => {
  let component: EmailFolderComponent;
  let fixture: ComponentFixture<EmailFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
