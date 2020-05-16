import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGroupComponent } from './member-group.component';

describe('MemberGroupComponent', () => {
  let component: MemberGroupComponent;
  let fixture: ComponentFixture<MemberGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
