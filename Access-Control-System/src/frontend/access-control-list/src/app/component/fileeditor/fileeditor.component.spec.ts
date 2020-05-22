import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileeditorComponent } from './fileeditor.component';

describe('FileeditorComponent', () => {
  let component: FileeditorComponent;
  let fixture: ComponentFixture<FileeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
