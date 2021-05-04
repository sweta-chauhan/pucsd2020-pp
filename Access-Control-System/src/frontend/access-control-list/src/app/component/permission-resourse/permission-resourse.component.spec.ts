import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionResourseComponent } from './permission-resourse.component';

describe('PermissionResourseComponent', () => {
  let component: PermissionResourseComponent;
  let fixture: ComponentFixture<PermissionResourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionResourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionResourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
