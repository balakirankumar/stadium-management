import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStadiumComponent } from './view-stadium.component';

describe('ViewStadiumComponent', () => {
  let component: ViewStadiumComponent;
  let fixture: ComponentFixture<ViewStadiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStadiumComponent]
    });
    fixture = TestBed.createComponent(ViewStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
