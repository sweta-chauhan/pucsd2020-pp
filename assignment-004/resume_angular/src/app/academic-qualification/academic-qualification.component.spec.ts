import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicQualificationComponent } from './academic-qualification.component';

describe('AcademicQualificationComponent', () => {
  let component: AcademicQualificationComponent;
  let fixture: ComponentFixture<AcademicQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
