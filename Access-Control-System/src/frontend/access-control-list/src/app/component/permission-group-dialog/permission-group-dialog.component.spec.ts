import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGroupDialogComponent } from './permission-group-dialog.component';

describe('PermissionGroupDialogComponent', () => {
  let component: PermissionGroupDialogComponent;
  let fixture: ComponentFixture<PermissionGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
