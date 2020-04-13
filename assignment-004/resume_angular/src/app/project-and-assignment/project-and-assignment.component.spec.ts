import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAndAssignmentComponent } from './project-and-assignment.component';

describe('ProjectAndAssignmentComponent', () => {
  let component: ProjectAndAssignmentComponent;
  let fixture: ComponentFixture<ProjectAndAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAndAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAndAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
