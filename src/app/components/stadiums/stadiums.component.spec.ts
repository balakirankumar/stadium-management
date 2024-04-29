import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumsComponent } from './stadiums.component';

describe('StadiumsComponent', () => {
  let component: StadiumsComponent;
  let fixture: ComponentFixture<StadiumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StadiumsComponent]
    });
    fixture = TestBed.createComponent(StadiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
