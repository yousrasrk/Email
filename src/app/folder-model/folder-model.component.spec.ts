import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderModelComponent } from './folder-model.component';

describe('FolderModelComponent', () => {
  let component: FolderModelComponent;
  let fixture: ComponentFixture<FolderModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
