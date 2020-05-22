import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerPortalComponent } from './viewer-portal.component';

describe('ViewerPortalComponent', () => {
  let component: ViewerPortalComponent;
  let fixture: ComponentFixture<ViewerPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
