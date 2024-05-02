import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMatchComponent } from './view-match.component';

describe('ViewMatchComponent', () => {
  let component: ViewMatchComponent;
  let fixture: ComponentFixture<ViewMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMatchComponent]
    });
    fixture = TestBed.createComponent(ViewMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
