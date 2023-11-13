import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTourComponent } from './new-tour.component';

describe('NewTourComponent', () => {
  let component: NewTourComponent;
  let fixture: ComponentFixture<NewTourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTourComponent]
    });
    fixture = TestBed.createComponent(NewTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
