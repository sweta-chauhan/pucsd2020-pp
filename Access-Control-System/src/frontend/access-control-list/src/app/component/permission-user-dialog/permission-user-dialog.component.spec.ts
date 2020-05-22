import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUserDialogComponent } from './permission-user-dialog.component';

describe('PermissionUserDialogComponent', () => {
  let component: PermissionUserDialogComponent;
  let fixture: ComponentFixture<PermissionUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
