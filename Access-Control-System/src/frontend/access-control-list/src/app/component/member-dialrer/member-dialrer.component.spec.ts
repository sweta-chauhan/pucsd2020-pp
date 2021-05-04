import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDialrerComponent } from './member-dialrer.component';

describe('MemberDialrerComponent', () => {
  let component: MemberDialrerComponent;
  let fixture: ComponentFixture<MemberDialrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDialrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDialrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
