import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStadiumComponent } from './create-stadium.component';

describe('CreateStadiumComponent', () => {
  let component: CreateStadiumComponent;
  let fixture: ComponentFixture<CreateStadiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStadiumComponent]
    });
    fixture = TestBed.createComponent(CreateStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
